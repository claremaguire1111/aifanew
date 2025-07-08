"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "./awards.css";

export default function Awards() {
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

  // Press quotes
  const pressQuotes = [
    { quote: "a revolutionary moment in cinematic history", source: "Redeye" },
    { quote: "AI magic exposed", source: "Fizzy Mag" },
    { quote: "a spectacular debut", source: "Redlion News" },
    { quote: "a new wave of artists' film", source: "Sotheby's Institute" },
    { quote: "a grand web3 Oscars", source: "L'Officiel" },
    { quote: "recognition of extraordinary storytelling", source: "Blockster" }
  ];

  // Brand partners
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
    "[S]EDITION",
    "OBJECT SUBJECT FORM",
    "CASA NUA",
    "ASVOF",
    "L'OFFICIEL"
  ];

  return (
    <div className="awards-page">
      <Head>
        <title>AIFA Awards | The World's #1 Global Film Awards for AI Innovation</title>
        <meta name="description" content="AIFA Awards - The world's premier film awards celebrating excellence in AI-generated filmmaking. Join us for our annual celebration of innovation in storytelling." />
        <meta name="keywords" content="AIFA Awards, World's #1 Film Awards, Global Film Awards, AI Film Academy, AI filmmaking, digital art awards, NFT film, AI artists" />
        <meta property="og:title" content="AIFA Awards | The World's #1 Global Film Awards for AI Innovation" />
        <meta property="og:description" content="AIFA Awards - The world's premier film awards celebrating excellence in AI-generated filmmaking. Join us for our annual celebration of innovation in storytelling." />
        <meta property="og:image" content="/images/Awards2024/awardwinners/denny_the_shark.png" />
        <meta property="og:url" content="https://aifilm.academy/awards" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aifaventures" />
        <link rel="canonical" href="https://aifilm.academy/awards" />
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
          <Link href="/awards" onClick={toggleMenu}>
            Awards
          </Link>
          <Link href="/about" onClick={toggleMenu}>
            About
          </Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="awards-hero-main">
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
          <div className="video-overlay"></div>
        </div>
        <div className="awards-hero-content">
          <h1 className="awards-hero-title fade-in">AIFA Awards</h1>
          <p className="awards-hero-subtitle fade-in">The World's #1 Film Awards for Digital Innovation</p>
          <p className="awards-hero-partner fade-in">Presented by AIFA Ventures</p>
        </div>
      </section>

      {/* ABOUT AWARDS SECTION */}
      <section className="awards-overview">
        <div className="overview-container fade-in">
          <h2 className="overview-title">Celebrating an Innovative Future</h2>
          <p className="overview-description">
            The AIFA Awards is the world's premier celebration of digital innovation in filmmaking and art, recognizing visionary creators who push the boundaries of what's possible with cutting-edge technology. We spotlight groundbreaking works that showcase the fusion of human creativity and technological innovation to shape the future of entertainment.
          </p>
          
          <div className="overview-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">
                <span>✦</span>
              </div>
              <h3>Digital Innovation</h3>
              <p>Our awards honor the most innovative digital filmmaking and technology, offering recognition to pioneering artists and filmmakers from around the world.</p>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <span>✦</span>
              </div>
              <h3>Global Platform</h3>
              <p>AIFA provides a prominent international stage for showcasing groundbreaking work that explores the intersection of cutting-edge technology and creative expression.</p>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <span>✦</span>
              </div>
              <h3>Industry Impact</h3>
              <p>The awards influence the future direction of filmmaking, highlighting technological innovations that expand creative possibilities.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* EDITIONS SECTION */}
      <section className="awards-editions">
        <div className="editions-container fade-in">
          <h2 className="editions-title">Award Editions</h2>
          
          <div className="editions-grid">
            <div className="edition-item">
              <div className="edition-image">
                <img src="/images/aifa-web-11.jpg" alt="AIFA Awards 2025" />
                <div className="edition-overlay"></div>
              </div>
              <div className="edition-content">
                <h3>AIFA Awards 2025</h3>
                <p style={{ minHeight: "105px" }}>Launching June 3 at NFC. The upcoming AIFA Awards 2025 will take place on July 19, 2025, celebrating the most innovative AI-generated films and artworks of the year. View our distinguished jury, submission process, and preliminary events.</p>
                <p style={{ marginTop: "15px", fontSize: "0.85rem", color: "#777" }}>Film extract by <a href="https://etherealmoon.xyz/" target="_blank" rel="noopener noreferrer" style={{ color: '#777' }}>Ethereal Moon</a></p>
                <Link href="/awards/2025" className="edition-button">Explore 2025 Awards</Link>
              </div>
            </div>
            
            <div className="edition-item">
              <div className="edition-image">
                <img src="/images/aifa_image_5.JPG" alt="AIFA Awards 2024" />
                <div className="edition-overlay"></div>
              </div>
              <div className="edition-content">
                <h3>AIFA Awards 2024</h3>
                <p style={{ minHeight: "105px" }}>Our inaugural AIFA Awards ceremony celebrated groundbreaking achievements in AI filmmaking. View the winners, finalists, and memorable moments from our historic first awards celebration.</p>
                <p style={{ marginTop: "15px", fontSize: "0.85rem", color: "#777" }}>The Silver Mirror by <a href="https://superrare.com/artwork/eth/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/silver-mirror-48191" target="_blank" rel="noopener noreferrer" style={{ color: '#777' }}>Fantastic Planet</a></p>
                <Link href="/awards/2024" className="edition-button">View 2024 Results</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRESS SECTION */}
      <section className="awards-press">
        <h2 className="press-title">IN THE PRESS</h2>
        <div className="press-grid">
          {pressQuotes.map((quote, index) => (
            <div className="press-item" key={index}>
              <p className="press-quote">"{quote.quote}"</p>
              <p className="press-source">{quote.source}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* PROCESS SECTION */}
      <section className="awards-process">
        <div className="process-container fade-in">
          <h2 className="process-title">Award Process</h2>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="process-number">01</div>
              <h3>Research & Selection</h3>
              <p>We track the top festivals globally, curating a longlist of outstanding AI-generated films that demonstrate technical innovation and artistic excellence.</p>
            </div>
            
            <div className="process-step">
              <div className="process-number">02</div>
              <h3>Finalist Announcement</h3>
              <p>Our distinguished jury evaluates the longlist to select finalists, which are announced at a special event and featured on our platform.</p>
            </div>
            
            <div className="process-step">
              <div className="process-number">03</div>
              <h3>Awards Ceremony</h3>
              <p>The annual AIFA Awards ceremony celebrates winners with VIP screenings, panel discussions, and a digital art experience in prestigious venues.</p>
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

      {/* SIGNUP SECTION */}
      <section className="signup-section" id="signup">
        <div className="signup-box">
          <h2 className="fade-in">Join Our Community</h2>
          <p className="fade-in">
            Stay informed about upcoming awards, submission opportunities, and exclusive events.
          </p>
          <form action="https://formspree.io/f/mnnqqvqd" method="POST" className="fade-in">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message (Optional)" rows="4"></textarea>
            <button type="submit">Join</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <section className="contact-us-section">
        <div className="footer-column">
          <h3>Contact</h3>
          <ul>
            <li><a href="mailto:aifa@aifilm.academy">Email Us</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Navigate</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/awards/2025">Awards 2025</Link></li>
            <li><Link href="/awards/2024">Awards 2024</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Connect</h3>
          <ul>
            <li><a href="https://instagram.com/aifa_ventures/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://x.com/aifaventures" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.linkedin.com/company/aifilm-academy/?viewAsMember=true" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </section>

      <div className="copyright-footer">
        <div className="copyright-container">
          <div className="support-logo">
            <span>Supported by</span>
            <img src="/images/support/innovateuk.jpg" alt="Innovate UK" />
          </div>
          <p className="copyright-text">© {new Date().getFullYear()} AIFA Ventures. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}