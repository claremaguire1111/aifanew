"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "./featured-artists.css";

export default function FeaturedArtists() {
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

  const featuredArtists = [
    {
      name: "David Sheldrick",
      project: "Bad Manor",
      year: "2025",
      origin: "UK",
      credits: "Sound design by Michael Frank Panayoutis",
      description: "Inspired by a photograph I took when I was starting my photography career, a shoot in a british manor house, I invited my friends to come and dress up in 18th century fashion and we shot the whole day. They were all different ethnicities and the imagery ended up winning me an award with Broncolor lighting systems, a Swiss lighting company. With this piece I wanted to revisit that concept and photograph that changed my career nearly a decade ago now. This was made as a commission by OpenAI and distributed on their channels.",
      about: "Sheldrick is a British Korean artist based in London, a graduate of the London College of Fashion in Fashion Photography, with a keen interest in image assembly, nature, and technology. During the COVID pandemic he began using AI software and has been producing AI content for clients that include Manchester City FC, Coke Studios, Standard Chartered Bank, Mercedes Benz, Stone Mountain Georgia, and some of the most popular clubs and DJs in London.",
      website: "https://www.sheldrick.ai/",
      instagram: "https://www.instagram.com/p/DKiWd1mN2dC/",
      image: "/images/jury2025/david_sheldrick.PNG",
      videoUrl: "vimeo" // Using "vimeo" as a flag to trigger the Vimeo embed
    },
    {
      name: "Ethereal Moon",
      project: "The Last of the Arcanas: Second Generation",
      year: "2024",
      origin: "USA/France",
      description: "In The Last of the Arcanas, the fates of two children—Major, from the celestial Sublimes of the Above, and Minor, from the shadowy Mole People of the Caves—are bound by an ancient prophecy. Raised as leaders by their opposing worlds, they are destined to unite in an arranged marriage meant to bring peace to the Arcane land. But what begins as a hopeful union soon spirals into chaos, unraveling the fabric of their societies and igniting a cataclysmic cycle of destruction.",
      about: "A collaborative artistic venture founded by Ethereal Gwirl, an AI artist based in New York renowned for her expressive portrayal of daily life, and LeMoon, an AI artist from Nice, France, known for her nostalgic and disturbing style exploring surreal themes, culminating in a dynamic fusion of creativity and innovation.",
      website: "https://www.etherealmoon.xyz/",
      instagram: "https://www.instagram.com/etherealmoon.ai/",
      image: "/images/jury2025/Ethereal_Moon.jpg",
      videoUrl: "vimeo" // Using "vimeo" as a flag to trigger the Vimeo embed
    }
  ];

  return (
    <div className="home-page">
      <Head>
        <title>Featured Artists | AI Film Academy (AIFA)</title>
        <meta name="description" content="Discover innovative AI filmmakers and artists featured by the AI Film Academy (AIFA)." />
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
      <section className="featured-hero">
        <div className="featured-hero-content">
          <h1 className="featured-hero-title">Featured Artists</h1>
          <p className="featured-hero-subtitle">Innovative AI filmmakers pushing the boundaries of creative expression</p>
        </div>
      </section>

      {/* FEATURED ARTISTS SECTION */}
      <section className="featured-artists-section">
        {featuredArtists.map((artist, index) => (
          <div key={index} className="artist-container fade-in">
            <div className="artist-header">
              <h2 className="artist-name">{artist.name}</h2>
              <div className="project-details">
                <h3 className="project-title">{artist.project}</h3>
                <p className="project-meta">{artist.year} - {artist.origin}</p>
                {artist.credits && <p className="project-credits">{artist.credits}</p>}
              </div>
            </div>

            <div className="artist-content">
              <div className="artist-media">
                <div className="artist-video-container">
                  {artist.name === "David Sheldrick" ? (
                    <div dangerouslySetInnerHTML={{ 
                      __html: `
                      <div style="padding:56.25% 0 0 0;position:relative;">
                        <iframe 
                          src="https://player.vimeo.com/video/1095270031?h=e12865ee52&badge=0&autopause=0&player_id=0&app_id=58479" 
                          frameborder="0" 
                          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                          style="position:absolute;top:0;left:0;width:100%;height:100%;" 
                          title="AIFA Featured Artist: Bad Manor by Sheldrick">
                        </iframe>
                      </div>
                      <script src="https://player.vimeo.com/api/player.js"></script>
                      `
                    }} />
                  ) : artist.name === "Ethereal Moon" ? (
                    <div dangerouslySetInnerHTML={{ 
                      __html: `
                      <div style="padding:75% 0 0 0;position:relative;">
                        <iframe 
                          src="https://player.vimeo.com/video/1095271647?h=d57bb1acab&badge=0&autopause=0&player_id=0&app_id=58479" 
                          frameborder="0" 
                          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                          style="position:absolute;top:0;left:0;width:100%;height:100%;" 
                          title="Last of the Arcanas - SECOND GENERATION_1080">
                        </iframe>
                      </div>
                      <script src="https://player.vimeo.com/api/player.js"></script>
                      `
                    }} />
                  ) : (
                    <>
                      <video 
                        controls 
                        className="artist-video"
                        crossOrigin="anonymous"
                        playsInline
                        preload="metadata"
                      >
                        <source src={artist.videoUrl} type="video/mp4" />
                        <p className="video-fallback">
                          Video currently unavailable. Please check back later.
                        </p>
                      </video>
                      <div className="video-note">
                        <p>Note: The video is hosted on an S3 bucket that may require CORS configuration and public access permissions.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="artist-info">
                <div className="project-description">
                  <h4>Project</h4>
                  <p>{artist.description}</p>
                </div>
                
                <div className="artist-bio">
                  <h4>About {artist.name}</h4>
                  <p>{artist.about}</p>
                </div>
                
                <div className="artist-links">
                  {artist.website && (
                    <a href={artist.website} target="_blank" rel="noopener noreferrer" className="artist-link">
                      Visit Website
                    </a>
                  )}
                  {artist.instagram && (
                    <a href={artist.instagram} target="_blank" rel="noopener noreferrer" className="artist-link">
                      Instagram
                    </a>
                  )}
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