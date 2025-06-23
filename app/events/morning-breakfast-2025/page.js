"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "../events.css";
import "./morning-breakfast-2025.css";

export default function MorningBreakfastEvent() {
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
        <title>Morning Breakfast | AIFA Events</title>
        <meta name="description" content="AIFA will be hosting an invite-only breakfast in London to hold a discussion regarding the future of technology within the creative industries." />
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
          <h1 className="event-hero-title">Morning Breakfast</h1>
          <p className="event-hero-subtitle">A Discussion on the Future of Technology & Creativity</p>
        </div>
      </section>

      {/* EVENT CONTENT */}
      <section className="event-content-section">
        <div className="event-container">
          <h2 className="event-title fade-in">Industry Gathering</h2>
          <p className="event-description fade-in">
            AIFA will be hosting a morning breakfast in London to hold a discussion regarding the future of technology within the creative industries. This gathering will bring together thought leaders, innovators, and decision-makers for a meaningful exchange of ideas.
          </p>
          
          {/* EVENT META */}
          <div className="event-meta-bar fade-in">
            <div className="event-meta-item">
              <span className="event-meta-label">Date</span>
              <span className="event-meta-value">July 22, 2025</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Time</span>
              <span className="event-meta-value">8:00 AM - 10:00 AM</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Location</span>
              <span className="event-meta-value">London, UK</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Category</span>
              <span className="event-meta-value">Invitation Only</span>
            </div>
          </div>
          
          {/* EVENT IMAGE */}
          <div className="event-image-container fade-in">
            <img src="/images/private_events.jpg" alt="Morning Breakfast Event London" className="event-image" />
          </div>
          
          {/* EVENT DETAILS */}
          <div className="event-details">
            <h3 className="fade-in">About the Event</h3>
            <p className="fade-in">
              As part of the WIRED Summer Labs program, AIFA is organizing an intimate morning breakfast that will serve as a forum for critical conversations about the intersection of technology and creativity. This carefully curated gathering will provide a unique opportunity for meaningful dialogue in an exclusive setting.
            </p>
            <p className="fade-in">
              The breakfast will take place in a private London venue, creating an atmosphere conducive to open discussion and the exchange of forward-thinking ideas about how technological innovation is reshaping creative industries.
            </p>
            
            <h3 className="fade-in">Discussion Topics</h3>
            <ul className="fade-in">
              <li>Emerging technologies and their impact on creative expression</li>
              <li>The evolving relationship between human creativity and technological tools</li>
              <li>Ethical considerations in technology-assisted creative work</li>
              <li>Future trends in creative technology and their implications for various industries</li>
              <li>Strategies for fostering innovation at the intersection of technology and creativity</li>
            </ul>
            
            <div className="event-quote fade-in">
              <p>"These intimate gatherings allow for the kind of candid conversation and meaningful connection that drive real innovation. By bringing together diverse perspectives in a private setting, we create the conditions for truly transformative ideas to emerge."</p>
              <cite>— AIFA Co-Founders</cite>
            </div>
            
            <h3 className="fade-in">WIRED Summer Labs</h3>
            <p className="fade-in">
              This event is part of the WIRED Summer Labs program, a celebration of innovation, creativity, and technology. The program brings together pioneers from various industries to showcase groundbreaking ideas and foster meaningful collaborations.
            </p>
            <p className="fade-in">
              By participating in WIRED Summer Labs, AIFA continues its commitment to being at the forefront of conversations about how technology is transforming creative expression and industries.
            </p>
          </div>
          
          {/* CTA */}
          <div className="event-cta fade-in">
            <h3>Join the Conversation</h3>
            <p>While this event is by invitation only, we welcome inquiries from leaders in creative technology. Contact us to learn more about AIFA's exclusive events and how you might participate in future gatherings.</p>
            <div>
              <Link href="/events" className="event-button">View All Events</Link>
              <a href="mailto:aifa@aifilm.academy" className="event-button secondary">Contact for Inquiries</a>
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