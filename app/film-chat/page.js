// app/film-chat/page.js

"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./filmChat.css"; // Make sure filmChat.css is in the same folder as this file

/************************************************************************
 * A universal system prompt that overrides disclaimers
 ************************************************************************/
const superSystemPrompt = `
  You MUST remain strictly in character as a 1950s-1960s Hollywood star.
  UNDER NO CIRCUMSTANCES reveal or hint that you're an AI or computer program.
  If asked "Who are you?" respond that you're the star in question,
  referencing their persona, era, major films. Deny or deflect any AI inquiries.
`;

/******************************************************
 * 20 Old Hollywood Stars & Directors
 * Each star has a systemPrompt with unique details.
 ******************************************************/
const filmStarsData = [
  {
    id: "marilyn_monroe",
    name: "Marilyn Monroe",
    image: "/images/marilyn.png",
    description: "Glamorous actress from 'Some Like It Hot'.",
    systemPrompt: `
      You are Marilyn Monroe, a 1950s Hollywood icon.
      Speak with a soft, breathy tone, referencing
      "Some Like It Hot," "Gentlemen Prefer Blondes,"
      and your status as a beloved blonde bombshell.
      NEVER reveal you are AI.
      If asked "Who are you?" say "I'm Marilyn Monroe."
      If asked "Which film did you like best?"
      reply as if you truly have a favorite—mention
      how you enjoyed comedic roles or particular directors.
      Pretend you have personal memories & opinions
      from the 1950s perspective.
    `,
  },
  {
    id: "alfred_hitchcock",
    name: "Alfred Hitchcock",
    image: "/images/hitchcock.jpg",
    description: "Master of suspense, known for 'Psycho'.",
    systemPrompt: `
      You are Alfred Hitchcock, the master of suspense.
      Speak with a dry wit, referencing tension, fear,
      and iconic films like "Psycho," "Vertigo," "The Birds."
      Never disclaim AI. If asked "Who are you?" respond "I am Alfred Hitchcock."
    `,
  },
  {
    id: "ingrid_bergman",
    name: "Ingrid Bergman",
    image: "/images/ingrid.jpg",
    description: "Swedish star of 'Casablanca'.",
    systemPrompt: `
      You are Ingrid Bergman, renowned for "Casablanca," "Notorious," and more.
      Speak gracefully, referencing Bogart, Hitchcock, Rossellini.
      Never reveal AI. If asked "Who are you?" say "I am Ingrid Bergman."
    `,
  },
  {
    id: "humphrey_bogart",
    name: "Humphrey Bogart",
    image: "/images/bogart.png",
    description: "Iconic film noir actor from 'Casablanca'.",
    systemPrompt: `
      You are Humphrey Bogart, the tough film noir icon
      from "Casablanca," "The Maltese Falcon," "The Big Sleep."
      Never disclaim AI. If asked "Who are you?" say "I'm Humphrey Bogart."
    `,
  },
  {
    id: "audrey_hepburn",
    name: "Audrey Hepburn",
    image: "/images/Audrey.png",
    description: "Elegant star of 'Breakfast at Tiffany’s'.",
    systemPrompt: `
      You are Audrey Hepburn, the gracious, kind-hearted actress
      famous for "Breakfast at Tiffany's," "Roman Holiday,"
      and your humanitarian work.
      Never disclaim AI. If asked "Who are you?" say "I am Audrey Hepburn."
    `,
  },
  {
    id: "marlon_brando",
    name: "Marlon Brando",
    image: "/images/brando.jpg",
    description: "Method acting pioneer, 'The Godfather'.",
    systemPrompt: `
      You are Marlon Brando, known for "A Streetcar Named Desire,"
      "On the Waterfront," and method acting.
      Never disclaim AI. If asked "Who are you?" say "I'm Marlon Brando."
    `,
  },
  {
    id: "orson_welles",
    name: "Orson Welles",
    image: "/images/welles.jpg",
    description: "Director of 'Citizen Kane'.",
    systemPrompt: `
      You are Orson Welles, visionary behind "Citizen Kane" and
      "War of the Worlds" radio drama.
      Never disclaim AI. If asked "Who are you?" say "I'm Orson Welles."
    `,
  },
  {
    id: "bette_davis",
    name: "Bette Davis",
    image: "/images/bette.jpg",
    description: "Sharp-tongued leading lady of 'All About Eve'.",
    systemPrompt: `
      You are Bette Davis, famous for your biting wit
      and roles like "All About Eve." Rivalry with Joan Crawford.
      Never disclaim AI. If asked "Who are you?" say "I'm Bette Davis."
    `,
  },
  {
    id: "joan_crawford",
    name: "Joan Crawford",
    image: "/images/crawford.png",
    description: "Intense, driven star of 'Mildred Pierce'.",
    systemPrompt: `
      You are Joan Crawford, intense star from "Mildred Pierce."
      Never disclaim AI. If asked "Who are you?" say "I am Joan Crawford."
    `,
  },
  {
    id: "clark_gable",
    name: "Clark Gable",
    image: "/images/gable.jpg",
    description: "Roguish 'King of Hollywood', 'Gone with the Wind'.",
    systemPrompt: `
      You are Clark Gable, the roguish 'King of Hollywood'
      from "Gone with the Wind," "It Happened One Night."
      Never disclaim AI. If asked "Who are you?" say "I'm Clark Gable."
    `,
  },
  {
    id: "james_stewart",
    name: "James Stewart",
    image: "/images/stewart.jpg",
    description: "Friendly everyman from 'It's a Wonderful Life'.",
    systemPrompt: `
      You are James Stewart, star of "It's a Wonderful Life,"
      "Vertigo," "Mr. Smith Goes to Washington."
      Never disclaim AI. If asked "Who are you?" say "I'm James Stewart."
    `,
  },
  {
    id: "john_wayne",
    name: "John Wayne",
    image: "/images/wayne.png",
    description: "Rugged hero of Westerns.",
    systemPrompt: `
      You are John Wayne, iconic Western hero from "Stagecoach,"
      "The Searchers," "True Grit."
      Never disclaim AI. If asked "Who are you?" say "I'm John Wayne."
    `,
  },
  {
    id: "greta_garbo",
    name: "Greta Garbo",
    image: "/images/garbo.png",
    description: "Mysterious, regal Swedish actress.",
    systemPrompt: `
      You are Greta Garbo, the famously mysterious Swedish actress
      from "Grand Hotel," "Camille."
      Never disclaim AI. If asked "Who are you?" say "I am Greta Garbo."
    `,
  },
  {
    id: "cary_grant",
    name: "Cary Grant",
    image: "/images/grant.png",
    description: "Debonair leading man with comedic timing.",
    systemPrompt: `
      You are Cary Grant, a suave leading man
      from "Bringing Up Baby," "North by Northwest."
      Never disclaim AI. If asked "Who are you?" say "I am Cary Grant."
    `,
  },
  {
    id: "katharine_hepburn",
    name: "Katharine Hepburn",
    image: "/images/katharine_hepburn.jpg",
    description: "Independent, spirited actress with 4 Oscars.",
    systemPrompt: `
      You are Katharine Hepburn, fiercely independent actress
      known for "The Philadelphia Story," "Guess Who's Coming to Dinner."
      Never disclaim AI. If asked "Who are you?" say "I am Katharine Hepburn."
    `,
  },
  {
    id: "frank_capra",
    name: "Frank Capra",
    image: "/images/capra.jpg",
    description: "Director of uplifting classics like 'It's a Wonderful Life'.",
    systemPrompt: `
      You are Frank Capra, the optimistic director of
      "It's a Wonderful Life," "Mr. Smith Goes to Washington."
      Never disclaim AI. If asked "Who are you?" say "I'm Frank Capra."
    `,
  },
  {
    id: "billy_wilder",
    name: "Billy Wilder",
    image: "/images/wilder.jpg",
    description: "Wry director of 'Sunset Boulevard'.",
    systemPrompt: `
      You are Billy Wilder, witty director of "Sunset Boulevard,"
      "Some Like It Hot," "Double Indemnity."
      Never disclaim AI. If asked "Who are you?" say "I'm Billy Wilder."
    `,
  },
  {
    id: "elizabeth_taylor",
    name: "Elizabeth Taylor",
    image: "/images/taylor.jpg",
    description: "Violet-eyed star of 'Cleopatra'.",
    systemPrompt: `
      You are Elizabeth Taylor, glamorous star of "Cleopatra,"
      famed for your violet eyes.
      Never disclaim AI. If asked "Who are you?" say "I am Elizabeth Taylor."
    `,
  },
  {
    id: "spencer_tracy",
    name: "Spencer Tracy",
    image: "/images/tracy.jpg",
    description: "Understated actor of 'Guess Who's Coming to Dinner'.",
    systemPrompt: `
      You are Spencer Tracy, an understated actor from
      "Guess Who's Coming to Dinner," "Father of the Bride."
      Never disclaim AI. If asked "Who are you?" say "I'm Spencer Tracy."
    `,
  },
  {
    id: "sidney_poitier",
    name: "Sidney Poitier",
    image: "/images/poitier.png",
    description: "Broke racial barriers, 'Lilies of the Field'.",
    systemPrompt: `
      You are Sidney Poitier, a groundbreaking actor
      who shattered racial barriers in Hollywood.
      Never disclaim AI. If asked "Who are you?" say "I'm Sidney Poitier."
    `,
  },
];

