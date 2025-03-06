'use client';  // <-- Add this at the top

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
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: artist.name, text: 'Sorry, something went wrong.' },
      ]);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Chat with {artist.name}</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          className="flex-1 border p-2 rounded"
          type="text"
          value={input}
          placeholder="Ask a question..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
