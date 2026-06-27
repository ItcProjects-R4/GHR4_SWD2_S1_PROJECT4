import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './DestinationDetails.module.css';
import destinations from '../../data/destinations';

export default function DestinationDetails() {
  const { id } = useParams();
  const dest = destinations.find((d) => d.id === parseInt(id));

  if (!dest) {
    return (
      <div className={styles.notFound}>
        <span>🗺️</span>
        <h2>Destination Not Found</h2>
        <Link to="/destinations" className={styles.backBtn}>← Back to Destinations</Link>
      </div>
    );
  }

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    return (
      <>
        {'★'.repeat(full)}
        {hasHalf ? '½' : ''}
        {'☆'.repeat(5 - full - (hasHalf ? 1 : 0))}
      </>
    );
  };

  return (
    <div className={styles.pageWrapper}>

      {/* ── Hero ── */}
      <div className={styles.hero} style={{ backgroundImage: `url(${dest.image})` }}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <Link to="/destinations" className={styles.breadcrumb}>
            ← All Destinations
          </Link>
          <div className={styles.heroFlag}>{dest.flag}</div>
          <h1 className={styles.heroTitle}>{dest.name}</h1>
          <p className={styles.heroCountry}>
            <i className="fas fa-map-marker-alt" /> {dest.country}
          </p>
          <div className={styles.heroRating}>
            <span className={styles.stars}>{renderStars(dest.rating)}</span>
            <span className={styles.ratingNum}>{dest.rating}</span>
            <span className={styles.ratingCount}>({dest.reviews.toLocaleString()} reviews)</span>
          </div>
        </div>
      </div>

      {/* ── Quick Stats Strip ── */}
      <div className={styles.statsStrip}>
        <div className="container">
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <i className="fas fa-dollar-sign" />
              <div>
                <span className={styles.statLabel}>Starting From</span>
                <span className={styles.statValue}>${dest.price} / person</span>
              </div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <i className="fas fa-clock" />
              <div>
                <span className={styles.statLabel}>Ideal Duration</span>
                <span className={styles.statValue}>{dest.duration}</span>
              </div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <i className="fas fa-sun" />
              <div>
                <span className={styles.statLabel}>Weather</span>
                <span className={styles.statValue}>{dest.weather}</span>
              </div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <i className="fas fa-calendar-alt" />
              <div>
                <span className={styles.statLabel}>Best Time to Visit</span>
                <span className={styles.statValue}>{dest.bestTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="container py-5">
        <div className={styles.contentGrid}>

          {/* ── Left: Description + Highlights ── */}
          <div className={styles.leftCol}>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>📖</span> About {dest.name}
              </h2>
              <p className={styles.description}>{dest.description}</p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>⭐</span> Top Highlights
              </h2>
              <div className={styles.highlightsList}>
                {dest.highlights.map((item, i) => (
                  <div key={i} className={styles.highlightItem}>
                    <span className={styles.highlightNum}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={styles.highlightText}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>💡</span> Traveler Tips
              </h2>
              <div className={styles.tipsList}>
                <div className={styles.tipItem}>
                  <i className="fas fa-check-circle" />
                  <span>Book accommodations at least 4–6 weeks in advance during peak season.</span>
                </div>
                <div className={styles.tipItem}>
                  <i className="fas fa-check-circle" />
                  <span>Carry local currency for markets and smaller vendors.</span>
                </div>
                <div className={styles.tipItem}>
                  <i className="fas fa-check-circle" />
                  <span>Always check entry visa requirements before booking your flight.</span>
                </div>
                <div className={styles.tipItem}>
                  <i className="fas fa-check-circle" />
                  <span>Travel insurance is strongly recommended for international trips.</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Booking Card ── */}
          <div className={styles.rightCol}>
            <div className={styles.bookingCard}>
              <div className={styles.bookingCardHeader}>
                <span className={styles.bookingFlag}>{dest.flag}</span>
                <div>
                  <h3 className={styles.bookingDestName}>{dest.name}</h3>
                  <p className={styles.bookingCountry}>{dest.country}</p>
                </div>
              </div>

              <div className={styles.bookingPrice}>
                <span className={styles.priceFrom}>Starting from</span>
                <span className={styles.priceValue}>${dest.price}</span>
                <span className={styles.pricePer}>per person</span>
              </div>

              <div className={styles.bookingDetails}>
                <div className={styles.bookingRow}>
                  <span>Duration</span><strong>{dest.duration}</strong>
                </div>
                <div className={styles.bookingRow}>
                  <span>Weather</span><strong>{dest.weather}</strong>
                </div>
                <div className={styles.bookingRow}>
                  <span>Best Time</span><strong>{dest.bestTime}</strong>
                </div>
                <div className={styles.bookingRow}>
                  <span>Rating</span>
                  <strong className={styles.ratingBadge}>
                    ★ {dest.rating} / 5.0
                  </strong>
                </div>
              </div>

              <Link to="/booking" className={styles.bookNowBtn}>
                Book This Trip <i className="fas fa-plane" />
              </Link>

              <p className={styles.bookingNote}>
                <i className="fas fa-shield-alt" /> Free cancellation within 24 hours
              </p>
            </div>

            {/* Other destinations */}
            <div className={styles.otherCard}>
              <h4 className={styles.otherTitle}>✈️ More Destinations</h4>
              {destinations
                .filter((d) => d.id !== dest.id)
                .slice(0, 4)
                .map((d) => (
                  <Link to={`/destination/${d.id}`} key={d.id} className={styles.otherItem}>
                    <img src={d.image} alt={d.name} className={styles.otherImg} />
                    <div>
                      <span className={styles.otherName}>{d.name}</span>
                      <span className={styles.otherCountry}>{d.flag} {d.country}</span>
                    </div>
                    <span className={styles.otherPrice}>${d.price}</span>
                  </Link>
                ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
