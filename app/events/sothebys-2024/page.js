"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "./sothebys-2024.css";

export default function SothebysEvent() {
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
        <title>AIFA Guest Lecture at Sotheby's Institute | AI Film Academy</title>
        <meta name="description" content="AIFA Co-Founders delivered a guest lecture on the future of art, technology and entrepreneurship in creative industries at Sotheby's Institute, sharing insights on innovation and digital transformation." />
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
          <h1 className="event-hero-title">Sotheby's Institute Lecture</h1>
          <p className="event-hero-subtitle">The Future of Art, Tech and Entrepreneurship</p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="event-content-section">
        <div className="event-container fade-in">
          <h2 className="event-title">AIFA Co-Founders Guest Lecture at Sotheby's Institute</h2>
          <p className="event-description">
            Leo Crane held the course at the prestigious Sotheby's Institute of Art with Clare Maguire joining as a guest lecturer to discuss AIFA and the future impact of technology in the creative industries, exploring innovation, entrepreneurship, and the evolving landscape of digital creativity.
          </p>
          
          <div className="event-meta-bar">
            <div className="event-meta-item">
              <span className="event-meta-label">Date</span>
              <span className="event-meta-value">June 18, 2024</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Time</span>
              <span className="event-meta-value">6:00 PM - 8:00 PM</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Location</span>
              <span className="event-meta-value">Sotheby's Institute, London</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Category</span>
              <span className="event-meta-value">Education</span>
            </div>
          </div>
          
          <div className="event-image-container">
            <img src="/images/sothebys_events.jpg" alt="AIFA at Sotheby's Institute" className="event-image" />
          </div>
          
          <div className="event-details">
            <h3>About the Event</h3>
            <p>
              As part of Sotheby's Institute's program on innovation in the art world, AIFA Co-Founders were invited to share insights on the evolving landscape of technology and entrepreneurship in creative industries. The lecture offered students and faculty a comprehensive overview of the opportunities, challenges, and market implications of technological innovation in art and entertainment.
            </p>
            <p>
              The presentation explored the transformation of creative practices through technology, showcased examples of innovative approaches from the AIFA community, and discussed the entrepreneurial mindset needed to navigate this rapidly changing landscape for creators, institutions, and the art market.
            </p>
            
            <h3>Lecture Topics</h3>
            <ul>
              <li>The evolving intersection of art, technology, and entrepreneurship</li>
              <li>Building innovative ventures in the creative industries</li>
              <li>Case studies of successful creative entrepreneurs</li>
              <li>The founding story and mission of AIFA</li>
              <li>Market considerations for digital creativity in traditional art spaces</li>
              <li>Future trajectories for technology in creative sectors</li>
            </ul>
            
            <h3>About Sotheby's Institute</h3>
            <p>
              Sotheby's Institute of Art is a premier graduate school offering programs in art business, art history, and contemporary art. With campuses in London, New York, and Los Angeles, the Institute provides a comprehensive education that bridges academic study and professional practice in the international art world.
            </p>
            
            <div className="event-quote">
              <p>"Engaging with the next generation of art professionals at Sotheby's Institute provides a valuable opportunity to share insights on how technology is transforming creative industries. The enthusiasm and innovative thinking of these students gives us tremendous hope for the future of creativity in our increasingly digital world."</p>
              <cite>— Clare Maguire, AIFA Co-Founder</cite>
            </div>
          </div>
          
          <div className="event-cta">
            <h3>Explore Further</h3>
            <p>Discover more about innovation in creative industries through AIFA's programs.</p>
            <Link href="/education" className="event-button">AIFA Education</Link>
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