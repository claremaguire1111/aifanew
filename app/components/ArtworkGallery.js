'use client';

export default function ArtworkGallery({ artist, onSelectArtwork, onBack }) {
  if (!artist || !artist.artworks) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <button onClick={onBack} className="underline mb-4 text-red-500 hover:text-red-400">
          ← Back to Artists
        </button>
        <h2 className="text-2xl font-semibold mb-4">
          No artworks found for {artist?.name || 'this artist'}.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <button onClick={onBack} className="underline mb-4 text-red-500 hover:text-red-400">
        ← Back to Artists
      </button>
      <h2 className="text-2xl font-semibold mb-4">{artist.name}'s Artworks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {artist.artworks.map((artwork) => (
          <div
            key={artwork.id}
            className="cursor-pointer p-4 bg-white text-black rounded shadow hover:shadow-lg transition"
            onClick={() => onSelectArtwork(artwork)}
          >
            <img
              src={artwork.image}
              alt={artwork.title}
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="mt-2 text-lg font-bold">{artwork.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

