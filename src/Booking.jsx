import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Booking.module.css';
import { AuthContext } from '../AuthContext/AuthContext';
import { NotificationContext } from '../NotificationContext/NotificationContext';

const DESTINATIONS = [
  'Cairo, Egypt (CAI)',
  'Sharm El Sheikh, Egypt (SSH)',
  'Hurghada, Egypt (HRG)',
  'Alexandria, Egypt (HBE)',
  'Dahab, Egypt',
  'Ain Sokhna, Egypt',
  'Maldives (MLE)',
  'Bali, Indonesia (DPS)',
  'Santorini, Greece (JTR)',
  'Phuket, Thailand (HKT)',
  'Zanzibar, Tanzania (ZNZ)',
];

const HOTEL_STARS = ['Any', '3 Stars', '4 Stars', '5 Stars'];

const initialFlight = {
  from: '',
  to: '',
  departDate: '',
  returnDate: '',
  passengers: '1',
  flightClass: 'Economy',
};

const initialHotel = {
  destination: '',
  checkIn: '',
  checkOut: '',
  rooms: '1',
  guests: '1',
  stars: 'Any',
};

const initialPayment = {
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
};

const initialPaymentTouched = {
  cardName: false,
  cardNumber: false,
  expiry: false,
  cvv: false,
};

const onlyDigits = (value) => value.replace(/\D/g, '');

const formatCardNumber = (value) =>
  onlyDigits(value)
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();

