import { useState, useEffect } from 'react';

const TRAVELERS_KEY = 'registeredTravelers';
const SESSION_KEY   = 'currentTraveler';

const isValidFullName = (name) => name.trim().split(/\s+/).filter(Boolean).length >= 4;
const isValidPassword = (password) => password.length >= 8 && /\d/.test(password);

/**
 * useAuth
 * Handles registration, login and logout — all via localStorage.
 * Consistent with the existing Register.jsx and Login.jsx logic.
 *
 * Returns:
 *   user        — { name } | null
 *   isLoggedIn  — boolean
 *   register    — (username, password, destination?) => { success, reason? }
 *   login       — (username, password) => { success, reason? }
 *   logout      — () => void
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Restore session on mount
  useEffect(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      try {
        const saved = JSON.parse(raw);
        setUser(saved);
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  }, []);

  // ── Register ──────────────────────────────────────────────
  const register = (username, password, destination = '') => {
    const trimmedName = username.trim();

    if (!isValidFullName(trimmedName)) {
      return { success: false, reason: 'invalid_name' };
    }

    // Password strength: min 8 chars + at least one digit (matches Register.jsx level 2)
    if (!isValidPassword(password)) {
      return { success: false, reason: 'weak_password' };
    }

    const users = JSON.parse(localStorage.getItem(TRAVELERS_KEY)) || [];

    // Duplicate check
    const alreadyExists = users.some(
      (u) => u.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (alreadyExists) {
      return { success: false, reason: 'exists' };
    }

    // Save new traveler
    users.push({ name: trimmedName, pass: password, destination });
    localStorage.setItem(TRAVELERS_KEY, JSON.stringify(users));

    return { success: true };
  };

  // ── Login ─────────────────────────────────────────────────
  const login = (username, password) => {
    const trimmedName = username.trim();

    // Format check — 4-word name (matches Login.jsx)
    if (!isValidFullName(trimmedName)) {
      return { success: false, reason: 'invalid_name' };
    }

    // Password format check — min 8 chars + digit (matches Register.jsx)
    if (!isValidPassword(password)) {
      return { success: false, reason: 'invalid_password' };
    }

    // Check against saved travelers
    const users = JSON.parse(localStorage.getItem(TRAVELERS_KEY)) || [];
    const found = users.find(
      (u) => u.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (!found) {
      // User registered? If not, treat as valid format but unknown account
      return { success: false, reason: 'not_found' };
    }

    if (found.pass !== password) {
      return { success: false, reason: 'wrong_password' };
    }

    // Save session
    const session = { name: found.name };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    setIsLoggedIn(true);

    return { success: true };
  };

  // ── Logout ────────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    setIsLoggedIn(false);
  };

  return { user, isLoggedIn, register, login, logout };
}
