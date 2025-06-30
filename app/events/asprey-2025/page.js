"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "../events.css";
import "./asprey-2025.css";

export default function Asprey2025Event() {
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
        <title>Asprey Studio Event 2025 | AIFA Events</title>
        <meta name="description" content="An invitation-only gathering at Asprey Studio to celebrate the future of creativity and technology, bringing together innovators and thought leaders." />
        <script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js" async></script>
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
          <h1 className="event-hero-title">Asprey Studio Event</h1>
          <p className="event-hero-subtitle">Celebrating the Future of Creativity and Technology</p>
          <div className="event-hero-buttons" style={{ marginTop: "20px" }}>
            <a
              href="https://lu.ma/event/evt-ycbJMAMjVtMwuM4"
              className="luma-checkout--button event-button"
              data-luma-action="checkout"
              data-luma-event-id="evt-ycbJMAMjVtMwuM4"
              style={{ 
                display: "inline-block", 
                padding: "8px 20px", 
                backgroundColor: "#000", 
                color: "#fff", 
                textDecoration: "none", 
                marginTop: "10px", 
                fontSize: "0.9rem",
                fontWeight: "300", 
                textTransform: "uppercase", 
                letterSpacing: "1px",
                borderRadius: "2px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease"
              }}
            >
              Register
            </a>
          </div>
        </div>
      </section>

      {/* EVENT CONTENT */}
      <section className="event-content-section">
        <div className="event-container">
          <h2 className="event-title fade-in">Exclusive Gathering of Creative Innovators</h2>
          <p className="event-description fade-in">
            An invitation-only gathering at the prestigious Asprey Studio to celebrate the future of creativity and technology, bringing together thought leaders, innovators, and visionaries from across creative industries.
          </p>
          
          {/* EVENT META */}
          <div className="event-meta-bar fade-in">
            <div className="event-meta-item">
              <span className="event-meta-label">Date</span>
              <span className="event-meta-value">July 22, 2025</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Time</span>
              <span className="event-meta-value">10:30 AM - 12:30 PM</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Location</span>
              <span className="event-meta-value">Asprey Studio</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Category</span>
              <span className="event-meta-value">Invitation Only</span>
            </div>
          </div>
          
          {/* EVENT IMAGE */}
          <div className="event-image-container fade-in">
            <img src="/images/aspreystudios_events.png" alt="Asprey Studio Event" className="event-image" />
          </div>
          
          {/* EVENT DETAILS */}
          <div className="event-details">
            <h3 className="fade-in">About the Event</h3>
            <p className="fade-in">
              Following the success of the Morning Breakfast discussion, AIFA will host an exclusive gathering at the prestigious Asprey Studio. This curated event brings together a select group of creative professionals, technologists, and industry leaders for a celebration of innovation and exchange of forward-thinking ideas.
            </p>
            <p className="fade-in">
              Asprey Studio, with its rich heritage in luxury craftsmanship and commitment to excellence, provides the perfect setting for this high-level conversation about the future of creativity and technology. The intimate venue allows for meaningful connections and conversations that wouldn't be possible in larger settings.
            </p>
            
            <h3 className="fade-in">Event Format</h3>
            <ul className="fade-in">
              <li>10:30 AM – Arrival and welcome drinks</li>
              <li>10:45 AM – Introduction from AIFA Ventures and Asprey Studio</li>
              <li>11:00 AM – Showcase of the AIFA Awards 2025 and Asprey Studio's curated artworks</li>
              <li>11:45 AM – Networking session with guided conversation prompts and an exclusive preview of upcoming AIFA initiatives</li>
              <li>12:30 PM – Event ends</li>
            </ul>
            <p className="fade-in">Entrance via: Asprey, 34–36 Bruton Street, W1J 6QX, London</p>
            
            <div className="event-quote fade-in">
              <p>"Asprey Studio represents a perfect blend of heritage craftsmanship and forward-thinking innovation—qualities that mirror our own approach at AIFA. This gathering is designed to create the kind of intimate, high-quality connections that truly drive creative innovation forward."</p>
              <cite>— AIFA Co-Founders</cite>
            </div>
            
            <h3 className="fade-in">About Asprey Studio</h3>
            <p className="fade-in">
              Asprey Studio is a digital and contemporary art gallery, workshop, and members' club specialising in the intersection of digital and physical mediums. Representing a new frontier for Asprey, the 244-year-old British luxury house, Asprey Studio was founded in 2021 to explore the future of art and design building on time-honoured craftsmanship while advancing state-of-the-art technological innovation.
            </p>
            <p className="fade-in">
              Asprey, established in 1781, has a rich heritage in luxury craftsmanship. Asprey Studio continues this tradition while embracing new ideas, creating a unique space where legacy meets contemporary creative practice. The Studio serves as a hub for creative excellence, with a gallery in Mayfair and a workshop in Kent.
            </p>
            <p className="fade-in">
              Guided by Chief Creative Officer and artist Alastair Walker, Asprey Studio champions both established and emerging artists working with technology. It has released unique collections through standout partnerships, including collaborations with Bugatti and the British Museum. Asprey Studio's mission is to continue pushing the boundaries of art, luxury, and technology into a bold and unbounded future.
            </p>
            <p className="fade-in">
              The Asprey Studio gallery in Mayfair provides a refined yet intimate setting for focused and thought-provoking conversations, offering the ideal space and atmosphere for meaningful exchange about creative technologies.
            </p>
          </div>
          
          {/* CTA */}
          <div className="event-cta fade-in">
            <h3>WIRED Summer Labs</h3>
            <p>This event is part of the prestigious WIRED Summer Labs program, a celebration of innovation, creativity, and technology bringing together pioneers from various industries to showcase groundbreaking ideas and foster meaningful collaborations.</p>
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