"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "./factory-four-artists.css";

export default function FactoryFourArtists() {
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

  const factoryFourArtists = [
    { 
      name: "Olena Yara", 
      role: "Curator",
      website: "https://theyaragency.com/",
      image: "/images/olena.JPG",
      description: "Olena is the founder and creative director of Factory 4, leading the collaborative initiative to showcase innovative AI artists in unique settings.",
      bio: "Olena is a Web3 marketing expert and founder of Yara Agency, a digital art marketing & PR firm supporting artists worldwide. She has led digital strategy at Fuelarts and LiveArt, collaborating with institutions like Christie's Education, Forbes Web3, and Tezos. A speaker at NFC Lisbon, Zebu Live, she also co-founded Factory 4.0."
    },
    { 
      name: "Zhannet Podobed", 
      role: "Artist",
      website: "https://zhannetpodobed.com/",
      image: "/images/zhannetpodobed.jpeg",
      description: "Zhannet Podobed's work for Factory 4 explores the intersection of nature, technology, and human experience through innovative AI-generated digital art.",
      bio: "Zhannet Podobed is a Ukrainian multidisciplinary artist based in London. Her work spans digital art, painting, and interactive media, exploring nature, humanity, and technology. With a background in graphic and motion design, she is pursuing an MA in Computational Arts at Camberwell College of Arts, University of the Arts London."
    },
    { 
      name: "Akane Hiraoka", 
      role: "Artist",
      website: "https://akamidget.com/",
      image: "/images/akane profile picture.jpg",
      description: "Akane's contributions to Factory 4 feature immersive interactive installations that invite viewers to engage directly with AI-generated content.",
      bio: "Akane is a London-based new media artist specialising in interactive art installations. She won the 2025 KXSB AI HackXcelerator (Creative AI) and presented her work at the RAISE Summit at the Louvre, Paris. Upcoming projects include Expo Japan and a collaborative interactive performance with Jiarong Yu at Sadler's Wells."
    },
    { 
      name: "Flux The Artist, Paul Dowling", 
      role: "Artist",
      website: "https://fluxtheartist.art/",
      image: "/images/Paul _ Flux The Artist.jpg",
      description: "Flux's work with Factory 4 explores urban activism and social commentary through AI-enhanced visual storytelling and experiential art.",
      bio: "Flux The Artist is a dynamic creator who thrives at the intersection of urban activism, social commentary, and cutting-edge artistic expression. As an artist, Flux channels the chaotic energy of city life into a diverse range of mediums, including concept art, street photography, and semi-abstract figurative works."
    }
  ];

  return (
    <div className="home-page">
      <Head>
        <title>Factory Four Artists | AI Film Academy (AIFA)</title>
        <meta name="description" content="Explore the innovative artists of Factory Four, collaborating with AIFA to showcase cutting-edge AI art and storytelling." />
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
          <Link href="/awards" onClick={toggleMenu}>Awards</Link>
          <Link href="/about" onClick={toggleMenu}>About</Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="factory-hero">
        <div className="factory-hero-content">
          <img src="/images/Factory logo.PNG" alt="Factory Four Logo" className="factory-hero-logo" />
          <h1 className="factory-hero-title">Factory Four</h1>
          <p className="factory-hero-subtitle">Digital Art Exhibition & Gallery Space</p>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="factory-artists-section">
        <div className="factory-intro fade-in">
          <h2>About Factory Four</h2>
          <p>
            Factory 4 is a nomadic, artist-led gallery founded by Paul Dowling and Olena Yara. 
            It has hosted several digital art exhibitions in London and Lisbon, with a focus on 
            empowering artists and showcasing their work to wider audiences. For the AIFA Awards 2025, 
            Factory 4 brings together an exclusive collection of cutting-edge AI art alongside 
            film screenings at the art'otel London Hoxton.
          </p>
        </div>

        {factoryFourArtists.map((artist, index) => (
          <div key={index} className="artist-container fade-in">
            <div className="artist-header">
              <h2 className="artist-name">{artist.name}</h2>
              <div className="project-details">
                <h3 className="project-title">{artist.role}</h3>
              </div>
            </div>

            <div className="artist-content">
              <div className="artist-media">
                <img 
                  src={artist.image} 
                  alt={`${artist.name} - ${artist.role}`}
                  className="artist-image"
                />
              </div>

              <div className="artist-info">
                <div className="project-description">
                  <h4>Work with Factory Four</h4>
                  <p>{artist.description}</p>
                </div>
                
                <div className="artist-bio">
                  <h4>About {artist.name}</h4>
                  <p>{artist.bio}</p>
                </div>
                
                <div className="artist-links">
                  {artist.website && (
                    <a href={artist.website} target="_blank" rel="noopener noreferrer" className="artist-link">
                      Visit Website
                    </a>
                  )}
                  <a href="https://www.instagram.com/factory.4.0?igsh=MWE3cHVxb3Jkc2Z5cg==" target="_blank" rel="noopener noreferrer" className="artist-link">
                    Factory Four Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CONTACT SECTION */}
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
            <img 
              src="/images/support/innovateuk.jpg" 
              alt="Innovate UK" 
              style={{ height: "20px", maxHeight: "20px", width: "auto" }}
            />
          </div>
          <p className="copyright-text">© {new Date().getFullYear()} AIFA Ventures. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}