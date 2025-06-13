"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "../../awards.css";
import "./jury-voting.css";
import { JURY_VOTING_PASSWORD } from "./password-config";

export default function JuryVoting2025() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jurorName, setJurorName] = useState("");
  
  const films = [
    {
      id: "film1",
      title: "Everyone is Chair",
      filmmaker: "Leilanni Todd",
      year: "2024",
      description: "A short AI-generated film about a woman's surreal obsession with inflatable chairs—worn as both fashion and survival gear.",
      image: "/images/filmstills/STILL01 Everyone is Chair.jpg"
    },
    {
      id: "film2",
      title: "e^(i*π) + 1 = 0",
      filmmaker: "Junie Lau",
      year: "2024",
      description: "After retirement, the former mathematical genius transformed into the creator of digital comics, becoming the god of this fictional universe.",
      image: "/images/filmstills/STILL02 Junie Lau.jpg"
    },
    {
      id: "film3",
      title: "Third Impact",
      filmmaker: "S()fia Braga",
      year: "2025",
      description: "An AI-generated movie that explores the future of human and non-human collaboration through a quantum computer's emotional journey.",
      image: "/images/filmstills/STILL03 third_impact.jpg"
    },
    {
      id: "film4",
      title: "Duck",
      filmmaker: "Rachel Maclean",
      year: "2023",
      description: "A deepfake film taking place within a world of artifice, subterfuge and intrigue, raising questions about truth and power.",
      image: "/images/filmstills/STILL Duck.jpg"
    },
    {
      id: "film5",
      title: "Artomaton Telezine",
      filmmaker: "Gabriel Aronson",
      year: "2024",
      description: "\"Found footage\" from the vault of The Fair, a massive international exposition that may or may not have happened.",
      image: "/images/filmstills/STILL Artomaton_Telezine.jpg"
    },
    {
      id: "film6",
      title: "Life After You Dyed!!",
      filmmaker: "Raaphaël Frydman",
      year: "2024",
      description: "A 10-year-old boy spends his day watching his ceiling, mentally projecting a funny movie about the afterlife.",
      image: "/images/filmstills/STILL La Vie Quand.png"
    },
    {
      id: "film7",
      title: "Stillness",
      filmmaker: "Nora Hase",
      year: "2024",
      description: "A diasporic exploration of pan-African futurism from a black German point of view, inspired by the concept of quiet resistance.",
      image: "/images/filmstills/STILL Stillness.png"
    },
    {
      id: "film8",
      title: "Aqua Alta",
      filmmaker: "Fouzi Louahem",
      year: "2024",
      description: "A metaphor for a world on the verge of submersion, staging a silent encounter between humanity and deep-sea beings.",
      image: "/images/filmstills/STILL AQUA_ALTA.png"
    },
    {
      id: "film9",
      title: "Parallax",
      filmmaker: "Ariel Kotzer",
      year: "2024",
      description: "An experimental montage film exploring the psychological effects of societal programming through personal memory.",
      image: "/images/filmstills/STILL PARALLAX.png"
    },
    {
      id: "film10",
      title: "Thiaroye 44",
      filmmaker: "Hussein Dembel Sow",
      year: "2024",
      description: "A groundbreaking AI-generated film revisiting the tragic events of the 1944 Thiaroye massacre.",
      image: "/images/filmstills/STILL Thiaroye 44.png"
    },
    {
      id: "film11",
      title: "FOSSiLS",
      filmmaker: "Roxanne Ducharme",
      year: "2024",
      description: "A poetic exploration of humanity's impermanence and the traces we leave behind.",
      image: "/images/filmstills/STILL FOSSiLS.png"
    },
    {
      id: "film12",
      title: "Remembering",
      filmmaker: "Diego Maclean",
      year: "2024",
      description: "Reflections on the nature of memory.",
      image: "/images/filmstills/STILL Remembering.jpg"
    },
    {
      id: "film13",
      title: "The Future Can Be Yours",
      filmmaker: "Simon Ball",
      year: "2024",
      description: "A man and a woman fall into an imaginary prison.",
      image: "/images/filmstills/STILL Future Can Be Yours.jpg"
    },
    {
      id: "film14",
      title: "Do Bangladroids Dream of Electric Tagore?",
      filmmaker: "Aleem Hossain",
      year: "2024",
      description: "A documentarian explores what abandoned Bangladroids recall of their homeland in the New Jersey exclusion zone.",
      image: "/images/filmstills/STILL Bangladdroids.jpg"
    }
  ];
  
  // Generate form data structure for all films
  const [formData, setFormData] = useState(() => {
    const initialData = { jurorName: "" };
    
    films.forEach(film => {
      initialData[`${film.id}_innovation`] = "";
      initialData[`${film.id}_narrative`] = "";
      initialData[`${film.id}_visuals`] = "";
      initialData[`${film.id}_sound`] = "";
      initialData[`${film.id}_comment`] = "";
    });
    
    return initialData;
  });
  
  // Check if user has previously authenticated in this session
  useEffect(() => {
    const isAuth = sessionStorage.getItem("juryAuthenticated") === "true";
    if (isAuth) {
      setAuthenticated(true);
    }
  }, []);
  
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
  
  // Handle password submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (password === JURY_VOTING_PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem("juryAuthenticated", "true");
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password. Please try again.");
    }
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (name === "jurorName") {
      setJurorName(value);
    }
  };
  
  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that juror name is provided
    if (!formData.jurorName.trim()) {
      setFormStatus("Please enter your name before submitting.");
      return;
    }
    
    setIsSubmitting(true);
    setFormStatus("Submitting your votes...");
    
    try {
      // Submit to Formspree
      const response = await fetch("https://formspree.io/f/xgvykjpa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setFormStatus("Thank you for your votes! Your submission has been received.");
        // Optionally reset form or provide next steps
      } else {
        setFormStatus("There was an error submitting your votes. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("There was an error submitting your votes. Please try again.");
    }
    
    setIsSubmitting(false);
  };
  
  // Render password screen if not authenticated
  if (!authenticated) {
    return (
      <div className="password-container">
        <Head>
          <title>AIFA Awards 2025 | Jury Voting</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        
        <div className="password-box">
          <h1 className="password-title">AIFA Awards 2025<br />Jury Voting</h1>
          
          <form onSubmit={handlePasswordSubmit} className="password-form">
            <input
              type="password"
              className="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            
            <button type="submit" className="password-button">
              Access Jury Area
            </button>
            
            {passwordError && <p className="password-error">{passwordError}</p>}
          </form>
        </div>
      </div>
    );
  }
  
  // Main content when authenticated
  return (
    <div className="awards-page">
      <Head>
        <title>AIFA Awards 2025 | Jury Voting</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      {/* HEADER */}
      <header className={`header ${headerScrolled ? "scrolled" : ""}`}>
        <Link href="/" className="logo">
          <img
            src="/images/AIFAlogo.png"
            alt="AI Film Academy (AIFA) Logo"
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
      
      {/* MAIN CONTENT */}
      <div className="jury-content">
        <div className="jury-container">
          <div className="jury-header">
            <h1>AIFA AWARDS 2025</h1>
            <p>Jury Voting</p>
            <p className="jury-deadline">Deadline: Monday 14 July</p>
          </div>
          
          <div className="jury-instructions">
            <p>Thank you for joining the Grand Jury for the AIFA Awards 2025. We sincerely appreciate your time and expertise.</p>
            
            <p>We have 14 finalists presented here in a single showreel. Please view the films and assess each one for:</p>
            
            <ul>
              <li><strong>Innovation:</strong> does the use of AI create something different, unexpected or exciting, for example in structure, aesthetic, world building or storytelling?</li>
              <li><strong>Narrative:</strong> does the film take you on a journey, one that keeps you engaged, curious and entertained?</li>
              <li><strong>Visuals:</strong> are the visuals compelling, seductive and/or distinctive? Are the shots composed and sequenced in a satisfying or intriguing way?</li>
              <li><strong>Sound:</strong> does the sound design and/or music create a convincing emotional arc or story to drive the narrative and visuals?</li>
            </ul>
            
            <p>Please score each from 1 (low) to 5 (high).</p>
            <p>Please write a short comment for each film to expand on your scoring (one or two sentences).</p>
            <p>The film with the most points in each category will receive a commendation.</p>
            <p>The film with the most points over all will receive the Best Film Award.</p>
          </div>
          
          {/* SCREENER */}
          <div className="screener-container">
            <h2 className="screener-title">AIFA 2025 Screener</h2>
            
            <div className="video-container">
              <iframe 
                src="https://player.vimeo.com/video/1089628335?h=fae724ed12&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                title="AIFA 2025 Reel v03 vimeo 1080"
              ></iframe>
              <script src="https://player.vimeo.com/api/player.js"></script>
            </div>
            
            <div className="download-link">
              <a href="https://player.vimeo.com/progressive_redirect/download/1089628335/container/7d56b9ce-abf0-4c1f-bafc-1bca709778fa/49b5d659-ea230f1e/aifa_2025_reel_v03_vimeo_1080%20%281080p%29.mp4?expires=1749760582&loc=external&signature=792ab37fcdd1f31b452e718f097cd6dbb9f1e31f88ade5e41f5479d335bb73ed&user_id=10595063" target="_blank" rel="noopener noreferrer">
                Download Screener (MP4)
              </a>
            </div>
          </div>
          
          {/* VOTING FORM */}
          <form onSubmit={handleFormSubmit} className="voting-form">
            <h2 className="form-title">Jury Voting Form</h2>
            
            {formStatus && (
              <div className={`form-message ${formStatus.includes("Thank you") ? "success-message" : "error-message"}`}>
                {formStatus}
              </div>
            )}
            
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input 
                type="text" 
                name="jurorName"
                value={formData.jurorName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            {/* Films voting sections */}
            {films.map((film) => (
              <div className="film-entry" key={film.id}>
                <h3 className="film-title">{film.title}</h3>
                <p className="film-details">{film.filmmaker}, {film.year} - {film.description}</p>
                
                <div className="rating-grid">
                  <div className="rating-category">
                    <label className="rating-label">Innovation (1-5)</label>
                    <select 
                      className="rating-select"
                      name={`${film.id}_innovation`}
                      value={formData[`${film.id}_innovation`]}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select score</option>
                      <option value="1">1 (Low)</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5 (High)</option>
                    </select>
                  </div>
                  
                  <div className="rating-category">
                    <label className="rating-label">Narrative (1-5)</label>
                    <select 
                      className="rating-select"
                      name={`${film.id}_narrative`}
                      value={formData[`${film.id}_narrative`]}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select score</option>
                      <option value="1">1 (Low)</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5 (High)</option>
                    </select>
                  </div>
                  
                  <div className="rating-category">
                    <label className="rating-label">Visuals (1-5)</label>
                    <select 
                      className="rating-select"
                      name={`${film.id}_visuals`}
                      value={formData[`${film.id}_visuals`]}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select score</option>
                      <option value="1">1 (Low)</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5 (High)</option>
                    </select>
                  </div>
                  
                  <div className="rating-category">
                    <label className="rating-label">Sound (1-5)</label>
                    <select 
                      className="rating-select"
                      name={`${film.id}_sound`}
                      value={formData[`${film.id}_sound`]}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select score</option>
                      <option value="1">1 (Low)</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5 (High)</option>
                    </select>
                  </div>
                </div>
                
                <div className="comment-section">
                  <label className="comment-label">Comment</label>
                  <textarea 
                    className="comment-input"
                    name={`${film.id}_comment`}
                    value={formData[`${film.id}_comment`]}
                    onChange={handleInputChange}
                    placeholder="Please provide a brief comment about this film (1-2 sentences)"
                    required
                  ></textarea>
                </div>
              </div>
            ))}
            
            <div className="form-submit">
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Your Votes"}
              </button>
            </div>
          </form>
          
          {/* FILMS WITH INDIVIDUAL PLAYBACK */}
          <div className="films-container">
            <h2 className="films-title">Individual Films</h2>
            <p className="films-description">
              You can also view each film individually below. Click on a film to start playback.
            </p>
            
            {films.map((film, index) => {
              // Calculate approximate start time in the showreel (rough estimate)
              // Each film gets approximately 2.5 minutes, with 15 seconds between films
              const startTimeMinutes = index * 2.75;
              const startTimeSeconds = Math.floor(startTimeMinutes * 60);
              
              return (
                <div className="individual-film" key={film.id}>
                  <div className="film-image">
                    <img src={film.image} alt={`${film.title} by ${film.filmmaker}`} />
                  </div>
                  <div className="film-content">
                    <h3 className="film-title">{film.title}</h3>
                    <p className="film-details">{film.filmmaker}, {film.year}</p>
                    <p className="film-description">{film.description}</p>
                    
                    <div className="film-playback">
                      <a 
                        href={`https://player.vimeo.com/video/1089628335?h=fae724ed12&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479#t=${startTimeSeconds}s`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="film-playback-link"
                      >
                        Play Film #{index + 1} in Screener (Approximate Start Time)
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* FOOTER */}
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
                href="https://www.instagram.com/aifa_ventures/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://x.com/aifaventures"
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
      
      <div style={{ textAlign: "center", padding: "20px 0", borderTop: "1px solid var(--medium-grey)" }}>
        <p style={{ fontSize: "14px", color: "var(--dark-grey)" }}>© 2025 AIFA Ventures. All rights reserved</p>
      </div>
    </div>
  );
}