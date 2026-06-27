import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { AuthContext } from '../AuthContext/AuthContext';
import { NotificationContext } from '../NotificationContext/NotificationContext';

export default function Login() {
  const [username, setUsername]   = useState('');
  const [password, setPassword]   = useState('');
  const [isStamped, setIsStamped] = useState(false);
  const [hasError, setHasError]   = useState(false);
  const [errorMsg, setErrorMsg]   = useState('');

  const { login } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const navigate  = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = login(username, password);

    if (result.success) {
      setHasError(false);
      setErrorMsg('');
      setIsStamped(true);
      showNotification({
        type: 'success',
        title: 'Signed in successfully',
        message: `Welcome back, ${username.trim().split(/\s+/)[0]}! Your travel passport is active.`,
      });
      setTimeout(() => navigate(redirectTo, { replace: true }), 2500);
    } else {
      setIsStamped(false);
      setHasError(true);
      const messages = {
        invalid_name: 'Full name must be at least 4 words.',
        invalid_password: 'Password must be at least 8 characters and include a number.',
        not_found: 'Account not found. Please register first.',
        wrong_password: 'Wrong password. Please check your passport key.',
      };
      setErrorMsg(messages[result.reason] || 'Please check your login details.');
      setTimeout(() => setHasError(false), 500);
    }
  };

  return (
    <div className={styles['passport-container']}>
      {/* هنا بنضيف كلاس ال turbulence ديناميكياً لو ال hasError ب true */}
      <form 
        onSubmit={handleSubmit} 
        className={`${styles['passport-book']} ${hasError ? styles['turbulence'] : ''}`}
      >
        
        {/* الصفحة الشمال (ديناميكية بالكامل وتتأثر  Input) */}
        {/* الصفحة الشمال (ديناميكية بالكامل وتتأثر  Input) */}
<div className={`${styles['passport-page']} ${styles['page-left']}`}>
  <div className={styles['passport-header']}>
    <h4>PASSPORT</h4>
    <span className={styles['passport-code']}>P&V-2026</span>
  </div>
  
  <div className={styles['passport-profile-sec']}>
    <div className={styles['passport-photo']}>
      <div className={styles['photo-placeholder']}>👤</div>
    </div>
    
    <div className={styles['passport-ghost-data']}>
      <div className={`${styles['line-bar']} ${styles['short']}`}></div>
      <div className={`${styles['line-bar']} ${styles['long']}`}></div>
      <div className={`${styles['line-bar']} ${styles['medium']}`}></div>
    </div>
  </div>

  {/* الجزء الجديد: تواريخ الإصدار والانتهاء الثابته */}
  <div className={styles['passport-dates-zone']}>
    <div className={styles['date-item']}>
      <span className={styles['date-label']}>DATE OF ISSUE / تاريخ الإصدار</span>
      <span className={styles['date-value']}>15 JUN 2026</span>
    </div>
    <div className={styles['date-item']}>
      <span className={styles['date-label']}>DATE OF EXPIRY / تاريخ الانتهاء</span>
      <span className={styles['date-value']}>14 JUN 2033</span>
    </div>
  </div>

  <div className={styles['passport-footer-zone']}>
    <code>
      {`P<EGY${username.replace(/\s+/g, '<').toUpperCase()}`.padEnd(44, '<').substring(0, 44)}
    </code>
  </div>
</div>

        {/* الصفحة اليمين: الفورم والختم النجمي */}
        <div className={`${styles['passport-page']} ${styles['page-right']}`}>
          <div className={styles['watermark']}>TRAVEL</div>
          
          <h3>VISA APPLICATION</h3>
          
          <div className={styles['input-field-group']}>
            <label>FULL NAME / USERNAME (FOUR WORDS)</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="e.g. Rahaf Adel Mohamed Fahmi" 
              required 
            />
          </div>

          <div className={styles['input-field-group']}>
            <label>PASSPORT KEY / PASSWORD (MIN 8 CHARS + NUM)</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter passport key..." 
              required 
            />
          </div>

          <button type="submit" className={styles['submit-visa-btn']}>
            Apply for Entry Visa
          </button>

          {errorMsg && (
            <p style={{ color: '#d63447', fontSize: '12px', marginTop: '8px', textAlign: 'center', fontWeight: '600' }}>
              {errorMsg}
            </p>
          )}

          {/* الختم النجمي المميز */}
          {isStamped && (
            <div className={styles['visa-stamp-container']}>
              <div className={styles['visa-stamp-inner']}>
                <svg className={styles['arched-text-top']} viewBox="0 0 150 150">
                  <path id="curve-top" d="M 25 75 A 50 50 0 1 1 125 75" fill="none" />
                  <text><textPath xlinkHref="#curve-top" startOffset="50%" textAnchor="middle">TRAVEL EXPLORER</textPath></text>
                </svg>
                <div className={styles['visa-star-central']}>
                  <div className={styles['star-icon']}>★</div>
                </div>
                <div className={styles['visa-accepted-box']}>
                  <div className={styles['accepted-text']}>ACCEPTED</div>
                  <div className={styles['date-text']}>15 JUN 2026</div>
                </div>
                <svg className={styles['arched-text-bottom']} viewBox="0 0 150 150">
                  <path id="curve-bottom" d="M 25 75 A 50 50 0 1 0 125 75" fill="none" />
                  <text><textPath xlinkHref="#curve-bottom" startOffset="50%" textAnchor="middle">VISA ENTRY</textPath></text>
                </svg>
              </div>
            </div>
          )}
          
        </div>

      </form>
    </div>
  );
}