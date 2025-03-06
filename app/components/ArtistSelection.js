'use client';

export default function ArtistSelection({ artists, onSelect }) {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-extrabold mb-6 tracking-tight">
        Choose an Artist to Learn From
      </h2>

      {/* Masonry columns for a Pinterest-like layout */}
      <div className="columns-2 sm:columns-3 md:columns-4 gap-4">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="mb-4 break-inside-avoid rounded-xl overflow-hidden shadow hover:shadow-md transition cursor-pointer relative"
            onClick={() => onSelect(artist)}
          >
            {/* Artist Image */}
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-auto object-cover"
            />
            {/* Gradient or partial overlay, optional */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-3">
              <h3 className="text-lg font-bold">{artist.name}</h3>
              <p className="text-sm opacity-90">{artist.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
