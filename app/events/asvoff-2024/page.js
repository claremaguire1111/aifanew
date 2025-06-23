"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "./asvoff-2024.css";

export default function ASVOFFEvent() {
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
        <title>AIFA at ASVOFF Film Festival | AI Film Academy</title>
        <meta name="description" content="AIFA Co-Founders Leo Crane and Clare Maguire served as jury members at the prestigious ASVOFF Film Festival in Paris, evaluating innovative AI-generated films." />
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
          <h1 className="event-hero-title">ASVOFF Film Festival</h1>
          <p className="event-hero-subtitle">AIFA Joins ASVOFF Jury Panel</p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="event-content-section">
        <div className="event-container fade-in">
          <h2 className="event-title">AIFA at ASVOFF Film Festival 2024</h2>
          <p className="event-description">
            AIFA Co-Founders Leo Crane and Clare Maguire were honored to serve as jury members at the prestigious ASVOFF Film Festival in Paris. As recognized experts in AI-generated filmmaking, they evaluated a selection of innovative films that explore the boundaries of technology and creativity.
          </p>
          
          <div className="event-meta-bar">
            <div className="event-meta-item">
              <span className="event-meta-label">Date</span>
              <span className="event-meta-value">November 10, 2024</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Time</span>
              <span className="event-meta-value">2:00 PM - 6:00 PM</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Location</span>
              <span className="event-meta-value">Paris, France</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Category</span>
              <span className="event-meta-value">Festival</span>
            </div>
          </div>
          
          <div className="event-image-container">
            <img src="/images/ASVOFF_events.jpg" alt="AIFA at ASVOFF Film Festival" className="event-image" />
          </div>
          
          <div className="event-details">
            <h3>About the Event</h3>
            <p>
              The ASVOFF (A Shaded View on Fashion Film) Festival is known for its forward-thinking approach to film and fashion. For the 2024 edition, the festival introduced a dedicated AI-Generated Film category, recognizing the growing influence of artificial intelligence in creative expression. AIFA was invited to participate as jury members for this groundbreaking category.
            </p>
            <p>
              Leo Crane and Clare Maguire brought their expertise in AI filmmaking to evaluate entries based on artistic merit, technical innovation, and narrative strength. This participation further strengthens AIFA's position as a leading authority in the AI creative arts community.
            </p>
            
            <h3>Highlights</h3>
            <ul>
              <li>Evaluation of pioneering AI-generated fashion films</li>
              <li>Networking with international filmmakers and fashion innovators</li>
              <li>Panel discussion on the future of AI in fashion filmmaking</li>
              <li>Presentation of AIFA's vision for the evolution of AI creativity</li>
            </ul>
            
            <div className="event-quote">
              <p>"The integration of AI into fashion filmmaking represents an exciting new frontier. We were delighted to see the innovative approaches filmmakers are taking, pushing boundaries while maintaining artistic integrity."</p>
              <cite>— Leo Crane, AIFA Co-Founder</cite>
            </div>
          </div>
          
          <div className="event-cta">
            <h3>Learn More</h3>
            <p>Discover more about ASVOFF and its pioneering approach to fashion film.</p>
            <a href="https://www.ashadedviewonfashionfilm.com/" target="_blank" rel="noopener noreferrer" className="event-button">Visit ASVOFF Website</a>
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