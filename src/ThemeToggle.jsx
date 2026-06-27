import React, { useContext } from 'react';
import styles from './ThemeToggle.module.css';
import { ThemeContext } from '../ThemeContext/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      type="button"
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className={styles.icon}>{isDark ? '☀️' : '🌙'}</span>
      <span className={styles.label}>{isDark ? 'Light' : 'Dark'}</span>
    </button>
  );
}
