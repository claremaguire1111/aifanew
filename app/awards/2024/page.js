"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "../awards.css";

export default function Awards2024() {
  // Since we're using 'use client', we need to add SEO with Head component
  // Metadata API won't work with 'use client' directive
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  
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

  // Animation for scroll-triggered elements
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
    
    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const winners = [
    { 
      title: "Denny the Shark", 
      artist: "Ethereal Moon", 
      type: "winner",
      image: "/images/Awards2024/awardwinners/denny_the_shark.png",
      collectLink: "https://superrare.com/artwork/eth/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/48246"
    },
    { 
      title: "Birthday Story", 
      artist: "Rainisto", 
      type: "winner",
      image: "/images/Awards2024/awardwinners/birthday_story.png",
      collectLink: "https://superrare.com/artwork/eth/0x2f158646fe967db4bd49c5438269470b619cb270/2"
    },
    { 
      title: "not a problem", 
      artist: "B O E Y", 
      type: "winner",
      image: "/images/Awards2024/awardwinners/not_a_problem.png",
      collectLink: "https://superrare.com/artwork/eth/0x2f158646fe967db4bd49c5438269470b619cb270/2"
    },
    { 
      title: "You Are, Unfortunately, an AI Artist", 
      artist: "Mind Wank", 
      type: "winner",
      image: "/images/Awards2024/awardwinners/mind_wank.png",
      collectLink: "https://superrare.com/artwork/eth/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/48245"
    },
    { 
      title: "AInferno", 
      artist: "Mflux", 
      type: "winner",
      image: "/images/Awards2024/awardwinners/mflux.png",
      collectLink: "https://superrare.com/artwork/eth/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/48450"
    },
    { 
      title: "Bacillus Anthracis", 
      artist: "Hallidonto", 
      type: "winner",
      image: "/images/Awards2024/awardwinners/Bacillus_Anthracis.png",
      collectLink: "https://superrare.com/artwork/eth/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/48243"
    },
    { 
      title: "How to Poison Art: A Step-by-Step Guide", 
      artist: "Mindeye", 
      type: "finalist",
      image: "/images/Awards2024/finalists/Mindeye.png",
      collectLink: "https://superrare.com/artwork/eth/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/48275"
    },
    { 
      title: "Night", 
      artist: "Arielko", 
      type: "finalist",
      image: "/images/Awards2024/finalists/Arielko.png",
      collectLink: "https://superrare.com/artwork/eth/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/48210"
    },
    { 
      title: "Dream", 
      artist: "ejaneress", 
      type: "finalist",
      image: "/images/Awards2024/finalists/ejaneress.png",
      collectLink: "https://superrare.com/artwork/eth/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/48241"
    },
    { 
      title: "Black Hole", 
      artist: "Ø Studio", 
      type: "finalist",
      image: "/images/Awards2024/finalists/o_studio.png",
      collectLink: "https://superrare.com/artwork/eth/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/48235"
    },
    { 
      title: "Waters of Rebirth", 
      artist: "Kiel", 
      type: "finalist",
      image: "/images/Awards2024/finalists/kiel.png",
      collectLink: "https://superrare.com/artwork/eth/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/48247"
    },
    { 
      title: "Space", 
      artist: "Ilya Shapko", 
      type: "finalist",
      image: "/images/Awards2024/finalists/ilya_shapko.png",
      collectLink: "https://superrare.com/artwork/eth/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/48192"
    },
    { 
      title: "The Tipping Force", 
      artist: "Katie Morris", 
      type: "finalist",
      image: "/images/Awards2024/finalists/katie_morris.png",
      collectLink: "https://superrare.com/artwork/eth/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/48224"
    },
    { 
      title: "The Silver Mirror", 
      artist: "Fantastic Planet", 
      type: "featured",
      image: "/images/Awards2024/featuredartist/fantastic_planet.png",
      collectLink: "https://superrare.com/artwork/eth/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/48191"
    }
  ];

  const juryMembers = [
    { 
      name: "Claire Silver", 
      role: "Artist",
      image: "/images/jury2024/claire_silver.jpg" 
    },
    { 
      name: "Ingrid Mery Haziot", 
      role: "Lawyer",
      image: "/images/jury2024/ingrid_mery_haziot.jpg" 
    },
    { 
      name: "Vincent D'onofrio", 
      role: "Actor",
      image: "/images/jury2024/vincent_donofrio.jpg" 
    },
    { 
      name: "Alejandro Cartagena", 
      role: "Photographer",
      image: "/images/jury2024/alejandro_cartagena.jpg" 
    },
    { 
      name: "Laurence Fuller", 
      role: "Actor",
      image: "/images/jury2024/laurence_fuller.jpg" 
    },
    { 
      name: "Justin Trimble", 
      role: "Filmmaker",
      image: "/images/jury2024/justin_trimble.jpg" 
    },
    { 
      name: "Nygilia", 
      role: "Artist",
      image: "/images/jury2024/nygilia.jpg" 
    },
    { 
      name: "Chikai", 
      role: "Artist",
      image: "/images/jury2024/Chikai.jpg" 
    }
  ];

  const pressQuotes = [
    { quote: "a revolutionary moment in cinematic history", source: "Redeye" },
    { quote: "AI magic exposed", source: "Fizzy Mag" },
    { quote: "a spectacular debut", source: "Redlion News" },
    { quote: "a new wave of artists' film", source: "Sotheby's Institute" },
    { quote: "a grand web3 Oscars", source: "L'Officiel" },
    { quote: "recognition of extraordinary storytelling", source: "Blockster" }
  ];

  const brandNames = [
    "SOTHEBY'S INSTITUTE OF ART",
    "NFC",
    "GALXE",
    "DRESSX",
    "BRIGHTMOMENTS",
    "REKT",
    "ZORA",
    "SUPERRARE",
    "AIMAGINE",
    "MUSE FRAME",
    "HUG",
    "DECRYPT",
    "INTERCELLAR",
    "RED-EYE",
    "RUG RADIO",
    "[S]EDITION",
    "OBJECT SUBJECT FORM",
    "NON-FUN GERBILS",
    "DIG-IN",
    "WEB3SENSE",
    "CASA NUA",
    "ASVOF",
    "L'OFFICIEL",
    "FIZZY MAG"
  ];

  const filteredWinners = activeFilter === 'all' 
    ? winners 
    : winners.filter(item => item.type === activeFilter.toLowerCase().split(' ')[1]);

  return (
    <div className="awards-page">
      <Head>
        <title>AIFA Awards 2024 | World's #1 Film Awards for AI Filmmaking</title>
        <meta name="description" content="AIFA Awards 2024 - The world's leading AI film awards celebrating groundbreaking innovation in filmmaking with winners including Ethereal Moon, Rainisto, B O E Y, Mind Wank, Mflux, and Hallidonto." />
        <meta name="keywords" content="AIFA Awards, World's #1 Film Awards, AI Film Academy, AI filmmaking, Ethereal Moon, digital art awards, NFT film, AI artists, global film awards, future of entertainment" />
        <meta property="og:title" content="AIFA Awards 2024 | World's #1 Film Awards for AI Filmmaking" />
        <meta property="og:description" content="Discover the winners of AIFA Awards 2024, the world's leading celebration of innovation in AI-generated filmmaking and digital art, shaping the future of global entertainment." />
        <meta property="og:image" content="/images/Awards2024/awardwinners/denny_the_shark.png" />
        <meta property="og:url" content="https://aifilm.academy/awards/2024" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aifilmacademy" />
        <link rel="canonical" href="https://aifilm.academy/awards/2024" />
        <script type="application/ld+json">
          {JSON.stringify({"@context":"https://schema.org","@type":"Event","name":"AIFA Awards 2024","description":"World's #1 Film Awards for AI Filmmaking","startDate":"2024-05-01","location":{"@type":"Place","name":"AIFA Venue London","address":{"@type":"PostalAddress","addressLocality":"London","addressCountry":"UK"}},"organizer":{"@type":"Organization","name":"AIFA Ventures","url":"https://aifilm.academy"}})}
        </script>
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

      {/* HERO SECTION */}
      <section className="awards-hero">
        <div className="video-wrapper">
          <video
            src="/videos/fantastic_planet.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="background-video"
          >
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay" style={{ backgroundColor: 'transparent' }}></div>
        </div>
        <div className="awards-hero-content">
          <h1 className="awards-hero-title">AIFA Awards 2024</h1>
          <p className="awards-hero-subtitle">The Silver Mirror by <a href="https://superrare.com/artwork/eth/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/silver-mirror-48191" target="_blank" rel="noopener noreferrer" style={{ color: '#a3a3a3' }}>Fantastic Planet</a></p>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="awards-stats">
        <div className="stats-container">
          <div className="stats-item">
            <h3>1000</h3>
            <p>guests on the red carpet</p>
          </div>
          <div className="stats-item">
            <h3>106</h3>
            <p>artists from 6 continents</p>
          </div>
          <div className="stats-item">
            <h3>8</h3>
            <p>AI pioneers on the jury</p>
          </div>
          <div className="stats-item">
            <h3>13</h3>
            <p>finalists</p>
          </div>
          <div className="stats-item">
            <h3>2</h3>
            <p>featured artists</p>
          </div>
          <div className="stats-item">
            <h3>6</h3>
            <p>award winners</p>
          </div>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="awards-filter">
        <div className="filter-container">
          <h2 className="filter-title">Award Winners and Finalists</h2>
          <p className="filter-subtitle">Click on an artwork to collect on SuperRare</p>
          
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'AIFA Winner' ? 'active' : ''}`}
              onClick={() => setActiveFilter('AIFA Winner')}
            >
              Award Winners
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'AIFA Featured' ? 'active' : ''}`}
              onClick={() => setActiveFilter('AIFA Featured')}
            >
              Featured Artists
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'AIFA Finalist' ? 'active' : ''}`}
              onClick={() => setActiveFilter('AIFA Finalist')}
            >
              Finalists
            </button>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="awards-gallery">
        <div className="gallery-grid">
          {filteredWinners.map((item, index) => (
            <a 
              href={item.collectLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="gallery-item" 
              key={index}
            >
              <div className="gallery-image">
                <img src={item.image} alt={`${item.title} by ${item.artist} - ${item.type === 'winner' ? 'Award Winner' : item.type === 'featured' ? 'Featured Artist' : 'Finalist'} at AIFA Awards 2024`} />
                <div className="collect-overlay">
                  <span>Collect</span>
                </div>
              </div>
              <div className="gallery-info">
                <h3>{item.title} by {item.artist}</h3>
                <p className="gallery-type">
                  {item.type === 'winner' ? 'Award Winner' : 
                   item.type === 'featured' ? 'Featured Artist' : 
                   'Finalist'}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* PRESS SECTION */}
      <section className="awards-press">
        <h2 className="press-title">IN THE PRESS</h2>
        <div className="press-grid">
          {pressQuotes.map((quote, index) => (
            <div className="press-item" key={index}>
              <p className="press-quote">"{quote.quote}"</p>
              <p className="press-source">{quote.source}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* PARTNERS SECTION */}
      <section className="awards-partners">
        <div className="partners-container">
          <h2 className="partners-title">Our Partners</h2>
          
          <div className="moving-brands">
            <div className="brand-row">
              {brandNames.map((brand, idx) => (
                <div key={idx} className="brand-name">
                  {brand}
                </div>
              ))}
              {brandNames.map((brand, idx) => (
                <div key={`dup-${idx}`} className="brand-name">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JURY SECTION */}
      <section className="awards-jury">
        <div className="jury-container">
          <h2 className="jury-title">2024 Jury</h2>
          
          <div className="jury-grid fade-in">
            {juryMembers.map((member, index) => (
              <div className="jury-member" key={index}>
                <div className="jury-image">
                  <img src={member.image} alt={`${member.name} - ${member.role} - AIFA Awards 2024 Jury Member`} />
                </div>
                <div className="jury-info">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNUP SECTION */}
      <section className="signup-section" id="signup">
        <div className="signup-box">
          <h1 className="fade-in">Join Our Community</h1>
          <p className="fade-in">
            For all enquiries and to stay up to date, sign up below. For any questions, send us a message.
          </p>
          <form action="https://formspree.io/f/mnnqqvqd" method="POST" className="fade-in">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message (Optional)" rows="4"></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>

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

      <div style={{ textAlign: "center", padding: "20px 0", borderTop: "1px solid var(--medium-grey)" }}>
        <p style={{ fontSize: "14px", color: "var(--dark-grey)" }}>© 2025 AIFA Ventures. All rights reserved</p>
      </div>
    </div>
  );
}