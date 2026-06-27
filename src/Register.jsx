import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { AuthContext } from '../AuthContext/AuthContext';
import { NotificationContext } from '../NotificationContext/NotificationContext';

export default function Register() {
  const [username, setUsername]             = useState('');
  const [password, setPassword]             = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [destination, setDestination]       = useState('');
  const [enginePower, setEnginePower]       = useState(0);
  const [isLoading, setIsLoading]           = useState(false);
  const [loadingText, setLoadingText]       = useState({ title: '', subtitle: '' });
  const [confirmError, setConfirmError]     = useState(false);

  const { register } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const navigate      = useNavigate();

  // حساب قوة الباسورد وتحديث حالة المحرك ديناميكياً
  useEffect(() => {
    let power = 0;
    if (password.length >= 6) power = 1; // ضعيف
    if (password.length >= 8 && /\d/.test(password)) power = 2; // متوسط
    if (password.length >= 10 && /[A-Z]/.test(password) && /[^A-Za-z0-9]/.test(password)) power = 3; // توربو
    setEnginePower(power);
  }, [password]);

  // دالة تحويل المستخدم لصفحة ال Login يدوياً إذا ضغط على "Login here"
  const handleGoToLogin = () => {
    setLoadingText({
      title: "Preparing your Flight!",
      subtitle: "Preparing the runway to transfer your passport data..."
    });
    setIsLoading(true);
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (enginePower < 2) {
      alert('عذراً، طاقة المحرك ضعيفة! يرجى تقوية الباسورد للإقلاع.');
      return;
    }

    // تحقق من تطابق الباسورد
    if (password !== confirmPassword) {
      setConfirmError(true);
      setTimeout(() => setConfirmError(false), 2000);
      return;
    }

    const result = register(username, password, destination);

    if (result.reason === 'invalid_name') {
      showNotification({
        type: 'error',
        title: 'Invalid full name',
        message: 'Please enter your full name as at least 4 words before takeoff.',
      });
    } else if (result.reason === 'weak_password') {
      showNotification({
        type: 'error',
        title: 'Weak password',
        message: 'Password must be at least 8 characters and include a number.',
      });
    } else if (result.reason === 'exists') {
      showNotification({
        type: 'info',
        title: 'Account already exists',
        message: 'We found your passport. Redirecting you to sign in.',
      });
      setLoadingText({
        title: 'You already have an account!',
        subtitle: 'Preparing the runway to transfer your passport data...',
      });
      setIsLoading(true);
      setTimeout(() => navigate('/login'), 3000);
    } else if (result.success) {
      // مستخدم جديد — session اتحفظت تلقائياً في الـ Context
      showNotification({
        type: 'success',
        title: 'Account created',
        message: `Welcome aboard, ${username.trim().split(/\s+/)[0] || 'traveler'}! Your boarding pass is ready.`,
      });
      navigate('/');
    }
  };

  // شاشة ال Loading تظهر فقط في حالة التوجيه إلى ال Login (إذا كان الحساب موجوداً بالفعل)
  if (isLoading) {
    return (
      <div className={styles['loading-screen-overlay']}>
        <div className={styles['loading-card']}>
          <h3 className={styles['loading-title']}>
            {loadingText.title}
          </h3>
          <p className={styles['loading-subtitle']}>
            {loadingText.subtitle}
          </p>
          
          {/* منطقة المدرج بين ال Register وال Login */}
          <div className={styles['runway-container']}>
            <span className={styles['runway-endpoint']}>REGISTER</span>
            
            <div className={styles['runway-line']}>
              <div className={styles['airplane-loader']}>✈️</div>
            </div>
            
            <span className={styles['runway-endpoint']}>LOGIN</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['register-container']}>
      <div className={styles['register-window']}>
        
        {/* النص الشمال: الفورم العادي ومحرك الطائرة */}
        <div className={styles['form-section']}>
          <h3>CREATE ACCOUNT</h3>
          <form onSubmit={handleSubmit}>
            
            <div className={styles['input-group']}>
              <label>FULL NAME (FOUR WORDS)</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter your name..." 
                required 
              />
            </div>

            <div className={styles['input-group']}>
              <label>CHOOSE DESTINATION</label>
              <select value={destination} onChange={(e) => setDestination(e.target.value)} required>
                <option value="">-- Select Destination --</option>
                <option value="CAI">Cairo (CAI)</option>
                <option value="DXB">Dubai (DXB)</option>
                <option value="LON">London (LON)</option>
                <option value="PAR">Paris (PAR)</option>
              </select>
            </div>

            <div className={styles['input-group']}>
              <label>PASSPORT KEY (PASSWORD)</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Create strong password..." 
                required 
              />
            </div>

            <div className={styles['input-group']}>
              <label>CONFIRM PASSPORT KEY</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password..."
                required
                style={{
                  borderBottom: confirmPassword
                    ? password === confirmPassword
                      ? '2px solid #22c55e'
                      : '2px solid #d63447'
                    : undefined,
                }}
              />
              {confirmPassword && (
                <small style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  marginTop: '4px',
                  display: 'block',
                  color: password === confirmPassword ? '#22c55e' : '#d63447',
                }}>
                  {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                </small>
              )}
              {confirmError && (
                <small style={{ fontSize: '11px', fontWeight: '700', color: '#d63447', display: 'block', marginTop: '4px' }}>
                  ✗ Please make sure both passwords match before flying!
                </small>
              )}
            </div>

            {/* محرك الطائرة لقياس قوة الباسورد */}
            <div className={styles['engine-zone']}>
              <span className={styles['engine-label']}>JET ENGINE POWER:</span>
              <div className={`${styles['jet-engine']} ${styles['power-' + enginePower]}`}>
                <div className={styles['engine-fan']}>🌀</div>
                <div className={styles['engine-glow']}></div>
              </div>
              <small className={styles['engine-status-text']}>
                {enginePower === 0 && "🔴 المحرك مطفأ - اكتب باسوورد"}
                {enginePower === 1 && "⚠️ طاقة منخفضة (أضف أرقام)"}
                {enginePower === 2 && "🟢 طاقة جاهزة للإقلاع!"}
                {enginePower === 3 && "⚡ وضع التوربو الفائق المشتعل!!"}
              </small>
            </div>

            <button type="submit" className={styles['fly-btn']}>
              Fly & Register 🛫
            </button>
          </form>

          {/* زرار التحويل لو عنده أكونت أصلاً */}
          <p className={styles['toggle-login-text']}>
            Already have a passport?{' '}
            <span onClick={handleGoToLogin} className={styles['login-link']}>
              Login here
            </span>
          </p>
        </div>

        {/* النص اليمين: كارت الصعود التفاعلي (Boarding Pass Live Preview) */}
        <div className={styles['ticket-section']}>
          <div className={styles['boarding-pass']}>
            <div className={styles['ticket-header']}>
              <span>BOARDING PASS</span>
              <strong>TRAVEL EXPLORER</strong>
            </div>
            
            <div className={styles['ticket-body']}>
              <div className={styles['ticket-info']}>
                <label>PASSENGER NAME</label>
                <div className={styles['ticket-value']}>{username || '--- LIVE TYPING ---'}</div>
              </div>

              <div className={styles['flight-path']}>
                <div className={styles['airport-code']}>HGA</div>
                <div className={styles['plane-icon']}>✈️</div>
                <div className={`${styles['airport-code']} ${destination ? styles['code-stamped'] : ''}`}>
                  {destination || '???'}
                </div>
              </div>

              <div className={styles['ticket-sub-details']}>
                <div>
                  <label>FLIGHT</label>
                  <span>TE-2026</span>
                </div>
                <div>
                  <label>SEAT</label>
                  <span>12A (FIRST CLASS)</span>
                </div>
                <div>
                  <label>GATE</label>
                  <span>G-04</span>
                </div>
              </div>
            </div>

            <div className={styles['barcode-zone']}>
              <div className={styles['barcode']}></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}