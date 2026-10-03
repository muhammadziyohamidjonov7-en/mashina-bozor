import React from 'react';
import { CalendarDays, CarFront, Trash2, X } from 'lucide-react';

export default function BookingsPanel({ bookings, onCancel, onClose }) {
  return (
    <div className="drawer-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <aside className="bookings-drawer" role="dialog" aria-modal="true" aria-labelledby="bookings-title">
        <div className="drawer-header">
          <div><span className="modal-kicker"><CarFront size={15} /> SHAXSIY KABINET</span><h2 id="bookings-title">Buyurtmalarim</h2></div>
          <button className="modal-close" onClick={onClose} aria-label="Yopish"><X size={20} /></button>
        </div>
        {bookings.length === 0 ? (
          <div className="empty-bookings">
            <div className="empty-icon"><CarFront size={25} /></div>
            <h3>Hali buyurtma yo‘q</h3>
            <p>O‘zingizga mos mashinani tanlang va ilk safaringizni rejalashtiring.</p>
            <button className="confirm-button" onClick={onClose}>Mashinalarni ko‘rish</button>
          </div>
        ) : (
          <div className="booking-list">
            {bookings.map((booking) => (
              <article className="booking-item" key={booking.id}>
                <img src={booking.car.image} alt={booking.car.imageAlt} />
                <div className="booking-details">
                  <strong>{booking.car.brand} {booking.car.name}</strong>
                  <span><CalendarDays size={14} /> {booking.days} {booking.days === 1 ? 'kun' : 'kun'}</span>
                  <span className="booking-customer">{booking.name} · ${booking.total.toLocaleString('en-US')}</span>
                  <button className="cancel-button" onClick={() => onCancel(booking.id)}><Trash2 size={14} /> Bekor qilish</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}
