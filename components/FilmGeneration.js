'use client';  // <-- Add this at the top

import { useState } from 'react';
import axios from 'axios';

export default function FilmGeneration({ userArt, onFilmReady }) {
  const [loading, setLoading] = useState(false);

  const generateFilm = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/generate-film', { artUrl: userArt });
      onFilmReady(response.data.filmUrl);
    } catch (error) {
      console.error('Film generation error', error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-2">Generate Your Film</h2>
      <button
        onClick={generateFilm}
        className="bg-green-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Film'}
      </button>
    </div>
  );
}
