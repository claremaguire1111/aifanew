"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "../awards.css";

export default function Awards2025() {
  // Since we're using 'use client', we need to add SEO with Head component
  // Metadata API won't work with 'use client' directive
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeBio, setActiveBio] = useState(null);
  
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  
  const toggleBio = (index) => {
    if (activeBio === index) {
      setActiveBio(null);
    } else {
      setActiveBio(index);
    }
  };

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
      image: "/images/jury2025/diane_pernet.jpg",
      bio: "Diane Pernet, American-born and Paris-based, is a pioneering fashion critic and journalist. She launched the first fashion film festival in 2006, before the genre existed. Starting as a designer in New York, she moved to Paris, where her visionary work has profoundly influenced global fashion and the evolution of fashion film."
    },
    { 
      name: "David Sheldrick", 
      role: "Artist",
      image: "/images/jury2025/david_sheldrick.PNG",
      bio: "Sheldrick is a British-Korean artist exploring image assembly, nature, and technology. Building on his award-winning fashion photography, he has developed custom AI pipelines for an experimental fine art practice. His recent collection Empire sold out in 24 hours and has established him as one of the most exciting AI artists working today."
    },
    { 
      name: "Ethereal Moon", 
      role: "Artist",
      image: "/images/jury2025/Ethereal_Moon.jpg",
      bio: "Ethereal Moon is a collaborative artistic venture founded by Ethereal Gwirl, an AI artist based in New York, known for her expressive depictions of daily life, and LeMoon, an AI artist from France, whose nostalgic and unsettling style explores surreal themes. Together, this international female duo fuses creativity and innovation, crafting narrative-driven films that confront raw, difficult emotions, all while maintaining an accessible visual language."
    },
    { 
      name: "Roy Joseph Butler", 
      role: "LOCO Festival",
      image: "/images/jury2025/Roy_Joseph_Butler.jpg",
      bio: "Roy is the Director of LOCO London Comedy Film Festival, the world's largest festival of funny films. He is also CEO of Packed Lunch, a non-profit production studio, specialising in animation and fine art. With a background in community engagement, Roy is passionate about creative ways to grow human capital."
    },
    { 
      name: "Clare Maguire", 
      role: "NOPRBLM",
      image: "/images/jury2025/Clare_Maguire.jpg",
      bio: "Clare Maguire is a founder, angel investor and winner of the 2024 TechWomen 100 award. She has managed, advised and led brands, entrepreneurs, creators and businesses for over a decade. A music industry veteran, she is an expert in tech, marketing, social media, blockchain and AI, growing creative projects to achieve audiences of over 50 million."
    },
    { 
      name: "GLITCHOFMIND", 
      role: "Artist",
      image: "/images/jury2025/glitch_of_mind.jpg",
      bio: "GLITCHOFMIND (Leonel Pichardo) is a multidisciplinary artist blending identity, technology, and nature through digital fashion, character design, and editorial storytelling. Founder of INTERLÔR Atelier, his immersive visuals explore self-awareness and futurism, with work featured in Vogue, Forbes, and more."
    },
    { 
      name: "Pinny Grylls", 
      role: "Filmmaker",
      image: "/images/jury2025/Pinny_Grylls.png",
      bio: "Pinny Grylls is a groundbreaking filmmaker, blending humour, cutting-edge technology and profound human stories. From the multi-award-winning short Peter and Ben to 2024 SXSW Feature Doc Winner Grand Theft Hamlet, she draws on her background as an ethnographer to explore the human need for connection."
    },
    { 
      name: "Leo Crane", 
      role: "Producer",
      image: "/images/jury2025/leo_crane.jpg",
      bio: "Leo Crane is a producer, founder and educator with 25 years' experience in creative industries and emerging technologies. He is co-founder of AIFA Ventures, International Advisor to the OmenaArt Foundation, Director of Figuration, Board Member for Animate Projects, and Course Leader at Sotheby's Institute, WIRED Summer Lab and V&A Academy. He holds MA (Distinction) in Computer Animation from Bournemouth and MA (Hons) in Classics from Oxford University."
    },
    { 
      name: "Pedro Guez", 
      role: "ASVOFF",
      image: "/images/jury2025/pedroguez_portrait.png",
      bio: "Pedro Guez is the curator of the AI-Generated Film category at the ASVOFF Film Festival. A Paris-based multidisciplinary creative, he is currently pursuing an Executive MBA in Global Fashion Management at IFM Paris, focusing on digital innovation and technologies applied to creative direction and communications."
    },
    { 
      name: "Dyl Blaquiere", 
      role: "Sedition",
      image: "/images/jury2025/Dyl.jpg",
      bio: "Dyl Blaquiere is a founder and CEO building at the convergence of art, technology, and culture. At the helm of Sedition, he is reshaping how digital art is collected, experienced, and owned — bringing a product-led vision to a legacy platform and positioning it for a new era of growth. He is also the founder of Muse Frame, a hardware company pioneering the digital art display category."
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
      <Head>
        <title>AIFA Awards 2025 | World's #1 Global Film Awards for AI Innovation</title>
        <meta name="description" content="AIFA Awards 2025 - The world's premier film awards celebrating AI innovation in filmmaking, launching June 3 at NFC with a distinguished global jury including Diane Pernet, David Sheldrick, and leading industry pioneers." />
        <meta name="keywords" content="AIFA Awards 2025, World's #1 Film Awards, Global Film Awards, AI Film Academy, AI filmmaking, David Sheldrick, Diane Pernet, digital art awards, NFT film, AI artists, future of entertainment, film innovation" />
        <meta property="og:title" content="AIFA Awards 2025 | World's #1 Global Film Awards for AI Innovation" />
        <meta property="og:description" content="Join us for AIFA Awards 2025, the world's premier celebration of excellence in AI-generated filmmaking with an international jury of industry leaders and exclusive ceremonies in Lisbon and London." />
        <meta property="og:image" content="/images/jury2025/david_sheldrick.PNG" />
        <meta property="og:url" content="https://aifilm.academy/awards/2025" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aifaventures" />
        <link rel="canonical" href="https://aifilm.academy/awards/2025" />
        <script type="application/ld+json">
          {JSON.stringify({"@context":"https://schema.org","@type":"Event","name":"AIFA Awards 2025","description":"World's #1 Global Film Awards for AI Innovation","startDate":"2025-06-03","location":{"@type":"Place","name":"NFC Lisbon","address":{"@type":"PostalAddress","addressLocality":"Lisbon","addressCountry":"Portugal"}},"organizer":{"@type":"Organization","name":"AIFA Ventures","url":"https://aifilm.academy"}})}
        </script>
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
                <div className="jury-image" onClick={() => toggleBio(index)}>
                  <img src={member.image} alt={`${member.name} - ${member.role} - AIFA Awards 2025 Jury Member`} />
                  <div className="jury-image-overlay">
                    <span>View Bio</span>
                  </div>
                </div>
                <div className="jury-info">
                  <h3>{member.name}</h3>
                  <p className="jury-role">{member.role}</p>
                </div>
                {activeBio === index && (
                  <div className="jury-bio-modal">
                    <div className="jury-bio-content">
                      <h3>{member.name}</h3>
                      <p>{member.bio}</p>
                      <button className="jury-bio-close" onClick={() => toggleBio(index)}>Close</button>
                    </div>
                  </div>
                )}
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