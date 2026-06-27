import React from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange, placeholder = 'Search destination or country...' }) {
  return (
    <div className={styles.searchBox}>
      <i className="fas fa-search" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className={styles.clearBtn} onClick={() => onChange('')} aria-label="Clear search">
          <i className="fas fa-times" />
        </button>
      )}
    </div>
  );
}
