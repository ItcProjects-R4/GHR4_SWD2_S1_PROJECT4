import destinations from '../data/destinations';
import blogs from '../data/blogs';

// Service layer — wraps static data as async calls.
// If a real backend is added later, only this file needs to change.

export const api = {
  // ── Destinations ──────────────────────────────────────────
  getDestinations: () => Promise.resolve(destinations),

  getDestinationById: (id) =>
    Promise.resolve(destinations.find((d) => d.id === parseInt(id)) ?? null),

  searchDestinations: (query = '', category = 'all') => {
    let result = [...destinations];
    if (category !== 'all') {
      result = result.filter((d) => d.category === category);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q)
      );
    }
    return Promise.resolve(result);
  },

  // ── Blogs ─────────────────────────────────────────────────
  getBlogs: () => Promise.resolve(blogs),

  getBlogById: (id) =>
    Promise.resolve(blogs.find((b) => b.id === parseInt(id)) ?? null),

  getBlogsByCategory: (category) => {
    if (!category || category === 'All') return Promise.resolve(blogs);
    return Promise.resolve(blogs.filter((b) => b.category === category));
  },
};
