import { useState } from "react";
export default function Reserve() {
  const [guests, setGuests] = useState(2);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSeat, setSelectedSeat] = useState("");
  const [showPayment, setShowPayment] = useState(false);
const [reservationSuccess, setReservationSuccess] = useState(null);
const [availabilityError, setAvailabilityError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    specialRequest: "",
  });

  const times = [
    "11:30 AM",
    "12:30 PM",
    "1:30 PM",
    "6:30 PM",
    "7:30 PM",
    "8:30 PM",
    "9:30 PM",
  ];

  const seats = [
    "Table 1",
    "Table 2",
    "Table 3",
    "Table 4",
    "Table 5",
    "Table 6",
    "Table 7",
    "Table 8",
  ];

  const reservationFee = 100;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

 // First step: validate reservation details and check availability
const handleReserve = async (e) => {
  e.preventDefault();
  setAvailabilityError("");

  if (!selectedTime) {
    alert("Please select a time.");
    return;
  }

  if (!selectedSeat) {
    alert("Please select a table.");
    return;
  }

  try {
    // Check table availability BEFORE payment
    const response = await fetch(
      "http://localhost:5000/api/check-availability",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: formData.date,
          time: selectedTime,
          seat: selectedSeat,
        }),
      }
    );

    const data = await response.json();

   if (!data.available) {
  setAvailabilityError(
    data.message ||
      "This table is already reserved for the selected time."
  );

  setShowPayment(false);

  // Scroll to the message
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 100);

  return;
}
    // Table is available
    setShowPayment(true);

    // Scroll to payment section
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);

  } catch (error) {
    console.error("Availability check error:", error);

    alert(
      "Unable to check table availability. Please try again."
    );
  }
};

  // Razorpay payment
  const handlePayment = async () => {
    try {
      // Create Razorpay order
      const response = await fetch(
        "http://localhost:5000/api/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: reservationFee,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert("Unable to create payment.");
        return;
      }

      const options = {
        key: "rzp_test_Tf9x8MTmzw8drY",

        amount: data.order.amount,

        currency: "INR",

        name: "Irani Restaurant",

        description: "Table Reservation",

        order_id: data.order.id,

        handler: async function (response) {
          try {
            // Verify payment with backend
            const verifyResponse = await fetch(
              "http://localhost:5000/api/verify-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
  razorpay_order_id: response.razorpay_order_id,
  razorpay_payment_id: response.razorpay_payment_id,
  razorpay_signature: response.razorpay_signature,

  // Reservation details
  name: formData.name,
  phone: formData.phone,
  date: formData.date,
  time: selectedTime,
  guests: guests,
  seat: selectedSeat,
  specialRequest: formData.specialRequest,
}),
              }
            );

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
  // Reservation successful
  setReservationSuccess(verifyData.reservation);

  setShowPayment(false);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
} else {
  // Reservation failed
  alert(
    `❌ Reservation Failed\n\n${
      verifyData.message ||
      "This table is not available."
    }\n\nPlease try another table or choose a different time.`
  );

  // Keep payment/reservation section open
  setShowPayment(true);
}
          } catch (error) {
            console.error(
              "Payment verification error:",
              error
            );

            alert(
              "Payment was completed, but we could not confirm the reservation. Please contact the restaurant."
            );
          }
        },

        theme: {
          color: "#171717",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);

      alert("Something went wrong while starting payment.");
    }
  };

  // SUCCESS SCREEN
  if (reservationSuccess) {
    return (
      <div className="min-h-screen bg-cream-soft text-charcoal">

        {/* Navbar */}
        <nav className="border-b border-charcoal/10 bg-cream-soft">
          <div className="container-narrow flex h-20 items-center justify-between">

            <a
              href="/"
              className="font-display text-3xl font-semibold text-charcoal"
            >
              Irani
            </a>

            <a
              href="/"
              className="text-sm font-medium text-charcoal/70 transition-colors hover:text-black"
            >
              ← Back to Home
            </a>

          </div>
        </nav>

        {/* Success */}
        <main className="container-narrow py-16 md:py-24">

          <div className="mx-auto max-w-2xl">

            <div className="rounded-3xl border border-green-200 bg-white p-8 shadow-card sm:p-12">

              {/* Success Icon */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <span className="text-4xl text-green-600">
                  ✓
                </span>
              </div>

              {/* Heading */}
              <div className="mt-6 text-center">

                <p className="eyebrow mb-3">
                  Reservation Confirmed
                </p>

                <h1 className="font-display text-4xl">
                  Reservation Successful
                </h1>

                <p className="mx-auto mt-4 max-w-lg text-charcoal/60">
                  Your payment has been successfully completed
                  and your table has been reserved.
                </p>

              </div>

              {/* Reservation Details */}
              <div className="mt-10 rounded-2xl border border-charcoal/10 bg-cream-soft p-6">

                <h2 className="mb-5 text-lg font-semibold">
                  Reservation Details
                </h2>

                <div className="space-y-4">

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-charcoal/50">
                      Reservation ID
                    </span>

                    <span className="text-sm font-semibold">
                      {reservationSuccess.reservationId}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-charcoal/50">
                      Name
                    </span>

                    <span className="text-sm font-semibold">
                      {reservationSuccess.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-charcoal/50">
                      Phone
                    </span>

                    <span className="text-sm font-semibold">
                      {reservationSuccess.phone}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-charcoal/50">
                      Date
                    </span>

                    <span className="text-sm font-semibold">
                      {reservationSuccess.date}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-charcoal/50">
                      Time
                    </span>

                    <span className="text-sm font-semibold">
                      {reservationSuccess.time}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-charcoal/50">
                      Guests
                    </span>

                    <span className="text-sm font-semibold">
                      {reservationSuccess.guests}
                    </span>
                  </div>

                  {/* TABLE */}
                  <div className="flex items-center justify-between gap-4 border-t border-charcoal/10 pt-4">

                    <span className="text-sm text-charcoal/50">
                      Table
                    </span>

                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                      {reservationSuccess.seat}
                    </span>

                  </div>

                </div>

              </div>

              {/* Payment Status */}
              <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="font-semibold text-green-800">
                      Payment Successful
                    </p>

                    <p className="mt-1 text-sm text-green-700">
                      Payment ID:{" "}
                      {reservationSuccess.paymentId}
                    </p>
                  </div>

                  <span className="text-2xl text-green-600">
                    ✓
                  </span>

                </div>

              </div>

              {/* Status */}
              <div className="mt-4 rounded-2xl border border-charcoal/10 bg-white p-5">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-charcoal/50">
                    Reservation Status
                  </span>

                  <span className="font-semibold text-green-600">
                    ✓ Confirmed
                  </span>

                </div>

              </div>

              {/* New Reservation */}
              <button
                type="button"
                onClick={() => {
                  setReservationSuccess(null);
                  setShowPayment(false);
                  setSelectedTime("");
                  setSelectedSeat("");
                  setGuests(2);

                  setFormData({
                    name: "",
                    phone: "",
                    date: "",
                    specialRequest: "",
                  });

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className="mt-8 w-full rounded-full bg-black px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Make Another Reservation
              </button>

            </div>

          </div>

        </main>

        {/* Footer */}
        <footer className="border-t border-charcoal/10 py-8 text-center">
          <p className="text-sm text-charcoal/50">
            © {new Date().getFullYear()} Irani Restaurant
          </p>
        </footer>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-soft text-charcoal">

      {/* Navbar */}
      <nav className="border-b border-charcoal/10 bg-cream-soft">
        <div className="container-narrow flex h-20 items-center justify-between">

          <a
            href="/"
            className="font-display text-3xl font-semibold text-charcoal"
          >
            Irani
          </a>

          <a
            href="/"
            className="text-sm font-medium text-charcoal/70 transition-colors hover:text-black"
          >
            ← Back to Home
          </a>

        </div>
      </nav>

      {/* Reservation Section */}
      <main className="container-narrow py-16 md:py-24">

        <div className="mx-auto max-w-3xl">

          {/* Heading */}
          <div className="text-center">

            <p className="eyebrow mb-4">
              Reserve Your Table
            </p>

            <h1 className="section-heading">
              Make your dining experience special
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-charcoal/60">
              Choose your preferred date, time, table and
              number of guests. Your table will be reserved
              after payment confirmation.
            </p>

          </div>
          {/* Availability Error */}
{availabilityError && (
  <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-6">
    <div className="flex items-start gap-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
        <span className="text-xl text-red-600">
          !
        </span>
      </div>

      <div>
        <h3 className="font-semibold text-red-800">
          Reservation Failed
        </h3>

        <p className="mt-2 text-sm text-red-700">
          {availabilityError}
        </p>

        <p className="mt-2 text-sm font-medium text-red-700">
          Please choose another table or a different time.
        </p>
      </div>

    </div>
  </div>
)}

          {/* Reservation Card */}
          <form
            onSubmit={handleReserve}
            className="mt-12 rounded-3xl border border-charcoal/10 bg-cream p-6 shadow-card sm:p-10"
          >

            {/* Name */}
            <div>

              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="minimal-input"
              />

            </div>

            {/* Phone */}
            <div className="mt-6">

              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
                className="minimal-input"
              />

            </div>

            {/* Date */}
            <div className="mt-6">

              <label className="mb-2 block text-sm font-medium">
                Reservation Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="minimal-input"
              />

            </div>

            {/* Guests */}
            <div className="mt-6">

              <label className="mb-2 block text-sm font-medium">
                Number of Guests
              </label>

              <select
                value={guests}
                onChange={(e) =>
                  setGuests(Number(e.target.value))
                }
                className="minimal-input"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(
                  (number) => (
                    <option
                      key={number}
                      value={number}
                    >
                      {number}{" "}
                      {number === 1
                        ? "Guest"
                        : "Guests"}
                    </option>
                  )
                )}
              </select>

            </div>

            {/* Time */}
            <div className="mt-6">

              <label className="mb-3 block text-sm font-medium">
                Select Time
              </label>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                {times.map((time) => (

                  <button
                    type="button"
                    key={time}
                    onClick={() =>
                      setSelectedTime(time)
                    }
                    className={`rounded-xl border px-4 py-3 text-sm transition-all duration-200 ${
                      selectedTime === time
                        ? "border-black bg-black text-white"
                        : "border-charcoal/10 bg-white text-charcoal hover:-translate-y-0.5 hover:shadow-sm"
                    }`}
                  >
                    {time}
                  </button>

                ))}

              </div>

            </div>

            {/* Table Selection */}
            <div className="mt-6">

              <label className="mb-3 block text-sm font-medium">
                Select Table
              </label>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                {seats.map((seat) => (

                  <button
                    type="button"
                    key={seat}
                    onClick={() =>
                      setSelectedSeat(seat)
                    }
                    className={`rounded-xl border px-4 py-3 text-sm transition-all duration-200 ${
                      selectedSeat === seat
                        ? "border-black bg-black text-white"
                        : "border-charcoal/10 bg-white text-charcoal hover:-translate-y-0.5 hover:shadow-sm"
                    }`}
                  >
                    {seat}
                  </button>

                ))}

              </div>

            </div>

            {/* Special Request */}
            <div className="mt-6">

              <label className="mb-2 block text-sm font-medium">
                Special Request
              </label>

              <textarea
                name="specialRequest"
                value={formData.specialRequest}
                onChange={handleChange}
                rows="4"
                placeholder="Birthday, anniversary, seating preference..."
                className="minimal-input resize-none"
              />

            </div>

            {/* Payment Info */}
            <div className="mt-8 rounded-2xl border border-charcoal/10 bg-white p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="font-medium">
                    Reservation Fee
                  </p>

                  <p className="mt-1 text-sm text-charcoal/50">
                    Pay ₹{reservationFee} to confirm
                    your table
                  </p>

                </div>

                <p className="font-display text-2xl">
                  ₹{reservationFee}
                </p>

              </div>

            </div>

            {/* Reserve Button */}
            <button
              type="submit"
              className="mt-8 w-full rounded-full bg-black px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Continue to Payment — ₹{reservationFee}
            </button>

          </form>

          {/* Payment Section */}
          {showPayment && (

            <div className="mt-8 rounded-3xl border border-charcoal/10 bg-white p-6 shadow-card sm:p-10">

              <div className="text-center">

                <p className="eyebrow mb-3">
                  Secure Payment
                </p>

                <h2 className="font-display text-3xl">
                  Complete your reservation
                </h2>

                <p className="mt-3 text-sm text-charcoal/60">
                  Reservation fee: ₹{reservationFee}
                </p>

              </div>

              {/* Selected Reservation */}
              <div className="mt-6 rounded-2xl bg-cream-soft p-5">

                <div className="flex justify-between py-2">
                  <span className="text-sm text-charcoal/50">
                    Date
                  </span>

                  <span className="text-sm font-semibold">
                    {formData.date}
                  </span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-sm text-charcoal/50">
                    Time
                  </span>

                  <span className="text-sm font-semibold">
                    {selectedTime}
                  </span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-sm text-charcoal/50">
                    Table
                  </span>

                  <span className="text-sm font-semibold">
                    {selectedSeat}
                  </span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-sm text-charcoal/50">
                    Guests
                  </span>

                  <span className="text-sm font-semibold">
                    {guests}
                  </span>
                </div>

              </div>

              {/* Actual Razorpay Payment */}
              <button
                type="button"
                onClick={handlePayment}
                className="mt-8 w-full rounded-full bg-black px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Pay ₹{reservationFee} & Confirm Reservation
              </button>

            </div>

          )}

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-charcoal/10 py-8 text-center">
        <p className="text-sm text-charcoal/50">
          © {new Date().getFullYear()} Irani Restaurant
        </p>
      </footer>

    </div>
  );
}

