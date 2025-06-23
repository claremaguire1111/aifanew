"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "../events.css";
import "./alan-turing-2024.css";

export default function AlanTuringEvent() {
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
        <title>Leo Crane at Alan Turing Institute | AIFA Events</title>
        <meta name="description" content="AIFA Co-Founder Leo Crane joined a panel discussion at the Alan Turing Institute to discuss the future of AI and creative industries." />
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
          <h1 className="event-hero-title">Leo Crane at the Alan Turing Institute</h1>
          <p className="event-hero-subtitle">Panel Discussion on the Future of AI and Creative Industries</p>
        </div>
      </section>

      {/* EVENT CONTENT */}
      <section className="event-content-section">
        <div className="event-container">
          <h2 className="event-title fade-in">Exploring the Intersection of AI and Creativity</h2>
          <p className="event-description fade-in">
            AIFA Co-Founder Leo Crane joined a panel discussion at the prestigious Alan Turing Institute to discuss the future of AI and creative industries, sharing insights on innovation and the evolving landscape of digital creativity.
          </p>
          
          {/* EVENT META */}
          <div className="event-meta-bar fade-in">
            <div className="event-meta-item">
              <span className="event-meta-label">Date</span>
              <span className="event-meta-value">June 12, 2024</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Time</span>
              <span className="event-meta-value">2:00 PM - 4:00 PM</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Location</span>
              <span className="event-meta-value">Alan Turing Institute, London</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Category</span>
              <span className="event-meta-value">Public</span>
            </div>
          </div>
          
          {/* EVENT IMAGE */}
          <div className="event-image-container fade-in">
            <img src="/images/founders/leo_founder.jpg" alt="Leo Crane at Alan Turing Institute" className="event-image" />
          </div>
          
          {/* EVENT DETAILS */}
          <div className="event-details">
            <h3 className="fade-in">About the Event</h3>
            <p className="fade-in">
              The Alan Turing Institute, the UK's national institute for data science and artificial intelligence, hosted a panel discussion focused on the future of AI in creative sectors. As Co-Founder of AIFA, Leo Crane was invited to share his perspectives on how technology is transforming artistic expression and creative industries.
            </p>
            <p className="fade-in">
              This public event brought together researchers, practitioners, and industry leaders to explore the opportunities and challenges at the intersection of artificial intelligence and human creativity. The discussion examined both practical applications and theoretical frameworks for understanding AI's evolving role in creative disciplines.
            </p>
            
            <h3 className="fade-in">Discussion Highlights</h3>
            <ul className="fade-in">
              <li>The current state of AI tools in creative sectors</li>
              <li>Emerging opportunities for creative professionals in the age of AI</li>
              <li>Balancing technological innovation with artistic vision</li>
              <li>Educational approaches for preparing creative practitioners for AI integration</li>
              <li>Ethical considerations in AI-assisted creative work</li>
            </ul>
            
            <div className="event-quote fade-in">
              <p>"The Alan Turing Institute provides an ideal forum for thoughtful dialogue about how AI is reshaping creative practice. By bringing together diverse perspectives from art, technology, and research communities, we can better navigate the complex relationship between human creativity and computational systems."</p>
              <cite>— Leo Crane, Co-Founder, AIFA</cite>
            </div>
            
            <h3 className="fade-in">About the Alan Turing Institute</h3>
            <p className="fade-in">
              Named after the pioneering computer scientist Alan Turing, the institute was created as the national center for AI and data science research in the UK. It undertakes research of world-class excellence that addresses fundamental scientific challenges in AI and works to translate research into real-world impact.
            </p>
            <p className="fade-in">
              The institute's interest in creative applications of AI reflects a growing recognition of how technological innovation is transforming cultural and artistic practices across society.
            </p>
          </div>
          
          {/* CTA */}
          <div className="event-cta fade-in">
            <h3>Stay Connected</h3>
            <p>Join the AIFA community to learn about future panel discussions, workshops, and events exploring the intersection of creativity and technology.</p>
            <div>
              <Link href="/events" className="event-button">View All Events</Link>
              <Link href="/education" className="event-button secondary">Explore AIFA Education</Link>
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