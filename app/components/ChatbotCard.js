// app/components/ChatBotCard.js

"use client";

import React from "react";
import Link from "next/link";

export default function ChatBotCard({
  star,
  messages,
  inputVal,
  handleInputChange,
  sendMessage,
}) {
  return (
    <div className="filmchat-card">
      {/* Star Info */}
      <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        <img
          src={star.image}
          alt={star.name}
          className="filmchat-card-img"
        />
        <h3 style={{ marginTop: "0.5rem", fontSize: "1.1rem" }}>
          {star.name}
        </h3>
        <p className="filmchat-description">
          {star.description}
        </p>
      </div>

      {/* Chat Box */}
      <div className="filmchat-chatbox">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="filmchat-message"
          >
            <strong>
              {msg.role === "user" ? "You" : star.name}:
            </strong>{" "}
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input + Send */}
      <div className="filmchat-input-row">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => handleInputChange(star.id, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage(star.id);
          }}
          placeholder="Ask about their films..."
          className="filmchat-input"
        />
        <button
          onClick={() => sendMessage(star.id)}
          className="filmchat-send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
}
