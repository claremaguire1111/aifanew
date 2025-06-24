"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "./very-nice-sponsor-package.css";

export default function VeryNiceSponsorPackage() {
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

  // Benefits data
  const benefits = [
    {
      title: "Named Award Association",
      description: "Named association with one award, e.g. Best Narrative Award, sponsored by Vultr, presented at the AIFA Awards 2025 ceremony."
    },
    {
      title: "Verbal Recognition",
      description: "Thank you mention in speeches during the award ceremony, ensuring your brand is highlighted to all attendees."
    },
    {
      title: "Logo Placement",
      description: "Prominent logo placement on all marketing materials, ensuring visibility across all AIFA promotional channels."
    },
    {
      title: "Press Accreditation",
      description: "Accreditation in the press release with a quote from your representative, distributed to media outlets worldwide."
    },
    {
      title: "Website Presence",
      description: "Accreditation on AIFA website as an official sponsor, with link to your company website."
    },
    {
      title: "Social Media Exposure",
      description: "Social media announcement across LinkedIn, Instagram, X (AIFA) and a second social media post after the event (thank you)."
    },
    {
      title: "Artist Access",
      description: "Exclusive access to AIFA artists for interviews and features to create branded content highlighting your support."
    }
  ];

  return (
    <div className="sponsor-page">
      <Head>
        <title>Vultr Sponsorship Package | AIFA</title>
        <meta name="description" content="Exclusive sponsorship opportunities with AIFA - Connect your brand with innovation and creativity through the AI Film Academy's prestigious awards and events." />
        <meta name="keywords" content="AIFA sponsorship, AI film sponsorship, creative technology partnerships, Vultr sponsorship package" />
        <meta property="og:title" content="Exclusive Sponsorship Package | AIFA" />
        <meta property="og:description" content="Partner with AIFA to connect your brand with the future of AI in creative industries. Exclusive benefits including named award sponsorship, brand visibility, and access to our creative community." />
        <meta property="og:image" content="/images/aifa-event.jpg" />
        <meta property="og:url" content="https://aifilm.academy/events/very-nice-sponsor-package" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aifaventures" />
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

      <div className="sponsor-content">
        {/* HERO SECTION */}
        <section className="sponsor-hero">
          <div className="sponsor-hero-content">
            <h1 className="sponsor-hero-title">Vultr Sponsorship Package</h1>
            <p className="sponsor-hero-subtitle">Connect your brand with innovation and creativity</p>
            <p className="sponsor-hero-description">
              We're delighted to present this sponsorship package for Vultr, offering a unique opportunity to connect your cloud computing expertise with the world's most innovative AI-generated filmmaking community at the AIFA Awards 2025.
            </p>
          </div>
        </section>

        <div className="sponsor-wrapper">
          <div className="luxury-image-grid fade-in">
            <div className="luxury-image">
              <img src="/images/aifa-web-14.jpg" alt="AIFA Awards Ceremony" style={{ filter: "grayscale(100%)" }} />
            </div>
            <div className="luxury-image">
              <img src="/images/aifa-web-13.jpg" alt="AIFA Awards Event" style={{ filter: "grayscale(100%)" }} />
            </div>
            <div className="luxury-image">
              <img src="/images/aifa_image_5.JPG" alt="AIFA Awards Showcase" style={{ filter: "grayscale(100%)" }} />
            </div>
          </div>

          <div className="luxury-image-grid fade-in">
            <div className="luxury-image">
              <img src="/images/aifa_image_4.JPG" alt="AIFA Awards Exhibition" style={{ filter: "grayscale(100%)" }} />
            </div>
            <div className="luxury-image">
              <img src="/images/aifa_image_3.JPG" alt="AIFA Event" style={{ filter: "grayscale(100%)" }} />
            </div>
            <div className="luxury-image">
              <img src="/images/aifa_image_2.JPG" alt="AIFA Awards Experience" style={{ filter: "grayscale(100%)" }} />
            </div>
          </div>
          
          {/* BENEFITS SECTION */}
          <div className="benefits-intro fade-in">
            <h2>Sponsorship Benefits</h2>
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div className="benefit-item" key={index}>
                  <h3 className="benefit-title">{benefit.title}</h3>
                  <p className="benefit-description">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="section-divider"></div>

          <div className="award-showcase fade-in">
            <div className="award-images">
              <div className="award-image">
                <img src="/images/award_front1.jpg" alt="AIFA Award Trophy" style={{ filter: "grayscale(100%)" }} />
              </div>
              <div className="award-image">
                <img src="/images/award_front2.jpg" alt="AIFA Award Trophy" style={{ filter: "grayscale(100%)" }} />
              </div>
              <div className="award-image">
                <img src="/images/award_front3.jpg" alt="AIFA Award Trophy" style={{ filter: "grayscale(100%)" }} />
              </div>
            </div>
          </div>
          
          {/* ARTISTS SECTION */}
          <div className="artists-section fade-in">
            <h2>Featured Artists</h2>
            <p>As a Vultr sponsor, you'll gain exclusive access to these innovative artists for potential collaborations, interviews, and features.</p>

            <div className="artists-grid artists-grid-featured">
              <div className="artist-card">
                <img src="/images/jury2025/David_sheldrick.PNG" alt="David Sheldrick" className="artist-image" style={{ filter: "grayscale(100%)" }} />
                <div className="artist-info" style={{ color: "white", textShadow: "0 2px 4px rgba(0,0,0,0.7)" }}>
                  <h3 className="artist-name" style={{ color: "white" }}>David Sheldrick</h3>
                  <p className="artist-bio" style={{ color: "white" }}>Pioneering digital artist exploring the boundaries of AI-generated visual storytelling.</p>
                </div>
              </div>

              <div className="artist-card">
                <img src="/images/jury2025/Ethereal_Moon.jpg" alt="Ethereal Moon" className="artist-image" style={{ filter: "grayscale(100%)" }} />
                <div className="artist-info" style={{ color: "white", textShadow: "0 2px 4px rgba(0,0,0,0.7)" }}>
                  <h3 className="artist-name" style={{ color: "white" }}>Ethereal Moon</h3>
                  <p className="artist-bio" style={{ color: "white" }}>A collaborative artistic venture at the intersection of technology, emotion, and narrative.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-section fade-in">
            <div className="testimonial-quote">
              <p>"We're thrilled to invite Vultr to join us as a key sponsor for the AIFA Awards 2025. Your support will help us continue pushing the boundaries of AI-generated filmmaking and connect with creative innovators worldwide."</p>
              <div className="quote-author">— Leo Crane & Clare Maguire, AIFA Co-Founders</div>
            </div>
          </div>

          {/* GALLERY SHOWCASE */}
          <div className="gallery-showcase fade-in">
            <h2>The AIFA Awards</h2>
            <div className="aifa-awards-grid">
              <div className="award-grid-item">
                <img src="/images/aifa-web-14.jpg" alt="AIFA Awards" style={{ filter: "grayscale(100%)" }} />
              </div>
              <div className="award-grid-item">
                <img src="/images/aifa-web-13.jpg" alt="AIFA Awards" style={{ filter: "grayscale(100%)" }} />
              </div>
              <div className="award-grid-item">
                <img src="/images/aifa_image_5.JPG" alt="AIFA Awards" style={{ filter: "grayscale(100%)" }} />
              </div>
              <div className="award-grid-item">
                <img src="/images/aifa_image_4.JPG" alt="AIFA Awards" style={{ filter: "grayscale(100%)" }} />
              </div>
              <div className="award-grid-item">
                <img src="/images/aifa_image_3.JPG" alt="AIFA Awards" style={{ filter: "grayscale(100%)" }} />
              </div>
              <div className="award-grid-item">
                <img src="/images/aifa_image_2.JPG" alt="AIFA Awards" style={{ filter: "grayscale(100%)" }} />
              </div>
              <div className="award-grid-item">
                <img src="/images/aifa_image_1.JPG" alt="AIFA Awards" style={{ filter: "grayscale(100%)" }} />
              </div>
              <div className="award-grid-item">
                <img src="/images/aifa-event.jpg" alt="AIFA Event" style={{ filter: "grayscale(100%)" }} />
              </div>
              <div className="award-grid-item">
                <img src="/images/award_front1.jpg" alt="AIFA Award Trophy" style={{ filter: "grayscale(100%)" }} />
              </div>
              <div className="award-grid-item">
                <img src="/images/award_front2.jpg" alt="AIFA Award Trophy" style={{ filter: "grayscale(100%)" }} />
              </div>
              <div className="award-grid-item">
                <img src="/images/award_front3.jpg" alt="AIFA Award Trophy" style={{ filter: "grayscale(100%)" }} />
              </div>
              <div className="award-grid-item">
                <img src="/images/award_front4.jpg" alt="AIFA Award Trophy" style={{ filter: "grayscale(100%)" }} />
              </div>
              <div className="award-grid-item">
                <img src="/images/award_front5.jpg" alt="AIFA Award Trophy" style={{ filter: "grayscale(100%)" }} />
              </div>
              <div className="award-grid-item">
                <img src="/images/award_front6.jpg" alt="AIFA Award Trophy" style={{ filter: "grayscale(100%)" }} />
              </div>
              <div className="award-grid-item">
                <img src="/images/award_front7.jpg" alt="AIFA Award Trophy" style={{ filter: "grayscale(100%)" }} />
              </div>
              <div className="award-grid-item">
                <img src="/images/john-aifa.jpg" alt="John at AIFA" style={{ filter: "grayscale(100%)" }} />
              </div>
              <div className="award-grid-item">
                <img src="/images/beeple-aifa.jpg" alt="Beeple at AIFA" style={{ filter: "grayscale(100%)" }} />
              </div>
              <div className="award-grid-item">
                <img src="/images/aifa-web-10.jpg" alt="AIFA Awards" style={{ filter: "grayscale(100%)" }} />
              </div>
              <div className="award-grid-item">
                <img src="/images/aifa-web-11.jpg" alt="AIFA Awards" style={{ filter: "grayscale(100%)" }} />
              </div>
            </div>
          </div>
          
          {/* CTA SECTION */}
          <div className="cta-section fade-in">
            <h2>Confirm Your Vultr Sponsorship</h2>
            <p>Ready to connect your brand with the future of AI-generated creativity? Contact us today to secure your sponsorship package for the AIFA Awards 2025.</p>
            <a href="mailto:aifa@aifilm.academy?subject=Vultr%20Sponsorship%20Inquiry" className="cta-button">Contact for Sponsorship</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="sponsor-footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3>Contact</h3>
            <ul>
              <li><a href="mailto:aifa@aifilm.academy">aifa@aifilm.academy</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Connect</h3>
            <ul>
              <li><a href="https://instagram.com/aifa_ventures/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://x.com/aifaventures" target="_blank" rel="noopener noreferrer">X (Twitter)</a></li>
              <li><a href="https://www.linkedin.com/company/aifilm-academy/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Navigate</h3>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/awards/2025">Awards 2025</Link></li>
              <li><Link href="/events">Events</Link></li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>© {new Date().getFullYear()} AIFA Ventures. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}