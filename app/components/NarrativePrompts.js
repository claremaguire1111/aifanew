'use client';

import { useState } from 'react';
import axios from 'axios';

export default function NarrativePrompts({ selectedArtwork, onPromptsReady }) {
  const [beginningOptions, setBeginningOptions] = useState([]);
  const [middleOptions, setMiddleOptions] = useState([]);
  const [endOptions, setEndOptions] = useState([]);

  const [selectedBeginning, setSelectedBeginning] = useState('');
  const [selectedMiddle, setSelectedMiddle] = useState('');
  const [selectedEnd, setSelectedEnd] = useState('');

  const [loadingSection, setLoadingSection] = useState(null);

  const parseOptions = (text) => {
    return text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.startsWith('-') || line.startsWith('•'))
      .map((line) => line.replace(/^[-•]\s*/, ''));
  };

  const generatePrompts = async (section) => {
    setLoadingSection(section);
    try {
      const response = await axios.post('/api/ask', {
        message: `
          Please provide 3 short bullet-point options for the ${section} 
          of a film inspired by "${selectedArtwork.title}".
          Keep them concise and creative.
        `,
        artistId: 'narrative_system',
      });
      const options = parseOptions(response.data.reply || '');
      if (section === 'beginning') {
        setBeginningOptions(options);
        setSelectedBeginning('');
      } else if (section === 'middle') {
        setMiddleOptions(options);
        setSelectedMiddle('');
      } else {
        setEndOptions(options);
        setSelectedEnd('');
      }
    } catch (error) {
      console.error('Error generating prompts:', error);
    } finally {
      setLoadingSection(null);
    }
  };

  const handleFinalize = () => {
    const finalPrompt = `
      Beginning: ${selectedBeginning}
      Middle: ${selectedMiddle}
      End: ${selectedEnd}
    `;
    onPromptsReady(finalPrompt.trim());
  };

  return (
    <div className="bg-white/10 p-6 rounded-xl shadow-xl backdrop-blur-sm space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Get Narrative Prompts for Your Short Film</h2>

      {/* BEGINNING Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Beginning</h3>
          <button
            onClick={() => generatePrompts('beginning')}
            disabled={loadingSection === 'beginning'}
            className="btn"
          >
            {loadingSection === 'beginning' ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {beginningOptions.length > 0 && (
          <div className="space-y-2">
            {beginningOptions.map((option, idx) => (
              <label key={idx} className="block bg-black/20 p-2 rounded cursor-pointer">
                <input
                  type="radio"
                  name="beginning"
                  value={option}
                  checked={selectedBeginning === option}
                  onChange={(e) => setSelectedBeginning(e.target.value)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* MIDDLE Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Middle</h3>
          <button
            onClick={() => generatePrompts('middle')}
            disabled={loadingSection === 'middle'}
            className="btn"
          >
            {loadingSection === 'middle' ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {middleOptions.length > 0 && (
          <div className="space-y-2">
            {middleOptions.map((option, idx) => (
              <label key={idx} className="block bg-black/20 p-2 rounded cursor-pointer">
                <input
                  type="radio"
                  name="middle"
                  value={option}
                  checked={selectedMiddle === option}
                  onChange={(e) => setSelectedMiddle(e.target.value)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* END Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">End</h3>
          <button
            onClick={() => generatePrompts('end')}
            disabled={loadingSection === 'end'}
            className="btn"
          >
            {loadingSection === 'end' ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {endOptions.length > 0 && (
          <div className="space-y-2">
            {endOptions.map((option, idx) => (
              <label key={idx} className="block bg-black/20 p-2 rounded cursor-pointer">
                <input
                  type="radio"
                  name="end"
                  value={option}
                  checked={selectedEnd === option}
                  onChange={(e) => setSelectedEnd(e.target.value)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Finalize Button */}
      {selectedBeginning && selectedMiddle && selectedEnd && (
        <button onClick={handleFinalize} className="btn">
          Finalize & Use These Prompts
        </button>
      )}
    </div>
  );
}
