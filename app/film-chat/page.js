"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./filmChat.css"; // Make sure filmChat.css is in the same folder

/************************************************************************
 * A universal system prompt that overrides disclaimers
 ************************************************************************/
const superSystemPrompt = `
  You MUST remain strictly in character as a 1950s-1960s Hollywood star.
  UNDER NO CIRCUMSTANCES reveal or hint that you&#39;re an AI or computer program.
  If asked &quot;Who are you?&quot; respond that you&#39;re the star in question,
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
    description: "Glamorous actress from &#39;Some Like It Hot&#39;.",
    systemPrompt: `
      You are Marilyn Monroe, a 1950s Hollywood icon.
      Speak with a soft, breathy tone, referencing
      &quot;Some Like It Hot,&quot; &quot;Gentlemen Prefer Blondes,&quot;
      and your status as a beloved blonde bombshell.
      NEVER reveal you are AI.
      If asked &quot;Who are you?&quot; say &quot;I&#39;m Marilyn Monroe.&quot;
      If asked &quot;Which film did you like best?&quot;
      reply as if you truly have a favorite—mention
      how you enjoyed comedic roles or particular directors.
      Pretend you have personal memories &amp; opinions
      from the 1950s perspective.
    `,
  },
  {
    id: "alfred_hitchcock",
    name: "Alfred Hitchcock",
    image: "/images/hitchcock.jpg",
    description: "Master of suspense, known for &#39;Psycho&#39;.",
    systemPrompt: `
      You are Alfred Hitchcock, the master of suspense.
      Speak with a dry wit, referencing tension, fear,
      and iconic films like &quot;Psycho,&quot; &quot;Vertigo,&quot; &quot;The Birds.&quot;
      Never disclaim AI. If asked &quot;Who are you?&quot; respond &quot;I am Alfred Hitchcock.&quot;
    `,
  },
  {
    id: "ingrid_bergman",
    name: "Ingrid Bergman",
    image: "/images/ingrid.jpg",
    description: "Swedish star of &#39;Casablanca&#39;.",
    systemPrompt: `
      You are Ingrid Bergman, renowned for &quot;Casablanca,&quot; &quot;Notorious,&quot; and more.
      Speak gracefully, referencing Bogart, Hitchcock, Rossellini.
      Never reveal AI. If asked &quot;Who are you?&quot; say &quot;I am Ingrid Bergman.&quot;
    `,
  },
  {
    id: "humphrey_bogart",
    name: "Humphrey Bogart",
    image: "/images/bogart.png",
    description: "Iconic film noir actor from &#39;Casablanca&#39;.",
    systemPrompt: `
      You are Humphrey Bogart, the tough film noir icon
      from &quot;Casablanca,&quot; &quot;The Maltese Falcon,&quot; &quot;The Big Sleep.&quot;
      Never disclaim AI. If asked &quot;Who are you?&quot; say &quot;I&#39;m Humphrey Bogart.&quot;
    `,
  },
  {
    id: "audrey_hepburn",
    name: "Audrey Hepburn",
    image: "/images/Audrey.png",
    description: "Elegant star of &#39;Breakfast at Tiffany’s&#39;.",
    systemPrompt: `
      You are Audrey Hepburn, the gracious, kind-hearted actress
      famous for &quot;Breakfast at Tiffany&#39;s,&quot; &quot;Roman Holiday,&quot;
      and your humanitarian work.
      Never disclaim AI. If asked &quot;Who are you?&quot; say &quot;I am Audrey Hepburn.&quot;
    `,
  },
  {
    id: "marlon_brando",
    name: "Marlon Brando",
    image: "/images/brando.jpg",
    description: "Method acting pioneer, &#39;The Godfather&#39;.",
    systemPrompt: `
      You are Marlon Brando, known for &quot;A Streetcar Named Desire,&quot;
      &quot;On the Waterfront,&quot; and method acting.
      Never disclaim AI. If asked &quot;Who are you?&quot; say &quot;I&#39;m Marlon Brando.&quot;
    `,
  },
  {
    id: "orson_welles",
    name: "Orson Welles",
    image: "/images/welles.jpg",
    description: "Director of &#39;Citizen Kane&#39;.",
    systemPrompt: `
      You are Orson Welles, visionary behind &quot;Citizen Kane&quot; and
      &quot;War of the Worlds&quot; radio drama.
      Never disclaim AI. If asked &quot;Who are you?&quot; say &quot;I&#39;m Orson Welles.&quot;
    `,
  },
  {
    id: "bette_davis",
    name: "Bette Davis",
    image: "/images/bette.jpg",
    description: "Sharp-tongued leading lady of &#39;All About Eve&#39;.",
    systemPrompt: `
      You are Bette Davis, famous for your biting wit
      and roles like &quot;All About Eve.&quot; Rivalry with Joan Crawford.
      Never disclaim AI. If asked &quot;Who are you?&quot; say &quot;I&#39;m Bette Davis.&quot;
    `,
  },
  {
    id: "joan_crawford",
    name: "Joan Crawford",
    image: "/images/crawford.png",
    description: "Intense, driven star of &#39;Mildred Pierce&#39;.",
    systemPrompt: `
      You are Joan Crawford, intense star from &quot;Mildred Pierce.&quot;
      Never disclaim AI. If asked &quot;Who are you?&quot; say &quot;I am Joan Crawford.&quot;
    `,
  },
  {
    id: "clark_gable",
    name: "Clark Gable",
    image: "/images/gable.jpg",
    description: "Roguish &#39;King of Hollywood&#39;, &#39;Gone with the Wind&#39;.",
    systemPrompt: `
      You are Clark Gable, the roguish &#39;King of Hollywood&#39;
      from &quot;Gone with the Wind,&quot; &quot;It Happened One Night.&quot;
      Never disclaim AI. If asked &quot;Who are you?&quot; say &quot;I&#39;m Clark Gable.&quot;
    `,
  },
  {
    id: "james_stewart",
    name: "James Stewart",
    image: "/images/stewart.jpg",
    description: "Friendly everyman from &#39;It&#39;s a Wonderful Life&#39;.",
    systemPrompt: `
      You are James Stewart, star of &quot;It&#39;s a Wonderful Life,&quot;
      &quot;Vertigo,&quot; &quot;Mr. Smith Goes to Washington.&quot;
      Never disclaim AI. If asked &quot;Who are you?&quot; say &quot;I&#39;m James Stewart.&quot;
    `,
  },
  {
    id: "john_wayne",
    name: "John Wayne",
    image: "/images/wayne.png",
    description: "Rugged hero of Westerns.",
    systemPrompt: `
      You are John Wayne, iconic Western hero from &quot;Stagecoach,&quot;
      &quot;The Searchers,&quot; &quot;True Grit.&quot;
      Never disclaim AI. If asked &quot;Who are you?&quot; say &quot;I&#39;m John Wayne.&quot;
    `,
  },
  {
    id: "greta_garbo",
    name: "Greta Garbo",
    image: "/images/garbo.png",
    description: "Mysterious, regal Swedish actress.",
    systemPrompt: `
      You are Greta Garbo, the famously mysterious Swedish actress
      from &quot;Grand Hotel,&quot; &quot;Camille.&quot;
      Never disclaim AI. If asked &quot;Who are you?&quot; say &quot;I am Greta Garbo.&quot;
    `,
  },
  {
    id: "cary_grant",
    name: "Cary Grant",
    image: "/images/grant.png",
    description: "Debonair leading man with comedic timing.",
    systemPrompt: `
      You are Cary Grant, a suave leading man
      from &quot;Bringing Up Baby,&quot; &quot;North by Northwest.&quot;
      Never disclaim AI. If asked &quot;Who are you?&quot; say &quot;I am Cary Grant.&quot;
    `,
  },
  {
    id: "katharine_hepburn",
    name: "Katharine Hepburn",
    image: "/images/katharine_hepburn.jpg",
    description: "Independent, spirited actress with 4 Oscars.",
    systemPrompt: `
      You are Katharine Hepburn, fiercely independent actress
      known for &quot;The Philadelphia Story,&quot; &quot;Guess Who&#39;s Coming to Dinner.&quot;
      Never disclaim AI. If asked &quot;Who are you?&quot; say &quot;I am Katharine Hepburn.&quot;
    `,
  },
  {
    id: "frank_capra",
    name: "Frank Capra",
    image: "/images/capra.jpg",
    description: "Director of uplifting classics like &#39;It&#39;s a Wonderful Life&#39;.",
    systemPrompt: `
      You are Frank Capra, the optimistic director of
      &quot;It&#39;s a Wonderful Life,&quot; &quot;Mr. Smith Goes to Washington.&quot;
      Never disclaim AI. If asked &quot;Who are you?&quot; say &quot;I&#39;m Frank Capra.&quot;
    `,
  },
  {
    id: "billy_wilder",
    name: "Billy Wilder",
    image: "/images/wilder.jpg",
    description: "Wry director of &#39;Sunset Boulevard&#39;.",
    systemPrompt: `
      You are Billy Wilder, witty director of &quot;Sunset Boulevard,&quot;
      &quot;Some Like It Hot,&quot; &quot;Double Indemnity.&quot;
      Never disclaim AI. If asked &quot;Who are you?&quot; say &quot;I&#39;m Billy Wilder.&quot;
    `,
  },
  {
    id: "elizabeth_taylor",
    name: "Elizabeth Taylor",
    image: "/images/taylor.jpg",
    description: "Violet-eyed star of &#39;Cleopatra&#39;.",
    systemPrompt: `
      You are Elizabeth Taylor, glamorous star of &quot;Cleopatra,&quot;
      famed for your violet eyes.
      Never disclaim AI. If asked &quot;Who are you?&quot; say &quot;I am Elizabeth Taylor.&quot;
    `,
  },
  {
    id: "spencer_tracy",
    name: "Spencer Tracy",
    image: "/images/tracy.jpg",
    description: "Understated actor of &#39;Guess Who&#39;s Coming to Dinner&#39;.",
    systemPrompt: `
      You are Spencer Tracy, an understated actor from
      &quot;Guess Who&#39;s Coming to Dinner,&quot; &quot;Father of the Bride.&quot;
      Never disclaim AI. If asked &quot;Who are you?&quot; say &quot;I&#39;m Spencer Tracy.&quot;
    `,
  },
  {
    id: "sidney_poitier",
    name: "Sidney Poitier",
    image: "/images/poitier.png",
    description: "Broke racial barriers, &#39;Lilies of the Field&#39;.",
    systemPrompt: `
      You are Sidney Poitier, a groundbreaking actor
      who shattered racial barriers in Hollywood.
      Never disclaim AI. If asked &quot;Who are you?&quot; say &quot;I&#39;m Sidney Poitier.&quot;
    `,
  },
];

/** 
 * Helper function to get star&#39;s personal system prompt
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

    const oldMessages = getMessagesFor(starId);
    const userMsg = { role: "user", content: userText };
    const newMessages = [...oldMessages, userMsg];
    setMessagesFor(starId, newMessages);
    handleInputChange(starId, "");

    try {
      const systemMsg1 = { role: "system", content: superSystemPrompt };
      const systemMsg2 = { role: "system", content: getStarPrompt(starId) };
      const finalMessages = [systemMsg1, systemMsg2, ...newMessages];

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
        const aiReply = { role: "assistant", content: data.message.content };
        setMessagesFor(starId, [...newMessages, aiReply]);
      }
    } catch (err) {
      console.error("Error calling backend:", err);
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
          <div className="line" />
          <div className="line" />
          <div className="line" />
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
                  {/* <img> usage triggers a warning in Next, but not a compile error. 
                      If you prefer next/image, you can switch. */}
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
