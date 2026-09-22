import { useState } from "react";
const handlePayment = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 100,
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
        const verifyResponse = await fetch(
          "http://localhost:5000/api/verify-payment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          }
        );

        const verifyData = await verifyResponse.json();

        if (verifyData.success) {
          alert("Reservation confirmed successfully!");
        } else {
          alert("Payment verification failed.");
        }
      },

      theme: {
        color: "#171717",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
};
export default function Reserve() {
  const [guests, setGuests] = useState(2);
  const [selectedTime, setSelectedTime] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  const times = [
    "11:30 AM",
    "12:30 PM",
    "1:30 PM",
    "6:30 PM",
    "7:30 PM",
    "8:30 PM",
    "9:30 PM",
  ];

  const reservationFee = 100;

  const handleReserve = (e) => {
    e.preventDefault();

    if (!selectedTime) {
      alert("Please select a time.");
      return;
    }

    setShowPayment(true);
  };

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
            <p className="eyebrow mb-4">Reserve Your Table</p>

            <h1 className="section-heading">
              Make your dining experience special
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-charcoal/60">
              Choose your preferred date, time and number of guests.
              Your table will be reserved after payment confirmation.
            </p>
          </div>

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
                onChange={(e) => setGuests(Number(e.target.value))}
                className="minimal-input"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                  <option key={number} value={number}>
                    {number} {number === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
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
                    onClick={() => setSelectedTime(time)}
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

            {/* Special Request */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                Special Request
              </label>

              <textarea
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
                    Pay ₹{reservationFee} to confirm your table
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

              {/* Payment Options */}
              <div className="mt-8 space-y-3">

                <button
                  type="button"
                  className="w-full rounded-xl border border-charcoal/10 px-5 py-4 text-left transition-all hover:border-black hover:-translate-y-0.5"
                >
                  <span className="font-medium">
                    UPI
                  </span>

                  <span className="block text-sm text-charcoal/50">
                    Google Pay / PhonePe / Paytm
                  </span>
                </button>

                <button
                  type="button"
                  className="w-full rounded-xl border border-charcoal/10 px-5 py-4 text-left transition-all hover:border-black hover:-translate-y-0.5"
                >
                  <span className="font-medium">
                    Credit / Debit Card
                  </span>

                  <span className="block text-sm text-charcoal/50">
                    Visa / Mastercard / RuPay
                  </span>
                </button>

              </div>

              {/* Actual payment integration goes here */}
              <button
  type="button"
  onClick={handlePayment}
  className="mt-8 w-full rounded-full bg-black px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
>
  Pay ₹100 & Confirm Reservation
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