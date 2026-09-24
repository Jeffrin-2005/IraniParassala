import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

// --------------------------------------------------
// PATH + ENVIRONMENT
// --------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, ".env"),
});

console.log("ENV FILE:", path.join(__dirname, ".env"));
console.log(
  "Key ID loaded:",
  !!process.env.RAZORPAY_KEY_ID
);
console.log(
  "Key Secret loaded:",
  !!process.env.RAZORPAY_KEY_SECRET
);
console.log(
  "Database URL loaded:",
  !!process.env.DATABASE_URL
);

// --------------------------------------------------
// SUPABASE / POSTGRESQL CONNECTION
// --------------------------------------------------

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Test database connection
pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("Supabase connection failed:", err);
  } else {
    console.log("Supabase connected successfully!");
    console.log("Database time:", result.rows[0].now);
  }
});

// --------------------------------------------------
// EXPRESS
// --------------------------------------------------

const app = express();

app.use(cors());
app.use(express.json());

// --------------------------------------------------
// RAZORPAY
// --------------------------------------------------

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// --------------------------------------------------
// Check table availability before payment
// --------------------------------------------------

app.post("/api/check-availability", async (req, res) => {
  try {
    const { date, time, seat } = req.body;

    if (!date || !time || !seat) {
      return res.status(400).json({
        success: false,
        available: false,
        message: "Date, time and table are required.",
      });
    }

    // Convert "Table 1" -> 1
    const tableNumber = parseInt(
      String(seat).replace(/\D/g, ""),
      10
    );

    if (!tableNumber) {
      return res.status(400).json({
        success: false,
        available: false,
        message: "Invalid table selected.",
      });
    }

    // Check Supabase
    const result = await pool.query(
      `
      SELECT reservation_id
      FROM reservations
      WHERE reservation_date = $1
        AND reservation_time = $2
        AND table_number = $3
      LIMIT 1
      `,
      [date, time, tableNumber]
    );

    // Table already booked
    if (result.rows.length > 0) {
      return res.status(409).json({
        success: false,
        available: false,
        message: `${seat} is already reserved for ${time} on ${date}.`,
      });
    }

    // Table available
    return res.json({
      success: true,
      available: true,
      message: `${seat} is available.`,
    });

  } catch (error) {
    console.error("Availability check error:", error);

    return res.status(500).json({
      success: false,
      available: false,
      message: "Unable to check table availability.",
    });
  }
});

// --------------------------------------------------
// CREATE RAZORPAY ORDER
// --------------------------------------------------

app.post("/api/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment amount",
      });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.json({
      success: true,
      order,
    });

  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create payment order",
    });
  }
});

// --------------------------------------------------
// VERIFY PAYMENT + SAVE RESERVATION
// --------------------------------------------------

app.post("/api/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,

      // Reservation details
      name,
      phone,
      date,
      time,
      guests,
      seat,
      specialRequest,
    } = req.body;

    // --------------------------------------------------
    // 1. CHECK REQUIRED DATA
    // --------------------------------------------------

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment information is incomplete",
      });
    }

    if (
      !name ||
      !phone ||
      !date ||
      !time ||
      !guests ||
      !seat
    ) {
      return res.status(400).json({
        success: false,
        message: "Reservation information is incomplete",
      });
    }

    // --------------------------------------------------
    // 2. VERIFY RAZORPAY SIGNATURE
    // --------------------------------------------------

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        razorpay_order_id +
          "|" +
          razorpay_payment_id
      )
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    console.log("Razorpay payment verified.");

    // --------------------------------------------------
    // 3. CONVERT TABLE NAME
    // --------------------------------------------------
    // Example:
    // "Table 1" → 1
    // "Table 5" → 5

    const tableNumber = parseInt(
      String(seat).replace(/\D/g, ""),
      10
    );

    if (!tableNumber) {
      return res.status(400).json({
        success: false,
        message: "Invalid table selected",
      });
    }

    // --------------------------------------------------
    // 4. CHECK IF TABLE IS ALREADY BOOKED
    // --------------------------------------------------

    const existingBooking = await pool.query(
      `
      SELECT reservation_id
      FROM reservations
      WHERE reservation_date = $1
        AND reservation_time = $2
        AND table_number = $3
      `,
      [
        date,
        time,
        tableNumber,
      ]
    );

    if (existingBooking.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "Sorry, this table is already booked for this time.",
      });
    }

    // --------------------------------------------------
    // 5. CREATE RESERVATION ID
    // --------------------------------------------------

    const reservationId = `RES-${Date.now()}`;

    // --------------------------------------------------
    // 6. SAVE RESERVATION TO SUPABASE
    // --------------------------------------------------

    const result = await pool.query(
      `
      INSERT INTO reservations (
        reservation_id,
        name,
        phone,
        reservation_date,
        reservation_time,
        guests,
        table_number,
        special_request,
        payment_id,
        payment_status,
        reservation_status
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11
      )
      RETURNING *
      `,
      [
        reservationId,
        name,
        phone,
        date,
        time,
        guests,
        tableNumber,
        specialRequest || null,
        razorpay_payment_id,
        "Paid",
        "Confirmed",
      ]
    );

    const savedReservation = result.rows[0];

    console.log(
      "Reservation successfully saved:"
    );

    console.log(savedReservation);

    // --------------------------------------------------
    // 7. SEND SUCCESS TO FRONTEND
    // --------------------------------------------------

    return res.json({
      success: true,
      message:
        "Payment verified and reservation confirmed",
      reservation: {
        reservationId:
          savedReservation.reservation_id,

        name: savedReservation.name,

        phone: savedReservation.phone,

        date:
          savedReservation.reservation_date,

        time:
          savedReservation.reservation_time,

        guests:
          savedReservation.guests,

        seat:
          `Table ${savedReservation.table_number}`,

        paymentId:
          savedReservation.payment_id,

        paymentStatus:
          savedReservation.payment_status,

        reservationStatus:
          savedReservation.reservation_status,
      },
    });

  } catch (error) {

    // --------------------------------------------------
    // 8. HANDLE DUPLICATE BOOKING
    // --------------------------------------------------

    if (error.code === "23505") {
      console.log(
        "Duplicate table booking prevented."
      );

      return res.status(409).json({
        success: false,
        message:
          "Sorry, this table was just booked by another customer.",
      });
    }

    // --------------------------------------------------
    // 9. OTHER ERRORS
    // --------------------------------------------------

    console.error(
      "Reservation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to save reservation",
    });
  }
});

// --------------------------------------------------
// START SERVER
// --------------------------------------------------

app.listen(5000, () => {
  console.log(
    "Server running on http://localhost:5000"
  );
});