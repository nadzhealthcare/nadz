'use client';

import { useState, useEffect } from 'react';
import { fetchStrapiData, fetchStrapiEntry, fetchStrapiSingleType } from '@/lib/strapi';

/**
 * Custom hook to fetch Strapi collection data
 * @param {string} endpoint - API endpoint
 * @param {object} options - Query options
 * @param {boolean} enabled - Whether to fetch immediately
 * @returns {object} { data, loading, error, refetch }
 */
export const useStrapiCollection = (endpoint, options = {}, enabled = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchStrapiData(endpoint, options);
      setData(result);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (enabled && endpoint) {
      fetchData();
    }
  }, [endpoint, JSON.stringify(options), enabled]);

  return { data, loading, error, refetch: fetchData };
};

/**
 * Custom hook to fetch a single Strapi entry
 * @param {string} endpoint - API endpoint
 * @param {string|number} identifier - ID or slug
 * @param {object} options - Query options
 * @param {boolean} enabled - Whether to fetch immediately
 * @returns {object} { data, loading, error, refetch }
 */
export const useStrapiEntry = (endpoint, identifier, options = {}, enabled = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchStrapiEntry(endpoint, identifier, options);
      setData(result);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (enabled && endpoint && identifier) {
      fetchData();
    }
  }, [endpoint, identifier, JSON.stringify(options), enabled]);

  return { data, loading, error, refetch: fetchData };
};

/**
 * Custom hook to fetch Strapi single type
 * @param {string} endpoint - Single type endpoint
 * @param {object} options - Query options
 * @param {boolean} enabled - Whether to fetch immediately
 * @returns {object} { data, loading, error, refetch }
 */
export const useStrapiSingleType = (endpoint, options = {}, enabled = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchStrapiSingleType(endpoint, options);
      setData(result);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (enabled && endpoint) {
      fetchData();
    }
  }, [endpoint, JSON.stringify(options), enabled]);

  return { data, loading, error, refetch: fetchData };
};
























