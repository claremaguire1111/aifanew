"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "../events.css";
import "./casa-nua-2024.css";

export default function CasaNuaEvent() {
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
        <title>AIFA at Casa Nua Brazil | AIFA Events</title>
        <meta name="description" content="AIFA Awards finalists were exhibited at Casa Nua event in Brazil, showcasing innovative digital art and filmmaking on a global stage." />
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
          <h1 className="event-hero-title">Casa Nua Exhibition</h1>
          <p className="event-hero-subtitle">AIFA Awards Finalists in Brazil</p>
        </div>
      </section>

      {/* EVENT CONTENT */}
      <section className="event-content-section">
        <div className="event-container">
          <h2 className="event-title fade-in">Global Showcase of Digital Innovation</h2>
          <p className="event-description fade-in">
            AIFA Awards finalists were exhibited at Casa Nua event in Brazil, bringing innovative digital art and filmmaking to an international audience and furthering AIFA's mission to champion creativity worldwide.
          </p>
          
          {/* EVENT META */}
          <div className="event-meta-bar fade-in">
            <div className="event-meta-item">
              <span className="event-meta-label">Date</span>
              <span className="event-meta-value">June 4, 2024</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Time</span>
              <span className="event-meta-value">6:00 PM - 9:00 PM</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Location</span>
              <span className="event-meta-value">Casa Nua, Brazil</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Category</span>
              <span className="event-meta-value">Exhibition</span>
            </div>
          </div>
          
          {/* EVENT IMAGE */}
          <div className="event-image-container fade-in">
            <img src="/images/casanua_events.jpg" alt="AIFA at Casa Nua" className="event-image" />
          </div>
          
          {/* EVENT DETAILS */}
          <div className="event-details">
            <h3 className="fade-in">About the Exhibition</h3>
            <p className="fade-in">
              Casa Nua, a prominent digital art space in Brazil, hosted a special exhibition featuring the work of AIFA Awards finalists. This international showcase represented an important step in AIFA's global outreach, bringing innovative digital art and filmmaking to new audiences in South America.
            </p>
            <p className="fade-in">
              The exhibition presented a carefully curated selection of works that demonstrated the diverse approaches and creative possibilities being explored by artists working at the intersection of technology and storytelling.
            </p>
            
            <h3 className="fade-in">Featured Works</h3>
            <ul className="fade-in">
              <li>Selected digital art pieces from AIFA Awards 2024 finalists</li>
              <li>Experimental films showcasing innovative narrative approaches</li>
              <li>Interactive installations exploring the boundaries of digital creativity</li>
              <li>Artist statements and behind-the-scenes insights into creative processes</li>
            </ul>
            
            <div className="event-quote fade-in">
              <p>"We are delighted to showcase our artists globally to champion the future of innovation. Casa Nua's commitment to digital art makes it an ideal partner for bringing these works to new audiences in Brazil and beyond."</p>
              <cite>— Leo Crane, Co-Founder, AIFA</cite>
            </div>
            
            <h3 className="fade-in">About Casa Nua</h3>
            <p className="fade-in">
              Casa Nua is a pioneering platform for digital and NFT art in Brazil, providing a space for creators to exhibit and sell their work in an environment that bridges traditional gallery experiences with Web3 innovation. The space is known for its forward-thinking approach to digital creativity and its commitment to supporting emerging artists.
            </p>
            <p className="fade-in">
              This collaboration with AIFA represents Casa Nua's ongoing effort to connect the Brazilian art scene with international developments in digital creativity and to foster a global dialogue about the future of art in the digital age.
            </p>
          </div>
          
          {/* CTA */}
          <div className="event-cta fade-in">
            <h3>Explore More</h3>
            <p>Discover Casa Nua's innovative approach to digital art and AIFA's global initiatives.</p>
            <div>
              <a href="https://en.nft.nua.casa/" target="_blank" rel="noopener noreferrer" className="event-button">Visit Casa Nua</a>
              <Link href="/awards/2024" className="event-button secondary">AIFA Awards 2024</Link>
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