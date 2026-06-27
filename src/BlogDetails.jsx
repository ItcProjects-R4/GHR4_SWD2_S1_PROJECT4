import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './BlogDetails.module.css';
import blogs from '../../data/blogs';

export default function BlogDetails() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className={styles.notFound}>
        <span>📖</span>
        <h2>Article Not Found</h2>
        <Link to="/blog" className={styles.backLink}>← Back to Journal</Link>
      </div>
    );
  }

  const relatedPosts = blogs.filter((b) => b.id !== blog.id).slice(0, 3);

  return (
    <div className={styles.pageWrapper}>

      {/* ── Article Header ── */}
      <div className={styles.articleHeader} style={{ backgroundImage: `url(${blog.image})` }}>
        <div className={styles.headerOverlay} />
        <div className={styles.headerContent}>
          <Link to="/blog" className={styles.breadcrumb}>← Back to Journal</Link>
          <span
            className={styles.categoryTag}
            style={{ background: blog.categoryColor }}
          >
            {blog.category}
          </span>
          <h1 className={styles.articleTitle}>{blog.title}</h1>
          <div className={styles.articleMeta}>
            <span><i className="fas fa-user-circle" /> {blog.author}</span>
            <span className={styles.metaDot}>·</span>
            <span><i className="fas fa-calendar" /> {blog.date}</span>
            <span className={styles.metaDot}>·</span>
            <span><i className="fas fa-book-open" /> {blog.readTime}</span>
          </div>
        </div>
      </div>

      {/* ── Article Body + Sidebar ── */}
      <div className="container py-5">
        <div className={styles.contentLayout}>

          {/* ── Article Text ── */}
          <article className={styles.articleBody}>

            {/* Opening excerpt / pull quote */}
            <blockquote className={styles.pullQuote}>
              {blog.excerpt}
            </blockquote>

            {/* Paragraphs */}
            {blog.content.map((paragraph, i) => (
              <p key={i} className={`${styles.paragraph} ${i === 0 ? styles.firstParagraph : ''}`}>
                {paragraph}
              </p>
            ))}

            {/* Article footer / tags */}
            <div className={styles.articleFooter}>
              <div className={styles.authorCard}>
                <div className={styles.authorAvatar}>{blog.author.charAt(0)}</div>
                <div>
                  <span className={styles.authorName}>{blog.author}</span>
                  <span className={styles.authorBio}>
                    Travel writer & explorer. Sharing stories from around the world.
                  </span>
                </div>
              </div>

              <div className={styles.shareRow}>
                <span className={styles.shareLabel}>Share this story:</span>
                <div className={styles.shareIcons}>
                  <a href="#share" className={styles.shareIcon} style={{ background: '#1877f2' }}>
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="#share" className={styles.shareIcon} style={{ background: '#1da1f2' }}>
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="#share" className={styles.shareIcon} style={{ background: '#e4405f' }}>
                    <i className="fab fa-instagram" />
                  </a>
                  <a href="#share" className={styles.shareIcon} style={{ background: '#0077b5' }}>
                    <i className="fab fa-linkedin-in" />
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className={styles.sidebar}>

            {/* Back to blog */}
            <Link to="/blog" className={styles.sidebarBackBtn}>
              <i className="fas fa-arrow-left" /> All Articles
            </Link>

            {/* Related Posts */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>📌 More Stories</h3>
              <div className={styles.relatedList}>
                {relatedPosts.map((post) => (
                  <Link to={`/blog/${post.id}`} key={post.id} className={styles.relatedItem}>
                    <img src={post.image} alt={post.title} className={styles.relatedImg} />
                    <div className={styles.relatedInfo}>
                      <span
                        className={styles.relatedCat}
                        style={{ color: post.categoryColor }}
                      >
                        {post.category}
                      </span>
                      <span className={styles.relatedTitle}>{post.title}</span>
                      <span className={styles.relatedRead}>{post.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className={styles.sidebarCta}>
              <span className={styles.ctaIcon}>✈️</span>
              <h4>Ready to Explore?</h4>
              <p>Browse our hand-picked destinations and plan your next adventure.</p>
              <Link to="/destinations" className={styles.ctaBtn}>
                See Destinations
              </Link>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
