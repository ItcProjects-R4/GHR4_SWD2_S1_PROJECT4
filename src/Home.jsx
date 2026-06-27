import React, { useState } from 'react';
import styles from './Home.module.css';
import bgImage from '../../assets/BG.jpg'; 
import { Link, useNavigate } from 'react-router-dom';
import storyimg from '../../assets/story.jpg';

export default function Home() {
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  // دالة التعامل مع البحث ونقل المستخدم
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة
    if (searchVal.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(searchVal.trim())}`);
    } else {
      navigate('/destinations');
    }
  };

  return (
    <div className={styles.homeContainer}>
      <section 
        className={styles.heroSection} 
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className={styles.overlay}></div>
        
        <div className={styles.content}>
          <h1 className={styles.title}>Explore The World With Travel Explorer</h1>
          <p className={styles.subtitle}>Discover amazing destinations and plan your perfect journey.</p>
          
          {/* فورم البحث بعد التعديل ليعمل بالزرار أو بالـ Enter */}
          <form onSubmit={handleSearchSubmit} className={styles.searchContainer}>
            <input 
              type="text" 
              placeholder="Where do you want to go?" 
              className={styles.searchInput} 
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <button type="submit" className={styles.searchButton}>
              <i className="fas fa-search"></i> 
            </button>
          </form>

          <div className={styles.btnGroup}>
            <a href="/destinations" className={styles.btnPrimary}>Explore Destinations</a>
            <a href="/blog" className={styles.btnSecondary}>Read Travel Blogs</a>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="text-center mb-5">
          <h6 className="text-primary fw-bold text-uppercase">Why Choose Us</h6>
          <h2 className="fw-bold">Experience Premium Exploration</h2>
        </div>

        <div className="row g-4">
          {/* كارت 1 */}
          <div className="col-md-3">
            <div className={`card border-0 shadow-sm p-4 h-100 ${styles.featureCard}`}>
              <div className={styles.iconBox}><i className="fas fa-tags fs-3 text-primary"></i></div>
              <h5 className="fw-bold mt-3">Best Prices</h5>
              <p className="text-muted small">Compare thousands of flights and hotels.</p>
            </div>
          </div>
          
          {/* كارت 2 */}
          <div className="col-md-3">
            <div className={`card border-0 shadow-sm p-4 h-100 ${styles.featureCard}`}>
              <div className={styles.iconBox}><i className="fas fa-map-marked-alt fs-3 text-primary"></i></div>
              <h5 className="fw-bold mt-3">Top Destinations</h5>
              <p className="text-muted small">Hand-curated collection of top places.</p>
            </div>
          </div>

          {/* كارت 3 */}
          <div className="col-md-3">
            <div className={`card border-0 shadow-sm p-4 h-100 ${styles.featureCard}`}>
              <div className={styles.iconBox}><i className="fas fa-check-circle fs-3 text-primary"></i></div>
              <h5 className="fw-bold mt-3">Easy Booking</h5>
              <p className="text-muted small">A seamless, one-click booking experience.</p>
            </div>
          </div>

          {/* كارت 4 */}
          <div className="col-md-3">
            <div className={`card border-0 shadow-sm p-4 h-100 ${styles.featureCard}`}>
              <div className={styles.iconBox}><i className="fas fa-lightbulb fs-3 text-primary"></i></div>
              <h5 className="fw-bold mt-3">Travel Smart</h5>
              <p className="text-muted small">Real-time alerts and personalized tips.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- About Section --- */}
      <section className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-md-6">
            <img src={storyimg} alt="About Travel Explorer" className="img-fluid rounded-4 shadow-lg" />
          </div>

          <div className="col-md-6 ps-md-5">
            <h6 className="text-primary fw-bold text-uppercase">The Art of Travel</h6>
            <h2 className="fw-bold mb-4" style={{ color: '#0f172a' }}>Curated escapes for the soulful voyager</h2>
            
            <div className="mb-4">
              <h5 className="fw-bold text-dark">Who We Are</h5>
              <p className="text-muted small">We are a dedicated digital travel platform aiming to redefine your journey by connecting you with authentic experiences worldwide.</p>
            </div>

            <div className="row g-3">
              <div className="col-6">
                <h5 className="fw-bold text-dark">Our Mission</h5>
                <p className="text-muted small">Helping travelers discover new horizons and plan their perfect trips with absolute ease.</p>
              </div>
              <div className="col-6">
                <h5 className="fw-bold text-dark">Our Vision</h5>
                <p className="text-muted small">To become the world's most intuitive, reliable, and smart digital travel companion.</p>
              </div>
            </div>

            <Link to="/destinations" className="btn btn-dark rounded-pill px-4 py-2 mt-3 fw-bold">
              Start Planning
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}