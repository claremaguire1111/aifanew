"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "./media-pass.css";

export default function MediaPass() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Form will be handled by Formspree
    setFormSubmitted(true);
  };

  return (
    <div className="media-pass-page">
      <Head>
        <title>Media Pass Registration | AIFA Awards 2025</title>
        <meta name="description" content="Register for a media pass to attend the AIFA Awards 2025 ceremony and gain access to press materials, interviews, and exclusive content." />
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
      <section className="media-hero">
        <div className="media-hero-content">
          <div className="media-label">Press</div>
          <h1 className="media-hero-title">Media Pass Registration</h1>
          <p className="media-hero-subtitle">
            Register for press access to the AIFA Awards 2025
          </p>
        </div>
      </section>

      {/* MEDIA PASS FORM SECTION */}
      <section className="media-form-section">
        <div className="media-form-container fade-in">
          {!formSubmitted ? (
            <>
              <div className="form-intro">
                <h2>Apply for Media Credentials</h2>
                <p>Complete the form below to request a media pass for the AIFA Awards 2025 ceremony on July 19, 2025 at art'otel London Hoxton. Media passes provide access to the event, interviews with finalists, press materials, and more.</p>
              </div>
              
              <form className="media-pass-form" action="https://formspree.io/f/xzzgjdjz" method="POST" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="publication">Publication/Media Outlet *</label>
                  <input type="text" id="publication" name="publication" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="title">Job Title *</label>
                  <input type="text" id="title" name="title" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" required />
                </div>
                
                <div className="form-group full-width">
                  <label htmlFor="website">Website/Portfolio URL</label>
                  <input type="url" id="website" name="website" />
                </div>
                
                <div className="form-group full-width">
                  <label htmlFor="coverage">Intended Coverage *</label>
                  <textarea id="coverage" name="coverage" rows="3" placeholder="Please describe your intended coverage of the AIFA Awards 2025" required></textarea>
                </div>
                
                <div className="form-group full-width">
                  <label htmlFor="equipment">Equipment</label>
                  <textarea id="equipment" name="equipment" rows="2" placeholder="Please list any equipment you plan to bring (cameras, recording devices, etc.)"></textarea>
                </div>
                
                <div className="form-group full-width checkbox-group">
                  <input type="checkbox" id="terms" name="terms" required />
                  <label htmlFor="terms">I agree to the AIFA press guidelines and terms of coverage *</label>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="submit-button">Submit Application</button>
                </div>
                
                <p className="form-note">* Required fields</p>
                <p className="form-privacy">Your information will be used solely for processing your media pass request and will not be shared with third parties.</p>
              </form>
            </>
          ) : (
            <div className="form-success">
              <h2>Application Received</h2>
              <p>Thank you for your interest in covering the AIFA Awards 2025. We've received your media pass application and will review it shortly. A member of our press team will be in touch within 2-3 business days to confirm your registration.</p>
              <p>In the meantime, you can access our <Link href="/events/aifa-awards-2025-press-release">press release</Link> for more information about the event.</p>
              <div className="form-actions">
                <Link href="/events/aifa-awards-2025-press-release" className="secondary-button">View Press Release</Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PRESS BENEFITS SECTION */}
      <section className="press-benefits-section">
        <div className="benefits-container fade-in">
          <h2 className="benefits-title">Media Pass Benefits</h2>
          
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🎬</div>
              <h3>Event Access</h3>
              <p>Full access to the AIFA Awards ceremony, including the VIP screening and reception</p>
            </div>
            
            <div className="benefit-item">
              <div className="benefit-icon">🎙️</div>
              <h3>Interview Opportunities</h3>
              <p>Scheduled interviews with finalists, jury members, and AIFA founders</p>
            </div>
            
            <div className="benefit-item">
              <div className="benefit-icon">📸</div>
              <h3>Dedicated Photo Area</h3>
              <p>Access to the media photography area during red carpet arrivals</p>
            </div>
            
            <div className="benefit-item">
              <div className="benefit-icon">📁</div>
              <h3>Press Kit</h3>
              <p>Digital press kit with high-resolution images, film stills, and background information</p>
            </div>
            
            <div className="benefit-item">
              <div className="benefit-icon">💻</div>
              <h3>Wi-Fi Access</h3>
              <p>Complimentary high-speed Wi-Fi access at the venue for file uploads and live reporting</p>
            </div>
            
            <div className="benefit-item">
              <div className="benefit-icon">🍹</div>
              <h3>Refreshments</h3>
              <p>Complimentary refreshments throughout the event</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="press-contact-section">
        <div className="press-contact-container fade-in">
          <h2 className="contact-title">Press Inquiries</h2>
          <p className="contact-description">
            For any questions regarding media passes or press coverage, please contact:
          </p>
          <div className="contact-info">
            <p>
              Clare Maguire, NOPRBLM<br />
              <a href="mailto:clare@aifaventures.com">clare@aifaventures.com</a><br />
              <a href="mailto:leo@aifaventures.com">leo@aifaventures.com</a>
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-us-section" id="contact">
        <div className="footer-column">
          <h3>Get in Touch</h3>
          <ul>
            <li>
              <a href="mailto:aifa@aifaventures.com">aifa@aifaventures.com</a>
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