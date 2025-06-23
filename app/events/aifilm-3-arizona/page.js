"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "../events.css";
import "./aifilm-3-arizona.css";

export default function AIFilm3Arizona() {
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

  return (
    <div className="event-page">
      <Head>
        <title>AIFilm 3 Arizona Partnership | AIFA</title>
        <meta name="description" content="AIFA partnered with AIFilm 3 in Arizona to champion the future of film and technology, fostering innovation in AI-generated filmmaking." />
      </Head>
      
      {/* HEADER */}
      <header className={`header ${headerScrolled ? "scrolled" : ""}`}>
        <Link href="/" className="logo">
          <img
            src="/images/AIFAlogo.png"
            alt="AIFA Logo"
            style={{ height: "30px", width: "auto", filter: "brightness(0) invert(1)" }}
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
          <Link href="/" onClick={toggleMenu}>Home</Link>
          <Link href="/awards/2025" onClick={toggleMenu}>Awards 2025</Link>
          <Link href="/awards/2024" onClick={toggleMenu}>Awards 2024</Link>
          <Link href="/education" onClick={toggleMenu}>Education</Link>
          <Link href="/events" onClick={toggleMenu}>Events</Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="event-hero">
        <div className="event-hero-content">
          <h1 className="event-hero-title">AIFilm 3 Partnership in Arizona</h1>
          <p className="event-hero-subtitle">AIFA was delighted to partner with AIFilm 3 in Arizona to champion the future of film and tech</p>
        </div>
      </section>

      {/* EVENT CONTENT */}
      <section className="event-content-section">
        <div className="event-container">
          <h2 className="event-title fade-in">Championing the Future of Film and Technology</h2>
          <p className="event-description fade-in">
            AIFA was delighted to partner with AIFilm 3 in Arizona to champion the future of film and tech, creating a bridge between European and American AI film communities.
          </p>
          
          {/* EVENT META */}
          <div className="event-meta-bar fade-in">
            <div className="event-meta-item">
              <span className="event-meta-label">Date</span>
              <span className="event-meta-value">November 7, 2024</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Time</span>
              <span className="event-meta-value">All Day</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Location</span>
              <span className="event-meta-value">Arizona, United States</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Category</span>
              <span className="event-meta-value">Partnership</span>
            </div>
          </div>
          
          {/* EVENT IMAGE */}
          <div className="event-image-container fade-in">
            <img src="/images/IMG_6970.jpg" alt="AIFilm 3 Arizona Event" className="event-image" />
          </div>
          
          {/* EVENT DETAILS */}
          <div className="event-details">
            <h3 className="fade-in">A Transatlantic Partnership</h3>
            <p className="fade-in">
              AIFA was delighted to partner with AIFilm 3 in Arizona to champion the future of film and technology. This collaboration brought together innovators, filmmakers, and technologists from both sides of the Atlantic to explore the cutting-edge of AI-generated filmmaking.
            </p>
            <p className="fade-in">
              The partnership established a new bridge between European and American AI film communities, creating opportunities for knowledge exchange, collaborative projects, and the showcasing of diverse approaches to AI-generated filmmaking.
            </p>
            <p className="fade-in">
              This partnership represents an opportunity to exchange perspectives on AI-generated filmmaking across international boundaries, strengthening the global network of artists and technologists working in this innovative field.
            </p>
            
            <h3 className="fade-in">Key Highlights</h3>
            <ul className="fade-in">
              <li>Exploration of transatlantic approaches to AI filmmaking</li>
              <li>Discussion of ethical considerations in AI-generated content</li>
              <li>Demonstration of innovative techniques and tools</li>
              <li>Networking opportunities for creators from diverse backgrounds</li>
              <li>Planning for future collaborative initiatives</li>
            </ul>
            
            <div className="event-quote fade-in">
              <p>"This partnership represents an important step in AIFA's mission to create a global community of AI filmmakers and to ensure that innovation in this field transcends geographical boundaries."</p>
              <cite>— AIFA Team</cite>
            </div>
          </div>
          
          {/* CTA */}
          <div className="event-cta fade-in">
            <h3>Join Our Community</h3>
            <p>Stay informed about our upcoming partnerships, events, and opportunities to engage with the AI filmmaking community.</p>
            <div>
              <Link href="/events" className="event-button">Explore More Events</Link>
              <Link href="/awards/2025" className="event-button secondary">AIFA Awards 2025</Link>
            </div>
          </div>
        </div>
      </section>

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
              <Link href="/education">Education</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
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

      <div style={{ 
        padding: "20px 0", 
        borderTop: "1px solid var(--medium-grey)",
        position: "relative"
      }}>
        <div style={{ 
          display: "flex", 
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          marginBottom: "15px"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "15px"
          }}>
            <span style={{ fontSize: "12px", color: "var(--dark-grey)", marginRight: "8px" }}>Supported by</span>
            <img src="/images/support/innovateuk.jpg" alt="Innovate UK" style={{ height: "20px", width: "auto" }} />
          </div>
          <p style={{ fontSize: "14px", color: "var(--dark-grey)", margin: 0, textAlign: "center" }}>© 2025 AIFA Ventures. All rights reserved</p>
        </div>
      </div>
    </div>
  );
}