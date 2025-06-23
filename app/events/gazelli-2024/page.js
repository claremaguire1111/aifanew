"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "./gazelli-2024.css";

export default function GazelliEvent() {
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
        <title>AIFA at Gazelli Art House | AI Film Academy</title>
        <meta name="description" content="AIFA Co-Founders Leo Crane and Clare Maguire led a special tour of Gazelli Art House for community members, exploring the intersection of digital art and traditional gallery spaces." />
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
          <h1 className="event-hero-title">Gazelli Art House Tour</h1>
          <p className="event-hero-subtitle">Exploring Digital Art in a Traditional Gallery Space</p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="event-content-section">
        <div className="event-container fade-in">
          <h2 className="event-title">Community Tour with AIFA Co-Founders</h2>
          <p className="event-description">
            AIFA Co-Founders Leo Crane and Clare Maguire guided community members on an exclusive tour of Gazelli Art House, a contemporary gallery known for its innovative approach to digital art. The tour explored the intersection of digital art and traditional gallery spaces.
          </p>
          
          <div className="event-meta-bar">
            <div className="event-meta-item">
              <span className="event-meta-label">Date</span>
              <span className="event-meta-value">July 16, 2024</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Time</span>
              <span className="event-meta-value">5:00 PM - 7:00 PM</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Location</span>
              <span className="event-meta-value">Gazelli Art House, London</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Category</span>
              <span className="event-meta-value">Community</span>
            </div>
          </div>
          
          <div className="event-image-container">
            <img src="/images/gazelli_events.jpg" alt="AIFA at Gazelli Art House" className="event-image" />
          </div>
          
          <div className="event-details">
            <h3>About the Event</h3>
            <p>
              Gazelli Art House has been at the forefront of integrating digital art into the traditional gallery space. For this exclusive event, AIFA community members were invited to a curated tour led by Leo Crane and Clare Maguire, exploring current exhibitions and discussing the evolving relationship between digital art and established art institutions.
            </p>
            <p>
              The tour provided insights into how galleries are adapting to showcase digital works, the challenges and opportunities of presenting digital art in physical spaces, and the critical reception of digital art within the broader art world.
            </p>
            
            <h3>Discussion Topics</h3>
            <ul>
              <li>The presentation of digital art in physical gallery spaces</li>
              <li>Curatorial approaches to digital works</li>
              <li>Art market dynamics for digital art pieces</li>
              <li>Authentication and provenance in the digital age</li>
              <li>The evolving collector community for digital art</li>
            </ul>
            
            <h3>About Gazelli Art House</h3>
            <p>
              Founded in 2010, Gazelli Art House represents artists from across the globe working in various mediums and has been a pioneer in embracing digital art forms. The gallery has developed a reputation for nurturing artists working with new technologies and supporting the development of digital art markets.
            </p>
            
            <div className="event-quote">
              <p>"The integration of digital works into traditional gallery spaces represents an important step in the evolution of the art world. Gazelli Art House exemplifies how established institutions can embrace technological innovation while maintaining curatorial rigor."</p>
              <cite>— Clare Maguire, AIFA Co-Founder</cite>
            </div>
          </div>
          
          <div className="event-cta">
            <h3>Continue Your Journey</h3>
            <p>Join the AIFA community for more exclusive events exploring the intersection of AI and art.</p>
            <a href="https://gazelliarthouse.com" target="_blank" rel="noopener noreferrer" className="event-button">Visit Gazelli Art House</a>
            <Link href="/events" className="event-button secondary">Back to Events</Link>
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