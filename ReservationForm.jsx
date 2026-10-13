
import { useEffect, useState } from "react";

function getToday() {
  const now = new Date();

  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
}

const initialForm = {
  name: "",
  email: "",
  phone: "",
  guests: "2",
  date: "",
  time: "19:00",
  notes: "",
};

function ReservationForm({
  editingReservation,
  reservations = [],
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editingReservation) {
      setForm({
        name: editingReservation.name || "",
        email: editingReservation.email || "",
        phone: editingReservation.phone || "",
        guests: String(editingReservation.guests || "2"),
        date: editingReservation.date || "",
        time: editingReservation.time || "19:00",
        notes: editingReservation.notes || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [editingReservation]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // Ignore the booking being edited when checking its slot.
  const isBooked = reservations.some((reservation) => {
    return (
      reservation.date === form.date &&
      reservation.time === form.time &&
      reservation.id !== editingReservation?.id
    );
  });

  const hasSelectedSlot = Boolean(form.date && form.time);
  const isAvailable = hasSelectedSlot && !isBooked;

  function handleSubmit(event) {
    event.preventDefault();

    if (!isAvailable) {
      return;
    }

    onSubmit({
      ...form,
      guests: Number(form.guests),
    });
  }

  return (
    <form
      className="form-card reservation-form-card"
      onSubmit={handleSubmit}
    >
      <div className="section-heading">
        <div>
          <h2>
            {editingReservation
              ? "Edit Reservation"
              : "Reservation Details"}
          </h2>

          <p>
            Choose a date and time to check slot availability.
          </p>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="reservation-name">Full name *</label>
          <input
            id="reservation-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reservation-email">Email *</label>
          <input
            id="reservation-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reservation-phone">Phone *</label>
          <input
            id="reservation-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reservation-guests">
            Number of guests *
          </label>

          <select
            id="reservation-guests"
            name="guests"
            value={form.guests}
            onChange={handleChange}
            required
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20, 30, 50].map(
              (count) => (
                <option key={count} value={count}>
                  {count} {count === 1 ? "guest" : "guests"}
                </option>
              )
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="reservation-date">Date *</label>
          <input
            id="reservation-date"
            name="date"
            type="date"
            min={getToday()}
            value={form.date}
            onChange={(event) => {
              setForm((previous) => ({
                ...previous,
                date: event.target.value,
              }));
            }}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reservation-time">Time *</label>
          <select
            id="reservation-time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          >
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="18:00">18:00</option>
            <option value="19:00">19:00</option>
            <option value="20:00">20:00</option>
            <option value="21:00">21:00</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label htmlFor="reservation-notes">
            Special requests (optional)
          </label>

          <textarea
            id="reservation-notes"
            name="notes"
            rows="3"
            value={form.notes}
            onChange={handleChange}
            placeholder="Any dietary requirements or special requests?"
          />
        </div>
      </div>

      {hasSelectedSlot && (
        <p
          className={
            isAvailable
              ? "slot-status slot-available"
              : "slot-status slot-unavailable"
          }
          role="status"
        >
          {isAvailable
            ? "✓ This slot is available."
            : "✗ This slot is already booked. Please choose another."}
        </p>
      )}

      {!hasSelectedSlot && (
        <p className="slot-help">
          Select a date and time to check availability.
        </p>
      )}

      <div className="form-actions">
        <button
          type="submit"
          className="button button-primary"
          disabled={!isAvailable}
        >
          {editingReservation
            ? "Update Reservation"
            : "Proceed to Payment"}
        </button>

        {editingReservation && (
          <button
            type="button"
            className="button button-outline"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ReservationForm;
