'use client';  // <-- Add this at the top

import { useState } from 'react';

export default function ArtCreation({ onComplete }) {
  const [art, setArt] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setArt(url);
      onComplete(url);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-2">Create Your Own Artwork</h2>
      <input type="file" onChange={handleUpload} />
      {art && (
        <div className="mt-4">
          <img src={art} alt="Your artwork" className="max-h-60 mx-auto" />
        </div>
      )}
    </div>
  );
}
