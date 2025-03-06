'use client';

import { useState } from 'react';
import ClassSelection from './ClassSelection';
import ArtistSelection from './ArtistSelection';
// ... import other steps if needed, e.g. ArtworkGallery, ChatInterface, etc.

export default function PrototypePage() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);

  return (
    <div className="min-h-screen text-gray-100 p-4 font-sans">
      {/* AIFA logo at top */}
      <header className="flex justify-center mb-8">
        <img src="/images/AIFAlogo.png" alt="AIFA Logo" className="h-16" />
      </header>

      {/* Step 1: If no class is selected, show ClassSelection */}
      {!selectedClass && (
        <ClassSelection onSelectClass={setSelectedClass} />
      )}

      {/* Step 2: If user chose 'Art' and hasn't chosen an artist yet, show ArtistSelection */}
      {selectedClass === 'Art' && !selectedArtist && (
        <ArtistSelection
          // pass your array of artists here if you have them
          artists={[
            {
              id: 'picasso',
              name: 'Pablo Picasso',
              image: '/images/picasso.jpg',
              bio: 'Pioneer of Cubism...',
              artworks: [
                // If you have ArtworkGallery next, define artworks here
              ],
            },
            {
              id: 'vangogh',
              name: 'Vincent van Gogh',
              image: '/images/vangogh.jpg',
              bio: 'Dutch Post-Impressionist known for vibrant works.',
              artworks: [],
            },
            {
              id: 'monet',
              name: 'Claude Monet',
              image: '/images/monet.jpg',
              bio: 'Founder of French Impressionism...',
              artworks: [],
            },
            {
              id: 'warhol',
              name: 'Andy Warhol',
              image: '/images/warhol.jpg',
              bio: 'Leading figure in pop art...',
              artworks: [],
            },
            {
              id: 'kahlo',
              name: 'Frida Kahlo',
              image: '/images/kahlo.jpg',
              bio: 'Mexican painter known for self-portraits...',
              artworks: [],
            },
          ]}
          onSelect={(artist) => setSelectedArtist(artist)}
        />
      )}

      {/* Add more logic if needed (e.g., if user picks Music, or once an artist is chosen, etc.) */}
      {selectedArtist && (
        <div className="mt-6">
          <p>You selected artist: {selectedArtist.name}</p>
          {/* If you want ArtworkGallery or next steps, you can show them here */}
        </div>
      )}
    </div>
  );
}
