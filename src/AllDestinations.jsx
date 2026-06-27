import React, { useState } from 'react';
import styles from './AllDestinations.module.css';
import destinations from '../../data/destinations';
import SearchBar from '../SearchBar/SearchBar';
import Filter from '../Filter/Filter';
import DestinationCard from '../DestinationCard/DestinationCard';

export default function AllDestinations() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = destinations.filter((d) => {
    const matchesFilter = activeFilter === 'all' || d.category === activeFilter;
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={styles.pageWrapper}>

      {/* ── Hero Banner ── */}
      <div className={styles.heroBanner}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>✈ WHERE DO YOU WANT TO GO?</p>
          <h1 className={styles.heroTitle}>Explore Destinations</h1>
          <p className={styles.heroSub}>Hand-picked beaches, cities and escapes — all in one place.</p>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>

      {/* ── Filter ── */}
      <Filter
        active={activeFilter}
        onChange={setActiveFilter}
        resultCount={filtered.length}
      />

      {/* ── Cards Grid ── */}
      <div className={`${styles.cardsSection} container`}>
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <span>🔍</span>
            <p>No destinations match your search.</p>
          </div>
        ) : (
          <div className={styles.cardsGrid}>
            {filtered.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
