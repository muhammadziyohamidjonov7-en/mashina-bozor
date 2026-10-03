import React from 'react';
import { CarFront, MapPin, Trash2 } from 'lucide-react';

function formatPrice(car) {
  const amount = Number(car.pricePerDay).toLocaleString('uz-UZ');
  return car.currency === 'USD' ? `$${amount}` : `${amount} so‘m`;
}

export default function MyListings({ cars, onToggleAvailability, onDelete }) {
  return (
    <section className="my-listings">
      <div className="listings-heading">
        <div><p className="section-eyebrow">SIZNING AVTOPARKINGIZ</p><h2>Mening e’lonlarim</h2></div>
        <span className="listing-count">{cars.length} ta e’lon</span>
      </div>
      {cars.length === 0 ? (
        <div className="listings-empty"><span className="form-icon"><CarFront size={21} /></span><h3>Hozircha e’lon yo‘q</h3><p>Birinchi avtomobilingizni ijaraga berish uchun yuqoridagi formani to‘ldiring.</p></div>
      ) : (
        <div className="listing-grid">
          {cars.map((car) => (
            <article className="listing-card" key={car.id}>
              <img src={car.image} alt={car.imageAlt} />
              <div className="listing-card-content">
                <div className="listing-title-row"><div><span>{car.brand} · {car.year}</span><h3>{car.name}</h3></div><span className={`availability ${car.available ? 'is-available' : 'is-booked'}`}>{car.available ? 'Bo‘sh' : 'Band'}</span></div>
                <p className="listing-location"><MapPin size={14} /> {car.location}</p>
                <strong className="listing-price">{formatPrice(car)} <small>/ kun</small></strong>
                <div className="listing-actions">
                  <button className={`availability-button ${car.available ? '' : 'make-available'}`} onClick={() => onToggleAvailability(car.id)}>
                    {car.available ? 'Band deb belgilash' : 'Bo‘sh deb belgilash'}
                  </button>
                  <button className="delete-listing" onClick={() => onDelete(car.id)} aria-label={`${car.name} e’lonini o‘chirish`}><Trash2 size={16} /></button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
