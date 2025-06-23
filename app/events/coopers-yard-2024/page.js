"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "./coopers-yard-2024.css";

export default function CoopersYardEvent() {
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
        <title>AIFA at Coopers Yard London | AIFA Events</title>
        <meta name="description" content="A special film screening event showcasing the best of AI-generated filmmaking from the AIFA Awards 2024 at Coopers Yard, London." />
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
          <h1 className="event-hero-title">AIFA at Coopers Yard</h1>
          <p className="event-hero-subtitle">Special Film Screening</p>
        </div>
      </section>

      {/* EVENT CONTENT */}
      <section className="event-content-section">
        <div className="event-container">
          <h2 className="event-title fade-in">Showcasing AI-Generated Filmmaking</h2>
          <p className="event-description fade-in">
            AIFA hosted a special film screening event at the prestigious Coopers Yard in London, showcasing the best of AI-generated filmmaking from the AIFA Awards 2024. This exclusive event brought together filmmakers, artists, and technology enthusiasts to experience groundbreaking works at the intersection of AI and creative storytelling.
          </p>
          
          {/* EVENT META */}
          <div className="event-meta-bar fade-in">
            <div className="event-meta-item">
              <span className="event-meta-label">Date</span>
              <span className="event-meta-value">June 26, 2024</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Time</span>
              <span className="event-meta-value">7:00 PM - 9:00 PM</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Location</span>
              <span className="event-meta-value">Coopers Yard, London</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Category</span>
              <span className="event-meta-value">Public</span>
            </div>
          </div>
          
          {/* EVENT IMAGE */}
          <div className="event-image-container fade-in">
            <img src="/images/copperyard_events.jpg" alt="AIFA at Coopers Yard" className="event-image" />
          </div>
          
          {/* EVENT DETAILS */}
          <div className="event-details">
            <h3 className="fade-in">About the Event</h3>
            <p className="fade-in">
              The Coopers Yard screening event created an intimate setting for attendees to experience a curated selection of the most innovative AI-generated films from the AIFA Awards 2024. The evening featured a diverse range of works showcasing different approaches to AI filmmaking, from fully generated content to hybrid productions combining traditional techniques with AI assistance.
            </p>
            <p className="fade-in">
              Located in a vibrant creative district of London, Coopers Yard provided an ideal backdrop for this gathering of forward-thinking artists and technologists. The space's industrial aesthetic complemented the cutting-edge nature of the works being screened, creating a harmonious environment for experiencing and discussing the future of filmmaking.
            </p>
            
            <h3 className="fade-in">Event Highlights</h3>
            <ul className="fade-in">
              <li>Screening of award-winning AI-generated films from AIFA Awards 2024</li>
              <li>Introduction by AIFA Co-Founders Leo Crane and Clare Maguire</li>
              <li>Q&A session with selected filmmakers discussing their creative processes</li>
              <li>Networking reception with refreshments and opportunities to connect with industry peers</li>
              <li>Live demonstrations of AI tools used in the production of featured works</li>
            </ul>
            
            <div className="event-quote fade-in">
              <p>"The Coopers Yard screening provided a unique platform to showcase how AI is transforming the landscape of filmmaking. The enthusiasm and engagement from the audience reinforced our belief that AI-generated content has a significant place in the future of creative expression."</p>
              <cite>— Leo Crane, Co-Founder, AIFA</cite>
            </div>
            
            <h3 className="fade-in">Community Impact</h3>
            <p className="fade-in">
              This public screening event helped to broaden awareness of AI-generated filmmaking beyond specialized tech communities, introducing these innovative works to a wider audience of film enthusiasts and cultural explorers. By making these films accessible in a public venue, AIFA continues its mission to demystify AI creativity and showcase its artistic potential.
            </p>
            <p className="fade-in">
              The event also strengthened connections within London's creative community, fostering new collaborations between technologists, filmmakers, and other creative practitioners interested in exploring the possibilities of AI-assisted storytelling.
            </p>
          </div>
          
          {/* CTA */}
          <div className="event-cta fade-in">
            <h3>Join Our Future Events</h3>
            <p>Stay connected with AIFA to learn about our upcoming screenings, workshops, and the AIFA Awards 2025. Sign up for our newsletter to receive invitations to exclusive events like this one.</p>
            <div>
              <Link href="/events" className="event-button">View All Events</Link>
              <Link href="/awards/2024" className="event-button secondary">Explore AIFA Awards 2024</Link>
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