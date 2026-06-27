import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import logoImg from '../../assets/Logo.jpg' 

export default function Footer() {
 
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-5 ${styles.footerContainer}`}>
      <div className="container">
        <div className="row g-4">
          
    
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <img 
                src={logoImg} 
                alt="Travel Explorer Logo" 
                style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }}
                className="me-2"
              />
              <span className={`fw-bold fs-5 ${styles.footerLogoText}`}>Travel Explorer</span>
            </div>
            <p className={styles.footerText}>
              Don't just see the world, explore the soul of it. Discover extraordinary places with us and book your perfect trip easily.
            </p>
            
            <div className="d-flex gap-3 mt-3">
              <a href="#facebook" className={styles.socialIcon}><i className="fab fa-facebook-f"></i></a>
              <a href="#instagram" className={styles.socialIcon}><i className="fab fa-instagram"></i></a>
              <a href="#twitter" className={styles.socialIcon}><i className="fab fa-twitter"></i></a>
              <a href="#pinterest" className={styles.socialIcon}><i className="fab fa-pinterest"></i></a>
            </div>
          </div>

          {/* العمود الثاني: روابط سريعة */}
          <div className="col-lg-2 col-md-6">
            <h5 className={`fw-bold mb-3 ${styles.columnTitle}`}>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className={styles.footerLink}>Home</Link></li>
              <li className="mb-2"><Link to="/destinations" className={styles.footerLink}>Destination</Link></li>
              <li className="mb-2"><Link to="/blog" className={styles.footerLink}>Our Blog</Link></li>
              <li className="mb-2"><Link to="/contact" className={styles.footerLink}>Contact Us</Link></li>
            </ul>
          </div>

          {/* العمود الثالث: وجهات مميزة لشغل التيم */}
          <div className="col-lg-3 col-md-6">
            <h5 className={`fw-bold mb-3 ${styles.columnTitle}`}>Top Destinations</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/destinations" className={styles.footerLink}>Aswan & Luxor</Link></li>
              <li className="mb-2"><Link to="/destinations" className={styles.footerLink}>Sharm El Sheikh</Link></li>
              <li className="mb-2"><Link to="/destinations" className={styles.footerLink}>Cairo Historic Sites</Link></li>
              <li className="mb-2"><Link to="/destinations" className={styles.footerLink}>Alexandria Beach</Link></li>
            </ul>
          </div>

          {/* العمود الرابع: معلومات التواصل */}
          <div className="col-lg-3 col-md-6">
            <h5 className={`fw-bold mb-3 ${styles.columnTitle}`}>Contact Info</h5>
            <ul className="list-unstyled text-muted">
              <li className={`mb-3 d-flex align-items-start ${styles.footerText}`}>
                <i className="fas fa-map-marker-alt text-warning me-2 mt-1"></i>
                <span>123 Travel St, Cairo, Egypt</span>
              </li>
              <li className={`mb-3 d-flex align-items-center ${styles.footerText}`}>
                <i className="fas fa-phone-alt text-warning me-2"></i>
                <span>+20 123 456 789</span>
              </li>
              <li className={`mb-3 d-flex align-items-center ${styles.footerText}`}>
                <i className="fas fa-envelope text-warning me-2"></i>
                <span>info@travelexplorer.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* السطر الأخير: حقوق الملكية */}
        <hr className="my-4 text-muted" />
        <div className="row">
          <div className="col-md-12 text-center">
            <p className={`mb-0 small ${styles.footerText}`}>
              &copy; {currentYear} <span className="fw-bold text-dark">Travel Explorer</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}