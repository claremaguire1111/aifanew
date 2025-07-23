"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "./press-release.css";

export default function PressRelease() {
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

  const filmStills = [
    {
      id: 1,
      name: "Thiaroye 44",
      filmmaker: "Hussein Dembel Sow",
      country: "Senegal",
      image: "/images/filmstills/STILL Thiaroye 44.png"
    },
    {
      id: 2,
      name: "Duck",
      filmmaker: "Rachel Maclean",
      country: "UK",
      image: "/images/filmstills/STILL Duck.jpg"
    },
    {
      id: 3,
      name: "e^(i*π) + 1 = 0",
      filmmaker: "Junie Lau",
      country: "China/UK",
      image: "/images/filmstills/STILL02 Junie Lau.jpg"
    },
    {
      id: 4,
      name: "Stillness",
      filmmaker: "Nora Hase",
      country: "Germany",
      image: "/images/filmstills/STILL Stillness.png"
    },
    {
      id: 5,
      name: "Aqua Alta",
      filmmaker: "Fouzi Louahem",
      country: "France",
      image: "/images/filmstills/STILL AQUA_ALTA.png"
    },
    {
      id: 6,
      name: "Parallax",
      filmmaker: "Ariel Kotzer",
      country: "Israel",
      image: "/images/filmstills/STILL PARALLAX.png"
    }
  ];

  return (
    <div className="press-release-page">
      <Head>
        <title>AIFA Awards 2025 Press Release | AI Film Academy</title>
        <meta name="description" content="Press release for AIFA Awards 2025, honoring pioneering filmmakers using AI to reshape the global film industry." />
        <meta name="keywords" content="AIFA Awards 2025, press release, AI film, art'otel London, Factory 4, media pass" />
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
      <section className="press-hero">
        <div className="press-hero-content">
          <div className="press-label">Press Release</div>
          <h1 className="press-hero-title">AIFA Awards 2025</h1>
          <p className="press-hero-subtitle">
            FOR IMMEDIATE RELEASE<br />
            July 2025
          </p>
          <p className="press-hero-description" style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
            AIFA Awards show how AI can shape a more equitable and creative global film industry
          </p>
          
          {/* Sponsor Logos */}
          <div className="sponsor-logos-container" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '20px', 
            marginTop: '40px',
            flexWrap: 'wrap',
            padding: '20px 15px 30px',
            maxWidth: '100%',
            overflow: 'hidden',
            '@media (max-width: 768px)': {
              gap: '15px',
              marginTop: '20px'
            }
          }}>
            <img 
              src="/images/vultr_logo_dark.png" 
              alt="Vultr Logo" 
              style={{ 
                height: '35px', 
                objectFit: 'contain'
              }}
            />
            <img 
              src="/partners/sedition logo wh long.png" 
              alt="Sedition Logo" 
              style={{ 
                height: '30px', 
                objectFit: 'contain'
              }}
            />
            <img 
              src="/partners/Muse Frame wh text.png" 
              alt="Muse Frame Logo" 
              style={{ 
                height: '30px', 
                objectFit: 'contain'
              }}
            />
            <img 
              src="/images/logo-abberation-white.svg" 
              alt="Aria Logo" 
              style={{ 
                height: '30px', 
                objectFit: 'contain'
              }}
            />
            <div style={{ height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src="/images/wired_logo_white.png" 
                alt="WIRED Logo" 
                style={{ 
                  height: '25px', 
                  objectFit: 'contain',
                  maxWidth: '100%'
                }}
              />
            </div>
            <div style={{ height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src="/images/factory_four_new.png" 
                alt="Factory4 Logo" 
                style={{ 
                  height: '36px'
                }}
              />
            </div>
            <div style={{ height: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src="/images/innovate_uk_new.png" 
                alt="Innovate UK Logo" 
                style={{ 
                  height: '25px'
                }}
              />
            </div>
            <div
              style={{
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                fontWeight: 'bold',
                letterSpacing: '0.05em'
              }}
            >
              NOPRBLM.
            </div>
            <div style={{ height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src="/images/smash_media_new.png" 
                alt="SMASH MEDIA Logo" 
                style={{ 
                  height: '25px'
                }}
              />
            </div>
            <div style={{ height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src="/images/arthotel_London Hoxton_White.png" 
                alt="art'otel London Hoxton Logo" 
                style={{ 
                  height: '30px'
                }}
              />
            </div>
            <div style={{ height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="asprey-logo-container">
              <img 
                src="/images/Asprey_final_ok.png" 
                alt="Asprey Studios Logo" 
                style={{ 
                  height: '45px',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>
        </div>
      </section>


      {/* FILM STILLS SECTION */}
      <section className="film-stills-section">
        <div className="film-stills-container">
          <div className="film-stills-row fade-in">
            {filmStills.slice(0, 3).map((film) => (
              <div className="film-still-item" key={film.id}>
                <a href={film.image} download={`${film.name.replace(/\s+/g, '_')}_by_${film.filmmaker.replace(/\s+/g, '_')}.png`} className="film-still-download">
                  <img src={film.image} alt={`${film.name} by ${film.filmmaker}`} className="film-still-image" />
                  <div className="film-still-overlay">
                    <span className="download-icon">↓</span>
                    <span className="download-text">Download</span>
                  </div>
                </a>
                <div className="film-still-caption">
                  {film.name} by {film.filmmaker} ({film.country})
                </div>
              </div>
            ))}
          </div>
          <div className="media-link fade-in">
            <a href="#images-section" className="media-images-link">MEDIA IMAGES HERE</a>
          </div>
        </div>
      </section>

      {/* PRESS RELEASE CONTENT */}
      <section className="press-content-section">
        <div className="press-content-container fade-in">
          <div className="press-content">
            <p className="press-paragraph">
              <strong>FOR IMMEDIATE RELEASE<br />July 2025</strong><br /><br />
              <strong>AIFA Awards show how AI can shape a more equitable and creative global film industry</strong>
            </p>
            
            <p className="press-paragraph">
              From China to Canada, Senegal to Scotland, the AIFA Awards 2025 celebrated a new generation redefining film. Launched with a VIP screening and party at art'otel London Hoxton, followed by a high-level discussion at the House of Lords, the Awards brought global attention to creators using emerging technologies to build a more equitable, more creative film industry.
            </p>

            <div className="press-quote">
              <p>"At a time when AI poses a very real threat to creativity and livelihoods in film and entertainment, AIFA champions those who use the same technologies to fight back," said Leo Crane, co-founder of AIFA Ventures. "It's vital to ensure that innovation leads to inclusion and that the future of creative tech is equitable, especially for the artist."</p>
            </div>
            
            <p className="press-paragraph">
              This year's Awards were drawn from over 30 AIFA-qualifying festivals. The winners were selected by a jury of film pioneers including SXSW winner Pinny Grylls, fashion film legend Diane Pernet, and AIFA 2024 winners Ethereal Moon. This year's prestigious Best Film Award included a £1,000 cash prize and a benefits package from Sedition to support financing, distribution, and community building.
            </p>

            <p className="press-paragraph">
              <strong>AIFA Awards 2025</strong><br /><br />
              <strong>BEST FILM</strong><br />
              sponsored by Sedition<br />
              e^(iπ) + 1 = 0* by Junie Lau<br />
              <img src="/images/Junie_Lau.jpg" alt="Junie Lau" style={{ maxWidth: '60%', height: 'auto', margin: '10px 0 20px 0', display: 'block' }} /><br />
              <strong>INNOVATION AWARD</strong><br />
              sponsored by Aria<br />
              The Future Can Be Yours by Simon Ball<br /><br />
              <strong>BEST NARRATIVE</strong><br />
              sponsored by Vultr<br />
              Do Bangladroids Dream of Electric Tagore? by Aleem Hossain<br /><br />
              <strong>BEST VISUALS</strong><br />
              Remembering by Diego Maclean<br /><br />
              <strong>BEST SOUND</strong><br />
              Aqua Alta by Fouzi Louahem<br /><br />
              <strong>HIGHLY COMMENDED</strong><br />
              Thiaroye 44 by Hussein Dembel Sow<br />
              FOSSiLS by Roxanne Ducharme<br />
              Duck by Rachel Maclean
            </p>
            
            <p className="press-paragraph">
              The 14 outstanding Finalists (link) demonstrate how AI can unlock new artistic possibilities, from deepfakes and surrealist aesthetics to reflections on memory, displacement, and identity. They also show how affordable AI tools open up opportunities for those otherwise excluded from the global film industry.
            </p>
            
            <div className="press-quote">
              <p>"The core issue is the incredibly high barrier to entry in traditional filmmaking," said Senegalese filmmaker and finalist Hussein Dembel Sow. "With synthetic production, I can democratise access to high-end visual storytelling and position authentic African narratives on the global stage."</p>
            </div>
            
            <p className="press-paragraph">
              <strong>THANK YOU TO OUR SPONSORS & PARTNERS</strong><br />
              WIRED, Aria Protocol, Vultr, Sedition, NOPRBLM, Asprey Studio, art'otel, Innovate UK, NFC Summit, Muse Frame, Factory 4, My SMASH Media
            </p>
          </div>
        </div>
      </section>

      {/* SECOND FILM STILLS SECTION */}
      <section className="film-stills-section">
        <div className="film-stills-container">
          <div className="film-stills-row fade-in">
            {filmStills.slice(3, 6).map((film) => (
              <div className="film-still-item" key={film.id}>
                <a href={film.image} download={`${film.name.replace(/\s+/g, '_')}_by_${film.filmmaker.replace(/\s+/g, '_')}.png`} className="film-still-download">
                  <img src={film.image} alt={`${film.name} by ${film.filmmaker}`} className="film-still-image" />
                  <div className="film-still-overlay">
                    <span className="download-icon">↓</span>
                    <span className="download-text">Download</span>
                  </div>
                </a>
                <div className="film-still-caption">
                  {film.name} by {film.filmmaker} ({film.country})
                </div>
              </div>
            ))}
          </div>
          <div className="media-link fade-in">
            <a href="#images-section" className="media-images-link">MEDIA IMAGES HERE</a>
          </div>
        </div>
      </section>

      {/* MEDIA CONTACT SECTION */}
      <section className="media-contact-section" id="media-contact">
        <div className="media-contact-container fade-in">
          <h2 className="media-contact-title">All media enquiries</h2>
          <p className="media-contact-info">
            Clare Maguire: <a href="mailto:clare@aifaventures.com">clare@aifaventures.com</a><br />
            Leo Crane: <a href="mailto:leo@aifaventures.com">leo@aifaventures.com</a>
          </p>
        </div>
      </section>

      {/* NOTES TO EDITORS SECTION */}
      <section className="notes-section">
        <div className="notes-container fade-in">
          <h2 className="notes-title">Notes to Editors</h2>
          
          <div className="note-item" id="images-section">
            <h3 className="note-subtitle">Images</h3>
            <div className="download-media-section">
              <a href="/images/filmstills/STILL Thiaroye 44.png" download="Thiaroye_44.png" className="media-kit-button">Thiaroye 44</a>
              <a href="/images/filmstills/STILL Duck.jpg" download="Duck.jpg" className="media-kit-button">Duck</a>
              <a href="/images/filmstills/STILL02 Junie Lau.jpg" download="Junie_Lau.jpg" className="media-kit-button">Junie Lau</a>
            </div>
            <div className="download-media-section">
              <a href="/images/filmstills/STILL Stillness.png" download="Stillness.png" className="media-kit-button">Stillness</a>
              <a href="/images/filmstills/STILL AQUA_ALTA.png" download="Aqua_Alta.png" className="media-kit-button">Aqua Alta</a>
              <a href="/images/filmstills/STILL PARALLAX.png" download="Parallax.png" className="media-kit-button">Parallax</a>
            </div>
            <div className="download-media-section">
              <a href="/images/filmstills/STILL Artomaton_Telezine.jpg" download="Artomaton_Telezine.jpg" className="media-kit-button">Artomaton</a>
              <a href="/images/filmstills/STILL Bangladdroids.jpg" download="Bangladdroids.jpg" className="media-kit-button">Bangladdroids</a>
              <a href="/images/filmstills/STILL FOSSiLS.png" download="FOSSiLS.png" className="media-kit-button">FOSSiLS</a>
            </div>
            <div className="download-media-section">
              <a href="/images/filmstills/STILL Future Can Be Yours.jpg" download="Future_Can_Be_Yours.jpg" className="media-kit-button">Future Can Be Yours</a>
              <a href="/images/filmstills/STILL La Vie Quand.png" download="La_Vie_Quand.png" className="media-kit-button">La Vie Quand</a>
              <a href="/images/filmstills/STILL Remembering.jpg" download="Remembering.jpg" className="media-kit-button">Remembering</a>
            </div>
            <div className="download-media-section">
              <a href="/images/filmstills/STILL01 Everyone is Chair.jpg" download="Everyone_is_Chair.jpg" className="media-kit-button">Everyone is Chair</a>
              <a href="/images/filmstills/STILL03 third_impact.jpg" download="Third_Impact.jpg" className="media-kit-button">Third Impact</a>
              <a href="/images/Junie_Lau.jpg" download="Junie_Lau.jpg" className="media-kit-button">Junie Lau Photo</a>
              <a href="https://drive.google.com/drive/folders/1BMGgnzfr4ejwsY4oeklJpx0fXDIIFsYP" target="_blank" rel="noopener noreferrer" className="media-kit-button">All Images (Google Drive)</a>
            </div>
          </div>
          
          <div className="note-item">
            <h3 className="note-subtitle">About AIFA Ventures</h3>
            <p>AIFA celebrates a positive future for entertainment with the world's premier awards for AI-powered creativity. Based in the UK, we are developing a creative tech innovation hub, partnering with cultural institutions to build educational tools and tech-confident communities. This is our mission: to open up access to creativity and draw out incredible storytelling from all parts of the world.</p>
            <p><a href="https://aifaventures.com" target="_blank" rel="noopener noreferrer">aifaventures.com</a></p>
          </div>
          
          <div className="note-item">
            <h3 className="note-subtitle">About Our Sponsors and Partners</h3>
          </div>

          <div className="note-item">
            <h3 className="note-subtitle">Aria Protocol</h3>
            <p>Founded in 2025, Aria is an investment platform that transforms iconic cultural intellectual property assets into digital financial assets. With Aria, investors can buy and sell rights tied to real-world income from music performed by major artists like Justin Bieber, Miley Cyrus, and BLACKPINK. Aria ensures transparent, verifiable IP ownership and revenue sharing via the Story blockchain. Aria is also developing programmable IP tools allowing for cultural assets such as music, art, and film to be licensed, remixed, and monetized through digital contracts directly from rights holders. Aria is creating IP financial markets.</p>
            <p>Learn more at: <a href="https://ariaprotocol.xyz/" target="_blank" rel="noopener noreferrer">ariaprotocol.xyz</a>.</p>
          </div>
          
          <div className="note-item">
            <h3 className="note-subtitle">About Vultr</h3>
            <p>Vultr is on a mission to make high-performance cloud infrastructure easy to use, affordable, and locally accessible for enterprises and AI innovators around the world. Vultr is trusted by hundreds of thousands of active customers across 185 countries for its flexible, scalable, global Cloud Compute, Cloud GPU, Bare Metal, and Cloud Storage solutions.</p>
            <p>Learn more at: <a href="https://www.vultr.com" target="_blank" rel="noopener noreferrer">www.vultr.com</a>.</p>
          </div>
          
          <div className="note-item">
            <h3 className="note-subtitle">About art'otel</h3>
            <p>A contemporary hotel and arts venue in the heart of London's vibrant Shoreditch district. This stunning venue combines modern design with artistic flair, providing the perfect backdrop for our celebration of innovation in AI-generated filmmaking and digital art.</p>
            <p>Learn more: <a href="https://www.artotellondonhoxton.com" target="_blank" rel="noopener noreferrer">artotellondonhoxton.com</a></p>
          </div>
          
          <div className="note-item">
            <h3 className="note-subtitle">About Sedition</h3>
            <p>Sedition is a pioneer in digital art collecting, founded in 2011. The platform offers a curated selection of artworks in digital formats, specifically designed for viewing on screens and connected devices. Sedition aims to make art collecting more accessible and affordable, allowing users to own limited digital editions with certificates of authenticity.</p>
            <p>Learn more: <a href="https://seditionart.com" target="_blank" rel="noopener noreferrer">seditionart.com</a></p>
          </div>
          
          <div className="note-item">
            <h3 className="note-subtitle">Sponsors & Partners</h3>
            <ul className="sponsors-list">
              <li><a href="https://wirededucation.com" target="_blank" rel="noopener noreferrer">WIRED Summer Lab</a></li>
              <li><a href="https://noprblm.com" target="_blank" rel="noopener noreferrer">NOPRBLM</a></li>
              <li><a href="https://seditionart.com" target="_blank" rel="noopener noreferrer">Sedition</a></li>
              <li><a href="https://museframe.io" target="_blank" rel="noopener noreferrer">Muse Frame</a></li>
              <li><a href="https://vultr.com" target="_blank" rel="noopener noreferrer">Vultr</a></li>
              <li><a href="https://ariaprotocol.xyz" target="_blank" rel="noopener noreferrer">Aria</a></li>
              <li><a href="https://www.artotellondonhoxton.com" target="_blank" rel="noopener noreferrer">art'otel London Hoxton</a></li>
              <li><a href="https://aspreystudios.com" target="_blank" rel="noopener noreferrer">Asprey Studios</a></li>
              <li><a href="https://www.instagram.com/factory.4.0" target="_blank" rel="noopener noreferrer">Factory4</a></li>
              <li><a href="https://www.gov.uk/government/organisations/innovate-uk" target="_blank" rel="noopener noreferrer">Innovate UK</a></li>
            </ul>
          </div>
          
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-us-section" id="contact">
        <div className="footer-column">
          <h3>Get in Touch</h3>
          <ul>
            <li>
              <a href="mailto:aifa@aifaventures.com">aifa@aifaventures.com</a>
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
            <img src="/images/innovate_uk_new.png" alt="Innovate UK" style={{ height: "20px", width: "auto" }} />
          </div>
          <p style={{ fontSize: "14px", color: "var(--dark-grey)", margin: 0, textAlign: "center" }}>© 2025 AIFA Ventures. All rights reserved</p>
        </div>
      </div>
    </div>
  );
}