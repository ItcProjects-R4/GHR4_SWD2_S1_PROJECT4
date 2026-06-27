import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Blog.module.css';
import blogs from '../../data/blogs';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(blogs.map((b) => b.category))];

  const filtered = activeCategory === 'All'
    ? blogs
    : blogs.filter((b) => b.category === activeCategory);

  return (
    <div className={styles.pageWrapper}>

      {/* ── Journal Cover ── */}
      <div className={styles.journalCover}>
        <div className={styles.journalLines} />
        <div className={styles.coverContent}>
          <div className={styles.journalTag}>TRAVEL JOURNAL</div>
          <h1 className={styles.coverTitle}>Stories from the Road</h1>
          <p className={styles.coverSub}>
            Real adventures, honest tips and inspiring escapes — written by travelers, for travelers.
          </p>
          <div className={styles.coverDivider}>
            <span>✦</span><span>✦</span><span>✦</span>
          </div>
        </div>
      </div>

      {/* ── Category Filter ── */}
      <div className={styles.filterBar}>
        <div className="container">
          <div className={styles.filterScroll}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.catBtn} ${activeCategory === cat ? styles.catBtnActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Blog Grid ── */}
      <div className="container py-5">
        <div className={styles.grid}>
          {filtered.map((blog, index) => (
            <div key={blog.id} className={`${styles.card} ${index === 0 ? styles.cardFeatured : ''}`}>

              <div className={styles.cardImage}>
                <img src={blog.image} alt={blog.title} />
                <div className={styles.cardImageOverlay} />
                <span
                  className={styles.categoryBadge}
                  style={{ background: blog.categoryColor }}
                >
                  {blog.category}
                </span>
                {index === 0 && (
                  <span className={styles.featuredBadge}>⭐ Featured</span>
                )}
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span className={styles.metaAuthor}>
                    <i className="fas fa-user-circle" /> {blog.author}
                  </span>
                  <span className={styles.metaDot}>·</span>
                  <span className={styles.metaDate}>{blog.date}</span>
                  <span className={styles.metaDot}>·</span>
                  <span className={styles.metaRead}>
                    <i className="fas fa-book-open" /> {blog.readTime}
                  </span>
                </div>

                <h2 className={styles.cardTitle}>{blog.title}</h2>
                <p className={styles.cardExcerpt}>{blog.excerpt}</p>

                <Link to={`/blog/${blog.id}`} className={styles.readMoreBtn}>
                  Read Article <i className="fas fa-arrow-right" />
                </Link>
              </div>

              {/* Notebook spiral binding */}
              <div className={styles.spiralBinding}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={styles.spiralRing} />
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
