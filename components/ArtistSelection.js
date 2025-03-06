'use client';  // <-- Add this at the top

export default function ArtistSelection({ artists, onSelect }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Choose an Artist to Learn From</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="cursor-pointer p-4 bg-white rounded shadow hover:shadow-lg transition"
            onClick={() => onSelect(artist)}
          >
            <img
              src={artist.image}
              alt={artist.name}
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="mt-2 text-xl font-bold">{artist.name}</h3>
            <p className="text-sm text-gray-600">{artist.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
