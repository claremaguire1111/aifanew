"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "../../awards.css";
import "./finalists.css";

export default function Finalists2025() {
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

  const finalists = [
    {
      title: "Everyone is Chair",
      filmmaker: "Leilanni Todd",
      year: "2024",
      description: "Everyone is Chair is a short AI-generated film about a woman's surreal obsession with inflatable chairs—worn as both fashion and survival gear. Inspired by images of New Yorkers wading through flooded subway stations, and the director's own experience working remotely in a desk chair for 12 hours a day, the film raises questions about adaptation, routine, and transformation.",
      image: "https://myaifafinalists.s3.us-east-2.amazonaws.com/AIFA+2025+Film+Stills/STILL01+Everyone+is+Chair.jpg"
    },
    {
      title: "e^(i*π) + 1 = 0",
      filmmaker: "Junie Lau",
      year: "2024",
      description: "After retirement, the former mathematical genius transformed into the creator of digital comics. He became the god of this fictional universe, where time and dimensions wander under his pen. In his story, there are three characters given life—Alpha (α), Beta (β), and Gamma (γ). Like his virtual children, they linger amid the intricacies of digits. One day, the mathematician drifted into an eternal slumber, never to awaken again. They began to sense each other's existence and attempted to decode the mysteries of this world, searching for an exit to reality. In this elusive exploration, they mistakenly thought they had touched the edge of truth, only to discover that everything was a castle in the air.",
      image: "https://myaifafinalists.s3.us-east-2.amazonaws.com/AIFA+2025+Film+Stills/STILL02+Junie+Lau.jpg"
    },
    {
      title: "Third Impact",
      filmmaker: "S()fia Braga",
      year: "2025",
      description: "Third Impact is an AI-generated movie that explores the future of human and non-human collaboration. The film centers around a quantum computer whose goal is to prevent the extinction of organic life on Earth, as the planet's temperatures continue to rise and extreme weather events intensify. As this very sophisticated computational machine carries out its mission, an unknown event occurs, resulting in the disappearance of all remaining forms of organic life on the planet. This event prompts the quantum machine to question its own existence and purpose, leading to an emotional journey of self-discovery from the machine perspective.",
      image: "https://myaifafinalists.s3.us-east-2.amazonaws.com/AIFA+2025+Film+Stills/STILL03+third_impact.jpg"
    },
    {
      title: "Duck",
      filmmaker: "Rachel Maclean",
      year: "2023",
      description: "Acclaimed artist and filmmaker Rachel Maclean's first deepfake film takes place within a world of artifice, subterfuge and intrigue. DUCK is unique in entirely using deefake video and audio, resurrecting actors via machine-learning. Visually captivating, funny, and technically innovative, DUCK takes elements from classic Hollywood, video games, film noir, and sci-fi to raise compelling questions about truth and power, and to satirise some of the more histrionic narratives pushed by the media regarding deepfakes and their contribution to the 'decline of truth'.",
      image: "https://myaifafinalists.s3.us-east-2.amazonaws.com/AIFA+2025+Film+Stills/STILL+Duck.jpg"
    },
    {
      title: "Artomaton Telezine",
      filmmaker: "Gabriel Aronson",
      year: "2024",
      description: "Artomaton Telezine is \"found footage\" from the vault of The Fair, a massive international exposition that may or may not have happened.",
      image: "https://myaifafinalists.s3.us-east-2.amazonaws.com/AIFA+2025+Film+Stills/STILL+Artomaton_Telezine.jpg"
    },
    {
      title: "Life After You Dyed!!",
      filmmaker: "Raaphaël Frydman",
      year: "2024",
      description: "Raphaël, a 10 years old boy, spends his day watching his ceilling, where he's mentally projecting a funny movie about the afterlife.",
      image: "/images/placeholder6.jpg"
    },
    {
      title: "Stillness",
      filmmaker: "Nora Hase",
      year: "2024",
      description: "Instead of prominent and loud resistance, I'd like to be quiet today. Assert my existence by simply being, by staying still and being witnessed. An diasporic exploration of pan-african futurism from a black german point of view, in part inspired by the thoughts and curation of Ekow Eshun and the readings of Kevin E. Quashie's \"The Sovereignty of Quiet\".",
      image: "/images/placeholder7.jpg"
    },
    {
      title: "Aqua Alta",
      filmmaker: "Fouzi Louahem",
      year: "2024",
      description: "The title AQUA ALTA — referring to the high tides in Venice — acts as a metaphor for a world on the verge of submersion, where reality becomes unstable and blurred. The film stages a silent encounter between humanity and deep-sea beings — hybrid, spectral figures emerging from the collective unconscious or a buried future. This wordless narrative unfolds through an immersive visual atmosphere, deliberately unsteady, where each image seems to surface from a dream or fragmented memory. Created entirely with AI tools (Midjourney, Runway), AQUA ALTA explores not only cinematic form, but also the creative process itself: what does it mean to \"film\" without a camera? How can we compose sequences outside of real time?",
      image: "https://myaifafinalists.s3.us-east-2.amazonaws.com/AIFA+2025+Film+Stills/STILL+AQUA_ALTA.png"
    },
    {
      title: "Parallax",
      filmmaker: "Ariel Kotzer",
      year: "2024",
      description: "Set against the backdrop of 1960s and 1970s Israel, this experimental montage film, based on a sequence from Alan J Pakula's \"The Parallax View\", explores the psychological and emotional effects of societal programming through the lens of personal memory. Blending nostalgia with growing tension, the film mirrors the protagonist's journey from innocence to disillusionment. Childhood recollections of love, family, and home slowly give way to the weight of national pride, conflict, and identity. As the idyllic scenes are disrupted by war, patriotism, and existential questioning, the montage builds into chaos, reflecting the inner turmoil of a life shaped by external forces. In the end, the film returns to its simple beginnings.",
      image: "https://myaifafinalists.s3.us-east-2.amazonaws.com/AIFA+2025+Film+Stills/STILL+PARALLAX.png"
    },
    {
      title: "Thiaroye 44",
      filmmaker: "Hussein Dembel Sow",
      year: "2024",
      description: "Thiaroye 44 is a groundbreaking AI-generated film directed by Senegalese filmmaker Hussein Dembel Sow. The film revisits the tragic events of the Thiaroye massacre, where in 1944, French colonial forces killed West African soldiers who were demanding fair compensation after serving in World War II. By integrating advanced generative AI technologies, Sow brings a fresh perspective to this historical atrocity, blending traditional storytelling with modern innovation. The film premiered in Dakar, emphasizing the importance of remembering and honoring the sacrifices of these soldiers. Thiaroye 44 stands as a testament to the power of technology in preserving and reinterpreting history, ensuring that the voices of the past continue to resonate with contemporary audiences.",
      image: "https://myaifafinalists.s3.us-east-2.amazonaws.com/AIFA+2025+Film+Stills/STILL+Thiaroye+44.png"
    },
    {
      title: "FOSSiLS",
      filmmaker: "Roxanne Ducharme",
      year: "2024",
      description: "FOSSiLS is a poetic exploration of humanity's impermanence and the traces we leave behind. In films and books, our species never fades away. We love to believe we're immortal that way! Yet millennia conquer all in time's endless chase. What if we're but dinosaurs, awaiting our fate? When the elements have burned all our ships, and the grandest works of nations are swept away, it is foretold that the Earth will breathe once more. And one distant day, in the deep abyss below, faint hearts will begin to beat again. But somewhere, somehow, there will remain traces of us— lingering whispers of who we were.",
      image: "https://myaifafinalists.s3.us-east-2.amazonaws.com/AIFA+2025+Film+Stills/STILL+FOSSiLS.png"
    },
    {
      title: "Remembering",
      filmmaker: "Diego Maclean",
      year: "2024",
      description: "Reflections on the nature of memory.",
      image: "/images/placeholder12.jpg"
    },
    {
      title: "The Future Can Be Yours",
      filmmaker: "Simon Ball",
      year: "2024",
      description: "A man and a woman fall into an imaginary prison.",
      image: "https://myaifafinalists.s3.us-east-2.amazonaws.com/AIFA+2025+Film+Stills/STILL+Future+Can+Be+Yours.jpg"
    },
    {
      title: "Do Bangladroids Dream of Electric Tagore?",
      filmmaker: "Aleem Hossain",
      year: "2024",
      description: "In this Desi-Futurist short film, a documentarian sneaks into the New Jersey exclusion zone to explore what the abandoned Bangladroids recall of their homeland.",
      image: "/images/placeholder14.jpg"
    }
  ];

  return (
    <div className="awards-page">
      <Head>
        <title>AIFA Awards 2025 Finalists | World's #1 Global Film Awards for AI Innovation</title>
        <meta name="description" content="Discover the finalists for AIFA Awards 2025 - The world's premier film awards celebrating groundbreaking AI innovation in filmmaking, showcasing the most innovative AI-generated films from around the world." />
        <meta name="keywords" content="AIFA Awards 2025, AI film finalists, AI filmmaking, film innovation, AI-generated films, digital art, future of cinema" />
        <meta property="og:title" content="AIFA Awards 2025 Finalists | World's #1 Global Film Awards for AI Innovation" />
        <meta property="og:description" content="Discover the 14 groundbreaking AI-generated films selected as finalists for the AIFA Awards 2025, pushing the boundaries of storytelling, innovation, and visual artistry." />
        <meta property="og:image" content="/images/jury2025/placeholder-finalist1.jpg" />
        <meta property="og:url" content="https://aifilm.academy/awards/2025/finalists" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aifaventures" />
        <link rel="canonical" href="https://aifilm.academy/awards/2025/finalists" />
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
          <h1 className="awards-hero-title">AIFA Awards 2025 Finalists</h1>
          <p className="awards-hero-subtitle">Celebrating the future of filmmaking</p>
          <p className="awards-hero-partner">Film extract by <a href="https://www.sheldrick.ai/" target="_blank" rel="noopener noreferrer" style={{ color: '#a3a3a3' }}>David Sheldrick</a></p>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="awards-about">
        <div className="about-container">
          <h2 className="about-title">The Finalists</h2>
          <p className="about-description">
            We are proud to present the 14 groundbreaking films selected as finalists for the AIFA Awards 2025. 
            These innovative works push the boundaries of AI-generated filmmaking, showcasing extraordinary 
            creativity, technical innovation, and powerful storytelling.
          </p>
          <div className="about-divider"></div>
          <p className="about-instruction">
            All films are displayed with full details below
          </p>
        </div>
      </section>

      {/* FINALISTS GALLERY */}
      <section className="awards-gallery">
        <div className="gallery-grid">
          {finalists.map((film, index) => (
            <div className="gallery-item" key={index}>
              <div className="gallery-image">
                <img src={film.image} alt={`${film.title} by ${film.filmmaker} - AIFA Awards 2025 Finalist`} />
              </div>
              <div className="gallery-info">
                <h3>{film.title}</h3>
                <p className="gallery-filmmaker">{film.filmmaker}, {film.year}</p>
                <div className="gallery-description-container">
                  <p className="gallery-description-full">
                    {film.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="awards-partners">
        <div className="partners-container">
          <h2 className="partners-title">Our Partners</h2>
          
          <div className="moving-brands">
            <div className="brand-row">
              {["SOTHEBY'S INSTITUTE OF ART", "NFC", "GALXE", "DRESSX", "BRIGHTMOMENTS", 
                "REKT", "ZORA", "SUPERRARE", "AIMAGINE", "MUSE FRAME", "HUG", "DECRYPT", 
                "INTERCELLAR", "RED-EYE", "RUG RADIO", "[S]EDITION", "OBJECT SUBJECT FORM", 
                "NON-FUN GERBILS", "DIG-IN", "WEB3SENSE", "CASA NUA", "ASVOF", "L'OFFICIEL", 
                "FIZZY MAG"].map((brand, idx) => (
                <div key={idx} className="brand-name">
                  {brand}
                </div>
              ))}
              {["SOTHEBY'S INSTITUTE OF ART", "NFC", "GALXE", "DRESSX", "BRIGHTMOMENTS", 
                "REKT", "ZORA", "SUPERRARE", "AIMAGINE", "MUSE FRAME", "HUG", "DECRYPT", 
                "INTERCELLAR", "RED-EYE", "RUG RADIO", "[S]EDITION", "OBJECT SUBJECT FORM", 
                "NON-FUN GERBILS", "DIG-IN", "WEB3SENSE", "CASA NUA", "ASVOF", "L'OFFICIEL", 
                "FIZZY MAG"].map((brand, idx) => (
                <div key={`dup-${idx}`} className="brand-name">
                  {brand}
                </div>
              ))}
            </div>
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