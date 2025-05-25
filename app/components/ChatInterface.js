'use client';

import { useState } from 'react';
import axios from 'axios';

export default function ChatInterface({ artist, artwork }) {
  const [messages, setMessages] = useState([
    {
      sender: artist.name,
      text: `Hello, I’m ${artist.name}. Let’s talk about "${artwork.title}"! Ask me anything.`,
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: 'You', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post('/api/ask', {
        message: input,
        artistId: artist.id,
      });
      setMessages((prev) => [
        ...prev,
        { sender: artist.name, text: response.data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: artist.name, text: 'Sorry, something went wrong.' },
      ]);
    }
  };

  return (
    <div className="glass p-6 rounded-xl shadow-xl">
      <div className="flex items-center mb-4">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-12 h-12 object-cover rounded-full mr-3"
        />
        <h2 className="text-2xl font-semibold">Chat with {artist.name}</h2>
      </div>
      <div className="h-64 overflow-y-auto border border-white/10 p-4 mb-4 bg-white/5 rounded">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong className="text-red-500">{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          className="flex-1 border border-white/10 p-2 rounded bg-black/30 placeholder-gray-400 focus:outline-none"
          type="text"
          value={input}
          placeholder="Ask a question..."
          onChange={(e) => setInput(e.target.value)}
        />
        {/* Use .btn instead of inline gradient classes */}
        <button onClick={handleSend} className="btn">
          Send
        </button>
      </div>
    </div>
  );
}
