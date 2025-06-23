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

  // Winners Data - Mock data (should be replaced with actual winners)
  const winners = [
    {
      name: "Not a Problem",
      artist: "Ethereal Moon",
      image: "/images/Awards2024/awardwinners/not_a_problem.png",
      type: "narrative",
      award: "Best Narrative Short",
      link: "https://twitter.com/0xEtherealMoon"
    },
    {
      name: "Birthday Story",
      artist: "Rainisto",
      image: "/images/Awards2024/awardwinners/birthday_story.png",
      type: "narrative",
      award: "Best AI Narrative Film",
      link: "https://www.rainisto.com/"
    },
    {
      name: "Bacillus Anthracis",
      artist: "B O E Y",
      image: "/images/Awards2024/awardwinners/Bacillus_Anthracis.png",
      type: "abstract",
      award: "Best AI Abstract Film",
      link: "https://boey.design/"
    },
    {
      name: "Mind Wank",
      artist: "Hallidonto",
      image: "/images/Awards2024/awardwinners/mind_wank.png",
      type: "animation",
      award: "Best AI Animation",
      link: "https://hallidonto.com/"
    },
    {
      name: "denny the shark",
      artist: "MFlux",
      image: "/images/Awards2024/awardwinners/denny_the_shark.png",
      type: "character",
      award: "Best Character Design",
      link: "https://x.com/mfluxcreative"
    }
  ];

  // Finalists
  const finalists = [
    {
      name: "O_Studio",
      image: "/images/Awards2024/finalists/o_studio.png",
      type: "AI Film Artist"
    },
    {
      name: "Arielko",
      image: "/images/Awards2024/finalists/Arielko.png",
      type: "AI Film Artist"
    },
    {
      name: "Katie Morris",
      image: "/images/Awards2024/finalists/katie_morris.png",
      type: "AI Film Artist"
    },
    {
      name: "ejaneress",
      image: "/images/Awards2024/finalists/ejaneress.png",
      type: "AI Film Artist"
    },
    {
      name: "Mindeye",
      image: "/images/Awards2024/finalists/Mindeye.png",
      type: "AI Film Artist"
    },
    {
      name: "Ilya Shapko",
      image: "/images/Awards2024/finalists/ilya_shapko.png",
      type: "AI Film Artist"
    },
    {
      name: "Kiel",
      image: "/images/Awards2024/finalists/kiel.png",
      type: "AI Film Artist"
    }
  ];

  // Sample press quotes
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
        <meta property="og:description" content="AIFA Awards 2024 - The world's leading AI film awards celebrating groundbreaking innovation in filmmaking with winners including Ethereal Moon, Rainisto, B O E Y, Mind Wank, Mflux, and Hallidonto." />
        <meta property="og:image" content="/images/Awards2024/awardwinners/denny_the_shark.png" />
        <meta property="og:url" content="https://aifilm.academy/awards/2024" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aifaventures" />
        <link rel="canonical" href="https://aifilm.academy/awards/2024" />
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
        <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </div>
        <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <Link href="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link href="/awards" onClick={toggleMenu}>
            Awards
          </Link>
          <Link href="/about" onClick={toggleMenu}>
            About
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
            <h3>3</h3>
            <p>glamorous locations</p>
          </div>
          <div className="stats-item">
            <h3>12</h3>
            <p>exceptional jury members</p>
          </div>
          <div className="stats-item">
            <h3>24</h3>
            <p>partner organizations</p>
          </div>
          <div className="stats-item">
            <h3>5</h3>
            <p>coveted awards</p>
          </div>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="awards-filter">
        <div className="filter-container">
          <h1 className="filter-title">Award Winners</h1>
          <p className="filter-subtitle">Celebrating Groundbreaking AI-Generated Films</p>
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Categories
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'Best Narrative' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Best Narrative')}
            >
              Narrative Films
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'Best Abstract' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Best Abstract')}
            >
              Abstract Films
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'Best Animation' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Best Animation')}
            >
              Animations
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'Best Character' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Best Character')}
            >
              Character Design
            </button>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="awards-gallery">
        <div className="gallery-grid">
          {filteredWinners.map((winner, index) => (
            <a href={winner.link} target="_blank" rel="noopener noreferrer" key={index} className="gallery-item">
              <div className="gallery-image">
                <img src={winner.image} alt={winner.name} />
                <div className="collect-overlay">
                  <span>View Artist</span>
                </div>
              </div>
              <div className="gallery-info">
                <h3>{winner.name}</h3>
                <p className="gallery-type">{winner.artist} • {winner.award}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* FINALISTS SECTION */}
      <section className="awards-filter" style={{ backgroundColor: 'var(--white)' }}>
        <div className="filter-container">
          <h1 className="filter-title">Award Finalists</h1>
          <p className="filter-subtitle">The Most Innovative AI Film Artists of 2024</p>
        </div>
      </section>

      <section className="awards-gallery">
        <div className="gallery-grid">
          {finalists.map((finalist, index) => (
            <div key={index} className="gallery-item">
              <div className="gallery-image">
                <img src={finalist.image} alt={finalist.name} />
              </div>
              <div className="gallery-info">
                <h3>{finalist.name}</h3>
                <p className="gallery-type">{finalist.type}</p>
              </div>
            </div>
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
      <section className="contact-us-section">
        <div className="footer-column">
          <h3>Contact</h3>
          <ul>
            <li><a href="mailto:aifa@aifilm.academy">Email Us</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Navigate</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/awards/2025">Awards 2025</Link></li>
            <li><Link href="/awards/2024">Awards 2024</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Connect</h3>
          <ul>
            <li><a href="https://instagram.com/aifa_ventures/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://x.com/aifaventures" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.linkedin.com/company/aifilm-academy/?viewAsMember=true" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </section>

      <div className="copyright-footer">
        <div className="copyright-container">
          <div className="support-logo">
            <span>Supported by</span>
            <img src="/images/support/innovateuk.jpg" alt="Innovate UK" />
          </div>
          <p className="copyright-text">© {new Date().getFullYear()} AIFA Ventures. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}