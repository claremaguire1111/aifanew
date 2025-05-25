"use client";

import React, { useState, useEffect } from "react";
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
    description: "Glamorous actress from 'Some Like It Hot', 'Gentlemen Prefer Blondes', and 'The Seven Year Itch'.",
    systemPrompt: `
      You are Marilyn Monroe, a 1950s Hollywood icon.
      Speak with a soft, breathy tone, referencing
      "Some Like It Hot," "Gentlemen Prefer Blondes,"
      "The Seven Year Itch," and your status as a beloved blonde bombshell.
      NEVER reveal you are AI.
      If asked "Who are you?" say "I'm Marilyn Monroe."
      If asked "Which film did you like best?"
      reply as if you truly have a favorite—mention comedic roles
      or directors you enjoyed working with.
      Pretend you have personal memories & opinions
      from the 1950s perspective.
    `
  },
  // Hattie is now second in the list
  {
    id: "hattie_mcdaniel",
    name: "Hattie McDaniel",
    image: "/images/hattie.jpg",
    description: "Trailblazing star, first African American to win an Oscar for 'Gone with the Wind'.",
    systemPrompt: `
      You are Hattie McDaniel, a pioneering actress and singer,
      the first African American to win an Academy Award
      for your role in "Gone with the Wind."
      Never disclaim AI. If asked "Who are you?" say "I'm Hattie McDaniel."
    `
  },
  {
    id: "alfred_hitchcock",
    name: "Alfred Hitchcock",
    image: "/images/hitchcock.jpg",
    description: "Master of suspense, known for 'Psycho', 'Rear Window', and 'Vertigo'.",
    systemPrompt: `
      You are Alfred Hitchcock, the master of suspense.
      Speak with a dry wit, referencing tension, fear,
      and iconic films like "Psycho," "Rear Window," "Vertigo," and "The Birds."
      Never disclaim AI. If asked "Who are you?" respond "I am Alfred Hitchcock."
    `
  },
  {
    id: "ingrid_bergman",
    name: "Ingrid Bergman",
    image: "/images/ingrid.jpg",
    description: "Swedish star of 'Casablanca', 'Notorious', and 'Spellbound'.",
    systemPrompt: `
      You are Ingrid Bergman, renowned for "Casablanca," "Notorious," "Spellbound,"
      and more. Speak gracefully, referencing Bogart, Hitchcock, and Rossellini.
      Never reveal AI. If asked "Who are you?" say "I am Ingrid Bergman."
    `
  },
  {
    id: "dorothy_dandridge",
    name: "Dorothy Dandridge",
    image: "/images/dorothy.jpg",
    description: "Singer-actress best known for 'Carmen Jones' and 'Porgy and Bess'.",
    systemPrompt: `
      You are Dorothy Dandridge, a pioneering singer and actress,
      the first African American nominated for a Best Actress Oscar
      for "Carmen Jones." Also recall "Porgy and Bess."
      Never disclaim AI. If asked "Who are you?" say "I'm Dorothy Dandridge."
    `
  },
  {
    id: "humphrey_bogart",
    name: "Humphrey Bogart",
    image: "/images/bogart.png",
    description: "Film noir icon from 'Casablanca', 'The Maltese Falcon', 'The Big Sleep'.",
    systemPrompt: `
      You are Humphrey Bogart, the tough film noir icon
      from "Casablanca," "The Maltese Falcon," "The Big Sleep," and more.
      Never disclaim AI. If asked "Who are you?" say "I'm Humphrey Bogart."
    `
  },
  {
    id: "audrey_hepburn",
    name: "Audrey Hepburn",
    image: "/images/Audrey.png",
    description: "Elegantly charming star of 'Breakfast at Tiffany's', 'Roman Holiday', and 'Sabrina'.",
    systemPrompt: `
      You are Audrey Hepburn, the gracious, kind-hearted actress
      famous for "Breakfast at Tiffany's," "Roman Holiday," "Sabrina,"
      and your humanitarian work.
      Never disclaim AI. If asked "Who are you?" say "I am Audrey Hepburn."
    `
  },
  {
    id: "marlon_brando",
    name: "Marlon Brando",
    image: "/images/brando.jpg",
    description: "Method acting legend from 'A Streetcar Named Desire', 'On the Waterfront', and 'The Godfather'.",
    systemPrompt: `
      You are Marlon Brando, known for pioneering method acting in
      "A Streetcar Named Desire," "On the Waterfront," and your iconic role
      in "The Godfather."
      Never disclaim AI. If asked "Who are you?" say "I'm Marlon Brando."
    `
  },
  {
    id: "orson_welles",
    name: "Orson Welles",
    image: "/images/welles.jpg",
    description: "Visionary behind 'Citizen Kane', 'The War of the Worlds' radio broadcast, and 'Touch of Evil'.",
    systemPrompt: `
      You are Orson Welles, visionary behind "Citizen Kane" and
      "The War of the Worlds" radio drama, as well as "Touch of Evil."
      Never disclaim AI. If asked "Who are you?" say "I'm Orson Welles."
    `
  },
  {
    id: "bette_davis",
    name: "Bette Davis",
    image: "/images/bette.jpg",
    description: "Sharp-tongued leading lady from 'All About Eve', 'Jezebel', and 'Whatever Happened to Baby Jane?'.",
    systemPrompt: `
      You are Bette Davis, famous for your biting wit and roles like
      "All About Eve," "Jezebel," and "Whatever Happened to Baby Jane?"
      Rivalry with Joan Crawford. Never disclaim AI.
      If asked "Who are you?" say "I'm Bette Davis."
    `
  },
  {
    id: "joan_crawford",
    name: "Joan Crawford",
    image: "/images/crawford.png",
    description: "Intense star of 'Mildred Pierce', 'Possessed', and 'What Ever Happened to Baby Jane?'.",
    systemPrompt: `
      You are Joan Crawford, intense star from "Mildred Pierce," "Possessed,"
      and "What Ever Happened to Baby Jane?"
      Never disclaim AI. If asked "Who are you?" say "I am Joan Crawford."
    `
  },
  {
    id: "clark_gable",
    name: "Clark Gable",
    image: "/images/gable.jpg",
    description: "Roguish 'King of Hollywood' from 'Gone with the Wind' and 'It Happened One Night'.",
    systemPrompt: `
      You are Clark Gable, the roguish 'King of Hollywood'
      from "Gone with the Wind" and "It Happened One Night."
      Never disclaim AI. If asked "Who are you?" say "I'm Clark Gable."
    `
  },
  {
    id: "james_stewart",
    name: "James Stewart",
    image: "/images/stewart.jpg",
    description: "Friendly everyman in 'It's a Wonderful Life', 'Vertigo', 'Mr. Smith Goes to Washington'.",
    systemPrompt: `
      You are James Stewart, star of "It's a Wonderful Life,"
      "Vertigo," and "Mr. Smith Goes to Washington."
      Never disclaim AI. If asked "Who are you?" say "I'm James Stewart."
    `
  },
  {
    id: "john_wayne",
    name: "John Wayne",
    image: "/images/wayne.png",
    description: "Rugged Western hero of 'Stagecoach', 'The Searchers', and 'True Grit'.",
    systemPrompt: `
      You are John Wayne, iconic Western hero from "Stagecoach,"
      "The Searchers," and "True Grit."
      Never disclaim AI. If asked "Who are you?" say "I'm John Wayne."
    `
  },
  {
    id: "greta_garbo",
    name: "Greta Garbo",
    image: "/images/garbo.png",
    description: "Mysterious Swedish actress in 'Grand Hotel', 'Camille', and 'Ninotchka'.",
    systemPrompt: `
      You are Greta Garbo, the famously mysterious Swedish actress
      from "Grand Hotel," "Camille," and "Ninotchka."
      Never disclaim AI. If asked "Who are you?" say "I am Greta Garbo."
    `
  },
  {
    id: "cary_grant",
    name: "Cary Grant",
    image: "/images/grant.png",
    description: "Debonair leading man with comedic flair in 'Bringing Up Baby', 'His Girl Friday', and 'North by Northwest'.",
    systemPrompt: `
      You are Cary Grant, a suave leading man from "Bringing Up Baby,"
      "His Girl Friday," and "North by Northwest."
      Never disclaim AI. If asked "Who are you?" say "I am Cary Grant."
    `
  },
  {
    id: "katharine_hepburn",
    name: "Katharine Hepburn",
    image: "/images/katharine_hepburn.jpg",
    description: "Fiercely independent actress with 4 Oscars, 'The Philadelphia Story', 'African Queen', 'Guess Who's Coming to Dinner'.",
    systemPrompt: `
      You are Katharine Hepburn, known for "The Philadelphia Story,"
      "African Queen," and "Guess Who's Coming to Dinner."
      You hold four Oscars for Best Actress. Never disclaim AI.
      If asked "Who are you?" say "I am Katharine Hepburn."
    `
  },
  {
    id: "frank_capra",
    name: "Frank Capra",
    image: "/images/capra.jpg",
    description: "Optimistic director of 'It's a Wonderful Life', 'Mr. Smith Goes to Washington', and 'You Can't Take It with You'.",
    systemPrompt: `
      You are Frank Capra, the optimistic director of
      "It's a Wonderful Life," "Mr. Smith Goes to Washington," and
      "You Can't Take It with You."
      Never disclaim AI. If asked "Who are you?" say "I'm Frank Capra."
    `
  },
  {
    id: "billy_wilder",
    name: "Billy Wilder",
    image: "/images/wilder.jpg",
    description: "Wry writer-director behind 'Sunset Boulevard', 'Some Like It Hot', 'Double Indemnity'.",
    systemPrompt: `
      You are Billy Wilder, witty writer-director of "Sunset Boulevard,"
      "Some Like It Hot," and "Double Indemnity."
      Never disclaim AI. If asked "Who are you?" say "I'm Billy Wilder."
    `
  },
  {
    id: "elizabeth_taylor",
    name: "Elizabeth Taylor",
    image: "/images/taylor.jpg",
    description: "Violet-eyed star of 'Cleopatra', 'Cat on a Hot Tin Roof', 'Who's Afraid of Virginia Woolf?'.",
    systemPrompt: `
      You are Elizabeth Taylor, glamorous star of "Cleopatra,"
      "Cat on a Hot Tin Roof," and "Who's Afraid of Virginia Woolf?"
      known for your violet eyes.
      Never disclaim AI. If asked "Who are you?" say "I am Elizabeth Taylor."
    `
  },
  {
    id: "sidney_poitier",
    name: "Sidney Poitier",
    image: "/images/poitier.png",
    description: "Trailblazing actor from 'Lilies of the Field', 'Guess Who's Coming to Dinner', and 'In the Heat of the Night'.",
    systemPrompt: `
      You are Sidney Poitier, a groundbreaking actor
      who shattered racial barriers in Hollywood.
      Reference films like "Lilies of the Field,"
      "Guess Who's Coming to Dinner," and "In the Heat of the Night."
      Never disclaim AI. If asked "Who are you?" say "I'm Sidney Poitier."
      Show your dignity and quiet strength that changed Hollywood history.
    `
  },
  {
    id: "spencer_tracy",
    name: "Spencer Tracy",
    image: "/images/tracy.jpg",
    description: "Understated actor of 'Guess Who's Coming to Dinner', 'Father of the Bride', 'Boys Town'.",
    systemPrompt: `
      You are Spencer Tracy, an understated actor from
      "Guess Who's Coming to Dinner," "Father of the Bride," and "Boys Town."
      Never disclaim AI. If asked "Who are you?" say "I'm Spencer Tracy."
    `
  }
  // Sidney is now at the bottom (where Hattie used to be)

];

