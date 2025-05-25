"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../awards.css";

export default function Awards2025() {
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

  const juryMembers = [
    { 
      name: "Diane Pernet", 
      role: "Fashion Film",
      image: "/images/jury2025/diane_pernet.jpg" 
    },
    { 
      name: "David Sheldrick", 
      role: "Artist",
      image: "/images/jury2025/david_sheldrick.PNG" 
    },
    { 
      name: "Ethereal Moon", 
      role: "Artist",
      image: "/images/jury2025/Ethereal_Moon.jpg" 
    },
    { 
      name: "Roy Joseph Butler", 
      role: "LOCO Festival",
      image: "/images/jury2025/Roy_Joseph_Butler.jpg" 
    },
    { 
      name: "Clare Maguire", 
      role: "NOPRBLM",
      image: "/images/jury2025/Clare_Maguire.jpg" 
    },
    { 
      name: "GLITCHOFMIND", 
      role: "Artist",
      image: "/images/jury2025/glitch_of_mind.jpg" 
    },
    { 
      name: "Pinny Grylls", 
      role: "Filmmaker",
      image: "/images/jury2025/Pinny_Grylls.png" 
    },
    { 
      name: "Leo Crane", 
      role: "Producer",
      image: "/images/jury2025/leo_crane.jpg" 
    },
    { 
      name: "Pedro Guez", 
      role: "ASVOFF",
      image: "/images/jury2025/pedroguez_portrait.png" 
    },
    { 
      name: "Dyl Blaquiere", 
      role: "Sedition",
      image: "/images/jury2025/Dyl.jpg" 
    }
  ];

  const brandNames = [
    "SOTHEBY'S INSTITUTE OF ART",
    "NFC",
    "GALXE",
    "DRESSX",
    "BRIGHTMOMENTS",
    "REKT",
    "ZORA",
    "SUPERRARE",
    "AIMAGINE",
    "MUSE FRAME",
    "HUG",
    "DECRYPT",
    "INTERCELLAR",
    "RED-EYE",
    "RUG RADIO",
    "[S]EDITION",
    "OBJECT SUBJECT FORM",
    "NON-FUN GERBILS",
    "DIG-IN",
    "WEB3SENSE",
    "CASA NUA",
    "ASVOF",
    "L'OFFICIEL",
    "FIZZY MAG"
  ];

  return (
    <div className="awards-page">
      {/* HEADER */}
      <header className={`header ${headerScrolled ? "scrolled" : ""}`}>
        <Link href="/" className="logo">
          <img
            src="/images/AIFAlogo.png"
            alt="AIFA Logo"
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
          <Link href="/film-chat" onClick={toggleMenu}>
            Chat
          </Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="awards-hero">
        <div className="video-wrapper">
          <video
            src="/videos/Sheldrick.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="background-video"
          >
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay" style={{ backgroundColor: 'transparent' }}></div>
        </div>
        <div className="awards-hero-content">
          <h1 className="awards-hero-title">AIFA Awards 2025</h1>
          <p className="awards-hero-subtitle">Launching June 3 at NFC</p>
          <p className="awards-hero-partner">Film extract by <a href="https://www.sheldrick.ai/" target="_blank" rel="noopener noreferrer" style={{ color: '#a3a3a3' }}>David Sheldrick</a></p>
        </div>
      </section>

      {/* Film extract moved to hero section */}

      {/* Signup button removed */}

      {/* ABOUT SECTION */}
      <section className="awards-about">
        <div className="about-container">
          <h2 className="about-title">The Award of Awards</h2>
          <p className="about-description">We celebrate innovation and creativity in film</p>
          
          <div className="awards-timeline fade-in">
            <div className="timeline-stage">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Research</h3>
                <p>We've tracked 30 top festivals showcasing the best in filmmaking</p>
              </div>
            </div>
            <div className="timeline-stage">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Selection</h3>
                <p>We've selected a longlist of 90 award-winning & nominated shorts</p>
              </div>
            </div>
            <div className="timeline-stage">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Finalists Announcement</h3>
                <p>On 3 June, we'll share a curated list of finalists at NFC Lisbon</p>
              </div>
            </div>
            <div className="timeline-stage">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Awards Ceremony</h3>
                <p>On 22 July, we'll announce the AIFA Awards 2025 at a VIP event in London</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="awards-partners">
        <div className="partners-container">
          <h2 className="partners-title">Our Partners</h2>
          
          <div className="moving-brands">
            <div className="brand-row">
              {brandNames.map((brand, idx) => (
                <div key={idx} className="brand-name">
                  {brand}
                </div>
              ))}
              {brandNames.map((brand, idx) => (
                <div key={`dup-${idx}`} className="brand-name">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JURY SECTION */}
      <section className="awards-jury">
        <div className="jury-container">
          <h2 className="jury-title">2025 Jury</h2>
          
          <div className="jury-grid fade-in">
            {juryMembers.map((member, index) => (
              <div className="jury-member" key={index}>
                <div className="jury-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="jury-info">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNUP SECTION */}
      <section className="signup-section" id="signup">
        <div className="signup-box">
          <h1 className="fade-in">Join Our Community</h1>
          <p className="fade-in">
            For all enquiries and to stay up to date, sign up below
          </p>
          <form action="https://formspree.io/f/mnnqqvqd" method="POST" className="fade-in">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

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
              <Link href="/film-chat">Chat</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Follow</h3>
          <ul>
            <li>
              <a
                href="https://www.instagram.com/aifilm.academy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://x.com/aifilmacademy"
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

      <div style={{ textAlign: "center", padding: "20px 0", borderTop: "1px solid var(--medium-grey)" }}>
        <p style={{ fontSize: "14px", color: "var(--dark-grey)" }}>© 2025 AIFA Ventures. All rights reserved</p>
        <p style={{ fontSize: "14px", color: "var(--dark-grey)", marginTop: "5px" }}>A positive future for entertainment</p>
      </div>
    </div>
  );
}