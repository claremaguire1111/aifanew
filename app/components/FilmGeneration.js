'use client';

import { useState } from 'react';

export default function FilmGeneration({ onFilmReady }) {
  const [loading, setLoading] = useState(false);

  const generateFilm = async () => {
    setLoading(true);
    // For demo: simulate delay then return demo video URL
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const demoFilmUrl = '/videos/demo.mp4';
    onFilmReady(demoFilmUrl);
    setLoading(false);
  };

  return (
    <div className="bg-white/10 p-6 rounded-xl shadow-xl backdrop-blur-sm mt-6">
      <h2 className="text-2xl font-semibold mb-4">Generate Your Film</h2>
      <p className="text-gray-300 mb-4">We’ll use your AI prompts to produce a short film concept.</p>
      <button onClick={generateFilm} className="btn" disabled={loading}>
  {loading ? 'Generating...' : 'Generate Film'}
</button>

    </div>
  );
}
