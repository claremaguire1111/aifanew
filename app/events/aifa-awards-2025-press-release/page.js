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

  const eventDetails = [
    { label: "When", value: "Saturday 19 July, 5-11pm" },
    { label: "Where", value: "Art'otel London Hoxton, 1-3 Rivington St, London EC2A 3DT" },
    { label: "What", value: "The Award of Awards for AI Film" },
    { label: "", value: "Screening, panel, awards and party ", valueLink: "/events/artotel-awards-2025", valueLinkText: "(full schedule)" },
    { label: "", value: "Digital art displays curated by Factory 4 and Nasty Magazine" },
    { label: "Join", value: "Invitation only - register here for media pass" }
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
            Honouring pioneering filmmakers using AI to reshape the global film industry
          </p>
        </div>
      </section>

      {/* EVENT DETAILS SECTION */}
      <section className="event-details-section">
        <div className="event-details-container fade-in">
          <div className="event-details-grid">
            {eventDetails.map((detail, index) => (
              <div className="event-detail-row" key={index}>
                {detail.label && (
                  <div className="event-detail-label">{detail.label}</div>
                )}
                <div className={`event-detail-value ${!detail.label ? 'full-width' : ''}`}>
                  {detail.label === "Where" ? (
                    <Link href="/events/artotel-awards-2025">{detail.value}</Link>
                  ) : detail.label === "Join" ? (
                    <>Invitation only - <Link href="/events/media-pass" className="media-pass-link">register here for media pass</Link></>
                  ) : detail.valueLink ? (
                    <>{detail.value}<Link href={detail.valueLink}>{detail.valueLinkText}</Link></>
                  ) : (
                    detail.value
                  )}
                </div>
              </div>
            ))}
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
              From China to Canada, the UK to Senegal, the AIFA Awards reveal a new generation of filmmakers using AI-powered storytelling to challenge the big studios. At a time when AI poses a very real threat to creativity and livelihoods in film and entertainment, AIFA champions those who use the same technologies to fight back.
            </p>
            
            <div className="press-quote">
              <p>"The core issue is the incredibly high barrier to entry in traditional filmmaking. The costs associated with equipment, crews, locations, and post-production are simply prohibitive for most aspiring Senegalese filmmakers. With synthetic production, I can democratise access to high‑end visual storytelling and position authentic African narratives on the global stage."</p>
              <cite>Hussein Dembel Sow, filmmaker from Senegal and AIFA Awards finalist</cite>
            </div>
            
            <p className="press-paragraph">
              The AIFA Awards will be announced at a VIP event at Art'otel London Hoxton on 19 July. After scouring films at over 30 AIFA-qualifying festivals, three themes have emerged: Digital Futures, War & Conflict, and Memory & Afterlife. 14 Finalists have been selected to showcase these themes, representing talent from Asia, the Middle East, Africa, Europe and North America (<Link href="/awards/2025/finalists">full list of finalists</Link>).
            </p>
            
            <p className="press-paragraph">
              Awards for Best Film, Innovation, Narrative, Visuals and Sound are determined by a jury of industry experts, including SXSW Winner Pinny Grylls and fashion film pioneer Diane Pernet (<Link href="/awards/2025">full jury</Link>). Winners will be supported in financing, distribution and community building through partnerships with Sedition (seditionart.com) and Smash (mysmash.media).
            </p>
            
            <div className="press-quote">
              <p>"At AIFA, we're exploring how emerging technologies, including AI, can support not just the creation of work but the ecosystems around that work. The more we live in an online, 24/7 world, the more important it is to create infrastructures of care and connection. It is vital to ensure that innovation leads to inclusion and that the future of creative tech is equitable, especially for the artist."</p>
              <cite>Leo Crane, co-founder of AIFA Ventures</cite>
            </div>
            
            <p className="press-paragraph">
              As well as a screening and panel discussion, the event will feature digital art displays curated by Factory 4 and Nasty Magazine. Using Art'otel's immersive projections and Muse Frame's fine art screens, guests will experience experimental new work, exploring the themes of the awards in greater depth. Artists include Zhannet Popobed, Akane Hiraoka and Flux (<Link href="/factory-four-artists">more info on digital art displays</Link>).
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
          <h2 className="media-contact-title">Contact for media enquiries</h2>
          <p className="media-contact-info">
            Clare Maguire, NOPRBLM<br />
            <a href="mailto:clare@aifaventures.com">clare@aifaventures.com</a><br />
            <a href="mailto:leo@aifaventures.com">leo@aifaventures.com</a>
          </p>
        </div>
      </section>

      {/* NOTES TO EDITORS SECTION */}
      <section className="notes-section">
        <div className="notes-container fade-in">
          <h2 className="notes-title">Notes to Editors</h2>
          
          <div className="note-item">
            <p>For full details on the AIFA Awards 2025 event, including finalists and featured artists, please visit: <a href="https://www.aifaventures.com/events/art'otel-awards-2025" target="_blank" rel="noopener noreferrer">www.aifaventures.com/events/art'otel-awards-2025</a></p>
          </div>
          
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
              <a href="https://drive.google.com/drive/folders/1BMGgnzfr4ejwsY4oeklJpx0fXDIIFsYP" target="_blank" rel="noopener noreferrer" className="media-kit-button">All Images (Google Drive)</a>
            </div>
          </div>
          
          <div className="note-item">
            <h3 className="note-subtitle">About AIFA Ventures</h3>
            <p>AIFA celebrates a positive future for entertainment with the world's premier awards for AI-powered creativity. Based in the UK, we are developing a creative tech innovation hub, partnering with cultural institutions to build educational tools and tech-confident communities. This is our mission: to open up access to creativity and draw out incredible storytelling from all parts of the world.</p>
            <p><a href="https://aifaventures.com" target="_blank" rel="noopener noreferrer">aifaventures.com</a></p>
          </div>
          
          <div className="note-item">
            <h3 className="note-subtitle">About Art'otel</h3>
            <p>Art'otel London Hoxton is a contemporary hotel and arts venue in the heart of London's vibrant Shoreditch district. This stunning venue combines modern design with artistic flair, providing the perfect backdrop for the celebration of innovation in AI-generated filmmaking and digital art.</p>
            <p><a href="https://www.artotellondonhoxton.com" target="_blank" rel="noopener noreferrer">artotellondonhoxton.com</a></p>
          </div>
          
          <div className="note-item">
            <h3 className="note-subtitle">About Factory 4</h3>
            <p>Factory 4 is a nomadic, artist-led gallery founded by Paul Dowling and Olena Yara. It has hosted several digital art exhibitions in London and Lisbon, with a focus on empowering artists and showcasing their work to wider audiences. Featured artists at the AIFA Awards 2025 include Zhannet Podobed, Akane Hiraoka and Flux The Artist (<Link href="/factory-four-artists">more details</Link>).</p>
            <p><a href="https://www.instagram.com/factory.4.0" target="_blank" rel="noopener noreferrer">instagram.com/factory.4.0</a></p>
          </div>
          
          <div className="note-item">
            <h3 className="note-subtitle">Sponsors & Partners</h3>
            <ul className="sponsors-list">
              <li><a href="https://wirededucation.com" target="_blank" rel="noopener noreferrer">WIRED Summer Lab</a></li>
              <li><a href="https://nastymagazine.com" target="_blank" rel="noopener noreferrer">Nasty Magazine</a></li>
              <li><a href="https://noprblm.com" target="_blank" rel="noopener noreferrer">NOPRBLM</a></li>
              <li><a href="https://seditionart.com" target="_blank" rel="noopener noreferrer">Sedition</a></li>
              <li><a href="https://museframe.io" target="_blank" rel="noopener noreferrer">Muse Frame</a></li>
              <li><a href="https://vultr.com" target="_blank" rel="noopener noreferrer">Vultr</a></li>
              <li><a href="https://ariaprotocol.xyz" target="_blank" rel="noopener noreferrer">Aria</a></li>
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
            <img src="/images/support/innovateuk.jpg" alt="Innovate UK" style={{ height: "20px", width: "auto" }} />
          </div>
          <p style={{ fontSize: "14px", color: "var(--dark-grey)", margin: 0, textAlign: "center" }}>© 2025 AIFA Ventures. All rights reserved</p>
        </div>
      </div>
    </div>
  );
}