import React, { useState } from 'react';
import { CarFront, ImagePlus, MapPin, Phone, Plus, UserRound } from 'lucide-react';

const emptyCar = {
  name: '',
  brand: '',
  year: String(new Date().getFullYear()),
  category: 'Sedan',
  pricePerDay: '',
  currency: 'UZS',
  transmission: 'Avtomat',
  fuel: 'Benzin',
  image: '',
  location: '',
  phone: '',
};

export default function AddCarForm({ onAddCar }) {
  const [form, setForm] = useState(emptyCar);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    onAddCar({
      ...form,
      id: `host-${Date.now()}`,
      year: Number(form.year),
      pricePerDay: Number(form.pricePerDay),
      seats: 5,
      rating: 5,
      available: true,
      ownerListing: true,
      imageAlt: `${form.brand} ${form.name} avtomobili`,
      badge: 'Yangi e’lon',
    });
    setForm(emptyCar);
  }

  return (
    <form className="host-form" onSubmit={submit}>
      <div className="form-section-heading">
        <span className="form-icon"><CarFront size={20} /></span>
        <div><h3>Avtomobil ma’lumotlari</h3><p>E’loningizni ko‘rkam va to‘liq qiling</p></div>
      </div>
      <div className="host-form-grid">
        <label className="host-field">Mashina nomi
          <input value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Masalan, Malibu 2" required />
        </label>
        <label className="host-field">Brend
          <input value={form.brand} onChange={(event) => update('brand', event.target.value)} placeholder="Masalan, Chevrolet" required />
        </label>
        <label className="host-field">Ishlab chiqarilgan yil
          <input type="number" min="1980" max={new Date().getFullYear() + 1} value={form.year} onChange={(event) => update('year', event.target.value)} required />
        </label>
        <label className="host-field">Avtomobil turi
          <select value={form.category} onChange={(event) => update('category', event.target.value)}>
            <option>Sedan</option><option>SUV</option><option>Elektr</option><option>Kupe</option><option>Miniven</option>
          </select>
        </label>
        <div className="host-field">Kunlik ijara narxi
          <div className="price-input-row">
            <input aria-label="Kunlik ijara narxi" type="number" min="1" value={form.pricePerDay} onChange={(event) => update('pricePerDay', event.target.value)} placeholder="Narxni kiriting" required />
            <select aria-label="Valyuta" value={form.currency} onChange={(event) => update('currency', event.target.value)}><option value="UZS">UZS</option><option value="USD">USD</option></select>
          </div>
        </div>
        <label className="host-field">Uzatmalar qutisi
          <select value={form.transmission} onChange={(event) => update('transmission', event.target.value)}><option>Avtomat</option><option>Mexanika</option></select>
        </label>
        <label className="host-field">Yoqilg‘i turi
          <select value={form.fuel} onChange={(event) => update('fuel', event.target.value)}><option>Benzin</option><option>Gaz</option><option>Elektromobil</option><option>Gibrid</option></select>
        </label>
        <label className="host-field">Shahar / tuman
          <span className="host-input-icon"><MapPin size={16} /><input value={form.location} onChange={(event) => update('location', event.target.value)} placeholder="Toshkent, Yunusobod" required /></span>
        </label>
        <label className="host-field">Rasm URL manzili
          <span className="host-input-icon"><ImagePlus size={16} /><input type="url" value={form.image} onChange={(event) => update('image', event.target.value)} placeholder="https://..." required /></span>
        </label>
        <label className="host-field">Aloqa uchun telefon
          <span className="host-input-icon"><Phone size={16} /><input type="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} placeholder="+998 90 123 45 67" required /></span>
        </label>
      </div>
      <div className="host-form-footer">
        <p><UserRound size={15} /> E’loningiz darhol umumiy ro‘yxatda ko‘rinadi.</p>
        <button type="submit" className="host-submit"><Plus size={17} /> E’lonni joylash</button>
      </div>
    </form>
  );
}
