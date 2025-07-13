"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "../global.css";
import "./qr.css";

export default function QRPage() {
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

  // Jury members data
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

  // Finalists data
  const finalists = [
    {
      title: "Everyone is Chair",
      filmmaker: "Leilanni Todd",
      year: "2024",
      image: "/images/filmstills/STILL01 Everyone is Chair.jpg",
      description: "Everyone is Chair is a short AI-generated film about a woman's surreal obsession with inflatable chairs—worn as both fashion and survival gear. Inspired by images of New Yorkers wading through flooded subway stations, and the director's own experience working remotely in a desk chair for 12 hours a day, the film raises questions about adaptation, routine, and transformation."
    },
    {
      title: "e^(i*π) + 1 = 0",
      filmmaker: "Junie Lau",
      year: "2024",
      image: "/images/filmstills/STILL02 Junie Lau.jpg",
      description: "After retirement, the former mathematical genius transformed into the creator of digital comics. He became the god of this fictional universe, where time and dimensions wander under his pen. In his story, there are three characters given life—Alpha (α), Beta (β), and Gamma (γ). Like his virtual children, they linger amid the intricacies of digits."
    },
    {
      title: "Third Impact",
      filmmaker: "S()fia Braga",
      year: "2025",
      image: "/images/filmstills/STILL03 third_impact.jpg",
      description: "Third Impact is an AI-generated movie that explores the future of human and non-human collaboration. The film centers around a quantum computer whose goal is to prevent the extinction of organic life on Earth, as the planet's temperatures continue to rise and extreme weather events intensify."
    },
    {
      title: "Duck",
      filmmaker: "Rachel Maclean",
      year: "2023",
      image: "/images/filmstills/STILL Duck.jpg",
      description: "Acclaimed artist and filmmaker Rachel Maclean's first deepfake film takes place within a world of artifice, subterfuge and intrigue. DUCK is unique in entirely using deefake video and audio, resurrecting actors via machine-learning."
    }
  ];

  // Featured Artists data
  const featuredArtists = [
    {
      name: "David Sheldrick",
      project: "Bad Manor",
      year: "2025",
      origin: "UK",
      image: "/images/jury2025/david_sheldrick.PNG",
      artworkImage: "/images/filmstills/STILL FOSSiLS.png",
      description: "Inspired by a photograph I took when I was starting my photography career, a shoot in a british manor house, I invited my friends to come and dress up in 18th century fashion and we shot the whole day. They were all different ethnicities and the imagery ended up winning me an award with Broncolor lighting systems, a Swiss lighting company.",
      about: "Sheldrick is a British Korean artist based in London, a graduate of the London College of Fashion in Fashion Photography, with a keen interest in image assembly, nature, and technology."
    },
    {
      name: "Ethereal Moon",
      project: "The Last of the Arcanas: Second Generation",
      year: "2024",
      origin: "USA/France",
      image: "/images/jury2025/Ethereal_Moon.jpg",
      artworkImage: "/images/filmstills/STILL La Vie Quand.png",
      description: "In The Last of the Arcanas, the fates of two children—Major, from the celestial Sublimes of the Above, and Minor, from the shadowy Mole People of the Caves—are bound by an ancient prophecy. Raised as leaders by their opposing worlds, they are destined to unite in an arranged marriage meant to bring peace to the Arcane land.",
      about: "A collaborative artistic venture founded by Ethereal Gwirl, an AI artist based in New York renowned for her expressive portrayal of daily life, and LeMoon, an AI artist from Nice, France, known for her nostalgic and disturbing style exploring surreal themes."
    }
  ];

  // Factory Four Artists data
  const factoryFourArtists = [
    { 
      name: "Olena Yara", 
      role: "Curator",
      image: "/images/olena.JPG",
      description: "Olena is the founder and creative director of Factory 4, leading the collaborative initiative to showcase innovative AI artists in unique settings.",
      bio: "Olena is a Web3 marketing expert and founder of Yara Agency, a digital art marketing & PR firm supporting artists worldwide. She has led digital strategy at Fuelarts and LiveArt, collaborating with institutions like Christie's Education, Forbes Web3, and Tezos."
    },
    { 
      name: "Zhannet Podobed", 
      role: "Artist",
      image: "/images/zhannetpodobed.jpeg",
      description: "Zhannet Podobed's work for Factory 4 explores the intersection of nature, technology, and human experience through innovative AI-generated digital art.",
      bio: "Zhannet Podobed is a Ukrainian multidisciplinary artist based in London. Her work spans digital art, painting, and interactive media, exploring nature, humanity, and technology."
    },
    { 
      name: "Akane Hiraoka", 
      role: "Artist",
      image: "/images/akane profile picture.jpg",
      description: "Akane's contributions to Factory 4 feature immersive interactive installations that invite viewers to engage directly with AI-generated content.",
      bio: "Akane is a London-based new media artist specialising in interactive art installations. She won the 2025 KXSB AI HackXcelerator (Creative AI) and presented her work at the RAISE Summit at the Louvre, Paris."
    },
    { 
      name: "Flux The Artist, Paul Dowling", 
      role: "Artist",
      image: "/images/Paul _ Flux The Artist.jpg",
      description: "Flux's work with Factory 4 explores urban activism and social commentary through AI-enhanced visual storytelling and experiential art.",
      bio: "Flux The Artist is a dynamic creator who thrives at the intersection of urban activism, social commentary, and cutting-edge artistic expression."
    }
  ];

  // Event schedule
  const schedule = [
    { time: "5:00 PM", activity: "Welcome drinks" },
    { time: "5:30 PM", activity: "Welcome from AIFA, Screening" },
    { time: "6:50 PM", activity: "Panel discussion on AI and film" },
    { time: "7:00 PM", activity: "More guests arrive" },
    { time: "7:30 PM", activity: "Awards announced" },
    { time: "7:45 PM", activity: "Factory4 Digital Art Showcase & Party!" },
    { time: "11:00 PM", activity: "Event Concludes" }
  ];

  return (
    <div className="qr-page">
      <Head>
        <title>AIFA Awards 2025 Event Details | July 19, 2025 at art'otel London Hoxton</title>
        <meta name="description" content="Complete event details for the AIFA Awards 2025 ceremony on July 19, 2025 at art'otel London Hoxton - featuring film screenings, jury members, finalists, featured artists, and Factory Four exhibition." />
      </Head>
      
      {/* HEADER */}
      <header className={`header ${headerScrolled ? "scrolled" : ""}`}>
        <Link href="/" className="logo">
          <img
            src="/images/AIFAlogo.png"
            alt="AIFA Logo"
            style={{ height: "30px", width: "auto" }}
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
      <section className="qr-hero">
        <div className="qr-hero-content">
          <h1 className="qr-hero-title">AIFA Awards 2025</h1>
          <p className="qr-hero-subtitle">In collaboration with Factory4</p>
          <p className="qr-hero-date">July 19, 2025</p>
          <p className="qr-hero-location" style={{ marginBottom: '20px' }}>
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
                src="/images/wired_tran.png" 
                alt="WIRED Logo" 
                style={{ 
                  height: '30px',
                  backgroundColor: '#fff',
                  padding: '2px 5px',
                  borderRadius: '3px'
                }}
              />
            </div>
            <div style={{ height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src="/images/Factory logo.PNG" 
                alt="Factory4 Logo" 
                style={{ 
                  height: '35px',
                  backgroundColor: '#fff',
                  padding: '2px 5px',
                  borderRadius: '3px'
                }}
              />
            </div>
            <div style={{ height: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src="/images/support/innovateuk.jpg" 
                alt="Innovate UK Logo" 
                style={{ 
                  height: '25px',
                  backgroundColor: '#fff',
                  padding: '2px 5px',
                  borderRadius: '3px'
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
          </div>
        </div>
      </section>

      {/* SCHEDULE SECTION */}
      <section className="schedule-section">
        <div className="schedule-container">
          <h2 className="section-title fade-in">Event Schedule</h2>
          <div className="schedule-box fade-in" style={{ 
            maxWidth: '600px', 
            margin: '0 auto', 
            backgroundColor: '#f9f9f9',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            <div className="schedule-timeline">
              {schedule.map((item, index) => (
                <div key={index} className="schedule-item" style={{ marginBottom: '20px' }}>
                  <div className="schedule-time" style={{ 
                    width: '100px', 
                    fontWeight: '600', 
                    textAlign: 'right', 
                    paddingRight: '20px',
                    fontSize: '0.95rem',
                    color: '#000'
                  }}>{item.time}</div>
                  <div className="schedule-dot" style={{ 
                    width: '12px', 
                    height: '12px', 
                    backgroundColor: '#000', 
                    borderRadius: '50%',
                    margin: '0 10px'
                  }}></div>
                  <div className="schedule-activity" style={{ 
                    flex: '1',
                    fontSize: '1rem',
                    fontWeight: index === 4 ? '600' : '400' // Bold for the Awards announced
                  }}>{item.activity}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="section-title fade-in">About the Event</h2>
          <p className="about-description fade-in">
            The prestigious AIFA Awards returns with a VIP ceremony and party at art'otel London Hoxton. At a time when AI poses a very real threat to creativity and livelihoods in film and entertainment, AIFA champions those who use the same technologies to fight back. This special event brings together the best of AI innovation in the creative industries, featuring film screenings, artist panels, and the announcement of this year's award winners.
          </p>
          <p className="about-description fade-in">
            In collaboration with Factory4, we're proud to present a display of cutting-edge AI art alongside our film screenings. The event will showcase the work of some of the most innovative artists working at the intersection of technology and creativity today.
          </p>
        </div>
      </section>

      {/* FILM STILLS SECTION */}
      <section className="film-stills-section">
        <div className="film-stills-container">
          <div className="film-stills-row fade-in">
            <div className="film-still-item">
              <img src="/images/filmstills/STILL Thiaroye 44.png" alt="Thiaroye 44 by Hussein Dembel Sow" className="film-still-image" />
              <div className="film-still-caption">
                Thiaroye 44 by Hussein Dembel Sow (Senegal)
              </div>
            </div>
            <div className="film-still-item">
              <img src="/images/filmstills/STILL Duck.jpg" alt="Duck by Rachel Maclean" className="film-still-image" />
              <div className="film-still-caption">
                Duck by Rachel Maclean (UK)
              </div>
            </div>
            <div className="film-still-item">
              <img src="/images/filmstills/STILL01 Everyone is Chair.jpg" alt="Everyone is Chair by Leilanni Todd" className="film-still-image" />
              <div className="film-still-caption">
                Everyone is Chair by Leilanni Todd (USA)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINALISTS SECTION */}
      <section className="finalists-section">
        <div className="finalists-container">
          <h2 className="section-title fade-in">AIFA Awards 2025 Finalists</h2>
          <p className="finalists-description fade-in">
            Our 14 groundbreaking AI-generated films selected as finalists for the AIFA Awards 2025 push the boundaries of storytelling, innovation, and visual artistry. Here's a sample of the outstanding films:
          </p>
          <div className="finalists-grid fade-in">
            {finalists.map((film, index) => (
              <div className="finalist-item" key={index}>
                <div className="finalist-image-container" style={{ marginBottom: '15px', width: '100%', position: 'relative', height: '0', paddingBottom: '56.25%', overflow: 'hidden' }}>
                  <img 
                    src={film.image} 
                    alt={film.title}
                    style={{ 
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <h3 className="finalist-title">{film.title}</h3>
                <p className="finalist-meta">{film.filmmaker}, {film.year}</p>
                <p className="finalist-description">{film.description}</p>
              </div>
            ))}
          </div>
          <p className="finalists-note fade-in">
            <a href="/awards/2025/finalists" className="link-button">View All Finalists</a>
          </p>
        </div>
      </section>

      {/* FEATURED ARTISTS SECTION */}
      <section className="featured-artists-section">
        <div className="featured-container">
          <h2 className="section-title fade-in">Featured Artists</h2>
          <p className="featured-description fade-in">
            AIFA is proud to showcase the work of these innovative AI artists who are pushing the boundaries of creative expression:
          </p>
          <div className="featured-grid fade-in">
            {featuredArtists.map((artist, index) => (
              <div className="featured-item" key={index}>
                <div style={{ marginBottom: '20px' }}>
                  <div className="featured-image" style={{ marginBottom: '20px', textAlign: 'center', position: 'relative' }}>
                    <div style={{ 
                      width: '140px', 
                      height: '140px',
                      margin: '0 auto',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '3px solid white',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      backgroundColor: '#fff'
                    }}>
                      <img 
                        src={artist.image}
                        alt={`${artist.name} portrait`}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          filter: 'grayscale(100%)'
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="featured-name" style={{ fontSize: '1.3rem', marginBottom: '5px' }}>{artist.name}</h3>
                  <p className="featured-project" style={{ fontStyle: 'italic', marginBottom: '10px', color: '#555' }}>
                    {artist.project} ({artist.year}, {artist.origin})
                  </p>
                  <p className="featured-bio" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{artist.about}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="featured-note fade-in">
            <a href="/featured-artists" className="link-button">Learn More About Featured Artists</a>
          </p>
        </div>
      </section>

      {/* FACTORY FOUR SECTION */}
      <section className="factory-four-section">
        <div className="factory-container">
          <h2 className="section-title fade-in">Factory Four Exhibition</h2>
          <div style={{ textAlign: 'center', marginBottom: '30px' }} className="fade-in">
            <img src="/images/Factory logo.PNG" alt="Factory Four Logo" style={{ height: '60px', marginBottom: '20px' }} />
          </div>
          <p className="factory-description fade-in">
            Factory 4 is a nomadic, artist-led gallery founded by Paul Dowling and Olena Yara. 
            It has hosted several digital art exhibitions in London and Lisbon, with a focus on 
            empowering artists and showcasing their work to wider audiences. For the AIFA Awards 2025, 
            Factory 4 brings together an exclusive collection of cutting-edge AI art alongside 
            film screenings at the art'otel London Hoxton.
          </p>
          <div className="factory-grid fade-in">
            {factoryFourArtists.map((artist, index) => (
              <div className="factory-item" key={index}>
                <div className="factory-image" style={{ marginBottom: '15px', textAlign: 'center' }}>
                  <img 
                    src={artist.image} 
                    alt={artist.name}
                    style={{ 
                      width: '120px', 
                      height: '120px', 
                      borderRadius: '50%', 
                      objectFit: 'cover',
                      filter: 'grayscale(100%)'
                    }}
                  />
                </div>
                <h3 className="factory-name">{artist.name}</h3>
                <p className="factory-role">{artist.role}</p>
                <p className="factory-bio">{artist.description}</p>
              </div>
            ))}
          </div>
          <p className="factory-note fade-in">
            <a href="/factory-four-artists" className="link-button">Explore Factory Four Artists</a>
          </p>
        </div>
      </section>

      {/* JURY SECTION */}
      <section className="jury-section">
        <div className="jury-container">
          <h2 className="section-title fade-in">Meet Our Jury</h2>
          <p className="jury-description fade-in">
            Our esteemed panel of judges brings together diverse expertise in AI, art, film, and creative technology:
          </p>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }} className="fade-in">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: '40px',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {juryMembers.map((member, index) => (
                <div key={index} style={{ 
                  width: '150px', 
                  textAlign: 'center',
                  margin: '15px 0'
                }}>
                  <div style={{ 
                    width: '120px', 
                    height: '120px', 
                    margin: '0 auto 15px',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '50%',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}>
                    <img 
                      src={member.image} 
                      alt={member.name}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        filter: 'grayscale(100%)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.filter = 'grayscale(0%)';
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.filter = 'grayscale(100%)';
                        e.target.style.transform = 'scale(1)';
                      }}
                    />
                  </div>
                  <h3 style={{ 
                    fontSize: '1rem', 
                    fontWeight: '500',
                    margin: '0 0 5px'
                  }}>{member.name}</h3>
                  <p style={{ 
                    fontSize: '0.85rem', 
                    color: '#666',
                    margin: '0',
                    fontStyle: 'italic'
                  }}>{member.role}</p>
                </div>
              ))}
            </div>
          </div>
          
          <p className="jury-note fade-in" style={{ textAlign: 'center' }}>
            <a href="/awards/2025" className="link-button">Learn More About the Jury</a>
          </p>
        </div>
      </section>

      {/* VENUE SECTION */}
      <section className="venue-section">
        <div className="venue-container">
          <h2 className="section-title fade-in">Event Venue</h2>
          <div className="venue-info fade-in" style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
              <img 
                src="/images/arthotel_London Hoxton_Black.jpg" 
                alt="art'otel London Hoxton Logo" 
                style={{ height: '30px', width: 'auto' }}
              />
            </div>
            <p className="venue-description" style={{ maxWidth: '650px', margin: '0 auto 20px' }}>
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
        </div>
      </section>
      
      {/* SPONSORS SECTION */}
      <section className="sponsors-section">
        <div className="sponsors-container">
          <h2 className="sponsors-title fade-in">Our Partners & Sponsors</h2>
          <div className="sponsors-grid fade-in" style={{ gap: '40px' }}>
            <div className="sponsor-logo">
              <img 
                src="/images/vultr wh tr.png" 
                alt="Vultr Logo"
                style={{ background: 'transparent', filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <div className="sponsor-logo">
              <img 
                src="/partners/sedition logo wh long.png" 
                alt="Sedition Logo"
                style={{ background: 'transparent', filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <div className="sponsor-logo">
              <img 
                src="/partners/Muse Frame wh text.png" 
                alt="Muse Frame Logo"
                style={{ background: 'transparent', filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <div className="sponsor-logo">
              <img 
                src="/images/logo-abberation-white.svg" 
                alt="Aria Logo"
                style={{ background: 'transparent', filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <div className="sponsor-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src="/images/wired_tran.png" 
                alt="WIRED Logo" 
                style={{ 
                  height: '30px',
                  backgroundColor: '#fff',
                  padding: '2px 5px',
                  borderRadius: '3px'
                }}
              />
            </div>
            <div className="sponsor-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src="/images/Factory logo.PNG" 
                alt="Factory4 Logo" 
                style={{ 
                  height: '35px',
                  backgroundColor: '#fff',
                  padding: '2px 5px',
                  borderRadius: '3px'
                }}
              />
            </div>
            <div className="sponsor-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src="/images/support/innovateuk.jpg" 
                alt="Innovate UK Logo" 
                style={{ 
                  height: '25px',
                  backgroundColor: '#fff',
                  padding: '2px 5px',
                  borderRadius: '3px'
                }}
              />
            </div>
            <div className="sponsor-logo" style={{ fontWeight: 'bold', fontSize: '18px' }}>
              NOPRBLM.
            </div>
          </div>
          
          <div className="press-release-container fade-in">
            <a 
              href="/events/aifa-awards-2025-press-release" 
              className="press-release-link"
            >
              Read the Press Release
            </a>
          </div>
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