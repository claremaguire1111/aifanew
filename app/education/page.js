"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "./education.css";

export default function Education() {
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
    <div className="home-page">
      <Head>
        <title>Education & Resources | AI Film Academy (AIFA)</title>
        <meta name="description" content="AIFA is developing educational tools and resources to help foster creativity and tech-confident communities." />
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
      <section className="education-hero">
        <div className="education-hero-content">
          <h1 className="education-hero-title">Education & Resources</h1>
          <p className="education-hero-subtitle">Empowering creatives and institutions through AI and technology</p>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="mission-section">
        <div className="mission-container">
          <h2 className="section-header fade-in">Our Mission</h2>
          <p className="mission-text fade-in">
            AIFA celebrates a positive future for entertainment with the world's premier awards for AI-powered creativity. Based in the UK, we are developing a creative tech innovation hub, partnering with cultural institutions to build educational tools and tech-confident communities. This is our mission: to open up access to creativity and draw out incredible storytelling from all parts of the world.
          </p>
        </div>
      </section>

      {/* AIFA LONDON SECTION */}
      <section className="aifa-london-section">
        <div className="aifa-london-container">
          <div className="aifa-london-content">
            <div className="aifa-london-text fade-in">
              <h2 className="section-header">AIFA</h2>
              <p>
                At AIFA, we're focused on helping creators and creative industries harness technology in ways that advance their storytelling capabilities and foster community development. Our approach is centered on empowering filmmakers and artists to integrate AI tools into their creative workflow while maintaining their unique voice and vision.
              </p>
              <p>
                Through our educational initiatives, we provide creatives and institutions with the knowledge and resources to use AI as a complement to their creativity—not a replacement for it. We believe in a future where technology serves as a catalyst for more diverse, accessible, and innovative storytelling.
              </p>
            </div>
            <div className="aifa-london-image fade-in">
              <img src="/images/aifa_palace.jpg" alt="AIFA Palace" />
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS SECTION */}
      <section className="pillars-section">
        <div className="text-content">
          <h2 className="section-header fade-in">Our Approach</h2>
          <p className="fade-in">
            We help creative industries utilize technology to advance storytelling and build stronger communities.
          </p>
        </div>
        
        <div className="pillars-grid">
          <div className="pillar-item fade-in">
            <div className="pillar-icon">
              <img src="/file.svg" alt="Creative Tools Icon" />
            </div>
            <h3 className="pillar-title">Creative Tools</h3>
            <p className="pillar-description">
              Developing accessible resources for creatives to harness AI in their workflows, enhancing storytelling, visualization, content creation, and production processes.
            </p>
          </div>
          
          <div className="pillar-item fade-in">
            <div className="pillar-icon">
              <img src="/globe.svg" alt="Industry Events Icon" />
            </div>
            <h3 className="pillar-title">Industry Events</h3>
            <p className="pillar-description">
              Hosting workshops, annual awards ceremonies, and collaborative sessions that bridge the gap between traditional creative practices and emerging AI technologies.
            </p>
          </div>
          
          <div className="pillar-item fade-in">
            <div className="pillar-icon">
              <img src="/window.svg" alt="Institutional Partnerships Icon" />
            </div>
            <h3 className="pillar-title">Institutional Partnerships</h3>
            <p className="pillar-description">
              Collaborating with cultural and educational organizations to create comprehensive programs that support creative professionals and institutions at all stages.
            </p>
          </div>
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="vision-section">
        <div className="vision-container">
          <h2 className="section-header fade-in">How We Support</h2>
          <p className="fade-in" style={{ marginBottom: '40px' }}>
            Our educational initiatives are designed for creative professionals and institutions in the digital age.
          </p>
          
          <div className="vision-grid">
            <div className="vision-item fade-in">
              <h3>AI for Creativity</h3>
              <p>
                We offer specialized training in how AI tools can enhance various aspects of the creative process—from concept development and content creation to visual design, production, and distribution strategies.
              </p>
            </div>
            
            <div className="vision-item fade-in">
              <h3>Hands-On Workshops</h3>
              <p>
                Our practical workshops allow creative professionals to experiment with cutting-edge AI technologies in a supportive environment, gaining confidence and developing new skills under expert guidance.
              </p>
            </div>
            
            <div className="vision-item fade-in">
              <h3>Community Events</h3>
              <p>
                We showcase innovative AI-enhanced creative works and facilitate discussions about the possibilities, ethical considerations, and future directions of technology in storytelling and content creation.
              </p>
            </div>
            
            <div className="vision-item fade-in">
              <h3>Resource Library</h3>
              <p>
                We're building a comprehensive collection of guides, case studies, and tutorials for creative professionals and institutions interested in integrating AI into their practice and workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FUN SECTION */}
      <section className="fun-section">
        <div className="fun-container fade-in">
          <h2 className="section-header">Just For Fun</h2>
          <div className="fun-content">
            <div className="fun-text">
              <p>Chat to the stars and ask them questions about their films and the history of Hollywood. Our AI-powered conversation tool lets you engage with legendary actors and directors like Audrey Hepburn, Alfred Hitchcock, Marlon Brando, and many more.</p>
              <div className="fun-link-container">
                <Link href="/film-chat" className="fun-link">Try Film Chat</Link>
              </div>
            </div>
            <div className="fun-image">
              <img src="/images/hattie.jpg" alt="Hattie McDaniel" />
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP SECTION */}
      <section className="membership-section">
        <div className="membership-container">
          <h2 className="membership-title fade-in">Join Our Community</h2>
          <p className="membership-subtitle fade-in">
            Connect with fellow creatives and stay informed about our upcoming workshops, annual awards, institutional partnerships, and innovative tools for AI-enhanced storytelling. Be the first to hear about our latest collaborations, events, and educational resources.
          </p>
          
          <form className="membership-form fade-in" action="https://formspree.io/f/mnnqqvqd" method="POST">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="What aspects of AI and creativity are you most interested in? (Optional)" rows="4"></textarea>
            <button type="submit">Join Our Community</button>
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