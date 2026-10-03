import React from 'react';
import { CarFront, Menu, Plus, Search, UserRound } from 'lucide-react';

export default function Header({ bookingCount, onBookingsClick, mode, onModeChange }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="DriveNow bosh sahifa">
        <span className="brand-mark"><CarFront size={22} strokeWidth={2.4} /></span>
        <span>drive<span className="brand-accent">now</span></span>
      </a>

      <nav className="desktop-nav" aria-label="Asosiy navigatsiya">
        <button className={`mode-tab${mode === 'renter' ? ' active' : ''}`} onClick={() => onModeChange('renter')}>
          <Search size={15} /> Moshina izlash
        </button>
        <button className={`mode-tab${mode === 'host' ? ' active' : ''}`} onClick={() => onModeChange('host')}>
          <Plus size={15} /> Mashina qo‘shish
        </button>
        {mode === 'renter' && <a className="nav-link" href="#how-it-works">Qanday ishlaydi</a>}
        <button className="nav-link nav-button" onClick={onBookingsClick}>
          Buyurtmalarim
          {bookingCount > 0 && <span className="nav-count">{bookingCount}</span>}
        </button>
      </nav>

      <div className="header-actions">
        <button className="mobile-mode-switch" onClick={() => onModeChange(mode === 'renter' ? 'host' : 'renter')}>
          {mode === 'renter' ? <><Plus size={15} /> Mashina qo‘shish</> : <><Search size={15} /> Moshina izlash</>}
        </button>
        <button className="account-button" onClick={onBookingsClick}>
          <UserRound size={17} />
          <span>Hisobim</span>
        </button>
        <button className="mobile-menu" aria-label="Menyuni ochish">
          <Menu size={22} />
        </button>
      </div>
    </header>
  );
}
