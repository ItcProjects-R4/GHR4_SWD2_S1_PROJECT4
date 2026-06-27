import React, { createContext, useRef, useState } from 'react';
import styles from './NotificationContext.module.css';

export const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);
  const timerRef = useRef(null);

  const showNotification = ({ type = 'success', title, message }) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    setNotification({
      id: Date.now(),
      type,
      title,
      message,
    });

    timerRef.current = setTimeout(() => {
      setNotification(null);
    }, 3200);
  };

  const closeNotification = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      <div className={styles.toastArea} aria-live="polite" aria-atomic="true">
        {notification && (
          <div key={notification.id} className={`${styles.toast} ${styles[notification.type]}`}>
            <div className={styles.iconWrap}>
              {notification.type === 'success' && <i className="fas fa-check" />}
              {notification.type === 'logout' && <i className="fas fa-plane-departure" />}
              {notification.type === 'info' && <i className="fas fa-circle-info" />}
              {notification.type === 'error' && <i className="fas fa-triangle-exclamation" />}
            </div>

            <div className={styles.content}>
              <strong>{notification.title}</strong>
              <span>{notification.message}</span>
            </div>

            <button className={styles.closeBtn} onClick={closeNotification} aria-label="Close notification">
              <i className="fas fa-times" />
            </button>
          </div>
        )}
      </div>
    </NotificationContext.Provider>
  );
}
