import React, { createContext, useState } from 'react';

const SESSION_KEY   = 'currentTraveler';
const TRAVELERS_KEY = 'registeredTravelers';

const isValidFullName = (name) => name.trim().split(/\s+/).filter(Boolean).length >= 4;
const isValidPassword = (password) => password.length >= 8 && /\d/.test(password);

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    return null;
  });

  // ── Login ─────────────────────────────────────────────────
  const login = (username, password) => {
    const trimmed = username.trim();

    // تحقق من الشكل (4 كلمات + 8+ أحرف + رقم) — نفس شروط Register
    if (!isValidFullName(trimmed)) return { success: false, reason: 'invalid_name' };
    if (!isValidPassword(password)) return { success: false, reason: 'invalid_password' };

    // تحقق من وجود المستخدم وصحة الباسورد في localStorage
    const users = JSON.parse(localStorage.getItem(TRAVELERS_KEY)) || [];
    const found  = users.find(u => u.name.toLowerCase() === trimmed.toLowerCase());
    if (!found) return { success: false, reason: 'not_found' };
    if (found.pass !== password) return { success: false, reason: 'wrong_password' };

    // احفظ الـ session
    const session = { name: found.name };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { success: true };
  };

  // ── Register ──────────────────────────────────────────────
  const register = (username, password, destination = '') => {
    const trimmed = username.trim();

    if (!isValidFullName(trimmed)) return { success: false, reason: 'invalid_name' };

    // تحقق من قوة الباسورد (level 2: 8+ أحرف + رقم)
    if (!isValidPassword(password)) return { success: false, reason: 'weak_password' };

    const users  = JSON.parse(localStorage.getItem(TRAVELERS_KEY)) || [];
    const exists = users.some(u => u.name.toLowerCase() === trimmed.toLowerCase());
    if (exists) return { success: false, reason: 'exists' };

    // احفظ المستخدم الجديد
    users.push({ name: trimmed, pass: password, destination });
    localStorage.setItem(TRAVELERS_KEY, JSON.stringify(users));

    // احفظ الـ session
    const session = { name: trimmed };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { success: true };
  };

  // ── Logout ────────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
