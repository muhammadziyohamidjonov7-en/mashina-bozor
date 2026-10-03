import React from 'react';
import { ArrowUpRight, Fuel, Gauge, MapPin, Star, Users } from 'lucide-react';

export default function CarCard({ car, onBook }) {
  const currencySymbol = car.currency === 'UZS' ? 'so‘m' : '$';

  return (
    <article className="car-card">
      <div className="car-image-wrap">
        <img className="car-image" src={car.image} alt={car.imageAlt} loading="lazy" />
        {car.badge && <span className="car-badge">{car.badge}</span>}
        <span className="rating"><Star size={14} fill="currentColor" /> {car.rating}</span>
        {!car.available && <span className="unavailable-badge">Band</span>}
      </div>
      <div className="car-info">
        <div className="car-heading">
          <div>
            <p className="car-brand">{car.brand}</p>
            <h3>{car.name}</h3>
          </div>
          <span className="car-category">{car.category}</span>
        </div>
        <div className="car-specs">
          <span><Gauge size={15} /> {car.transmission}</span>
          <span><Fuel size={15} /> {car.fuel}</span>
          <span><Users size={15} /> {car.seats} o‘rin</span>
        </div>
        {car.location && <p className="car-location"><MapPin size={13} /> {car.location}{car.year ? ` · ${car.year}` : ''}</p>}
        <div className="car-footer">
          <div className="car-price">
            <strong>{currencySymbol === '$' ? '$' : ''}{Number(car.pricePerDay).toLocaleString('uz-UZ')}{currencySymbol === 'so‘m' ? ` ${currencySymbol}` : ''}</strong><span> / kun</span>
          </div>
          <button className="book-button" onClick={() => onBook(car)} disabled={!car.available}>
            {car.available ? <>Band qilish <ArrowUpRight size={16} /></> : 'Band'}
          </button>
        </div>
      </div>
    </article>
  );
}
