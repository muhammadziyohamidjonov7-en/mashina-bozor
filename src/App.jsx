import React, { useMemo, useState } from 'react';
import { ArrowDownWideNarrow, ArrowRight, CheckCircle2, Search, SlidersHorizontal } from 'lucide-react';
import Header from './components/Header.jsx';
import HeroSearch from './components/HeroSearch.jsx';
import CarCard from './components/CarCard.jsx';
import BookingModal from './components/BookingModal.jsx';
import BookingsPanel from './components/BookingsPanel.jsx';
import AddCarForm from './components/AddCarForm.jsx';
import MyListings from './components/MyListings.jsx';
import mockCars from './data/mockData.js';

const categories = ['Barchasi', 'Sedan', 'SUV', 'Elektr', 'Kupe', 'Miniven'];
const initialFilters = {
  category: 'Barchasi',
  maxPrice: 'all',
  sort: 'recommended',
  pickupDate: '',
  returnDate: '',
};

export default function App() {
  const [mode, setMode] = useState('renter');
  const [cars, setCars] = useState(mockCars);
  const [filters, setFilters] = useState(initialFilters);
  const [transmission, setTransmission] = useState('Barchasi');
  const [priceCurrency, setPriceCurrency] = useState('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);
  const [notice, setNotice] = useState('');

  const filteredCars = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    const matches = cars.filter((car) => (
      car.available
      && (filters.category === 'Barchasi' || car.category === filters.category)
      && (transmission === 'Barchasi' || car.transmission === transmission)
      && (priceCurrency === 'Barchasi' || car.currency === priceCurrency)
      && (priceCurrency === 'Barchasi' || filters.maxPrice === 'all' || car.pricePerDay <= Number(filters.maxPrice))
      && (!query || `${car.brand} ${car.name} ${car.location}`.toLocaleLowerCase().includes(query))
    ));

    const comparablePrice = (car) => car.currency === 'UZS' ? car.pricePerDay / 12500 : car.pricePerDay;
    if (filters.sort === 'price-low') return matches.sort((a, b) => comparablePrice(a) - comparablePrice(b));
    if (filters.sort === 'price-high') return matches.sort((a, b) => comparablePrice(b) - comparablePrice(a));
    return matches;
  }, [cars, filters.category, filters.maxPrice, filters.sort, priceCurrency, searchQuery, transmission]);

  const myListings = cars.filter((car) => car.ownerListing);

  function addCar(car) {
    setCars((current) => [car, ...current]);
    setNotice(`${car.brand} ${car.name} e’loni muvaffaqiyatli joylandi!`);
    window.setTimeout(() => setNotice(''), 4000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toggleAvailability(id) {
    setCars((current) => current.map((car) => (
      car.id === id ? { ...car, available: !car.available } : car
    )));
  }

  function deleteListing(id) {
    setCars((current) => current.filter((car) => car.id !== id));
  }

  function confirmBooking(customer) {
    const booking = { id: `${Date.now()}-${selectedCar.id}`, car: selectedCar, ...customer };
    setBookings((current) => [booking, ...current]);
    setCars((current) => current.map((car) => (
      car.id === selectedCar.id ? { ...car, available: false } : car
    )));
    setSelectedCar(null);
    setNotice(`${selectedCar.brand} ${selectedCar.name} muvaffaqiyatli band qilindi!`);
    window.setTimeout(() => setNotice(''), 4000);
  }

  function cancelBooking(id) {
    const booking = bookings.find((item) => item.id === id);
    const remainingBookings = bookings.filter((item) => item.id !== id);
    setBookings(remainingBookings);
    if (booking) {
      setCars((current) => current.map((car) => (
        car.id === booking.car.id
          ? { ...car, available: !remainingBookings.some((item) => item.car.id === car.id) }
          : car
      )));
    }
  }

  function scrollToCars() {
    document.getElementById('cars')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <Header
        bookingCount={bookings.length}
        onBookingsClick={() => setShowBookings(true)}
        mode={mode}
        onModeChange={setMode}
      />
      <main>
        {mode === 'renter' ? (
          <>
            <HeroSearch filters={filters} onFilterChange={setFilters} onSearch={scrollToCars} />
            <section className="fleet-section" id="cars">
              <div className="section-topline">
                <div>
                  <p className="section-eyebrow">SIZ UCHUN TANLADIK</p>
                  <h2>Orzuingizdagi avtomobil</h2>
                  <p className="section-description">Har bir sayohatga mos, sinchkovlik bilan tanlangan avtomobillar.</p>
                </div>
                <div className="sort-control">
                  <ArrowDownWideNarrow size={17} />
                  <label htmlFor="sort-order">Saralash:</label>
                  <select id="sort-order" value={filters.sort} onChange={(event) => setFilters((current) => ({ ...current, sort: event.target.value }))}>
                    <option value="recommended">Tavsiya etilgan</option>
                    <option value="price-low">Narx: arzondan qimmatga</option>
                    <option value="price-high">Narx: qimmatdan arzonga</option>
                  </select>
                </div>
              </div>
              <div className="fleet-toolbar">
                <div className="category-tabs" aria-label="Avtomobil turini tanlang">
                  {categories.map((category) => (
                    <button
                      className={`category-tab${filters.category === category ? ' selected' : ''}`}
                      key={category}
                      onClick={() => setFilters((current) => ({ ...current, category }))}
                    >{category}</button>
                  ))}
                </div>
                <div className="renter-filters">
                  <label className="filter-select"><SlidersHorizontal size={15} /><span>Uzatma</span>
                    <select value={transmission} onChange={(event) => setTransmission(event.target.value)}><option>Barchasi</option><option>Avtomat</option><option>Mexanika</option></select>
                  </label>
                  <label className="filter-select"><span>Valyuta</span>
                    <select value={priceCurrency} onChange={(event) => {
                      setPriceCurrency(event.target.value);
                      setFilters((current) => ({ ...current, maxPrice: 'all' }));
                    }}><option value="Barchasi">Barchasi</option><option value="USD">USD</option><option value="UZS">UZS</option></select>
                  </label>
                  <label className="price-filter"><span>Eng yuqori narx:</span>
                    <select value={filters.maxPrice} onChange={(event) => setFilters((current) => ({ ...current, maxPrice: event.target.value }))}>
                      <option value="all">Barchasi</option>
                      {priceCurrency === 'UZS' ? <><option value="500000">500 ming so‘mgacha</option><option value="1000000">1 mln so‘mgacha</option><option value="1500000">1,5 mln so‘mgacha</option></> : <><option value="60">$60 gacha</option><option value="80">$80 gacha</option><option value="100">$100 gacha</option></>}
                    </select>
                  </label>
                </div>
              </div>
              <label className="fleet-search"><Search size={17} /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Mashina, brend yoki shahar bo‘yicha qidirish..." /></label>
              {filteredCars.length > 0 ? (
                <div className="car-grid">
                  {filteredCars.map((car) => <CarCard key={car.id} car={car} onBook={setSelectedCar} />)}
                </div>
              ) : (
                <div className="no-results">
                  <div className="empty-icon"><SlidersHorizontal size={23} /></div>
                  <h3>Mos avtomobil topilmadi</h3>
                  <p>Filterlarni o‘zgartirib, qayta urinib ko‘ring.</p>
                  <button className="text-button" onClick={() => {
                    setFilters(initialFilters);
                    setTransmission('Barchasi');
                    setPriceCurrency('Barchasi');
                    setSearchQuery('');
                  }}>Filterlarni tozalash <ArrowRight size={15} /></button>
                </div>
              )}
            </section>
            <section className="steps-section" id="how-it-works">
              <div className="steps-heading"><p className="section-eyebrow">BIR NECHA QADAMDA</p><h2>Yo‘lga chiqish juda oson</h2></div>
              <div className="steps-grid">
                <article className="step-card"><span className="step-number">01</span><h3>Mashinani tanlang</h3><p>Keng tanlovimizdan safaringizga mos avtomobilni toping.</p></article>
                <article className="step-card"><span className="step-number">02</span><h3>Band qiling</h3><p>Ma’lumotlaringizni kiriting va band qilishni tasdiqlang.</p></article>
                <article className="step-card"><span className="step-number">03</span><h3>Safardan zavqlaning</h3><p>Belgilangan vaqtda mashinangizni olib, yo‘lga chiqing.</p></article>
              </div>
            </section>
            <section className="cta-banner">
              <div><p className="section-eyebrow">SARGUZASHT BOSHLANADI</p><h2>Keyingi manzilingiz qayer?</h2><p>Mashinani tanlang — qolganini biz hal qilamiz.</p></div>
              <button onClick={scrollToCars}>Mashinani tanlash <ArrowRight size={17} /></button>
            </section>
          </>
        ) : (
          <section className="host-page">
            <div className="host-hero">
              <p className="section-eyebrow">HOST PANELI</p>
              <h1>Mashinangiz sizga<br /><span>daromad olib kelsin.</span></h1>
              <p>Avtomobilingizni ijaraga bering va har bir safardan daromad oling.</p>
            </div>
            <AddCarForm onAddCar={addCar} />
            <MyListings cars={myListings} onToggleAvailability={toggleAvailability} onDelete={deleteListing} />
          </section>
        )}
      </main>
      <footer className="site-footer"><a className="brand" href="#top"><span className="brand-mark"><span>✦</span></span><span>drive<span className="brand-accent">now</span></span></a><p>© 2025 DriveNow. Safaringiz xayrli bo‘lsin.</p></footer>

      {selectedCar && <BookingModal car={selectedCar} onClose={() => setSelectedCar(null)} onConfirm={confirmBooking} />}
      {showBookings && <BookingsPanel bookings={bookings} onCancel={cancelBooking} onClose={() => setShowBookings(false)} />}
      {notice && <div className="toast" role="status"><CheckCircle2 size={20} /> {notice}</div>}
    </>
  );
}
