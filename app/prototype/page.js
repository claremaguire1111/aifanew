'use client';

import { useState } from 'react';
import ArtistSelection from '../components/ArtistSelection';
import ArtworkGallery from '../components/ArtworkGallery';
import ChatInterface from '../components/ChatInterface';
import NarrativePrompts from '../components/NarrativePrompts';
import FilmGeneration from '../components/FilmGeneration';
import SocialSharing from '../components/SocialSharing';
import artists from '../components/data/artists';
import './prototype.css';

/** 
 * ClassSelection component with about 40 subjects.
 */
function ClassSelection({ onSelectClass }) {
  const subjects = [
    { id: 'Art', label: 'Art', emoji: '🎨' },
    { id: 'Music', label: 'Music', emoji: '🎵' },
    { id: 'History', label: 'History', emoji: '🏛️' },
    { id: 'Geography', label: 'Geography', emoji: '🗺️' },
    { id: 'Psychology', label: 'Psychology', emoji: '🧠' },
    { id: 'Business', label: 'Business', emoji: '💼' },
    { id: 'Fashion', label: 'Fashion', emoji: '👗' },
    { id: 'Beauty', label: 'Beauty', emoji: '💄' },
    { id: 'Science', label: 'Science', emoji: '🔬' },
    { id: 'Fitness', label: 'Fitness', emoji: '🏋️' },
    { id: 'FilmStudies', label: 'Film Studies', emoji: '🎬' },
    { id: 'FoodTech', label: 'Food Tech', emoji: '🍳' },
    { id: 'Photography', label: 'Photography', emoji: '📷' },
    { id: 'Design', label: 'Design', emoji: '🖌️' },
    { id: 'Philosophy', label: 'Philosophy', emoji: '🤔' },
    { id: 'Geometry', label: 'Geometry', emoji: '📐' },
    { id: 'Code', label: 'Code', emoji: '💻' },
    { id: 'Engineering', label: 'Engineering', emoji: '⚙️' },
    { id: 'Dressmaking', label: 'Dressmaking', emoji: '🪡' },
    { id: 'Math', label: 'Math', emoji: '➗' },
    { id: 'Literature', label: 'Literature', emoji: '📚' },
    { id: 'Biology', label: 'Biology', emoji: '🧬' },
    { id: 'Chemistry', label: 'Chemistry', emoji: '⚗️' },
    { id: 'Physics', label: 'Physics', emoji: '🪐' },
    { id: 'Economics', label: 'Economics', emoji: '📈' },
    { id: 'Sociology', label: 'Sociology', emoji: '👥' },
    { id: 'Politics', label: 'Politics', emoji: '🏛' },
    { id: 'Drama', label: 'Drama', emoji: '🎭' },
    { id: 'Dance', label: 'Dance', emoji: '💃' },
    { id: 'Language', label: 'Language', emoji: '🗣️' },
    { id: 'Astronomy', label: 'Astronomy', emoji: '🌌' },
    { id: 'Architecture', label: 'Architecture', emoji: '🏗️' },
    { id: 'Robotics', label: 'Robotics', emoji: '🤖' },
    { id: 'ComputerScience', label: 'Computer Science', emoji: '🖥️' },
    { id: 'CreativeWriting', label: 'Creative Writing', emoji: '✍️' },
    { id: 'CulinaryArts', label: 'Culinary Arts', emoji: '🍲' },
    { id: 'SportsScience', label: 'Sports Science', emoji: '🏅' },
    { id: 'MusicProduction', label: 'Music Production', emoji: '🎧' },
    { id: 'GraphicDesign', label: 'Graphic Design', emoji: '🖍️' },
    { id: 'Pharmacology', label: 'Pharmacology', emoji: '💊' },
  ];

  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-8">
        Welcome to your AIFA class!
      </h1>
      <p className="mb-6 text-lg">
        Pick a subject below to get started!
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        {subjects.map((subj) => (
          <button
            key={subj.id}
            onClick={() => onSelectClass(subj.id)}
            className="bg-white/10 hover:bg-white/20 text-white
                       w-24 h-24 rounded-full flex flex-col 
                       items-center justify-center text-xl 
                       font-semibold transition shadow hover:shadow-lg"
          >
            <span className="text-3xl">{subj.emoji}</span>
            <span className="text-sm mt-1">{subj.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PrototypePage() {
  // Step 0: Track which class is chosen
  const [selectedClass, setSelectedClass] = useState(null);

  // Steps from your original flow:
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [prompts, setPrompts] = useState(null);
  const [generatedFilm, setGeneratedFilm] = useState(null);

  return (
    <div className="min-h-screen text-gray-100 p-4 font-sans">
      {/* AIFA Logo at top */}
      <header className="flex justify-center mb-8">
        <img src="/images/AIFAlogo.png" alt="AIFA Logo" className="h-16" />
      </header>

      {/* Step 0: Class Selection */}
      {!selectedClass && (
        <ClassSelection onSelectClass={(cls) => setSelectedClass(cls)} />
      )}

      {/* If "Art" is selected, proceed with the artist flow */}
      {selectedClass === 'Art' && !selectedArtist && (
        <ArtistSelection
          artists={artists}
          onSelect={setSelectedArtist}
        />
      )}

      {selectedArtist && !selectedArtwork && (
        <ArtworkGallery
          artist={selectedArtist}
          onSelectArtwork={setSelectedArtwork}
          onBack={() => setSelectedArtist(null)}
        />
      )}

      {selectedArtwork && !prompts && (
        <div className="space-y-8">
          <button
            onClick={() => setSelectedArtwork(null)}
            className="underline mb-4 text-red-500 hover:text-red-400"
          >
            ← Back to Artwork Gallery
          </button>
          <ChatInterface
            artist={selectedArtist}
            artwork={selectedArtwork}
          />
          <NarrativePrompts
            selectedArtwork={selectedArtwork}
            onPromptsReady={setPrompts}
          />
        </div>
      )}

      {prompts && !generatedFilm && (
        <FilmGeneration
          prompts={prompts}
          onFilmReady={setGeneratedFilm}
        />
      )}

      {generatedFilm && (
        <SocialSharing filmUrl={generatedFilm} />
      )}
    </div>
  );
}
