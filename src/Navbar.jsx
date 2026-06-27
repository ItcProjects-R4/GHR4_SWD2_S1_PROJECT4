import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import logoImg from '../../assets/Logo.jpg';
import { AuthContext } from '../AuthContext/AuthContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { NotificationContext } from '../NotificationContext/NotificationContext';

export default function Navbar() {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const firstName = user?.name?.split(' ')[0] || 'traveler';
    logout();
    showNotification({
      type: 'logout',
      title: 'Signed out',
      message: `See you soon, ${firstName}. Your trip is paused safely.`,
    });
    navigate('/');
  };

  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbarStandard}`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logoImg} alt="Logo" className={styles.logoCustom} />
          <span className={styles.brandText}>Travel Explorer</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/destinations">Destinations</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/blog">Blog</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
            <li className="nav-item">
              <ThemeToggle />
            </li>

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <span className={styles.userGreeting}>
                    <i className="fas fa-user-circle" /> {user.name.split(' ')[0]}
                  </span>
                </li>
                <li className="nav-item">
                  <button className={`btn rounded-pill px-4 ${styles.logoutBtn}`} onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                <li className="nav-item">
                  <Link className={`btn rounded-pill px-4 ${styles.signUpBtn}`} to="/register">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}