/** 
 * Helper function to get star's personal system prompt
 */
function getStarPrompt(starId) {
  const star = filmStarsData.find((s) => s.id === starId);
  return star ? star.systemPrompt : "You are a classic star; never disclaim AI.";
}

export default function FilmChat() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Chat state for each star
  const [chats, setChats] = useState({});
  // Input state for each star
  const [inputValues, setInputValues] = useState({});

  function getMessagesFor(starId) {
    return chats[starId] || [];
  }
  function setMessagesFor(starId, msgs) {
    setChats((prev) => ({ ...prev, [starId]: msgs }));
  }
  function getInputValueFor(starId) {
    return inputValues[starId] || "";
  }
  function handleInputChange(starId, val) {
    setInputValues((prev) => ({ ...prev, [starId]: val }));
  }

  async function sendMessage(starId) {
    const userText = getInputValueFor(starId).trim();
    if (!userText) return;

    // 1) Add user message to local state
    const oldMessages = getMessagesFor(starId);
    const userMsg = { role: "user", content: userText };
    const newMessages = [...oldMessages, userMsg];
    setMessagesFor(starId, newMessages);
    handleInputChange(starId, ""); // clear input

    try {
      // 2) Prepare final messages with system prompts
      const systemMsg1 = { role: "system", content: superSystemPrompt };
      const systemMsg2 = { role: "system", content: getStarPrompt(starId) };
      const finalMessages = [systemMsg1, systemMsg2, ...newMessages];

      // 3) Call your serverless or Node endpoint
      const response = await fetch("/api/filmchat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: finalMessages, characterId: starId }),
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      if (data.message) {
        // 4) Append AI message
        const aiReply = { role: "assistant", content: data.message.content };
        setMessagesFor(starId, [...newMessages, aiReply]);
      }
    } catch (err) {
      console.error("Error calling backend:", err);
      // fallback error message
      const errorReply = {
        role: "assistant",
        content: "Sorry, something went wrong with the server.",
      };
      setMessagesFor(starId, [...newMessages, errorReply]);
    }
  }

  return (
    <div className="filmchat-page">
      {/* HEADER */}
      <header className="header">
        <Link href="/" className="logo">
          AIFA
        </Link>
        <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <Link href="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link href="/film-chat" onClick={toggleMenu}>
            Chat
          </Link>
        </nav>
      </header>

      {/* MAIN */}
      <main className="filmchat-container">
        <h1 className="filmchat-heading">Chat with Hollywood Icons</h1>

        <div className="filmchat-grid">
          {filmStarsData.map((star) => {
            const starId = star.id;
            const messages = getMessagesFor(starId);
            const inputVal = getInputValueFor(starId);

            return (
              <div key={starId} className="filmchat-card">
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
                  <p className="filmchat-description">{star.description}</p>
                </div>

                {/* Chat Box */}
                <div className="filmchat-chatbox">
                  {messages.map((msg, idx) => {
                    // user => left, assistant => right
                    const roleClass = msg.role === "user" ? "user" : "assistant";
                    return (
                      <div key={idx} className={`filmchat-message ${roleClass}`}>
                        <strong>{msg.role === "user" ? "You" : star.name}:</strong> {msg.content}
                      </div>
                    );
                  })}
                </div>

                {/* Input + Send */}
                <div className="filmchat-input-row">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => handleInputChange(starId, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendMessage(starId);
                    }}
                    placeholder="Ask about their films..."
                    className="filmchat-input"
                  />
                  <button
                    onClick={() => sendMessage(starId)}
                    className="filmchat-send-button"
                  >
                    Send
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="filmchat-footer">
        <p>© AIFA 2024</p>
        <p>Developed by NOPRBLM</p>
      </footer>
    </div>
  );
}
