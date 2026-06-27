import React from 'react';
import styles from './Filter.module.css';

const TABS = [
  { value: 'all',           label: '🌍 All Destinations' },
  { value: 'egypt',         label: '🇪🇬 Egypt'           },
  { value: 'international', label: '✈️ International'    },
];

export default function Filter({ active, onChange, resultCount }) {
  return (
    <div className={styles.filterSection}>
      <div className="container">
        <div className={styles.filterTabs}>
          {TABS.map((tab) => (
            <button
              key={tab.value}
              className={`${styles.filterBtn} ${active === tab.value ? styles.filterBtnActive : ''}`}
              onClick={() => onChange(tab.value)}
            >
              {tab.label}
            </button>
          ))}
          <span className={styles.resultCount}>
            {resultCount} destination{resultCount !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>
    </div>
  );
}
