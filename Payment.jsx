


import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { addReservation } from "../redux/reservationSlice";
import { useToast } from "../context/ToastContext";

// Change this value to your actual price per guest.
const PRICE_PER_PERSON = 1000;

function Payment() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const booking = location.state;

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");

  // Require booking details before showing the payment page.
  if (!booking) {
    return (
      <main className="page-section">
        <div className="container payment-confirmation">
          <h1>No booking details found</h1>
          <p>Please complete the reservation form first.</p>

          <Link to="/reservations" className="button button-primary">
            Go to Reservations
          </Link>
        </div>
      </main>
    );
  }

  const bookingType = booking.bookingType || "Table Reservation";
  const guestCount = Math.max(0, Number(booking.guests) || 0);

  // Calculate the amount based on the number of guests.
  const totalAmount = guestCount * PRICE_PER_PERSON;

  function handlePayment(event) {
    event.preventDefault();

    if (!booking.date || !booking.time) {
      showToast("Booking date and time are required.", "error");
      return;
    }

    if (guestCount < 1) {
      showToast("Please select at least one guest.", "error");
      return;
    }

    try {
      const id = `DEMO-${Date.now().toString().slice(-8)}`;

      // Save the booking after the demo payment step.
      dispatch(
        addReservation({
          ...booking,
          id,
          bookingId: id,
          bookingType,
          guests: guestCount,
          pricePerPerson: PRICE_PER_PERSON,
          totalAmount,
          paymentMethod,
          paymentStatus:
            paymentMethod === "cash" ? "Pending" : "Demo Paid",
        })
      );

      setBookingId(id);
      setConfirmed(true);

      showToast("Booking completed successfully!");
    } catch {
      showToast("Unable to complete the booking.", "error");
    }
  }

  // Booking confirmation page.
  if (confirmed) {
    return (
      <main className="page-section">
        <div className="container payment-confirmation">
          <div className="payment-success-icon">✓</div>

          <p className="eyebrow">BOOKING REQUEST RECEIVED</p>

          <h1>
            {paymentMethod === "cash"
              ? "Booking Request Submitted!"
              : "Payment Successful!"}
          </h1>

          <p className="payment-intro">
            {paymentMethod === "cash"
              ? "Your booking has been recorded. Payment is pending."
              : "This is a simulated payment confirmation. No money has been transferred."}
          </p>

          <div className="payment-summary">
            <p><strong>Booking ID:</strong> {bookingId}</p>
            <p><strong>Booking type:</strong> {bookingType}</p>
            <p><strong>Name:</strong> {booking.name}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Phone:</strong> {booking.phone}</p>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Time:</strong> {booking.time}</p>
            <p><strong>Guests:</strong> {guestCount}</p>

            {booking.notes && (
              <p><strong>Special requests:</strong> {booking.notes}</p>
            )}

            <p>
              <strong>Price per guest:</strong>{" "}
              ₹{PRICE_PER_PERSON.toLocaleString("en-IN")}
            </p>

            <p>
              <strong>Total amount:</strong>{" "}
              ₹{totalAmount.toLocaleString("en-IN")}
            </p>

            <p>
              <strong>Payment method:</strong>{" "}
              {paymentMethod === "upi"
                ? "UPI (simulated)"
                : paymentMethod === "card"
                ? "Card (simulated)"
                : "Cash on arrival"}
            </p>

            <p>
              <strong>Payment status:</strong>{" "}
              {paymentMethod === "cash" ? "Pending" : " Paid"}
            </p>
          </div>

          <div className="payment-actions">
            <Link to="/" className="button button-primary">
              Back to Home
            </Link>

            <Link to="/reservations" className="button button-outline">
              View Reservations
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Payment page.
  return (
    <main className="page-section">
      <div className="container payment-page">
        <div className="page-heading">
          <span className="eyebrow">VANADXS EXPERIENCES</span>
          <h1>Complete Your Booking</h1>
          <p>
            Review your selected slot and choose a payment method.
            No real payment will be collected.
          </p>
        </div>

        <div className="payment-layout">
          <form
            className="form-card demo-payment-form"
            onSubmit={handlePayment}
          >
            <h2>Booking Details</h2>

            <div className="payment-summary">
              <p><strong>Booking type:</strong> {bookingType}</p>
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Phone:</strong> {booking.phone}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Guests:</strong> {guestCount}</p>

              {booking.notes && (
                <p><strong>Special requests:</strong> {booking.notes}</p>
              )}
            </div>

            <h2 className="payment-method-heading">
              Choose Payment Method
            </h2>

            <div className="payment-methods">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                />
                <span>
                  <strong>UPI</strong>
                  <small>Payment</small>
                </span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                />
                <span>
                  <strong>Credit / Debit Card</strong>
                  <small> Payment</small>
                </span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                />
                <span>
                  <strong>Cash on Arrival</strong>
                  <small>Payment pending</small>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="button button-primary payment-submit"
            >
              {paymentMethod === "cash"
                ? "Submit Booking Request"
                : `Pay ₹${totalAmount.toLocaleString("en-IN")}`}
            </button>

            <p className="demo-disclaimer">
              Demo only: no real payment is processed.
            </p>
          </form>

          <aside className="payment-order-card">
            <span className="eyebrow">BOOKING SUMMARY</span>
            <h2>{bookingType}</h2>

            <div className="payment-price-row">
              <span>Number of guests</span>
              <strong>{guestCount}</strong>
            </div>

            <div className="payment-price-row">
              <span>Price per guest</span>
              <strong>
                ₹{PRICE_PER_PERSON.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="payment-price-row">
              <span>Processing fee</span>
              <strong>₹0</strong>
            </div>

            <div className="payment-total">
              <span>Total amount</span>
              <strong>
                ₹{totalAmount.toLocaleString("en-IN")}
              </strong>
            </div>

            <p className="payment-note">
              The total is calculated from the number of guests.
              This is a demonstration only.
            </p>

            <Link to="/services/events" className="text-link">
              ← Back to Private Events
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Payment;
