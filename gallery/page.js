'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function GalleryPage() {
  const [films, setFilms] = useState([]);
  const [filter, setFilter] = useState('class'); // default filter

  useEffect(() => {
    async function fetchFilms() {
      try {
        const res = await axios.get('/api/gallery');
        setFilms(res.data.films);
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    }
    fetchFilms();
  }, []);

  // Filter films based on the 'group' property if set, otherwise show all
  const filteredFilms = films.filter((film) => (film.group ? film.group === filter : true));

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-center">Virtual Gallery</h1>
      <div className="flex justify-center space-x-4 mb-6">
        <button 
          onClick={() => setFilter('class')}
          className={`px-4 py-2 rounded transition bg-gradient-to-r from-gray-700 to-gray-400 text-white ${
            filter === 'class' ? 'ring-2 ring-white' : ''
          }`}
        >
          Class
        </button>
        <button 
          onClick={() => setFilter('friends')}
          className={`px-4 py-2 rounded transition bg-gradient-to-r from-gray-700 to-gray-400 text-white ${
            filter === 'friends' ? 'ring-2 ring-white' : ''
          }`}
        >
          Friends
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredFilms.map((film, index) => (
          <div key={index} className="bg-white/10 p-4 rounded shadow">
            <video src={film.url} controls className="w-full rounded" />
            <p className="mt-2 text-sm text-gray-300">{film.title}</p>
            {film.artist && (
              <p className="mt-1 text-xs text-gray-500">Inspired by: {film.artist}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