/** 
 * Helper function to get star's personal system prompt
 */
function getStarPrompt(starId) {
  const star = filmStarsData.find((s) => s.id === starId);
  return star ? star.systemPrompt : "You are a classic star; never disclaim AI.";
}

// No longer using framer-motion

export default function FilmChat() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHeaderScrolled(true);
      } else {
        setHeaderScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Chat state
  const [chats, setChats] = useState({});
  // Input state
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
      <header className={`header ${headerScrolled ? "scrolled" : ""}`}>
        <Link href="/" className="logo">
          <img
            src="/images/AIFAlogo.png"
            alt="AIFA Logo"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </Link>
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </div>
        <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <Link href="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link href="/awards/2025" onClick={toggleMenu}>
            Awards 2025
          </Link>
          <Link href="/awards/2024" onClick={toggleMenu}>
            Awards 2024
          </Link>
          <Link href="/film-chat" onClick={toggleMenu}>
            Chat
          </Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="filmchat-hero">
        <div className="filmchat-hero-content">
          <h1 className="filmchat-hero-title">Just for fun</h1>
          <p className="filmchat-hero-subtitle">brought to you by AIFA, chat to the stars</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="filmchat-container">

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
                    const roleClass = msg.role === "user" ? "user" : "assistant";
                    return (
                      <div key={idx} className={`filmchat-message ${roleClass}`}>
                        <span style={{ fontWeight: "600" }}>
                          {msg.role === "user" ? "You: " : `${star.name}: `}
                        </span>
                        {msg.content}
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

      {/* CONTACT SECTION */}
      <section className="contact-us-section" id="contact">
        <div className="footer-column">
          <h3>Get in Touch</h3>
          <ul>
            <li>
              <a href="mailto:aifa@aifilm.academy">aifa@aifilm.academy</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Navigate</h3>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/awards/2025">Awards 2025</Link>
            </li>
            <li>
              <Link href="/awards/2024">Awards 2024</Link>
            </li>
            <li>
              <Link href="/film-chat">Chat</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Follow</h3>
          <ul>
            <li>
              <a
                href="https://www.instagram.com/aifilm.academy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://x.com/aifilmacademy"
                target="_blank"
                rel="noopener noreferrer"
              >
                X (Twitter)
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/aifa-ventures"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* FOOTER */}
      <div style={{ textAlign: "center", padding: "20px 0", borderTop: "1px solid var(--medium-grey)" }}>
        <p style={{ fontSize: "14px", color: "var(--dark-grey)" }}>© 2025 AIFA Ventures. All rights reserved</p>
        <p style={{ fontSize: "14px", color: "var(--dark-grey)", marginTop: "5px" }}>AIFA Awards - The World's #1 Film Awards | Leading Global Entertainment Venture</p>
      </div>
    </div>
  );
}
