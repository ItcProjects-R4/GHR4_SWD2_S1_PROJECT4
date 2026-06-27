import React, { useEffect, useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Chatbot from '../Chatbot/Chatbot';

export default function Layout() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [airplaneRotation, setAirplaneRotation] = useState(180);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight > 0) {
        const percent = (scrollTop / docHeight) * 100;
        setScrollPercent(percent);
      }

      if (scrollTop > lastScrollTop.current) {
        setAirplaneRotation(180);
      } else if (scrollTop < lastScrollTop.current) {
        setAirplaneRotation(0); 
      }
      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar /> {/* 👈 تأكدي إنه موجود */}

      {/* شريط الطائرة الجانبي */}
      <div className="flight-scroll-track">
        <div 
          className="airplane-scroll-thumb"
          style={{ 
            top: `${scrollPercent}%`, 
            transform: `translateX(-50%) rotate(${airplaneRotation}deg)` 
          }}
        >
          ✈️
        </div>
        <div className="runway-end-x">❌</div>
      </div>

      {/* محتوى الصفحات */}
      <main style={{ minHeight: '100vh' }}>
        <Outlet />
      </main>

      <Footer />
      <Chatbot />
    </>
  );
}