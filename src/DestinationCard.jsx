import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DestinationCard.module.css';

function renderStars(rating) {
  const full    = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const empty   = 5 - full - (hasHalf ? 1 : 0);
  return (
    <span className={styles.stars}>
      {'★'.repeat(full)}
      {hasHalf ? '½' : ''}
      {'☆'.repeat(empty)}
    </span>
  );
}

export default function DestinationCard({ destination: dest }) {
  return (
    <div className={styles.card}>
      {/* ── Image ── */}
      <div className={styles.imageWrapper}>
        <img src={dest.image} alt={dest.name} className={styles.image} />
        <div className={styles.imageOverlay} />
        <span className={styles.flag}>{dest.flag}</span>
        <span className={styles.price}>From ${dest.price}</span>
      </div>

      {/* ── Body ── */}
      <div className={styles.body}>
        <div className={styles.top}>
          <h3 className={styles.name}>{dest.name}</h3>
          <span className={styles.country}>
            <i className="fas fa-map-marker-alt" /> {dest.country}
          </span>
        </div>

        <p className={styles.desc}>{dest.description.slice(0, 100)}...</p>

        <div className={styles.meta}>
          <span className={styles.rating}>
            {renderStars(dest.rating)} {dest.rating}
            <span className={styles.reviewCount}>({dest.reviews.toLocaleString()})</span>
          </span>
          <span className={styles.duration}>
            <i className="fas fa-clock" /> {dest.duration}
          </span>
        </div>

        <Link to={`/destination/${dest.id}`} className={styles.btn}>
          Explore <i className="fas fa-arrow-right" />
        </Link>
      </div>

      {/* ── Postcard stamp ── */}
      <div className={styles.stamp}>
        <span>{dest.flag}</span>
      </div>
    </div>
  );
}
