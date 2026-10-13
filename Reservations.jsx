
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import ReservationForm from "../components/ReservationForm";
import { useToast } from "../context/ToastContext";

import {
  addReservation,
  updateReservation,
  deleteReservation,
} from "../redux/reservationSlice";

function Reservations() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const reservations = useSelector(
    (state) => state.reservations.items
  );

  const bookingType =
    location.state?.bookingType || "Table Reservation";

  const [editingReservation, setEditingReservation] = useState(null);

  function handleSubmit(formData) {
    // Editing an existing booking still updates Redux directly.
    if (editingReservation) {
      try {
        dispatch(
          updateReservation({
            ...formData,
            id: editingReservation.id,
          })
        );

        setEditingReservation(null);
        showToast("Reservation updated successfully!");
      } catch {
        showToast("Unable to update reservation.", "error");
      }

      return;
    }

    // A new booking proceeds to payment without being saved yet.
    navigate("/demo-payment", {
      state: {
        ...formData,
        bookingType,
      },
    });
  }

  function handleEdit(reservation) {
    setEditingReservation(reservation);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this reservation?"
    );

    if (!confirmed) return;

    try {
      dispatch(deleteReservation(id));

      if (editingReservation?.id === id) {
        setEditingReservation(null);
      }

      showToast("Reservation deleted successfully!");
    } catch {
      showToast("Unable to delete reservation.", "error");
    }
  }

  return (
    <div className="container page-section">
      <div className="page-heading">
        <span className="eyebrow">YOUR TABLE AWAITS</span>
        <h1>
          {bookingType === "Private Event"
            ? "Reserve Your Private Event"
            : "Reservations"}
        </h1>

        <p>
          Choose your date and time, check availability, and continue
          to payment when your selected slot is available.
        </p>
      </div>

      <ReservationForm
        editingReservation={editingReservation}
        reservations={reservations}
        onSubmit={handleSubmit}
        onCancel={() => setEditingReservation(null)}
      />

      <section className="reservations-list-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR BOOKINGS</span>
            <h2>Reservation records</h2>
          </div>

          <span className="record-count">
            {reservations.length}{" "}
            {reservations.length === 1 ? "booking" : "bookings"}
          </span>
        </div>

        {reservations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">♧</div>
            <h3>No reservations yet</h3>
            <p>
              Completed demo bookings will appear here.
            </p>
          </div>
        ) : (
          <div className="reservation-list">
            {reservations.map((reservation) => (
              <article
                className="reservation-card"
                key={reservation.id}
              >
                <div className="reservation-date-block">
                  <span>DATE</span>
                  <strong>{reservation.date}</strong>
                  <span>{reservation.time}</span>
                </div>

                <div className="reservation-info">
                  <h3>{reservation.name}</h3>
                  <p>{reservation.email}</p>
                  <p>{reservation.phone}</p>

                  <p>
                    {reservation.guests}{" "}
                    {Number(reservation.guests) === 1
                      ? "guest"
                      : "guests"}
                  </p>

                  {reservation.bookingType && (
                    <p>{reservation.bookingType}</p>
                  )}

                  {reservation.notes && (
                    <p className="reservation-notes">
                      Request: {reservation.notes}
                    </p>
                  )}
                </div>

                <div className="reservation-actions">
                  <button
                    type="button"
                    className="button button-outline small-button"
                    onClick={() => handleEdit(reservation)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="button button-danger small-button"
                    onClick={() => handleDelete(reservation.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Reservations;
