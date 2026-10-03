import React, { useEffect, useState } from 'react';
import { CalendarDays, CarFront, Check, Phone, UserRound, X } from 'lucide-react';

export default function BookingModal({ car, onClose, onConfirm }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [days, setDays] = useState(1);
  const total = car.pricePerDay * Number(days || 0);
  const currency = car.currency === 'UZS' ? 'so‘m' : 'USD';
  const formatPrice = (amount) => `${currency === 'USD' ? '$' : ''}${amount.toLocaleString('uz-UZ')}${currency === 'UZS' ? ` ${currency}` : ''}`;

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  function submit(event) {
    event.preventDefault();
    onConfirm({ name: name.trim(), phone: phone.trim(), days: Number(days), total });
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <button className="modal-close" onClick={onClose} aria-label="Yopish"><X size={20} /></button>
        <div className="modal-kicker"><CarFront size={16} /> AVTOMOBIL BAND QILISH</div>
        <h2 id="booking-title">Safaringizni rejalashtiring</h2>
        <div className="modal-car">
          <img src={car.image} alt={car.imageAlt} />
          <div><strong>{car.brand} {car.name}</strong><span>{formatPrice(car.pricePerDay)} / kun</span></div>
        </div>
        <form onSubmit={submit}>
          <label className="form-label" htmlFor="customer-name">Ism-familiya</label>
          <div className="form-input-wrap">
            <UserRound size={17} />
            <input id="customer-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Ismingizni kiriting" required />
          </div>
          <label className="form-label" htmlFor="customer-phone">Telefon raqami</label>
          <div className="form-input-wrap">
            <Phone size={17} />
            <input id="customer-phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+998 90 123 45 67" required />
          </div>
          <label className="form-label" htmlFor="rental-days">Ijara muddati</label>
          <div className="form-input-wrap">
            <CalendarDays size={17} />
            <input id="rental-days" type="number" min="1" max="90" value={days} onChange={(event) => setDays(event.target.value)} required />
            <span className="input-suffix">kun</span>
          </div>
          <div className="modal-total"><span>Umumiy summa</span><strong>{formatPrice(total)}</strong></div>
          <button className="confirm-button" type="submit"><Check size={18} /> Band qilishni tasdiqlash</button>
        </form>
        <p className="modal-note">Hozircha to‘lov olinmaydi. Buyurtmangizni keyinroq tasdiqlashingiz mumkin.</p>
      </section>
    </div>
  );
}
