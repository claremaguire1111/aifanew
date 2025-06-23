"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "../../awards.css";
import "./thank-you-jury.css";

export default function ThankYouJury2025() {
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
    <div className="awards-page">
      <Head>
        <title>Thank You | AIFA Awards 2025 Jury</title>
        <meta name="description" content="Thank you for participating in the AIFA Awards 2025 Jury voting. We appreciate your support and contribution to recognizing groundbreaking AI-generated films." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Thank You | AIFA Awards 2025 Jury" />
        <meta property="og:description" content="Thank you for participating in the AIFA Awards 2025 Jury voting." />
        <meta property="og:type" content="website" />
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
          <Link href="/education" onClick={toggleMenu}>
            Education
          </Link>
          <Link href="/events" onClick={toggleMenu}>
            Events
          </Link>
        </nav>
      </header>

      {/* THANK YOU CONTENT */}
      <div className="thank-you-container fade-in">
        <h1 className="thank-you-title">Thank You for Your Participation</h1>
        
        <img 
          src="/images/aifa-event.jpg" 
          alt="AIFA Awards Event" 
          className="london-image" 
        />
        
        <p className="thank-you-message">
          Thank you for voting and for participating in our AIFA 2025 Jury. 
          Your expertise and insights are invaluable in recognizing the most innovative 
          and groundbreaking AI-generated films of the year.
        </p>
        
        <p className="thank-you-message thank-you-highlight">
          We look forward to seeing you in London in July!
        </p>
        
        <div className="thank-you-divider"></div>
        
        <div className="thank-you-info">
          <h3>AIFA Awards 2025 Ceremony</h3>
          <p><strong>Date:</strong> July 2025</p>
          <p><strong>Location:</strong> London, United Kingdom</p>
          <p>
            Further details about the ceremony, including the exact date, venue, 
            and schedule, will be communicated to you via email in the coming weeks.
          </p>
        </div>
        
        <p className="thank-you-signature">
          — The AIFA Team
        </p>
        
        <Link href="/awards/2025" className="thank-you-button">
          Return to Awards 2025
        </Link>
      </div>

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