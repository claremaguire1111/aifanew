"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./about.css";

export default function About() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  // Fade-in animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Update header background when scrolled
      setHeaderScrolled(window.scrollY > 50);

      // Handle fade-in animations
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Services data
  const services = [
    {
      title: "Awards",
      description: "The world's #1 film awards for digital innovation, celebrating groundbreaking filmmaking and technological achievements.",
      image: "/images/aifa-web-13.jpg",
      link: "/awards"
    },
    {
      title: "Education",
      description: "Innovative educational programs and workshops for creators to master cutting-edge filmmaking technologies.",
      image: "/images/aifa_image_2.JPG",
      link: "/education"
    },
    {
      title: "Events",
      description: "Global events connecting innovators, creators, and industry leaders to showcase the future of entertainment.",
      image: "/images/aifa-founders.jpg",
      link: "/events"
    }
  ];

  // Team members data
  const teamMembers = [
    {
      name: "Clare Maguire",
      role: "Founder",
      image: "/images/founders/clare_founder.jpg",
      bio: "Visionary leader with extensive experience in digital innovation and creative direction."
    },
    {
      name: "Leo Crane",
      role: "Founder",
      image: "/images/founders/leo_founder.jpg",
      bio: "Industry pioneer combining filmmaking expertise with technological innovation."
    }
  ];

  return (
    <div className="about-page">
      {/* HEADER */}
      <header className={`header ${headerScrolled ? 'scrolled' : ''}`}>
        <Link href="/" className="logo">
          <img src="/images/AIFAlogo.png" alt="AIFA Logo" />
        </Link>
        <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/awards" onClick={() => setMenuOpen(false)}>Awards</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="video-wrapper">
          <video className="background-video" autoPlay loop muted playsInline>
            <source src="/videos/video-section-3.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>
        <div className="about-hero-content">
          <h1 className="about-hero-title fade-in">About AIFA</h1>
          <p className="about-hero-subtitle fade-in">
            Building a Positive Future for Entertainment
          </p>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="about-mission">
        <div className="mission-container">
          <h2 className="mission-title fade-in">Our Mission</h2>
          <p className="mission-description fade-in">
            AIFA celebrates a positive future for entertainment with the world's premier platform for digital innovation in filmmaking and art. Based in the UK and operating globally, we are developing a creative tech innovation hub, partnering with cultural institutions to build educational tools and tech-confident communities.
          </p>
          <div className="mission-values fade-in">
            <div className="value-item">
              <div className="value-icon">✦</div>
              <h3>Innovation</h3>
              <p>Pushing the boundaries of what's possible in digital filmmaking and entertainment.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">✦</div>
              <h3>Community</h3>
              <p>Building inclusive spaces for creators to connect, learn, and collaborate.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">✦</div>
              <h3>Excellence</h3>
              <p>Celebrating and recognizing the highest standards of creative and technical achievement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO SECTION */}
      <section className="about-services">
        <div className="services-container">
          <h2 className="services-title fade-in">What We Do</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <Link href={service.link} key={index} className="service-item fade-in">
                <div className="service-image">
                  <img src={service.image} alt={service.title} />
                  <div className="service-overlay"></div>
                </div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="service-link">Explore {service.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="about-team">
        <div className="team-container">
          <h2 className="team-title fade-in">Our Team</h2>
          <p className="team-description fade-in">
            AIFA was founded by industry leaders with a shared vision for the future of entertainment and a commitment to fostering innovation across the creative landscape.
          </p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member fade-in">
                <div className="team-member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-member-info">
                  <h3>{member.name}</h3>
                  <p className="team-member-role">{member.role}</p>
                  <p className="team-member-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="awards-partners">
        <div className="partners-container">
          <h2 className="partners-title">Our Partners</h2>
          
          <div className="moving-brands">
            <div className="brand-row">
              {[
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
                "WIRED SUMMER LAB",
                "NASTY MAGAZINE",
                "NOPRBLM",
                "SEDITION",
                "VULTR",
                "ARIA",
                "[S]EDITION",
                "OBJECT SUBJECT FORM",
                "CASA NUA",
                "ASVOF",
                "L'OFFICIEL"
              ].map((brand, idx) => (
                <div key={idx} className="brand-name">
                  {brand}
                </div>
              ))}
              {[
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
                "WIRED SUMMER LAB",
                "NASTY MAGAZINE",
                "NOPRBLM",
                "SEDITION",
                "VULTR",
                "ARIA",
                "[S]EDITION",
                "OBJECT SUBJECT FORM",
                "CASA NUA",
                "ASVOF",
                "L'OFFICIEL"
              ].map((brand, idx) => (
                <div key={`dup-${idx}`} className="brand-name">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="about-contact">
        <div className="contact-container">
          <h2 className="contact-title fade-in">Get in Touch</h2>
          <p className="contact-description fade-in">
            Interested in collaborating or learning more about AIFA? We'd love to hear from you.
          </p>
          <div className="contact-options fade-in">
            <Link href="mailto:aifa@aifilm.academy" className="contact-button">
              Email Us
            </Link>
          </div>
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

      {/* COPYRIGHT */}
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