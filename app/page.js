"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./home.css";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const videoRefs = useRef([]);
  const imageRefs = useRef([]);

  // List of brand/press partners
  const brandNames = [
    "WIRED",
    "ARIA PROTOCOL",
    "VULTR",
    "NOPRBLM",
    "ASPREY STUDIO",
    "ART'OTEL",
    "INNOVATE UK",
    "NFC SUMMIT",
    "FACTORY 4",
    "MY SMASH MEDIA",
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

  // Lazy loading for images and videos (excluding hero section)
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "50px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.tagName === "VIDEO" && !entry.target.classList.contains('background-video')) {
            // Lazy-load non-hero videos
            const vid = entry.target;
            if (vid.dataset.src) {
              vid.src = vid.dataset.src;
              vid.load();
            }
          } else if (entry.target.tagName === "IMG" && entry.target.dataset.src) {
            // Lazy-load images
            const img = entry.target;
            img.src = img.dataset.src;
          }
          observer.unobserve(entry.target);
        }
      });
    }, options);

    // Filter out the hero video from the references
    const nonHeroVideos = videoRefs.current.filter(
      video => !video.classList.contains('background-video')
    );
    
    nonHeroVideos.forEach(video => observer.observe(video));
    imageRefs.current.forEach(image => {
      if (image.dataset.src) {
        observer.observe(image);
      }
    });
    
    return () => {
      nonHeroVideos.forEach(video => observer.unobserve(video));
      imageRefs.current.forEach(image => observer.unobserve(image));
    };
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

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className="home-page">
      {/* HEADER */}
      <header className={`header ${headerScrolled ? "scrolled" : ""}`}>
        <Link href="/" className="logo">
          <img
            src="/images/AIFAlogo.png"
            alt="AIFA Logo"
            style={{ height: "40px", width: "auto" }}
          />
        </Link>
        <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
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
      <section className="about-section" id="about">
        {/* Video Background */}
        <div className="video-wrapper">
          <video
            src="/videos/7677235-hd_1920_1080_25fps.mp4"
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
        
        {/* Centered Content */}
        <div className="overlay centered">
          <div className="logo-container">
            <img
              src="/images/AIFAlogo.png"
              alt="AIFA Logo"
              className="hero-logo"
              style={{ filter: "brightness(0) invert(1)" }} 
            />
          </div>
          <h2 className="hero-subtext">
            A Positive Future for Entertainment
            <p className="hero-location">London | Global</p>
          </h2>
        </div>
      </section>

      {/* ABOUT DESCRIPTION SECTION */}
      <section className="about-description-section">
        <div className="text-content">
          <h2 className="section-header fade-in">About AIFA</h2>
          <div className="fade-in">
            <p>
              AIFA celebrates a positive future for entertainment with the world's premier awards for AI-powered creativity. 
              Based in the UK, we are developing a creative tech innovation hub, partnering with cultural institutions to 
              build educational tools and tech-confident communities.
            </p>
          </div>
        </div>
      </section>
      
      <section className="what-we-do-section">
        <div className="text-content">
          <h2 className="section-header fade-in">What We Do</h2>
          <div className="services-columns fade-in">
            <div className="service-column">
              <h3><Link href="/awards">Film Awards</Link></h3>
              <p>
                AIFA Awards show how AI can unlock new artistic possibilities for a more equitable and creative global film industry. Since our first awards in 2024, we celebrate ground-breaking achievements in storytelling, cinematic innovation, and emerging tech.
              </p>
            </div>
            <div className="service-column">
              <h3><Link href="/events">Partnerships & Events</Link></h3>
              <p>
                We bring together artists, investors, founders, curators, policymakers and technologists to shape a positive future for the creative industries. From the House of Lords to the WIRED Summer Lab, we host talks, panels, showcases and events to encourage debate and discussion.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="awards-preview-section">
        <div className="text-content">
          <h2 className="section-header fade-in">2025 AIFA Awards</h2>
          <div className="fade-in">
            <p>
              Join us in July for our annual AIFA Awards, celebrating excellence in film, 
              creativity, and technology. This year, we're also hosting an exclusive series of events, 
              showcasing transformative new projects, networking opportunities, and inspiring talks from industry 
              trailblazers.
            </p>
          </div>
        </div>
        {/* Video removed */}
        
        <div className="awards-grid-container">
          <div className="awards-grid">
            <div className="award-item">
              <img src="/images/aifa-web-14.jpg" alt="AIFA Web 14" />
            </div>
            <div className="award-item">
              <img src="/images/aifa-web-13.jpg" alt="AIFA Web 13" />
            </div>
            <div className="award-item">
              <img src="/images/aifa_image_5.JPG" alt="AIFA Image 5" />
            </div>
            <div className="award-item">
              <img src="/images/aifa_image_4.JPG" alt="AIFA Image 4" />
            </div>
            <div className="award-item">
              <img src="/images/aifa_image_3.JPG" alt="AIFA Image 3" />
            </div>
            <div className="award-item">
              <img src="/images/aifa_image_2.JPG" alt="AIFA Image 2" />
            </div>
            <div className="award-item">
              <img src="/images/aifa_image_1.JPG" alt="AIFA Image 1" />
            </div>
            <div className="award-item">
              <img src="/images/john-aifa.jpg" alt="John AIFA" />
            </div>
            <div className="award-item">
              <img src="/images/beeple-aifa.jpg" alt="Beeple AIFA" />
            </div>
            <div className="award-item">
              <img src="/images/award_front1.jpg" alt="AIFA Award Front 1" className="bw-image" />
            </div>
            <div className="award-item">
              <img src="/images/award_front2.jpg" alt="AIFA Award Front 2" className="bw-image" />
            </div>
            <div className="award-item">
              <img src="/images/award_front3.jpg" alt="AIFA Award Front 3" className="bw-image" />
            </div>
            <div className="award-item">
              <img src="/images/award_front4.jpg" alt="AIFA Award Front 4" className="bw-image" />
            </div>
            <div className="award-item">
              <img src="/images/award_front5.jpg" alt="AIFA Award Front 5" className="bw-image" />
            </div>
            <div className="award-item">
              <img src="/images/award_front6.jpg" alt="AIFA Award Front 6" className="bw-image" />
            </div>
            <div className="award-item">
              <img src="/images/award_front7.jpg" alt="AIFA Award Front 7" className="bw-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships section removed */}

      {/* FOUNDERS SECTION */}
      <section className="founders-section" id="founders">
        <div className="services-container">
          <h1 className="services-heading fade-in">Founders</h1>
          <div className="text-content fade-in">
            <p>
              Leo Crane and Clare Maguire
            </p>
          </div>
          <div className="founders-grid">
            <div className="founder-image">
              <img src="/images/founders/leo_founder.jpg" alt="Leo Crane - AIFA Founder" />
            </div>
            <div className="founder-image founder-main">
              <img src="/images/aifa-founders.jpg" alt="AIFA Founders - Leo Crane and Clare Maguire" />
            </div>
            <div className="founder-image">
              <img src="/images/founders/clare_founder.jpg" alt="Clare Maguire - AIFA Founder" />
            </div>
          </div>
        </div>
      </section>
      
      {/* SUPPORT SECTION */}
      <section className="support-section" id="support">
        <div className="services-container">
          <h1 className="services-heading fade-in">Support & Opportunities</h1>
          <div className="text-content fade-in">
            <p>
              We support and curate opportunities for upcoming and established filmmakers, connecting them with leading 
              industry experts, technology partners, and creative collaborators.
            </p>
          </div>
          
          <div className="highlights-row fade-in">
            <div className="highlight-item">
              <h3>Press & Features</h3>
              <p>AIFA has been featured in L'Officiel, Binance, Decrypt, and other esteemed publications.</p>
            </div>
            <div className="highlight-item">
              <h3>Global Exhibits</h3>
              <p>Winners and featured artists from the AIFA Awards are showcased globally, reflecting our commitment to elevating visionary talent.</p>
            </div>
            <div className="highlight-item">
              <h3>Upcoming Collaborations</h3>
              <p>We're continuously partnering with pioneers in art, tech, and film. Expect exciting new announcements soon!</p>
            </div>
          </div>
          
          <div className="support-images-grid">
            <div className="support-image-item">
              <img src="/images/aifa-web-11.jpg" alt="AIFA Event" />
            </div>
            <div className="support-image-item">
              <img src="/images/aifa-web-12.jpg" alt="AIFA Event" />
            </div>
            <div className="support-image-item">
              <img src="/images/aifa-event.jpg" alt="AIFA Event" />
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS SECTION */}
      <section className="brands-section" id="brands">
        <div className="brands-container">
          <h2 className="section-header fade-in">Our Partners</h2>
        </div>
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
      </section>

      {/* SIGNUP SECTION */}
      <section className="signup-section" id="signup">
        <div className="signup-box">
          <h1 className="fade-in">Join Our Community</h1>
          <p className="fade-in">
            For all enquiries and to stay up to date, sign up below. For any questions, send us a message.
          </p>
          <form action="https://formspree.io/f/mnnqqvqd" method="POST" className="fade-in">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message (Optional)" rows="4"></textarea>
            <button type="submit">Submit</button>
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