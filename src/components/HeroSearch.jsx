import React from 'react';
import { CalendarDays, MapPin, Search, SlidersHorizontal } from 'lucide-react';

export default function HeroSearch({ filters, onFilterChange, onSearch }) {
  function update(field, value) {
    onFilterChange((current) => ({ ...current, [field]: value }));
  }

  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> ERKINLIK SIZNI KUTMOQDA</div>
          <h1>Yo‘lingizni tanlang.<br /><span>Mashinangiz tayyor.</span></h1>
          <p>Har bir safar uchun qulay va ishonchli avtomobilni toping.</p>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-sun" />
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=90"
            alt=""
          />
        </div>
        <div className="search-card">
          <div className="search-field location-field">
            <label htmlFor="location">Olish joyi</label>
            <div className="field-control">
              <MapPin size={18} />
              <input id="location" type="text" value="Toshkent, O‘zbekiston" readOnly />
            </div>
          </div>
          <div className="search-field">
            <label htmlFor="pickup-date">Olish sanasi</label>
            <div className="field-control">
              <CalendarDays size={18} />
              <input
                id="pickup-date"
                type="date"
                value={filters.pickupDate}
                onChange={(event) => update('pickupDate', event.target.value)}
              />
            </div>
          </div>
          <div className="search-field">
            <label htmlFor="return-date">Qaytarish sanasi</label>
            <div className="field-control">
              <CalendarDays size={18} />
              <input
                id="return-date"
                type="date"
                value={filters.returnDate}
                min={filters.pickupDate || undefined}
                onChange={(event) => update('returnDate', event.target.value)}
              />
            </div>
          </div>
          <div className="search-field category-field">
            <label htmlFor="hero-category">Avtomobil turi</label>
            <div className="field-control">
              <SlidersHorizontal size={18} />
              <select
                id="hero-category"
                value={filters.category}
                onChange={(event) => update('category', event.target.value)}
              >
                <option value="Barchasi">Barcha turlar</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Elektr">Elektr</option>
                <option value="Kupe">Kupe</option>
                <option value="Miniven">Miniven</option>
              </select>
            </div>
          </div>
          <button className="search-submit" onClick={onSearch}>
            <Search size={19} />
            <span>Mashina qidirish</span>
          </button>
        </div>
      </div>
    </section>
  );
}