const formatExpiry = (value) => {
  const digits = onlyDigits(value).slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

const getPaymentErrors = (paymentData) => {
  const errors = {};
  const cardDigits = onlyDigits(paymentData.cardNumber);
  const expiryParts = paymentData.expiry.split('/');
  const expiryMonth = Number.parseInt(expiryParts[0], 10);

  if (paymentData.cardName.trim().split(/\s+/).filter(Boolean).length < 2) {
    errors.cardName = 'Write the card holder full name.';
  }

  if (cardDigits.length !== 16) {
    errors.cardNumber = 'Card number must be exactly 16 digits.';
  }

  if (!/^\d{2}\/\d{2}$/.test(paymentData.expiry) || expiryMonth < 1 || expiryMonth > 12) {
    errors.expiry = 'Use a valid expiry date like 08/29.';
  }

  if (!/^\d{3,4}$/.test(paymentData.cvv)) {
    errors.cvv = 'CVV must be 3 or 4 digits.';
  }

  return errors;
};

export default function Booking() {
  const [activeTab, setActiveTab] = useState('flight');
  const [flight, setFlight] = useState(initialFlight);
  const [hotel, setHotel] = useState(initialHotel);
  const [payment, setPayment] = useState(initialPayment);
  const [paymentTouched, setPaymentTouched] = useState(initialPaymentTouched);
  const [isPaymentStep, setIsPaymentStep] = useState(false);
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketInfo, setTicketInfo] = useState({ flightNumber: 'TE-2026', ref: 'TE2026' });

  const { isLoggedIn } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const handleFlightChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };

  const handleHotelChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    let nextValue = value;

    if (name === 'cardNumber') nextValue = formatCardNumber(value);
    if (name === 'expiry') nextValue = formatExpiry(value);
    if (name === 'cvv') nextValue = onlyDigits(value).slice(0, 4);

    setPayment({ ...payment, [name]: nextValue });
  };

  const handlePaymentBlur = (e) => {
    setPaymentTouched({ ...paymentTouched, [e.target.name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setShowAuthGate(true);
      showNotification({
        type: 'info',
        title: 'Sign in required',
        message: 'Please log in or create an account to secure your reservation.',
      });
      return;
    }

    setIsPaymentStep(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const errors = getPaymentErrors(payment);
    setPaymentTouched({
      cardName: true,
      cardNumber: true,
      expiry: true,
      cvv: true,
    });

    if (Object.keys(errors).length > 0) return;

    setIsPaymentStep(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTicketInfo({
        flightNumber: `TE-${Math.floor(1000 + Math.random() * 9000)}`,
        ref: `TE${Date.now().toString().slice(-6)}`,
      });
      setIsConfirmed(true);
    }, 2000);
  };

  const handleNewBooking = () => {
    setIsConfirmed(false);
    setIsPaymentStep(false);
    setShowAuthGate(false);
    setIsLoading(false);
    setFlight(initialFlight);
    setHotel(initialHotel);
    setPayment(initialPayment);
    setPaymentTouched(initialPaymentTouched);
    setTicketInfo({ flightNumber: 'TE-2026', ref: 'TE2026' });
    setActiveTab('flight');
  };

  const selectedDestination = activeTab === 'flight' ? flight.to : hotel.destination;
  const selectedDate = activeTab === 'flight' ? flight.departDate : hotel.checkIn;
  const selectedCount = activeTab === 'flight' ? Number.parseInt(flight.passengers, 10) || 1 : Number.parseInt(hotel.guests, 10) || 1;
  const basePrice = activeTab === 'flight' ? 320 : 180;
  const serviceFee = 29;
  const totalPrice = basePrice * selectedCount + serviceFee;
  const paymentErrors = getPaymentErrors(payment);
  const isPaymentValid = Object.keys(paymentErrors).length === 0;
  const showPaymentError = (field) => paymentTouched[field] && paymentErrors[field];

  /* ── Boarding-Pass Confirmation Screen ── */
  if (isConfirmed) {
    const dest = selectedDestination;
    const date = selectedDate;

    return (
      <div className={styles.confirmWrapper}>
        <div className={styles.confirmTicket}>
          <div className={styles.ticketLeft}>
            <div className={styles.ticketAirline}>TRAVEL EXPLORER</div>
            <div className={styles.ticketRoute}>
              <div className={styles.ticketCode}>
                {activeTab === 'flight' ? (flight.from.slice(0, 3).toUpperCase() || 'HGA') : 'HGA'}
              </div>
              <div className={styles.ticketPlane}>✈</div>
              <div className={styles.ticketCode}>
                {dest.slice(0, 3).toUpperCase() || 'DST'}
              </div>
            </div>
            <div className={styles.ticketDetail}>
              <span>DATE</span>
              <strong>{date || '—'}</strong>
            </div>
            <div className={styles.ticketDetail}>
              <span>CLASS</span>
              <strong>{activeTab === 'flight' ? flight.flightClass : 'Standard'}</strong>
            </div>
            <div className={styles.ticketDetail}>
              <span>FLIGHT</span>
              <strong>{ticketInfo.flightNumber}</strong>
            </div>
          </div>

          <div className={styles.ticketTear} />

          <div className={styles.ticketRight}>
            <div className={styles.ticketStatus}>CONFIRMED ✓</div>
            <div className={styles.ticketDest}>{dest || 'Your Destination'}</div>
            <div className={styles.ticketSeat}>SEAT 12A · GATE G-04</div>
            <div className={styles.ticketBarcode} />
            <div className={styles.ticketBarcodeLabel}>REF: {ticketInfo.ref}</div>
          </div>
        </div>

        <div className={styles.confirmActions}>
          <p className={styles.confirmMsg}>
            🎉 Your booking request has been received! Our team will contact you shortly.
          </p>
          <div className={styles.confirmBtns}>
            <button onClick={handleNewBooking} className={styles.newBookingBtn}>
              Book Another Trip
            </button>
            <button onClick={() => navigate('/')} className={styles.homeBtn}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Payment Screen ── */
  if (isPaymentStep) {
    return (
      <div className={styles.paymentWrapper}>
        <div className={styles.paymentCard}>
          <div className={styles.paymentHeader}>
            <button className={styles.backToBookingBtn} onClick={() => setIsPaymentStep(false)} type="button">
              <i className="fas fa-arrow-left" /> Back
            </button>
            <span className={styles.secureBadge}>
              <i className="fas fa-lock" /> Secure Mock Payment
            </span>
          </div>

          <div className={styles.paymentGrid}>
            <div className={styles.summaryPanel}>
              <span className={styles.summaryLabel}>ORDER SUMMARY</span>
              <h2>{activeTab === 'flight' ? 'Flight Reservation' : 'Hotel Reservation'}</h2>
              <div className={styles.summaryRoute}>
                <span>{activeTab === 'flight' ? (flight.from || 'Departure') : 'HGA'}</span>
                <i className="fas fa-plane" />
                <span>{selectedDestination || 'Destination'}</span>
              </div>

              <div className={styles.summaryRows}>
                <div><span>Date</span><strong>{selectedDate || 'Not selected'}</strong></div>
                <div><span>{activeTab === 'flight' ? 'Passengers' : 'Guests'}</span><strong>{selectedCount}</strong></div>
                <div><span>Base price</span><strong>${basePrice} × {selectedCount}</strong></div>
                <div><span>Service fee</span><strong>${serviceFee}</strong></div>
              </div>

              <div className={styles.totalRow}>
                <span>Total</span>
                <strong>${totalPrice}</strong>
              </div>
            </div>

            <form className={styles.paymentForm} onSubmit={handlePaymentSubmit}>
              <h3>Payment Details</h3>
              <p>This is a frontend-only demo payment. No real card is charged.</p>

              <div className={styles.cardPreview}>
                <div className={styles.cardPreviewTop}>
                  <span>TRAVEL EXPLORER</span>
                  <i className="fas fa-credit-card" />
                </div>
                <div className={styles.previewNumber}>
                  {payment.cardNumber || '•••• •••• •••• ••••'}
                </div>
                <div className={styles.cardPreviewBottom}>
                  <div>
                    <small>CARD HOLDER</small>
                    <strong>{payment.cardName || 'YOUR NAME'}</strong>
                  </div>
                  <div>
                    <small>EXPIRY</small>
                    <strong>{payment.expiry || 'MM/YY'}</strong>
                  </div>
                </div>
              </div>

              <div className={styles.payField}>
                <label>CARD HOLDER</label>
                <input
                  name="cardName"
                  type="text"
                  value={payment.cardName}
                  onChange={handlePaymentChange}
                  onBlur={handlePaymentBlur}
                  placeholder="e.g. Rahaf Adel Mohamed Fahmi"
                  className={showPaymentError('cardName') ? styles.payInputError : ''}
                  required
                />
                {showPaymentError('cardName') && (
                  <small className={styles.payError}>{paymentErrors.cardName}</small>
                )}
              </div>

              <div className={styles.payField}>
                <label>CARD NUMBER</label>
                <input
                  name="cardNumber"
                  type="text"
                  inputMode="numeric"
                  value={payment.cardNumber}
                  onChange={handlePaymentChange}
                  onBlur={handlePaymentBlur}
                  placeholder="4242 4242 4242 4242"
                  maxLength="19"
                  className={showPaymentError('cardNumber') ? styles.payInputError : ''}
                  required
                />
                {showPaymentError('cardNumber') && (
                  <small className={styles.payError}>{paymentErrors.cardNumber}</small>
                )}
              </div>

              <div className={styles.payGrid}>
                <div className={styles.payField}>
                  <label>EXPIRY</label>
                  <input
                    name="expiry"
                    type="text"
                    value={payment.expiry}
                    onChange={handlePaymentChange}
                    onBlur={handlePaymentBlur}
                    placeholder="MM/YY"
                    maxLength="5"
                    className={showPaymentError('expiry') ? styles.payInputError : ''}
                    required
                  />
                  {showPaymentError('expiry') && (
                    <small className={styles.payError}>{paymentErrors.expiry}</small>
                  )}
                </div>

                <div className={styles.payField}>
                  <label>CVV</label>
                  <input
                    name="cvv"
                    type="password"
                    inputMode="numeric"
                    value={payment.cvv}
                    onChange={handlePaymentChange}
                    onBlur={handlePaymentBlur}
                    placeholder="123"
                    maxLength="4"
                    className={showPaymentError('cvv') ? styles.payInputError : ''}
                    required
                  />
                  {showPaymentError('cvv') && (
                    <small className={styles.payError}>{paymentErrors.cvv}</small>
                  )}
                </div>
              </div>

              <div className={styles.paymentChecklist}>
                <span className={!paymentErrors.cardName ? styles.validCheck : ''}>
                  <i className={`fas ${!paymentErrors.cardName ? 'fa-check-circle' : 'fa-circle'}`} /> Name
                </span>
                <span className={!paymentErrors.cardNumber ? styles.validCheck : ''}>
                  <i className={`fas ${!paymentErrors.cardNumber ? 'fa-check-circle' : 'fa-circle'}`} /> 16-digit card
                </span>
                <span className={!paymentErrors.expiry ? styles.validCheck : ''}>
                  <i className={`fas ${!paymentErrors.expiry ? 'fa-check-circle' : 'fa-circle'}`} /> Expiry
                </span>
                <span className={!paymentErrors.cvv ? styles.validCheck : ''}>
                  <i className={`fas ${!paymentErrors.cvv ? 'fa-check-circle' : 'fa-circle'}`} /> CVV
                </span>
              </div>

              <button className={styles.payNowBtn} type="submit" disabled={!isPaymentValid}>
                <i className="fas fa-credit-card" /> Pay ${totalPrice} & Issue Ticket
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /* ── Loading Screen ── */
  if (isLoading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loadingCard}>
          <div className={styles.loadingPlane}>✈️</div>
          <h3>Processing Payment...</h3>
          <p>Verifying payment and preparing your ticket.</p>
          <div className={styles.loadingBar}><div className={styles.loadingBarFill} /></div>
        </div>
      </div>
    );
  }

  /* ── Main Booking Kiosk ── */
  return (
    <div className={styles.kioskWrapper}>

      {/* ── Airport Header ── */}
      <div className={styles.kioskHeader}>
        <div className={styles.headerGlow} />
        <div className={styles.headerContent}>
          <div className={styles.headerIcon}>🛫</div>
          <h1 className={styles.headerTitle}>BOOKING TERMINAL</h1>
          <p className={styles.headerSub}>Flight & Hotel — TE-2026 CHECK-IN SYSTEM</p>
        </div>
        {/* Scrolling departures board */}
        <div className={styles.departureBoard}>
          <span>DEPARTURES &nbsp;✦&nbsp; CAIRO &nbsp;✈&nbsp; SHARM &nbsp;✈&nbsp; BALI &nbsp;✈&nbsp; MALDIVES &nbsp;✈&nbsp; SANTORINI &nbsp;✈&nbsp; PHUKET &nbsp;✈&nbsp; DAHAB &nbsp;✦&nbsp; DEPARTURES</span>
        </div>
      </div>

      {/* ── Kiosk Screen ── */}
      <div className={styles.kioskScreen}>

        {/* Tab selector */}
        <div className={styles.tabRow}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'flight' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('flight')}
          >
            ✈️ Flight
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'hotel' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('hotel')}
          >
            🏨 Hotel
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>

          {/* ── FLIGHT FORM ── */}
          {activeTab === 'flight' && (
            <div className={styles.formGrid}>
              <div className={styles.fieldGroup}>
                <label>FROM</label>
                <input
                  name="from"
                  type="text"
                  value={flight.from}
                  onChange={handleFlightChange}
                  placeholder="Departure city or airport..."
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label>TO</label>
                <select name="to" value={flight.to} onChange={handleFlightChange} required>
                  <option value="">Select destination...</option>
                  {DESTINATIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label>DEPART DATE</label>
                <input
                  name="departDate"
                  type="date"
                  value={flight.departDate}
                  onChange={handleFlightChange}
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label>RETURN DATE</label>
                <input
                  name="returnDate"
                  type="date"
                  value={flight.returnDate}
                  onChange={handleFlightChange}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label>PASSENGERS</label>
                <select name="passengers" value={flight.passengers} onChange={handleFlightChange}>
                  {['1', '2', '3', '4', '5', '6+'].map((n) => (
                    <option key={n} value={n}>{n} Passenger{n !== '1' ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label>CLASS</label>
                <select name="flightClass" value={flight.flightClass} onChange={handleFlightChange}>
                  {['Economy', 'Business', 'First Class'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* ── HOTEL FORM ── */}
          {activeTab === 'hotel' && (
            <div className={styles.formGrid}>
              <div className={`${styles.fieldGroup} ${styles.fieldFull}`}>
                <label>DESTINATION</label>
                <select name="destination" value={hotel.destination} onChange={handleHotelChange} required>
                  <option value="">Select destination...</option>
                  {DESTINATIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label>CHECK-IN</label>
                <input
                  name="checkIn"
                  type="date"
                  value={hotel.checkIn}
                  onChange={handleHotelChange}
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label>CHECK-OUT</label>
                <input
                  name="checkOut"
                  type="date"
                  value={hotel.checkOut}
                  onChange={handleHotelChange}
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label>ROOMS</label>
                <select name="rooms" value={hotel.rooms} onChange={handleHotelChange}>
                  {['1', '2', '3', '4', '5+'].map((n) => (
                    <option key={n} value={n}>{n} Room{n !== '1' ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label>GUESTS</label>
                <select name="guests" value={hotel.guests} onChange={handleHotelChange}>
                  {['1', '2', '3', '4', '5', '6+'].map((n) => (
                    <option key={n} value={n}>{n} Guest{n !== '1' ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label>HOTEL STARS</label>
                <select name="stars" value={hotel.stars} onChange={handleHotelChange}>
                  {HOTEL_STARS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* ── Booking Gate / Submit ── */}
          {!isLoggedIn ? (
            <div className={`${styles.authGateCard} ${showAuthGate ? styles.authGateCardAttention : ''}`}>
              <div className={styles.authGateIcon}>
                <i className="fas fa-lock" />
              </div>
              <h3>Sign in to Book</h3>
              <p>
                Create an account or log in to secure your reservation
                {activeTab === 'flight' && flight.to ? ` to ${flight.to}.` : '.'}
                {activeTab === 'hotel' && hotel.destination ? ` at ${hotel.destination}.` : ''}
              </p>
              <div className={styles.authGateActions}>
                <Link
                  to="/login"
                  state={{ from: { pathname: '/booking' } }}
                  className={styles.authGatePrimary}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className={styles.authGateSecondary}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          ) : (
            <button type="submit" className={styles.submitBtn}>
              <i className="fas fa-credit-card" />
              CONTINUE TO PAYMENT
            </button>
          )}

        </form>
      </div>
    </div>
  );
}
