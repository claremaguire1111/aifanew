"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "../events.css";
import "./sothebys-2025.css";

export default function Sothebys2025Event() {
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
        <title>Sotheby's Institute Guest Lecture 2025 | AIFA Events</title>
        <meta name="description" content="Leo Crane will be hosting a Sotheby's Institute event as lecturer, with Clare Maguire guest lecturing to discuss entrepreneurship in creative industries and how technology plays a role." />
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
          <h1 className="event-hero-title">Sotheby's Institute Guest Lecture</h1>
          <p className="event-hero-subtitle">Entrepreneurship & Technology in Creative Industries</p>
        </div>
      </section>

      {/* EVENT CONTENT */}
      <section className="event-content-section">
        <div className="event-container">
          <h2 className="event-title fade-in">AIFA Co-Founders at Sotheby's Institute</h2>
          <p className="event-description fade-in">
            Leo Crane will be hosting a Sotheby's Institute event as lecturer, with Clare Maguire joining as guest lecturer to discuss entrepreneurship in creative industries and how technology plays a role in shaping the future of creativity.
          </p>
          
          {/* EVENT META */}
          <div className="event-meta-bar fade-in">
            <div className="event-meta-item">
              <span className="event-meta-label">Date</span>
              <span className="event-meta-value">June 17, 2025</span>
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
              <span className="event-meta-value">Private</span>
            </div>
          </div>
          
          {/* EVENT IMAGE */}
          <div className="event-image-container fade-in">
            <img src="/images/sothebys_events.jpg" alt="AIFA Co-Founders at Sotheby's Institute" className="event-image" />
          </div>
          
          {/* EVENT DETAILS */}
          <div className="event-details">
            <h3 className="fade-in">About the Event</h3>
            <p className="fade-in">
              As part of Sotheby's Institute's prestigious educational program, AIFA Co-Founders will present an exclusive guest lecture exploring the dynamic relationship between entrepreneurship and technology in today's creative industries. This private event will provide students and faculty with insights from two successful entrepreneurs who have navigated the evolving landscape of creative technology.
            </p>
            <p className="fade-in">
              Leo Crane will host the session, drawing on his extensive experience in animation and digital creativity to provide context on the changing nature of creative enterprise. Clare Maguire will join as a guest lecturer, focusing specifically on how technological innovation is reshaping entrepreneurial opportunities across various creative sectors.
            </p>
            
            <h3 className="fade-in">Lecture Topics</h3>
            <ul className="fade-in">
              <li>The entrepreneurial journey: founding and growing AIFA</li>
              <li>Identifying opportunities at the intersection of technology and creativity</li>
              <li>Building resilient creative businesses in rapidly evolving technological landscapes</li>
              <li>Case studies of successful creative entrepreneurs leveraging technology</li>
              <li>Future trends and emerging spaces for creative entrepreneurship</li>
              <li>Practical insights for aspiring creative entrepreneurs</li>
            </ul>
            
            <div className="event-quote fade-in">
              <p>"Educating the next generation of creative entrepreneurs is essential for the continued evolution of our industry. By sharing practical insights about the intersection of technology and creative enterprise, we hope to inspire students to think boldly about their own entrepreneurial journeys."</p>
              <cite>— Leo Crane, Co-Founder, AIFA</cite>
            </div>
            
            <h3 className="fade-in">About Sotheby's Institute</h3>
            <p className="fade-in">
              Sotheby's Institute of Art is a premier graduate school offering programs in art business, art history, and contemporary art. With campuses in London, New York, and Los Angeles, the Institute provides a comprehensive education that bridges academic study and professional practice in the international art world.
            </p>
            <p className="fade-in">
              This lecture is part of the Institute's ongoing commitment to exposing students to leading practitioners and innovators in the creative industries, helping to prepare them for successful careers in an increasingly technology-driven art ecosystem.
            </p>
          </div>
          
          {/* CTA */}
          <div className="event-cta fade-in">
            <h3>WIRED Summer Labs</h3>
            <p>This event is part of the prestigious WIRED Summer Labs program, a celebration of innovation, creativity, and technology bringing together pioneers from various industries to showcase groundbreaking ideas and foster meaningful collaborations.</p>
            <div>
              <Link href="/events" className="event-button">View All Events</Link>
              <a href="mailto:aifa@aifilm.academy" className="event-button secondary">Contact for Information</a>
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