"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "./artotel-awards.css";

export default function ArtotelAwards() {
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

  // Factory 4 artists data
  const factory4Artists = [
    { 
      name: "Olena Yara", 
      role: "Curator",
      website: "https://theyaragency.com/",
      image: "https://drive.google.com/drive/folders/1w8lsyZv1D1JL-gPNcdsQChGrVLGYaugr",
      bio: "Olena is a Web3 marketing expert and founder of Yara Agency, a digital art marketing & PR firm supporting artists worldwide. She has led digital strategy at Fuelarts and LiveArt, collaborating with institutions like Christie's Education, Forbes Web3, and Tezos. A speaker at NFC Lisbon, Zebu Live, she also co-founded Factory 4.0."
    },
    { 
      name: "Zhannet Podobed", 
      role: "Artist",
      website: "https://zhannetpodobed.com/",
      image: "https://drive.google.com/drive/folders/1w8lsyZv1D1JL-gPNcdsQChGrVLGYaugr",
      bio: "Zhannet Podobed is a Ukrainian multidisciplinary artist based in London. Her work spans digital art, painting, and interactive media, exploring nature, humanity, and technology. With a background in graphic and motion design, she is pursuing an MA in Computational Arts at Camberwell College of Arts, University of the Arts London."
    },
    { 
      name: "Akane Hiraoka", 
      role: "Artist",
      website: "https://akamidget.com/",
      image: "https://drive.google.com/drive/folders/1w8lsyZv1D1JL-gPNcdsQChGrVLGYaugr",
      bio: "Akane is a London-based new media artist specialising in interactive art installations. She won the 2025 KXSB AI HackXcelerator (Creative AI) and presented her work at the RAISE Summit at the Louvre, Paris. Upcoming projects include Expo Japan and a collaborative interactive performance with Jiarong Yu at Sadler's Wells."
    },
    { 
      name: "Flux The Artist, Paul Dowling", 
      role: "Artist",
      website: "https://fluxtheartist.art/",
      image: "https://drive.google.com/drive/folders/1w8lsyZv1D1JL-gPNcdsQChGrVLGYaugr",
      bio: "Flux The Artist is a dynamic creator who thrives at the intersection of urban activism, social commentary, and cutting-edge artistic expression. As an artist, Flux channels the chaotic energy of city life into a diverse range of mediums, including concept art, street photography, and semi-abstract figurative works."
    }
  ];
  
  // AIFA Featured Artists
  const featuredArtists = [
    {
      name: "David Sheldrick",
      project: "Bad Manor",
      year: "2025",
      origin: "UK",
      website: "https://www.sheldrick.ai/",
      instagram: "https://www.instagram.com/p/DKiWd1mN2dC/",
      image: "/images/jury2025/david_sheldrick.PNG",
      about: "Sheldrick is a British Korean artist based in London, a graduate of the London College of Fashion in Fashion Photography, with a keen interest in image assembly, nature, and technology. During the COVID pandemic he began using AI software and has been producing AI content for clients that include Manchester City FC, Coke Studios, Standard Chartered Bank, Mercedes Benz, Stone Mountain Georgia, and some of the most popular clubs and DJs in London."
    },
    {
      name: "Ethereal Moon",
      project: "The Last of the Arcanas: Second Generation",
      year: "2024",
      origin: "USA/France",
      website: "https://www.etherealmoon.xyz/",
      instagram: "https://www.instagram.com/etherealmoon.ai/",
      image: "/images/jury2025/Ethereal_Moon.jpg",
      about: "A collaborative artistic venture founded by Ethereal Gwirl, an AI artist based in New York renowned for her expressive portrayal of daily life, and LeMoon, an AI artist from Nice, France, known for her nostalgic and disturbing style exploring surreal themes, culminating in a dynamic fusion of creativity and innovation."
    }
  ];
  
  // AIFA Jury members data
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
  

  // No public schedule

  return (
    <div className="awards-page">
      <Head>
        <title>AIFA Awards 2025 at art'otel London Hoxton | July 19, 2025</title>
        <meta name="description" content="Join us for the AIFA Awards 2025 ceremony at art'otel London Hoxton - featuring film screenings, artist panels, Factory 4 exhibition, and the announcement of this year's award winners." />
        <meta name="keywords" content="AIFA Awards 2025, art'otel London, Factory 4, AI film, AI art exhibition, digital art, AI awards ceremony" />
        <meta property="og:title" content="AIFA Awards 2025 at art'otel London Hoxton" />
        <meta property="og:description" content="Join us on July 19, 2025 for the AIFA Awards ceremony featuring screenings, exhibitions by Factory 4 artists, and celebration of AI-generated filmmaking." />
        <meta property="og:image" content="/images/aifa-event.jpg" />
        <meta property="og:url" content="https://aifilm.academy/events/artotel-awards-2025" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aifaventures" />
        <script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js" async></script>
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
      <section className="artotel-hero">
        <div className="artotel-hero-content">
          <h1 className="artotel-hero-title">AIFA Awards 2025</h1>
          <p className="artotel-hero-subtitle">In collaboration with Factory4</p>
          <p className="artotel-hero-date">July 19, 2025</p>
          <p className="artotel-hero-location" style={{ marginBottom: '20px' }}>
            <img
              src="/images/arthotel_London Hoxton_White.png"
              alt="art'otel London Hoxton Logo"
              style={{ height: '25px', width: 'auto', display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }}
            />
            <span style={{ verticalAlign: 'middle' }}>1-3 Rivington St, London EC2A 3DT</span>
          </p>
          
          {/* Sponsor Logos */}
          <div className="sponsor-logos-container" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '40px', 
            marginTop: '40px',
            flexWrap: 'wrap',
            padding: '15px'
          }}>
            <img 
              src="/images/vultr wh tr.png" 
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
                src="/images/Wired Logo White.png" 
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
                  height: '35px'
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
            <div style={{ height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src="/images/Asprey_final_ok.png" 
                alt="Asprey Studios Logo" 
                style={{ 
                  height: '58px'
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
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="about-title fade-in about-text-white">AIFA Awards 2025</h2>
          <p className="about-description fade-in about-text-white">
            The prestigious AIFA Awards returns with a VIP ceremony and party at art'otel London Hoxton. At a time when AI poses a very real threat to creativity and livelihoods in film and entertainment, AIFA champions those who use the same technologies to fight back. This special event brings together the best of AI innovation in the creative industries, featuring film screenings, artist panels, and the announcement of this year's award winners.
          </p>
          <p className="about-description fade-in about-text-white">
            In collaboration with Factory4, we're proud to present a display of cutting-edge AI art alongside our film screenings. The event will showcase the work of some of the most innovative artists working at the intersection of technology and creativity today.
          </p>
          <p className="about-description fade-in about-text-white">
            Please note this event is invitation only
          </p>
        </div>
      </section>


      {/* ARTISTS AND PARTNERS SECTION */}
      <section className="partners-section">
        <div className="partners-container">
          <h2 className="section-title fade-in">Artists, Partners, and Sponsors</h2>
          <p className="partner-description fade-in">
            AIFA art'otel 2025 brings together innovative artists, creative partners, and forward-thinking 
            sponsors to celebrate the future of AI-generated art and filmmaking.
          </p>
          
          <div className="collaborators-section fade-in">
            <h3 className="section-subtitle">Our Collaborators</h3>
            <div className="collaborators-buttons">
              <Link href="/events/aifa-awards-2025-press-release" className="collaborator-button">
                Press Release
              </Link>
              <Link href="/awards/2025/finalists" className="collaborator-button">
                Finalists
              </Link>
              <Link href="/featured-artists" className="collaborator-button">
                Featured Artists
              </Link>
              <Link href="/factory-four-artists" className="collaborator-button">
                Factory4 Artists
              </Link>
            </div>
          </div>
          
          <div className="sponsors-section fade-in">
            <h3 className="section-subtitle">Art'otel x AIFA main partners and sponsors</h3>
            <div className="main-sponsors-grid">
              <div className="sponsor-item">
                <a href="https://wirededucation.com" target="_blank" rel="noopener noreferrer" className="sponsor-link">WIRED Summer Lab</a>
              </div>
              <div className="sponsor-item">
                <a href="https://factory4.art" target="_blank" rel="noopener noreferrer" className="sponsor-link">Factory4</a>
              </div>
              <div className="sponsor-item">
                <a href="https://vultr.com" target="_blank" rel="noopener noreferrer" className="sponsor-link">Vultr</a>
              </div>
              <div className="sponsor-item">
                <a href="https://ariaprotocol.xyz" target="_blank" rel="noopener noreferrer" className="sponsor-link">Aria Protocol</a>
              </div>
              <div className="sponsor-item">
                <a href="https://seditionart.com" target="_blank" rel="noopener noreferrer" className="sponsor-link">Sedition</a>
              </div>
              <div className="sponsor-item">
                <a href="https://museframe.io" target="_blank" rel="noopener noreferrer" className="sponsor-link">Muse Frame</a>
              </div>
              <div className="sponsor-item">
                <a href="https://www.mysmash.media/" target="_blank" rel="noopener noreferrer" className="sponsor-link">SMASH Media</a>
              </div>
              <div className="sponsor-item">
                <a href="https://noprblm.com" target="_blank" rel="noopener noreferrer" className="sponsor-link">NOPRBLM</a>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* JURY SECTION */}
      <section className="jury-section">
        <div className="jury-container">
          <h2 className="jury-title fade-in">Meet Our Jury</h2>
          <p className="jury-description fade-in">
            Our esteemed panel of judges brings together diverse expertise in AI, art, film, and creative technology
          </p>
          
          <div className="jury-grid fade-in">
            {juryMembers.map((member, index) => (
              <div className="jury-member" key={index}>
                <div className="jury-image" onClick={() => toggleBio(index)}>
                  <img src={member.image} alt={`${member.name} - ${member.role}`} />
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
                      <button className="jury-bio-close" onClick={() => toggleBio(index)}>×</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENUE SECTION */}
      <section className="venue-section">
        <div className="venue-container">
          <div className="venue-info fade-in">
            <h2 className="venue-title">Event Venue</h2>
            
            <div style={{ marginBottom: '15px' }}>
              <img 
                src="/images/arthotel_London Hoxton_Black.jpg" 
                alt="art'otel London Hoxton Logo" 
                style={{ height: '30px', width: 'auto' }}
              />
            </div>
            
            <p className="venue-description">
              A contemporary hotel and arts venue in the heart of London's vibrant Shoreditch district.
              This stunning venue combines modern design with artistic flair, providing the perfect backdrop for our celebration
              of innovation in AI-generated filmmaking and digital art.
            </p>
            <p className="venue-address">
              <strong>Address:</strong><br />
              art'otel London Hoxton<br />
              1-3 Rivington St<br />
              London EC2A 3DT<br />
              United Kingdom
            </p>
          </div>
          <div className="venue-map fade-in">
            <img src="/images/artotel_events.jpg" alt="art'otel London Hoxton" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* REGISTER SECTION */}
      <section className="register-section">
        <div className="register-container">
          <h2 className="register-title fade-in">Join Us on July 19</h2>
          <p className="register-description fade-in">
            Don't miss this celebration of innovation, creativity, and the future of AI in the arts. This invitation-only event
            will showcase the AIFA Awards 2025 ceremony and groundbreaking AI-generated works.
          </p>
        </div>
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