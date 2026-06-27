import { useState, useEffect } from 'react';
import { api } from '../services/api';

/**
 * useDestinations
 * Returns a filtered/searched list of destinations.
 *
 * @param {string} category  - 'all' | 'egypt' | 'international'
 * @param {string} searchQuery - free-text search string
 */
export function useDestinations(category = 'all', searchQuery = '') {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    api
      .searchDestinations(searchQuery, category)
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load destinations.');
        setLoading(false);
      });
  }, [category, searchQuery]);

  return { destinations, loading, error };
}

/**
 * useDestinationById
 * Returns a single destination by id, or null if not found.
 *
 * @param {string|number} id
 */
export function useDestinationById(id) {
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    api
      .getDestinationById(id)
      .then((data) => {
        setDestination(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load destination.');
        setLoading(false);
      });
  }, [id]);

  return { destination, loading, error };
}
