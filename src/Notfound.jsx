import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Notfound.module.css'
import errorImg from '../../assets/error.png' 

export default function Notfound() {
  return (
    <div className={`d-flex align-items-center justify-content-center min-vh-100 bg-white`}>
      <div className="text-center p-5">
        
        
        <div className="mb-4">
          <img 
            src={errorImg} 
            alt="Lost in Space 404" 
            className={`img-fluid ${styles.universeImg}`}
          />
        </div>
        
        <h3 className="fw-bold text-dark mb-3">Lost in Space?</h3>
        <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '450px' }}>
          Oops! It looks like your spaceship took a wrong turn. This planet doesn't exist on our world tour map!
        </p>

        <Link to="/" className={`btn btn-lg rounded-pill px-4 fw-semibold ${styles.backBtn}`}>
          <i className="fas fa-home me-2"></i>Back to Earth
        </Link>

      </div>
    </div>
  )
}