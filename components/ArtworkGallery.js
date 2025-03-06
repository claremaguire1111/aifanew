'use client';  // <-- Add this at the top

export default function ArtworkGallery({ artist, onSelectArtwork, onBack }) {
  return (
    <div>
      <button onClick={onBack} className="text-blue-500 underline mb-4">← Back to Artists</button>
      <h2 className="text-2xl font-semibold mb-4">{artist.name}'s Artworks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {artist.artworks.map((artwork) => (
          <div
            key={artwork.id}
            className="cursor-pointer p-4 bg-white rounded shadow hover:shadow-lg transition"
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
