'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Gallery() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function fetchFilms() {
      try {
        const res = await axios.get('/api/gallery');
        setFilms(res.data.films);
      } catch (err) {
        console.error('Error fetching gallery films:', err);
      }
    }
    fetchFilms();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Virtual Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {films.map((film, index) => (
          <div key={index} className="bg-white p-2 rounded shadow">
            <video src={film.url} controls className="w-full" />
            <p className="mt-2 text-sm text-gray-600">{film.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
