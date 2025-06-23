"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "./lisbon-2025.css";

export default function Lisbon2025() {
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
    <div className="home-page">
      <Head>
        <title>AIFA at NFC Lisbon 2025 | AI Film Academy</title>
        <meta name="description" content="Co-Founder of AIFA Leo Crane joined partners at NFC Conference in Lisbon to announce the upcoming AIFA Awards in London July 2025." />
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
      <section className="lisbon-hero">
        <div className="lisbon-hero-content">
          <h1 className="lisbon-hero-title">AIFA at NFC Lisbon</h1>
          <p className="lisbon-hero-subtitle">Announcing AIFA Awards 2025</p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="lisbon-content-section">
        <div className="lisbon-container fade-in">
          <h2 className="lisbon-title">AIFA Takes the Stage in Lisbon</h2>
          <p className="lisbon-description">
            Co-Founder of AIFA Leo Crane was joined by our AIFA 2025 partners Muse Frame and Sedition on stage at NFC Conference in Lisbon to announce our upcoming AIFA Awards in London July 2025. Leo announced our finalists to a packed crowd of 4000 guests.
          </p>
          <div className="event-meta-bar">
            <div className="event-meta-item">
              <span className="event-meta-label">Date:</span>
              <span className="event-meta-value">June 4, 2024</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Location:</span>
              <span className="event-meta-value">NFC Lisbon Conference</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Audience:</span>
              <span className="event-meta-value">4000+ attendees</span>
            </div>
          </div>
          
          <div className="lisbon-highlight">
            <h3>Event Highlights</h3>
            <ul>
              <li>Announcement of AIFA Awards 2025 at art'otel London Hoxton</li>
              <li>Unveiling of AIFA 2025 finalists to international audience</li>
              <li>Partnerships with Muse Frame and Sedition revealed</li>
              <li>Showcase of AI-generated art and filmmaking excellence</li>
            </ul>
          </div>
          
          <div className="lisbon-partners">
            <h3>Partners Present</h3>
            <div className="lisbon-partner-grid">
              <div className="lisbon-partner-item">
                <h4>Muse Frame</h4>
                <p>Digital art display pioneer</p>
                <a href="https://museframe.io" target="_blank" rel="noopener noreferrer" className="lisbon-link">Visit Website</a>
              </div>
              <div className="lisbon-partner-item">
                <h4>Sedition</h4>
                <p>Digital art collection platform</p>
                <a href="https://seditionart.com" target="_blank" rel="noopener noreferrer" className="lisbon-link">Visit Website</a>
              </div>
            </div>
          </div>
          
          <div className="lisbon-cta">
            <h3>Join Us at AIFA Awards 2025</h3>
            <p>Be part of the celebration of AI-powered creativity in London this July.</p>
            <Link href="/events/artotel-awards-2025" className="lisbon-button">Event Details</Link>
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