"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "./asprey-2024.css";

export default function AspreyEvent() {
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
        <title>AIFA x Sotheby's at Asprey Studios | AIFA Events</title>
        <meta name="description" content="A collaborative panel discussion between AIFA and Sotheby's Institute exploring the intersection of fine art, luxury, and AI-generated content at Asprey Studios, London." />
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
          <h1 className="event-hero-title">Asprey Studios Event</h1>
          <p className="event-hero-subtitle">AIFA x Sotheby's Institute Panel</p>
        </div>
      </section>

      {/* EVENT CONTENT */}
      <section className="event-content-section">
        <div className="event-container">
          <h2 className="event-title fade-in">AI in Fine Art & Luxury</h2>
          <p className="event-description fade-in">
            AIFA partnered with Sotheby's Institute for an exclusive panel discussion at the prestigious Asprey Studios in London. This collaborative event explored the fascinating intersection of fine art, luxury, and AI-generated content, bringing together thought leaders from both traditional art institutions and emerging technology innovators.
          </p>
          
          {/* EVENT META */}
          <div className="event-meta-bar fade-in">
            <div className="event-meta-item">
              <span className="event-meta-label">Date</span>
              <span className="event-meta-value">June 10, 2024</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Time</span>
              <span className="event-meta-value">6:30 PM - 8:30 PM</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Location</span>
              <span className="event-meta-value">Asprey Studios, London</span>
            </div>
            <div className="event-meta-item">
              <span className="event-meta-label">Category</span>
              <span className="event-meta-value">Invite Only</span>
            </div>
          </div>
          
          {/* EVENT IMAGE */}
          <div className="event-image-container fade-in">
            <img src="/images/asprey_24_events.jpg" alt="AIFA x Sotheby's at Asprey Studios" className="event-image" />
          </div>
          
          {/* EVENT DETAILS */}
          <div className="event-details">
            <h3 className="fade-in">About the Event</h3>
            <p className="fade-in">
              Hosted in the elegant surroundings of Asprey Studios, this invitation-only event brought together a select audience of art collectors, luxury brand representatives, gallerists, and technology innovators. The panel discussion created a platform for meaningful dialogue about how AI is reshaping traditional notions of art creation, valuation, and collection in the luxury sector.
            </p>
            <p className="fade-in">
              Asprey Studios, known for its rich heritage in luxury craftsmanship, provided the perfect setting for this conversation about the intersection of tradition and innovation. The venue's commitment to excellence in artistry resonated with the event's exploration of how AI tools are being integrated into high-end creative processes.
            </p>
            
            <h3 className="fade-in">Panel Discussion Topics</h3>
            <ul className="fade-in">
              <li>The evolving role of AI in fine art production and its impact on traditional art markets</li>
              <li>How luxury brands are incorporating AI-generated content into their creative strategies</li>
              <li>Collecting and valuing AI art: perspectives from gallerists and auction houses</li>
              <li>The future of hybrid creation: collaborations between human artists and AI systems</li>
              <li>Ethical considerations in AI art within the luxury ecosystem</li>
            </ul>
            
            <div className="event-quote fade-in">
              <p>"The Asprey Studios event represented a significant milestone in the ongoing dialogue between traditional art institutions and AI innovators. By bringing together Sotheby's Institute and AIFA, we created a unique opportunity to explore how AI is being embraced by the luxury sector while respecting the rich traditions of fine art."</p>
              <cite>— Leo Crane, Co-Founder, AIFA</cite>
            </div>
            
            <h3 className="fade-in">Cultural Significance</h3>
            <p className="fade-in">
              This collaboration between AIFA and Sotheby's Institute marks an important step in bridging the worlds of traditional art education and emerging AI creativity. By hosting the event at Asprey Studios, a name synonymous with luxury craftsmanship, the discussion was grounded in a context that values both heritage and innovation.
            </p>
            <p className="fade-in">
              The exclusive nature of the event allowed for candid conversations about the challenges and opportunities presented by AI in luxury contexts, fostering connections between established institutions and forward-thinking creators that will continue to shape how AI is integrated into high-end creative sectors.
            </p>
          </div>
          
          {/* CTA */}
          <div className="event-cta fade-in">
            <h3>Interested in Future Collaborations?</h3>
            <p>AIFA regularly partners with prestigious institutions and luxury brands to explore the evolving landscape of AI in creative fields. Contact us to discuss potential collaborations or to inquire about our upcoming invitation-only events.</p>
            <div>
              <Link href="/events" className="event-button">View All Events</Link>
              <a href="mailto:aifa@aifilm.academy" className="event-button secondary">Contact for Partnerships</a>
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