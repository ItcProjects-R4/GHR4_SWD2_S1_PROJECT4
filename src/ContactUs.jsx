import React, { useContext } from 'react';
import { ContactContext } from '../ContactContext/ContactContext.jsx';
import styles from './ContactUs.module.css';

export default function ContactUs() {

  const { formData, isSent, showToast, handleChange, handleSubmit } = useContext(ContactContext);

  return (
    <div className={styles.mainWrapper}>

      <div className={`${styles.toastBox} ${showToast ? styles.toastBoxShow : ''}`}>
        <span className={styles.toastIcon}>🌊</span>
        <div>
          <h4 className={styles.toastTitle}>Message Casted Safely!</h4>
          <p className={styles.toastText}>Your bottle is floating through the ocean currents.</p>
        </div>
      </div>

      <div className={styles.pageContainer}>
        {/* النص الأيسر: الفورم */}
        <div className={styles.leftFormSection}>
          <div className={`${styles.formCard} ${isSent ? styles.formCardHide : ''}`}>
            <h2 className={styles.formTitle}>Message in a Bottle</h2>
            <p className={styles.formSubtitle}>Cast your words into the deep ocean...</p>
            
            <form onSubmit={handleSubmit}>
              <div className={styles.fieldGroup}>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name..." 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className={styles.fieldGroup}>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email..." 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className={styles.fieldGroup}>
                <textarea 
                  name="message" 
                  placeholder="Write your secret message here..." 
                  value={formData.message} 
                  onChange={handleChange} 
                  required
                />
              </div>
              
              <button type="submit" className={styles.submitButton}>Cast Into Ocean</button>
            </form>
          </div>
        </div>

        {/* النص الأيمن: البحر والزجاجة */}
        <div className={styles.rightSeaSection}>
          <div className={styles.seaWater}>
            {/* الأمواج الخلفية */}
            <div className={`${styles.oceanWave} ${styles.waveLayerBack}`}></div>
            <div className={`${styles.oceanWave} ${styles.waveLayerMiddle}`}></div>

            {/* حاوية الزجاجة */}
            <div className={`${styles.bottleShipment} ${isSent ? styles.bottleFlyAway : ''}`}>
              <div className={styles.glassBottleGreen}>
                <div className={styles.bottleTopNeck}>
                  <div className={styles.woodenPlug}></div>
                </div>
                <div className={styles.bottleMainBody}>
                  <div className={`${styles.parchmentPaper} ${isSent ? styles.paperRolledTightly : ''}`}>
                    <div className={styles.parchmentText}>
                      <span className={styles.authorName}>From: {formData.name || '...'}</span>
                      <p className={styles.letterBody}>{formData.message || 'Your message will appear here...'}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.lightReflection}></div>
              </div>
            </div>

     
            <div className={`${styles.oceanWave} ${styles.waveLayerFront}`}></div>
            <div className={styles.darkSeaBase}></div>
          </div>
        </div>
      </div>
    </div>
  );
}