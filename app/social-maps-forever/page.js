"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "./social-maps-forever.css";
import AIFAImage from "../components/AIFAImage";
import Image from "next/image";

// Special component just for the Innovate UK image to ensure it loads correctly
function InnovateUKImage() {
  const [imageSrc, setImageSrc] = useState('/images/support/innovateuk.jpg');
  
  // Update the image src with the correct domain once the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setImageSrc(`${window.location.origin}/images/support/innovateuk.jpg`);
    }
  }, []);
  
  // Handle image loading errors
  const handleError = () => {
    // Try aifilmacademy.io as a fallback
    setImageSrc('https://aifilmacademy.io/images/support/innovateuk.jpg');
  };
  
  return (
    <img 
      src={imageSrc}
      alt="Innovate UK" 
      style={{ height: "20px", width: "auto" }}
      onError={handleError}
    />
  );
}

export default function SocialMapsForever() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Password verification
  const checkPassword = () => {
    // Simple password protection - in a real app, this should be more secure
    if (password === 'aifasocial2025') {
      setIsAuthenticated(true);
      setErrorMessage('');
      localStorage.setItem('aifsSecretAccess', 'true');
    } else {
      setErrorMessage('Incorrect password. Please try again.');
    }
  };

  // Check for authentication on page load
  useEffect(() => {
    if (localStorage.getItem('aifsSecretAccess') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

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
    if (!isAuthenticated) return;
    
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
  }, [isAuthenticated]);

  const socialPosts = [
    {
      date: "May 28",
      posts: [
        {
          type: "Announcement Post",
          content: "🎥 AIFA AWARDS 2025, It's Almost Time!\n\nWe are delighted to announce our second edition of AIFA Awards 2025.\n\nThis year, we're presenting The Award of Awards, shining a spotlight on the very best in AI-driven film.\n\nWinners will be revealed on June 3 at NFC Lisbon, with some surprises in store.\n\nThe official awards ceremony will follow at a private event in London on July 22—more soon!",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "May 31",
      posts: [
        {
          type: "Thread Start",
          content: "🎥 AIFA AWARDS 2025 JURY\n\n⟡ We're honored to work with these remarkable individuals.\n⟡ Each jury member brings a wealth of expertise in fashion, film, art, and AI. ↴",
          isThreadStart: true,
          isThreadEnd: false
        },
        {
          type: "Thread",
          content: "Diane Pernet\nA visionary fashion critic and filmmaker, based in Paris\n\nShe pioneered the world's first fashion film festival, elevating the genre globally",
          isThreadStart: false,
          isThreadEnd: false
        },
        {
          type: "Thread",
          content: "David Sheldrick\nA British-Korean artist merging AI pipelines with experimental fine art\n\nHis collections often sell out, reflecting his innovative approach to technology and nature",
          isThreadStart: false,
          isThreadEnd: false
        },
        {
          type: "Thread",
          content: "Ethereal Moon\nA dynamic duo from NY and France, forging surreal yet accessible film narratives\n\nTheir work is steeped in raw emotion and cutting-edge AI techniques",
          isThreadStart: false,
          isThreadEnd: false
        },
        {
          type: "Thread",
          content: "Roy Joseph Butler\nDirector of LOCO London Comedy Film Festival, passionate about community engagement\n\nCEO of Packed Lunch, specializing in animation and fine art",
          isThreadStart: false,
          isThreadEnd: false
        },
        {
          type: "Thread",
          content: "Clare Maguire\nTechWomen 100 awardee, founder, and angel investor\n\nA seasoned leader in tech, marketing, social media, and AI",
          isThreadStart: false,
          isThreadEnd: false
        },
        {
          type: "Thread",
          content: "GLITCHOFMIND (Leonel Pichardo)\nMultidisciplinary artist blending identity, technology, and editorial storytelling\n\nFounder of INTERLÔR Atelier, with work featured in Vogue and Forbes",
          isThreadStart: false,
          isThreadEnd: false
        },
        {
          type: "Thread",
          content: "Pinny Grylls\nGroundbreaking filmmaker, weaving humor and technology into human stories\n\nKnown for SXSW Feature Doc Winner Grand Theft Hamlet",
          isThreadStart: false,
          isThreadEnd: false
        },
        {
          type: "Thread",
          content: "Leo Crane\nProducer, founder, and educator with 25 years in creative industries\n\nBoard member for Animate Projects, co-founder of AIFA Ventures",
          isThreadStart: false,
          isThreadEnd: false
        },
        {
          type: "Thread",
          content: "Pedro Guez\nCurator of the AI-Generated Film category at ASVOFF in Paris\n\nBringing deep knowledge of digital innovation and creative direction",
          isThreadStart: false,
          isThreadEnd: false
        },
        {
          type: "Thread",
          content: "Dyl Blaquiere\nFounder and CEO crossing the worlds of art, technology, and culture\n\nLeading Sedition, reimagining how digital art is experienced",
          isThreadStart: false,
          isThreadEnd: false
        },
        {
          type: "Thread End",
          content: "🎥 AIFA AWARDS 2025 JURY\n\n⟡ We couldn't be prouder to have them on board.\n⟡ Join us on June 3 at NFC Lisbon to find out who they've selected!",
          isThreadStart: false,
          isThreadEnd: true
        }
      ]
    },
    {
      date: "May 31",
      posts: [
        {
          type: "Featured Artist Post",
          content: "🎥 Featured Artist – David Sheldrick\n\n⟡ We're shining a light on his bold fusion of AI-driven imagery, nature, and fashion.\n⟡ His award-winning approach truly exemplifies the spirit of AIFA 2025.",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "June 1",
      posts: [
        {
          type: "Partners Post",
          content: "🎥 AIFA PARTNERS 2025\n\nWe're thrilled to collaborate with Sedition, Muse Frame, and NOPRBLM this year to the AIFA Awards Supported by Innovate UK",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "June 1",
      posts: [
        {
          type: "Press Post",
          content: "🎥 AIFA IN THE PRESS\n\n⟡ Co-Founder of AIFA Ventures Leo Crane discusses AI and creativity, read more below ↴",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "June 1",
      posts: [
        {
          type: "Standard Post",
          content: "🎥 Countdown to June 3\n\nOnly a few days left until we reveal our winners at NFC Lisbon\n\nWe can't wait to share these visionary AI-driven films with you",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "June 1",
      posts: [
        {
          type: "Standard Post",
          content: "🎥 Final Jury Deliberations\nOur jury is working around the clock to finalize the selections\n\nEvery film we received pushes the boundaries of AI in extraordinary ways",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "June 2",
      posts: [
        {
          type: "Standard Post",
          content: "🎥 Anticipation in Lisbon\nWe arrive at NFC tomorrow, ready to celebrate AIFA's second edition\n\nLook out for a major announcement about a new cash prize open call for AI filmmakers",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "June 3",
      posts: [
        {
          type: "Winners Post",
          content: "🎥 AIFA AWARDS 2025 WINNERS\nWe're overjoyed to announce this year's honorees at NFC Lisbon\n\nEach winner embodies the future of AI in film, and we congratulate them all",
          isThreadStart: false,
          isThreadEnd: false
        },
        {
          type: "Cash Prize Announcement",
          content: "🎥 AIFA OPEN CALL\nWe're introducing a new cash prize for emerging AI filmmakers\n\nSubmissions are now open; the winner will be honored at our private event in London on July 22\n\nWe invite everyone to help shape the next wave of creative technology",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "June 4",
      posts: [
        {
          type: "Standard Post",
          content: "🎥 Post-Lisbon Highlights\nCouldn't make it to NFC Lisbon? We'll be sharing glimpses of our winning projects and behind-the-scenes moments over the coming days",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "June 5",
      posts: [
        {
          type: "AIFA Journal",
          content: "🎥 AIFA Journey #1 – \"In the Studio with AI\"\nPart one of our four-part article series exploring how AI reshapes cinematic storytelling\n\nExcerpt: \"By harnessing machine learning to accelerate visual brainstorming, we're seeing a new dawn in the creative process—one that balances tradition with technological innovation.\"\n\nRead the full article at [link].",
          isThreadStart: false,
          isThreadEnd: false,
          hasLink: true
        }
      ]
    },
    {
      date: "June 6",
      posts: [
        {
          type: "Standard Post",
          content: "🎥 Open Call Reminder\nIf you're pushing boundaries with AI-driven film, we want to hear from you\n\nThe new cash prize awaits one visionary creator—details at [link]",
          isThreadStart: false,
          isThreadEnd: false,
          hasLink: true
        }
      ]
    },
    {
      date: "June 9",
      posts: [
        {
          type: "Standard Post",
          content: "🎥 Gratitude to the Jury\nOur heartfelt thanks to the incredible panel who helped select the AIFA 2025 winners\n\nTheir expertise and dedication continue to guide our mission",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "June 12",
      posts: [
        {
          type: "Standard Post",
          content: "🎥 AIFA x Sotheby's Institute\nOn July 17, we kick off our awards season celebrations with Sotheby's Institute\n\nWe'll be exploring the intersection of art, tech, and entrepreneurship",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "June 15",
      posts: [
        {
          type: "Standard Post",
          content: "🎥 AIFA x WIRED Magazine\nAlso launching on July 17, our partnership with WIRED Summer Labs\n\nWe're excited to discuss the future of AI-driven film and its impact on creative industries",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "June 16",
      posts: [
        {
          type: "AIFA Journal",
          content: "🎥 AIFA Journey #2 – \"Elevating Creative Vision Through AI\"\nPart two of our AIFA Journey series: how AI augments human ingenuity\n\nExcerpt: \"AI isn't just a tool—it's an extension of our imagination, allowing us to conceptualize story worlds that once lived only in our minds.\"\n\nClick [link] for the full article.",
          isThreadStart: false,
          isThreadEnd: false,
          hasLink: true
        }
      ]
    },
    {
      date: "June 20",
      posts: [
        {
          type: "Standard Post",
          content: "🎥 Open Call Check-In\nWe've received incredible submissions from all over the globe\n\nIf you're still on the fence, there's time—this prize could be a game-changer",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "June 25",
      posts: [
        {
          type: "Standard Post",
          content: "🎥 Spotlight on Sponsors\nHuge thanks to Sedition, Muse Frame, and NOPRBLM for championing groundbreaking AI\n\nWe look forward to unveiling more at our London event on July 22",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "July 1",
      posts: [
        {
          type: "Standard Post",
          content: "🎥 One Month of AIFA 2025\nIt's been a month since our winners were revealed at NFC Lisbon\n\nWe're now gearing up for the official ceremony in London on July 22—excitement is building",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "July 4",
      posts: [
        {
          type: "AIFA Journal",
          content: "🎥 AIFA Journey #3 – \"Collaboration & Co-Creation\"\nPart three of our AIFA Journey series: how AI and human creators collaborate in real time\n\nExcerpt: \"It's one thing to design a character with an algorithm, but it's another to watch that algorithm respond—almost like a creative partner—through each stage of production.\"\n\nRead more at [link].",
          isThreadStart: false,
          isThreadEnd: false,
          hasLink: true
        }
      ]
    },
    {
      date: "July 5",
      posts: [
        {
          type: "Standard Post",
          content: "🎥 AIFA Summer Series\nMark your calendar for July 17, when we team up with Sotheby's Institute & WIRED\n\nDiscussions, panels, and more leading up to our big night on July 22",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "July 10",
      posts: [
        {
          type: "Standard Post",
          content: "🎥 Countdown to London\nWe're putting the finishing touches on our private invite-only event\n\nStay tuned for sneak peeks from the artists, sponsors, and jury members who'll be joining us",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "July 17",
      posts: [
        {
          type: "Standard Post",
          content: "🎥 AIFA x Sotheby's & WIRED\nToday begins our Summer Labs partnership with Sotheby's Institute and WIRED Magazine\n\nWe can't wait to share new insights on AI, film, and the evolution of creativity",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "July 20",
      posts: [
        {
          type: "Standard Post",
          content: "🎥 Final Preparations\nJust two days until our private awards ceremony in London on July 22\n\nWe're excited to host our winners, partners, and the open call finalists",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "July 22",
      posts: [
        {
          type: "Morning Post",
          content: "🎥 AIFA AWARDS 2025 – LONDON\nThe day has arrived for our official ceremony, celebrating excellence in AI film\n\nWe'll also reveal the open call winner, chosen from an incredible pool of submissions",
          isThreadStart: false,
          isThreadEnd: false
        },
        {
          type: "Evening Recap",
          content: "🎥 AIFA AWARDS 2025 RECAP\nTonight, we honored groundbreaking AI filmmakers and welcomed new voices from our open call\n\nThank you for joining us in shaping the future of film—here's to another remarkable year!",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "July 23",
      posts: [
        {
          type: "AIFA Journal",
          content: "🎥 AIFA Journey #4 – \"Looking Ahead: The Future of AI in Cinema\"\nThe final installment of our AIFA Journey series, offering a forward-looking perspective\n\nExcerpt: \"We stand at the threshold of a new cinematic era—where data-driven creation and human emotion merge to redefine storytelling.\"\n\nRead more at [link].",
          isThreadStart: false,
          isThreadEnd: false,
          hasLink: true
        }
      ]
    },
    {
      date: "July 31",
      posts: [
        {
          type: "Thread Start",
          content: "🎥 AIFA x Sotheby's – A Summer of Learning\n⟡ It's been an incredible (and educational) few weeks collaborating with Sotheby's and our many partners.",
          isThreadStart: true,
          isThreadEnd: false
        },
        {
          type: "Thread",
          content: "🎥 AIFA 2025\n⟡ As the AIFA summer season comes to a close, we want to thank our artists, jurors, sponsors, and the venues who kindly hosted us.",
          isThreadStart: false,
          isThreadEnd: false
        },
        {
          type: "Thread End",
          content: "🎥 AIFA 2025\n⟡ And a huge thank you to you, our global community, for joining us on this journey from Lisbon to London and beyond.\n\nStay tuned for what's next with AIFA Ventures ↴\nwww.aifaventures.io",
          isThreadStart: false,
          isThreadEnd: true
        }
      ]
    },
    {
      date: "August 5",
      posts: [
        {
          type: "Standard Post",
          content: "🎥 Reflecting on AIFA 2025\nFrom Lisbon to London, this journey has showcased how AI transforms storytelling\n\nThank you to every artist, partner, juror, and audience member for being part of AIFA",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    }
  ];

  return (
    <div className="social-page">
      <Head>
        <title>AIFA Internal Document | Not Public</title>
        <meta name="description" content="Internal planning document - not for public viewing" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
        <meta name="bingbot" content="noindex,nofollow" />
        <meta name="yandex" content="none" />
        <meta name="baidu" content="noindex,nofollow" />
        <meta name="googlebot-news" content="noindex,nofollow" />
        <meta name="googlebot-image" content="noindex,nofollow" />
        <meta name="googlebot-video" content="noindex,nofollow" />
        <meta name="slurp" content="noindex,nofollow" />
        <meta name="search-engine-index" content="0" />
        <meta httpEquiv="X-Robots-Tag" content="noindex, nofollow" />
        <link rel="canonical" href="https://aifilm.academy" />
      </Head>
      
      {!isAuthenticated ? (
        <div className="login-container">
          <div className="login-box">
            <AIFAImage
              src="/images/AIFAlogo.png"
              alt="AI Film Academy (AIFA) Logo"
              className="login-logo"
            />
            <h1>AIFA Private Content</h1>
            <p>This page contains private planning information for AIFA team members only.</p>
            <div className="login-form">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="login-input"
                onKeyDown={(e) => e.key === 'Enter' && checkPassword()}
              />
              <button onClick={checkPassword} className="login-button">Access Content</button>
              {errorMessage && <p className="login-error">{errorMessage}</p>}
            </div>
          </div>
        </div>
      ) : (
        <>

      {/* HEADER */}
      <header className={`header ${headerScrolled ? "scrolled" : ""}`}>
        <Link href="/" className="logo">
          <AIFAImage
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
      <section className="social-hero">
        <div className="social-hero-content">
          <h1 className="social-hero-title">Social Media Calendar</h1>
          <p className="social-hero-subtitle">AIFA Awards 2025 Campaign</p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="social-content">

        <div className="social-posts">
          {socialPosts.map((dateSection, dateIndex) => (
            <div className="date-section fade-in" key={dateIndex}>
              <h3 className="date-heading">{dateSection.date}</h3>
              <div className="post-grid">
                {dateSection.posts.map((post, postIndex) => {
                  const isThread = post.type.includes("Thread");
                  const isLongForm = post.type.includes("Long-Form") || post.type === "AIFA Journal" || post.type === "Long-Form Article";
                  
                  return (
                    <div 
                      className={`post-item ${isThread ? 'thread-post' : ''} ${isLongForm ? 'long-form-post' : ''} ${post.isThreadStart ? 'thread-start' : ''} ${post.isThreadEnd ? 'thread-end' : ''}`}
                      key={postIndex}
                    >
                      {isThread && <div className="thread-indicator"></div>}
                      <div className="post-image-box">
                        {/* Type-based images */}
                        {post.type === "Announcement Post" && (
                          <>
                            <AIFAImage src="/images/social/AIFA1.png" alt="AIFA Awards 2025" style={{ filter: 'none' }} />
                            <div className="announcement-overlay">
                              <div className="announcement-title">AIFA AWARDS 2025</div>
                              <div className="announcement-subtitle">London | Lisbon | Global</div>
                              <div className="announcement-details">
                                The Award of Awards returns
                              </div>
                            </div>
                          </>
                        )}
                        {(post.type === "Featured Artist Post" || (post.type === "Standard Post" && post.content.includes("Featured Artist"))) && (
                          <>
                            <AIFAImage src="/images/social/Sheldrick_feature.png" alt="David Sheldrick" style={{ filter: 'none' }} />
                            <div className="featured-artist-overlay">
                              <div className="featured-title">AIFA Awards 2025</div>
                              <div className="featured-title">Featured Artist</div>
                              <div className="featured-name">David Sheldrick</div>
                            </div>
                          </>
                        )}
                        {(post.type === "Partners Post" || (post.type === "Standard Post" && post.content.includes("AIFA PARTNERS 2025"))) && (
                          <div className="partners-box">
                            <div className="partners-title">AIFA AWARDS 2025 Partners</div>
                            <div className="partners-text">Sedition | Muse Frame | NOPRBLM</div>
                          </div>
                        )}
                        {(post.type === "Winners Post" || (post.type === "Morning Post" && post.content.includes("WINNERS"))) && (
                          <div className="winners-heading-box">
                            <div className="winners-heading-text">AIFA AWARD<br/>WINNERS 2025</div>
                          </div>
                        )}
                        {(post.type === "AIFA Journal" || post.type === "Long-Form Article") && (
                          <div className="journal-box">
                            <div className="journal-text">AIFA<br/>JOURNAL</div>
                          </div>
                        )}
                        {post.type === "Cash Prize Announcement" && (
                          <div className="open-call-box">
                            <div className="open-call-text">AIFA<br/>OPEN CALL</div>
                          </div>
                        )}
                        {post.type === "Thread" && post.content.startsWith("Diane Pernet") && (
                          <>
                            <img src="/images/jury2025/diane_pernet.jpg" alt="Diane Pernet" />
                            <div className="jury-name-overlay">
                              <div className="title">AIFA Jury 2025</div>
                              <div className="name">Diane Pernet</div>
                              <div className="role">Fashion Film</div>
                            </div>
                          </>
                        )}
                        {post.type === "Thread" && post.content.startsWith("David Sheldrick") && (
                          <>
                            <img src="/images/jury2025/david_sheldrick.PNG" alt="David Sheldrick" />
                            <div className="jury-name-overlay">
                              <div className="title">AIFA Jury 2025</div>
                              <div className="name">David Sheldrick</div>
                              <div className="role">Artist</div>
                            </div>
                          </>
                        )}
                        {post.type === "Thread" && post.content.startsWith("Ethereal Moon") && (
                          <>
                            <img src="/images/jury2025/Ethereal_Moon.jpg" alt="Ethereal Moon" />
                            <div className="jury-name-overlay">
                              <div className="title">AIFA Jury 2025</div>
                              <div className="name">Ethereal Moon</div>
                              <div className="role">Artist</div>
                            </div>
                          </>
                        )}
                        {post.type === "Thread" && post.content.startsWith("Roy Joseph Butler") && (
                          <>
                            <img src="/images/jury2025/Roy_Joseph_Butler.jpg" alt="Roy Joseph Butler" />
                            <div className="jury-name-overlay">
                              <div className="title">AIFA Jury 2025</div>
                              <div className="name">Roy Joseph Butler</div>
                              <div className="role">LOCO Festival</div>
                            </div>
                          </>
                        )}
                        {post.type === "Thread" && post.content.startsWith("Clare Maguire") && (
                          <>
                            <img src="/images/jury2025/Clare_Maguire.jpg" alt="Clare Maguire" />
                            <div className="jury-name-overlay">
                              <div className="title">AIFA Jury 2025</div>
                              <div className="name">Clare Maguire</div>
                              <div className="role">NOPRBLM</div>
                            </div>
                          </>
                        )}
                        {post.type === "Thread" && post.content.startsWith("GLITCHOFMIND") && (
                          <>
                            <img src="/images/jury2025/glitch_of_mind.jpg" alt="GLITCHOFMIND" />
                            <div className="jury-name-overlay">
                              <div className="title">AIFA Jury 2025</div>
                              <div className="name">GLITCHOFMIND</div>
                              <div className="role">Artist</div>
                            </div>
                          </>
                        )}
                        {post.type === "Thread" && post.content.startsWith("Pinny Grylls") && (
                          <>
                            <img src="/images/jury2025/Pinny_Grylls.png" alt="Pinny Grylls" />
                            <div className="jury-name-overlay">
                              <div className="title">AIFA Jury 2025</div>
                              <div className="name">Pinny Grylls</div>
                              <div className="role">Filmmaker</div>
                            </div>
                          </>
                        )}
                        {post.type === "Thread" && post.content.startsWith("Leo Crane") && (
                          <>
                            <img src="/images/jury2025/leo_crane.jpg" alt="Leo Crane" />
                            <div className="jury-name-overlay">
                              <div className="title">AIFA Jury 2025</div>
                              <div className="name">Leo Crane</div>
                              <div className="role">Producer</div>
                            </div>
                          </>
                        )}
                        {post.type === "Thread" && post.content.startsWith("Pedro Guez") && (
                          <>
                            <img src="/images/jury2025/pedroguez_portrait.png" alt="Pedro Guez" />
                            <div className="jury-name-overlay">
                              <div className="title">AIFA Jury 2025</div>
                              <div className="name">Pedro Guez</div>
                              <div className="role">ASVOFF</div>
                            </div>
                          </>
                        )}
                        {post.type === "Thread" && post.content.startsWith("Dyl Blaquiere") && (
                          <>
                            <img src="/images/jury2025/Dyl.jpg" alt="Dyl Blaquiere" />
                            <div className="jury-name-overlay">
                              <div className="title">AIFA Jury 2025</div>
                              <div className="name">Dyl Blaquiere</div>
                              <div className="role">Sedition</div>
                            </div>
                          </>
                        )}
                        {post.isThreadStart && post.content.includes("AIFA AWARDS 2025 JURY") && (
                          <div className="jury-heading-box">
                            <div className="jury-heading-text">AIFA AWARDS<br/>JURY 2025</div>
                          </div>
                        )}
                        {post.isThreadEnd && post.content.includes("AIFA AWARDS 2025 JURY") && (
                          <div className="jury-heading-box">
                            <div className="jury-heading-text" style={{ fontSize: '1.2rem' }}>END OF<br />THREAD</div>
                          </div>
                        )}
                        
                        {/* Special components for Morning Post and Evening Recap */}
                        {post.type === "Morning Post" && post.content.includes("LONDON") && (
                          <div className="winners-heading-box">
                            <div className="winners-heading-text">AIFA AWARDS<br/>LONDON 2025</div>
                          </div>
                        )}
                        {post.type === "Evening Recap" && (
                          <div className="winners-heading-box">
                            <div className="winners-heading-text">AIFA AWARDS<br/>RECAP 2025</div>
                          </div>
                        )}
                        
                        {/* Handle generic thread posts */}
                        {post.type === "Thread Start" && !post.content.includes("AIFA AWARDS 2025 JURY") && (
                          <div className="date-background-box">
                            <div className="date-text">THREAD START</div>
                            <div className="aifa-label">AIFA 2025</div>
                          </div>
                        )}
                        {post.type === "Thread" && !(
                          post.content.startsWith("Diane Pernet") || 
                          post.content.startsWith("David Sheldrick") || 
                          post.content.startsWith("Ethereal Moon") ||
                          post.content.startsWith("Roy Joseph Butler") ||
                          post.content.startsWith("Clare Maguire") ||
                          post.content.startsWith("GLITCHOFMIND") ||
                          post.content.startsWith("Pinny Grylls") ||
                          post.content.startsWith("Leo Crane") ||
                          post.content.startsWith("Pedro Guez") ||
                          post.content.startsWith("Dyl Blaquiere")
                        ) && (
                          <div className="date-background-box">
                            <div className="date-text">THREAD</div>
                            <div className="aifa-label">AIFA 2025</div>
                          </div>
                        )}
                        {post.type === "Thread End" && !post.content.includes("AIFA AWARDS 2025 JURY") && (
                          <div className="date-background-box">
                            <div className="date-text">THREAD END</div>
                            <div className="aifa-label">AIFA 2025</div>
                          </div>
                        )}
                        
                        {post.type === "Press Post" && (
                          <div className="date-background-box" style={{ background: "#000" }}>
                            <div className="date-text">AIFA IN THE PRESS</div>
                            <div className="aifa-label">MEDIA COVERAGE</div>
                          </div>
                        )}
                        {post.type === "Morning Post" && !post.content.includes("LONDON") && !post.content.includes("WINNERS") && dateSection.date !== "July 22" && (
                          <div className="date-background-box">
                            <div className="date-text">MORNING POST</div>
                            <div className="aifa-label">AIFA 2025</div>
                          </div>
                        )}
                        {post.type === "Evening Recap" && (
                          <div className="date-background-box">
                            <div className="date-text">EVENING RECAP</div>
                            <div className="aifa-label">AIFA 2025</div>
                          </div>
                        )}
                        {/* Date-specific images */}
                        {post.type === "Standard Post" && 
                         !post.content.includes("Featured Artist") && 
                         !post.content.includes("AIFA PARTNERS 2025") && (
                          <>
                            {dateSection.date === "May 31" && (
                              <AIFAImage src="/images/social/may31.png" alt="May 31" style={{ filter: 'none' }} />
                            )}
                            {dateSection.date === "June 1" && (
                              <AIFAImage src="/images/social/june1.PNG" alt="June 1" style={{ filter: 'none' }} />
                            )}
                            {dateSection.date === "June 2" && (
                              <AIFAImage src="/images/social/june2.png" alt="June 2" style={{ filter: 'none' }} />
                            )}
                            {dateSection.date === "June 4" && (
                              <AIFAImage src="/images/social/june4.png" alt="June 4" style={{ filter: 'none' }} />
                            )}
                            {dateSection.date === "June 6" && (
                              <AIFAImage src="/images/social/june6.png" alt="June 6" style={{ filter: 'none' }} />
                            )}
                            {dateSection.date === "June 9" && (
                              <AIFAImage src="/images/social/june9.png" alt="June 9" style={{ filter: 'none' }} />
                            )}
                            {dateSection.date === "July 1" && (
                              <AIFAImage src="/images/social/july1.png" alt="July 1" style={{ filter: 'none' }} />
                            )}
                            {dateSection.date === "July 5" && (
                              <AIFAImage src="/images/social/july5.JPG" alt="July 5" style={{ filter: 'none' }} />
                            )}
                            {dateSection.date === "July 10" && (
                              <AIFAImage src="/images/social/july10.png" alt="July 10" style={{ filter: 'none' }} />
                            )}
                            {dateSection.date === "July 17" && (
                              <AIFAImage src="/images/social/july17.jpg" alt="July 17" style={{ filter: 'none' }} />
                            )}
                            {dateSection.date === "July 20" && (
                              <AIFAImage src="/images/social/july20.JPG" alt="July 20" style={{ filter: 'none' }} />
                            )}
                            {dateSection.date === "July 22" && (
                              <AIFAImage src="/images/social/july22.JPG" alt="July 22" style={{ filter: 'none' }} />
                            )}
                            
                            {/* Default black background with date text for dates without specific images */}
                            {!(dateSection.date === "May 31" || 
                               dateSection.date === "June 1" || 
                               dateSection.date === "June 2" || 
                               dateSection.date === "June 4" || 
                               dateSection.date === "June 6" || 
                               dateSection.date === "June 9" || 
                               dateSection.date === "July 1" || 
                               dateSection.date === "July 5" || 
                               dateSection.date === "July 10" || 
                               dateSection.date === "July 17" || 
                               dateSection.date === "July 20" || 
                               dateSection.date === "July 22") && (
                              <div className="date-background-box">
                                <div className="date-text">{dateSection.date}</div>
                                <div className="aifa-label">AIFA 2025</div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <div className="post-content">
                        <div>
                          <div className="post-type">{post.type}</div>
                          <div className="post-text">{post.content}</div>
                          {post.hasLink && (
                            <div className="post-links">
                              Links to be added for all content marked with [link]
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* EVENT INVITES SECTION - Updated June 23 2025 */}
      <section className="event-invites-section">
        <h2 className="event-invites-title fade-in">Event Invites</h2>
        <div className="event-invites-grid fade-in">
          {/* House of Lords Invite */}
          <div className="event-invite-item" style={{ backgroundImage: "url('/images/Tartan_Lords.png')", backgroundSize: "cover", position: "relative" }}>
            <div className="event-invite-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <h3 className="event-invite-name" style={{ fontWeight: '300', color: 'white', letterSpacing: '0.08em' }}>
                AIFA x House of Lords
              </h3>
              <div className="event-invite-details" style={{ background: 'rgba(0, 0, 0, 0.7)', width: '90%', margin: '0 auto 15px', padding: '15px', boxSizing: 'border-box' }}>
                <p className="event-invite-date" style={{ fontWeight: '300', margin: '0 0 5px 0' }}>July 22, 2025</p>
                <p className="event-invite-time" style={{ fontWeight: '300', margin: '0 0 5px 0' }}>8:30 - 10:00 AM</p>
                <p className="event-invite-location" style={{ fontWeight: '300', margin: '0 0 5px 0' }}>House of Lords, London</p>
                <p className="event-invite-desc" style={{ fontWeight: '300', margin: '0 0 10px 0' }}>AIFA Awards 2025 Morning Breakfast</p>
                <p className="event-invite-invitation" style={{ fontWeight: '300', border: '1px solid rgba(255, 255, 255, 0.7)', padding: '4px 12px', margin: '0', display: 'inline-block' }}>Invitation Only</p>
              </div>
            </div>
          </div>

          {/* Asprey Studio Invite */}
          <div className="event-invite-item" style={{ backgroundImage: "url('/images/Tartan_Lords.png')", backgroundSize: "cover", position: "relative" }}>
            <div className="event-invite-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px 10px', gap: '10px' }}>
                <img 
                  src="/images/AIFAlogo.png" 
                  alt="AIFA Logo" 
                  style={{ height: '25px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                />
                <div style={{ fontSize: '18px', color: 'white', margin: '0 5px' }}>×</div>
                <img 
                  src="/images/Asprey_Studio_logo.webp" 
                  alt="Asprey Studio Logo" 
                  style={{ height: '20px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                />
              </div>
              <div className="event-invite-details" style={{ background: 'rgba(0, 0, 0, 0.7)', width: '90%', margin: '0 auto 15px', padding: '15px', boxSizing: 'border-box' }}>
                <p className="event-invite-desc" style={{ 
                  fontWeight: '400', 
                  margin: '0 0 10px 0', 
                  textAlign: 'center', 
                  textTransform: 'uppercase', 
                  letterSpacing: '1px',
                  fontSize: '13px',
                  lineHeight: '1.2'
                }}>AIFA Awards 2025 Exhibition</p>
                
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto',
                  maxWidth: '200px',
                  borderTop: '1px solid rgba(255,255,255,0.2)',
                  padding: '8px 0 0'
                }}>
                  <p style={{ 
                    fontWeight: '300', 
                    margin: '0 0 4px 0', 
                    textAlign: 'center',
                    fontSize: '12px',
                    lineHeight: '1.2'
                  }}>July 22, 2025</p>
                  
                  <p style={{ 
                    fontWeight: '300', 
                    margin: '0 0 4px 0', 
                    textAlign: 'center',
                    fontSize: '12px',
                    lineHeight: '1.2'
                  }}>10:30 AM - 12:30 PM</p>
                  
                  <p style={{ 
                    fontWeight: '300', 
                    margin: '0 0 8px 0', 
                    textAlign: 'center',
                    fontSize: '12px',
                    lineHeight: '1.2'
                  }}>1st floor, 34-36 Bruton Street, London W1J 6QX</p>
                  
                  <p style={{ 
                    fontWeight: '300', 
                    margin: '0',
                    textAlign: 'center',
                    fontSize: '11px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    borderTop: '1px solid rgba(255,255,255,0.2)',
                    paddingTop: '8px'
                  }}>Invitation Only</p>
                </div>
              </div>
            </div>
          </div>

          {/* art'otel Invite */}
          <div className="event-invite-item" style={{ backgroundImage: "url('/images/tartan_hotel.png')", backgroundSize: "cover", position: "relative" }}>
            <div className="event-invite-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px 10px', gap: '10px' }}>
                <img 
                  src="/images/AIFAlogo.png" 
                  alt="AIFA Logo" 
                  style={{ height: '25px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                />
                <div style={{ fontSize: '18px', color: 'white', margin: '0 5px' }}>×</div>
                <img 
                  src="/images/arthotel_London Hoxton_White.png" 
                  alt="art'otel London Hoxton Logo" 
                  style={{ height: '18px', objectFit: 'contain' }}
                />
              </div>
              <div className="event-invite-details" style={{ background: 'rgba(0, 0, 0, 0.7)', width: '90%', margin: '0 auto 15px', padding: '15px', boxSizing: 'border-box' }}>
                <p className="event-invite-desc" style={{ 
                  fontWeight: '400', 
                  margin: '0 0 10px 0', 
                  textAlign: 'center', 
                  textTransform: 'uppercase', 
                  letterSpacing: '1px',
                  fontSize: '13px',
                  lineHeight: '1.2'
                }}>AIFA Awards 2025 Ceremony</p>
                
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto',
                  maxWidth: '200px',
                  borderTop: '1px solid rgba(255,255,255,0.2)',
                  padding: '8px 0 0'
                }}>
                  <p style={{ 
                    fontWeight: '300', 
                    margin: '0 0 4px 0', 
                    textAlign: 'center',
                    fontSize: '12px',
                    lineHeight: '1.2'
                  }}>July 19, 2025</p>
                  
                  <p style={{ 
                    fontWeight: '300', 
                    margin: '0 0 4px 0', 
                    textAlign: 'center',
                    fontSize: '12px',
                    lineHeight: '1.2'
                  }}>5:00 PM - 11:00 PM</p>
                  
                  <p style={{ 
                    fontWeight: '300', 
                    margin: '0 0 8px 0', 
                    textAlign: 'center',
                    fontSize: '12px',
                    lineHeight: '1.2'
                  }}>1-3 Rivington St, London EC2A 3DT</p>
                  
                  <p style={{ 
                    fontWeight: '300', 
                    margin: '0',
                    textAlign: 'center',
                    fontSize: '11px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    borderTop: '1px solid rgba(255,255,255,0.2)',
                    paddingTop: '8px'
                  }}>Invitation Only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ELEGANT INVITE SECTION */}
      <section className="elegant-invites-section" style={{ padding: '40px 20px', backgroundColor: 'black', marginTop: '20px' }}>
        <h2 className="section-title fade-in" style={{ color: 'white', textAlign: 'center', marginBottom: '30px', fontSize: '1.5rem', fontWeight: '300' }}>Elegant Invitation Designs</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          {/* Tartan Envelope */}
          <div style={{ width: '350px', marginBottom: '30px' }}>
            <div style={{ 
              width: '100%', 
              height: '200px', 
              backgroundColor: '#837563', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              position: 'relative',
              borderRadius: '2px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}>
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                backgroundImage: "url('/images/Tartan_Lords.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.5
              }}></div>
              <div style={{ zIndex: 2, textAlign: 'center' }}>
                <AIFAImage
                  src="/images/AIFAlogo.png"
                  alt="AIFA Logo"
                  style={{ 
                    filter: "brightness(0) invert(1)",
                    height: '50px',
                    width: 'auto',
                    marginBottom: '15px'
                  }}
                />
                <div style={{ 
                  color: 'white', 
                  fontSize: '18px', 
                  fontWeight: '300', 
                  letterSpacing: '2px',
                  textTransform: 'uppercase'
                }}>
                  JULY 2025
                </div>
              </div>
            </div>
            <p style={{ color: 'white', fontSize: '14px', textAlign: 'center', marginTop: '15px', fontWeight: '300' }}>
              Front envelope with tartan pattern and AIFA logo
            </p>
          </div>
          
          {/* Plain Color Envelope */}
          <div style={{ width: '350px', marginBottom: '30px' }}>
            <div style={{ 
              width: '100%', 
              height: '200px', 
              backgroundColor: '#3D5A80', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              position: 'relative',
              borderRadius: '2px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}>
              <div style={{ zIndex: 2, textAlign: 'center' }}>
                <div style={{ 
                  color: 'white', 
                  fontSize: '22px', 
                  fontWeight: '300', 
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  marginBottom: '10px'
                }}>
                  YOU'RE INVITED
                </div>
                <div style={{ 
                  width: '40px', 
                  height: '1px', 
                  backgroundColor: 'white', 
                  margin: '0 auto 10px' 
                }}></div>
                <div style={{ 
                  color: 'white', 
                  fontSize: '16px', 
                  fontWeight: '300', 
                  letterSpacing: '1px'
                }}>
                  AIFA AWARDS 2025
                </div>
              </div>
            </div>
            <p style={{ color: 'white', fontSize: '14px', textAlign: 'center', marginTop: '15px', fontWeight: '300' }}>
              Back envelope with "You're Invited" text
            </p>
          </div>
        </div>
      </section>

      {/* SOCIAL MEDIA POST TEMPLATES */}
      <section className="social-templates-section" style={{ padding: '40px 20px', backgroundColor: 'black', marginTop: '20px' }}>
        <h2 className="section-title fade-in" style={{ color: 'white', textAlign: 'center', marginBottom: '30px', fontSize: '1.5rem', fontWeight: '300' }}>Social Media Post Templates</h2>
        
        {/* Post Type: Jury Announcement */}
        <div style={{ maxWidth: '800px', margin: '0 auto 40px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '1.2rem', fontWeight: '300', marginBottom: '20px', letterSpacing: '1px' }}>AIFA Jury Thread Posts</h3>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
            {/* Diane Pernet Post Template */}
            <div style={{ width: '300px', backgroundColor: '#111', padding: '15px', borderRadius: '4px' }}>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden', marginBottom: '15px' }}>
                <img 
                  src="/images/jury2025/diane_pernet.jpg" 
                  alt="Diane Pernet" 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: 'grayscale(100%) brightness(0.9) contrast(1.1)'
                  }} 
                />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6))' }}></div>
                <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', fontSize: '18px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textTransform: 'uppercase' }}>
                  AIFA JURY<br />2025
                </div>
                <div style={{ position: 'absolute', bottom: '70px', right: '20px', color: 'white', fontSize: '24px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textAlign: 'right', textTransform: 'uppercase' }}>
                  DIANE<br />PERNET
                </div>
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white', fontSize: '12px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.5', textTransform: 'uppercase' }}>
                  FASHION FILM<br />PIONEER
                </div>
              </div>
              <div style={{ color: 'white', textAlign: 'left', padding: '0 5px' }}>
                <p style={{ fontSize: '14px', marginBottom: '10px', fontWeight: '400' }}>
                  Diane Pernet
                </p>
                <p style={{ fontSize: '14px', color: '#aaa', lineHeight: '1.4', fontWeight: '300' }}>
                  A visionary fashion critic and filmmaker, based in Paris<br/><br/>
                  She pioneered the world's first fashion film festival, elevating the genre globally
                </p>
              </div>
            </div>
            
            {/* David Sheldrick Post Template */}
            <div style={{ width: '300px', backgroundColor: '#111', padding: '15px', borderRadius: '4px' }}>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden', marginBottom: '15px' }}>
                <img 
                  src="/images/jury2025/david_sheldrick.PNG" 
                  alt="David Sheldrick" 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: 'grayscale(100%) brightness(0.9) contrast(1.1)'
                  }} 
                />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6))' }}></div>
                <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', fontSize: '18px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textTransform: 'uppercase' }}>
                  AIFA JURY<br />2025
                </div>
                <div style={{ position: 'absolute', bottom: '70px', right: '20px', color: 'white', fontSize: '24px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textAlign: 'right', textTransform: 'uppercase' }}>
                  DAVID<br />SHELDRICK
                </div>
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white', fontSize: '12px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.5', textTransform: 'uppercase' }}>
                  ARTIST
                </div>
              </div>
              <div style={{ color: 'white', textAlign: 'left', padding: '0 5px' }}>
                <p style={{ fontSize: '14px', marginBottom: '10px', fontWeight: '400' }}>
                  David Sheldrick
                </p>
                <p style={{ fontSize: '14px', color: '#aaa', lineHeight: '1.4', fontWeight: '300' }}>
                  A British-Korean artist merging AI pipelines with experimental fine art<br/><br/>
                  His collections often sell out, reflecting his innovative approach to technology and nature
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Artist Post */}
        <div style={{ maxWidth: '800px', margin: '40px auto', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '1.2rem', fontWeight: '300', marginBottom: '20px', letterSpacing: '1px' }}>Featured Artist Post</h3>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '350px', backgroundColor: '#111', padding: '15px', borderRadius: '4px' }}>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden', marginBottom: '15px' }}>
                <img 
                  src="/images/social/Sheldrick_feature.png" 
                  alt="David Sheldrick" 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover'
                  }} 
                />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6))' }}></div>
                <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', fontSize: '22px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textTransform: 'uppercase' }}>
                  AIFA AWARDS<br />2025
                </div>
                <div style={{ position: 'absolute', bottom: '70px', right: '20px', color: 'white', fontSize: '28px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textAlign: 'right', textTransform: 'uppercase' }}>
                  DAVID<br />SHELDRICK
                </div>
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white', fontSize: '14px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.5', textTransform: 'uppercase' }}>
                  FEATURED<br />ARTIST
                </div>
              </div>
              <div style={{ color: 'white', textAlign: 'left', padding: '0 5px' }}>
                <p style={{ fontSize: '14px', marginBottom: '10px', fontWeight: '400' }}>
                  🎥 Featured Artist – David Sheldrick
                </p>
                <p style={{ fontSize: '14px', color: '#aaa', lineHeight: '1.4', fontWeight: '300' }}>
                  ⟡ We're shining a light on his bold fusion of AI-driven imagery, nature, and fashion.<br/><br/>
                  ⟡ His award-winning approach truly exemplifies the spirit of AIFA 2025.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* All Jury Posts */}
        <div style={{ maxWidth: '800px', margin: '40px auto 20px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '1.2rem', fontWeight: '300', marginBottom: '20px', letterSpacing: '1px' }}>All Jury Post Templates</h3>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            {/* Ethereal Moon */}
            <div style={{ width: '250px', backgroundColor: '#111', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden', marginBottom: '15px' }}>
                <img 
                  src="/images/jury2025/Ethereal_Moon.jpg" 
                  alt="Ethereal Moon" 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: 'grayscale(100%) brightness(0.9) contrast(1.1)'
                  }} 
                />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6))' }}></div>
                <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', fontSize: '16px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textTransform: 'uppercase' }}>
                  AIFA JURY<br />2025
                </div>
                <div style={{ position: 'absolute', bottom: '70px', right: '20px', color: 'white', fontSize: '20px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textAlign: 'right', textTransform: 'uppercase' }}>
                  ETHEREAL<br />MOON
                </div>
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white', fontSize: '11px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.5', textTransform: 'uppercase' }}>
                  ARTIST
                </div>
              </div>
            </div>
            
            {/* Clare Maguire */}
            <div style={{ width: '250px', backgroundColor: '#111', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden', marginBottom: '15px' }}>
                <img 
                  src="/images/jury2025/Clare_Maguire.jpg" 
                  alt="Clare Maguire" 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: 'grayscale(100%) brightness(0.9) contrast(1.1)'
                  }} 
                />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6))' }}></div>
                <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', fontSize: '16px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textTransform: 'uppercase' }}>
                  AIFA JURY<br />2025
                </div>
                <div style={{ position: 'absolute', bottom: '70px', right: '20px', color: 'white', fontSize: '20px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textAlign: 'right', textTransform: 'uppercase' }}>
                  CLARE<br />MAGUIRE
                </div>
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white', fontSize: '11px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.5', textTransform: 'uppercase' }}>
                  NOPRBLM
                </div>
              </div>
            </div>
            
            {/* Leo Crane */}
            <div style={{ width: '250px', backgroundColor: '#111', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden', marginBottom: '15px' }}>
                <img 
                  src="/images/jury2025/leo_crane.jpg" 
                  alt="Leo Crane" 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: 'grayscale(100%) brightness(0.9) contrast(1.1)'
                  }} 
                />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6))' }}></div>
                <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', fontSize: '16px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textTransform: 'uppercase' }}>
                  AIFA JURY<br />2025
                </div>
                <div style={{ position: 'absolute', bottom: '70px', right: '20px', color: 'white', fontSize: '20px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textAlign: 'right', textTransform: 'uppercase' }}>
                  LEO<br />CRANE
                </div>
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white', fontSize: '11px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.5', textTransform: 'uppercase' }}>
                  PRODUCER
                </div>
              </div>
            </div>
            
            {/* Roy Joseph Butler */}
            <div style={{ width: '250px', backgroundColor: '#111', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden', marginBottom: '15px' }}>
                <img 
                  src="/images/jury2025/Roy_Joseph_Butler.jpg" 
                  alt="Roy Joseph Butler" 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: 'grayscale(100%) brightness(0.9) contrast(1.1)'
                  }} 
                />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6))' }}></div>
                <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', fontSize: '16px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textTransform: 'uppercase' }}>
                  AIFA JURY<br />2025
                </div>
                <div style={{ position: 'absolute', bottom: '70px', right: '20px', color: 'white', fontSize: '20px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textAlign: 'right', textTransform: 'uppercase' }}>
                  ROY JOSEPH<br />BUTLER
                </div>
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white', fontSize: '11px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.5', textTransform: 'uppercase' }}>
                  LOCO FESTIVAL
                </div>
              </div>
            </div>
            
            {/* GLITCHOFMIND */}
            <div style={{ width: '250px', backgroundColor: '#111', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden', marginBottom: '15px' }}>
                <img 
                  src="/images/jury2025/glitch_of_mind.jpg" 
                  alt="GLITCHOFMIND" 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: 'grayscale(100%) brightness(0.9) contrast(1.1)'
                  }} 
                />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6))' }}></div>
                <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', fontSize: '16px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textTransform: 'uppercase' }}>
                  AIFA JURY<br />2025
                </div>
                <div style={{ position: 'absolute', bottom: '70px', right: '20px', color: 'white', fontSize: '20px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textAlign: 'right', textTransform: 'uppercase' }}>
                  GLITCH<br />OF MIND
                </div>
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white', fontSize: '11px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.5', textTransform: 'uppercase' }}>
                  ARTIST
                </div>
              </div>
            </div>
            
            {/* Pinny Grylls */}
            <div style={{ width: '250px', backgroundColor: '#111', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden', marginBottom: '15px' }}>
                <img 
                  src="/images/jury2025/Pinny_Grylls.png" 
                  alt="Pinny Grylls" 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: 'grayscale(100%) brightness(0.9) contrast(1.1)'
                  }} 
                />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6))' }}></div>
                <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', fontSize: '16px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textTransform: 'uppercase' }}>
                  AIFA JURY<br />2025
                </div>
                <div style={{ position: 'absolute', bottom: '70px', right: '20px', color: 'white', fontSize: '20px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textAlign: 'right', textTransform: 'uppercase' }}>
                  PINNY<br />GRYLLS
                </div>
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white', fontSize: '11px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.5', textTransform: 'uppercase' }}>
                  FILMMAKER
                </div>
              </div>
            </div>
            
            {/* Pedro Guez */}
            <div style={{ width: '250px', backgroundColor: '#111', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden', marginBottom: '15px' }}>
                <img 
                  src="/images/jury2025/pedroguez_portrait.png" 
                  alt="Pedro Guez" 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: 'grayscale(100%) brightness(0.9) contrast(1.1)'
                  }} 
                />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6))' }}></div>
                <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', fontSize: '16px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textTransform: 'uppercase' }}>
                  AIFA JURY<br />2025
                </div>
                <div style={{ position: 'absolute', bottom: '70px', right: '20px', color: 'white', fontSize: '20px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textAlign: 'right', textTransform: 'uppercase' }}>
                  PEDRO<br />GUEZ
                </div>
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white', fontSize: '11px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.5', textTransform: 'uppercase' }}>
                  ASVOFF
                </div>
              </div>
            </div>
            
            {/* Dyl Blaquiere */}
            <div style={{ width: '250px', backgroundColor: '#111', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden', marginBottom: '15px' }}>
                <img 
                  src="/images/jury2025/Dyl.jpg" 
                  alt="Dyl Blaquiere" 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: 'grayscale(100%) brightness(0.9) contrast(1.1)'
                  }} 
                />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6))' }}></div>
                <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', fontSize: '16px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textTransform: 'uppercase' }}>
                  AIFA JURY<br />2025
                </div>
                <div style={{ position: 'absolute', bottom: '70px', right: '20px', color: 'white', fontSize: '20px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.2', textAlign: 'right', textTransform: 'uppercase' }}>
                  DYL<br />BLAQUIERE
                </div>
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white', fontSize: '11px', fontWeight: '300', letterSpacing: '1px', lineHeight: '1.5', textTransform: 'uppercase' }}>
                  SEDITION
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Thread Start and End */}
        <div style={{ maxWidth: '800px', margin: '30px auto', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '1.2rem', fontWeight: '300', marginBottom: '20px', letterSpacing: '1px' }}>Thread Start & End</h3>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
            {/* Thread Start */}
            <div style={{ width: '350px', backgroundColor: '#111', padding: '15px', borderRadius: '4px' }}>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden', marginBottom: '15px' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'black' }}></div>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '28px', fontWeight: '300', letterSpacing: '2px', lineHeight: '1.4', textTransform: 'uppercase', textAlign: 'center', width: '80%' }}>
                  AIFA AWARDS<br />JURY 2025
                </div>
              </div>
              <div style={{ color: 'white', textAlign: 'left', padding: '0 5px' }}>
                <p style={{ fontSize: '14px', marginBottom: '10px', fontWeight: '400' }}>
                  🎥 AIFA AWARDS 2025 JURY
                </p>
                <p style={{ fontSize: '14px', color: '#aaa', lineHeight: '1.4', fontWeight: '300' }}>
                  ⟡ We're honored to work with these remarkable individuals.<br/><br/>
                  ⟡ Each jury member brings a wealth of expertise in fashion, film, art, and AI. ↴
                </p>
              </div>
            </div>
            
            {/* Thread End */}
            <div style={{ width: '350px', backgroundColor: '#111', padding: '15px', borderRadius: '4px' }}>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden', marginBottom: '15px' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'black' }}></div>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '28px', fontWeight: '300', letterSpacing: '2px', lineHeight: '1.4', textTransform: 'uppercase', textAlign: 'center', width: '80%' }}>
                  END OF<br />THREAD
                </div>
              </div>
              <div style={{ color: 'white', textAlign: 'left', padding: '0 5px' }}>
                <p style={{ fontSize: '14px', marginBottom: '10px', fontWeight: '400' }}>
                  🎥 AIFA AWARDS 2025 JURY
                </p>
                <p style={{ fontSize: '14px', color: '#aaa', lineHeight: '1.4', fontWeight: '300' }}>
                  ⟡ We couldn't be prouder to have them on board.<br/><br/>
                  ⟡ Join us on June 3 at NFC Lisbon to find out who they've selected!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM FEED SECTION */}
      <section className="instagram-feed-section">
        <h2 className="instagram-feed-title fade-in">@aifa_ventures</h2>
        <div className="instagram-feed-grid fade-in">
          {/* Most recent posts at the top */}
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/july22.JPG" alt="July 31 Post" />
            <div className="instagram-feed-date">July 31</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/more1.jpg" alt="More content" style={{ filter: 'none' }} />
            <div className="instagram-feed-date">July 30</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/more2.jpg" alt="More content" style={{ filter: 'none' }} />
            <div className="instagram-feed-date">July 27</div>
          </div>
          <div className="instagram-feed-item">
            <div className="date-background-box">
              <div className="date-text">AIFA JOURNAL</div>
              <div className="aifa-label">JULY 23</div>
            </div>
            <div className="instagram-feed-date">July 23</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/july22.JPG" alt="July 22 Post" />
            <div className="instagram-feed-date">July 22</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/july20.JPG" alt="July 20 Post" />
            <div className="instagram-feed-date">July 20</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/july17.jpg" alt="July 17 Post" />
            <div className="instagram-feed-date">July 17</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/july10.png" alt="July 10 Post" />
            <div className="instagram-feed-date">July 10</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/july5.JPG" alt="July 5 Post" />
            <div className="instagram-feed-date">July 5</div>
          </div>
          <div className="instagram-feed-item">
            <div className="date-background-box">
              <div className="date-text">AIFA JOURNAL</div>
              <div className="aifa-label">JULY 4</div>
            </div>
            <div className="instagram-feed-date">July 4</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/more3.jpg" alt="More content" style={{ filter: 'none' }} />
            <div className="instagram-feed-date">July 3</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/july1.png" alt="July 1 Post" />
            <div className="instagram-feed-date">July 1</div>
          </div>
          <div className="instagram-feed-item">
            <div className="date-background-box sponsors-bg">
              <div className="date-text">SPONSORS</div>
              <div className="aifa-label">JUNE 25</div>
            </div>
            <div className="instagram-feed-date">June 25</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/more4.jpg" alt="More content" style={{ filter: 'none' }} />
            <div className="instagram-feed-date">June 22</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/more5.jpg" alt="More content" style={{ filter: 'none' }} />
            <div className="instagram-feed-date">June 21</div>
          </div>
          <div className="instagram-feed-item">
            <div className="date-background-box open-call-bg">
              <div className="date-text">OPEN CALL</div>
              <div className="aifa-label">JUNE 20</div>
            </div>
            <div className="instagram-feed-date">June 20</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/more6.jpg" alt="More content" style={{ filter: 'none' }} />
            <div className="instagram-feed-date">June 19</div>
          </div>
          <div className="instagram-feed-item">
            <div className="date-background-box">
              <div className="date-text">AIFA JOURNAL</div>
              <div className="aifa-label">JUNE 16</div>
            </div>
            <div className="instagram-feed-date">June 16</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/more7.jpg" alt="More content" style={{ filter: 'none' }} />
            <div className="instagram-feed-date">June 16</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/more8.jpg" alt="More content" style={{ filter: 'none' }} />
            <div className="instagram-feed-date">June 15</div>
          </div>
          <div className="instagram-feed-item">
            <div className="date-background-box wired-bg">
              <div className="date-text">WIRED</div>
              <div className="aifa-label">JUNE 15</div>
            </div>
            <div className="instagram-feed-date">June 15</div>
          </div>
          <div className="instagram-feed-item">
            <div className="date-background-box sothebys-bg">
              <div className="date-text">SOTHEBY'S</div>
              <div className="aifa-label">JUNE 12</div>
            </div>
            <div className="instagram-feed-date">June 12</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/more10.jpg" alt="More content" style={{ filter: 'none' }} />
            <div className="instagram-feed-date">June 10</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/june9.png" alt="June 9 Post" />
            <div className="instagram-feed-date">June 9</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/june6.png" alt="June 6 Post" />
            <div className="instagram-feed-date">June 6</div>
          </div>
          <div className="instagram-feed-item">
            <div className="date-background-box">
              <div className="date-text">AIFA JOURNAL</div>
              <div className="aifa-label">JUNE 5</div>
            </div>
            <div className="instagram-feed-date">June 5</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/more10.jpg" alt="More content" style={{ filter: 'none' }} />
            <div className="instagram-feed-date">June 4</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/june4.png" alt="June 4 Post" />
            <div className="instagram-feed-date">June 4</div>
          </div>
          <div className="instagram-feed-item">
            <div className="date-background-box winners-bg">
              <div className="date-text">WINNERS</div>
              <div className="aifa-label">JUNE 3</div>
            </div>
            <div className="instagram-feed-date">June 3</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/june2.png" alt="June 2 Post" />
            <div className="instagram-feed-date">June 2</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/more11.jpg" alt="More content" style={{ filter: 'none' }} />
            <div className="instagram-feed-date">June 2</div>
          </div>
          <div className="instagram-feed-item">
            <div className="date-background-box" style={{ background: "#000" }}>
              <div className="date-text">AIFA IN THE PRESS</div>
              <div className="aifa-label">JUNE 1</div>
            </div>
            <div className="instagram-feed-date">June 1</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/june1.PNG" alt="June 1 Post" />
            <div className="instagram-feed-date">June 1</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/more1.jpg" alt="More content" style={{ filter: 'none' }} />
            <div className="instagram-feed-date">May 31</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/may31.png" alt="May 31 Post" />
            <div className="instagram-feed-date">May 31</div>
          </div>
          <div className="instagram-feed-item">
            <div className="date-background-box partners-bg">
              <div className="date-text">PARTNERS</div>
              <div className="aifa-label">MAY 30</div>
            </div>
            <div className="instagram-feed-date">May 30</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/more2.jpg" alt="More content" style={{ filter: 'none' }} />
            <div className="instagram-feed-date">May 30</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/Sheldrick_feature.png" alt="David Sheldrick Feature" />
            <div className="instagram-feed-date">May 29</div>
          </div>
          <div className="instagram-feed-item">
            <img src="/images/jury2025/diane_pernet.jpg" alt="Diane Pernet" />
            <div className="instagram-feed-date">May 28</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/may271.png" alt="AIFA Awards Announcement 1" style={{ filter: 'none' }} />
            <div className="instagram-feed-date">May 27</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/AIFA1.png" alt="AIFA Awards Announcement" style={{ filter: 'none' }} />
            <div className="instagram-feed-date">May 27</div>
          </div>
          <div className="instagram-feed-item">
            <AIFAImage src="/images/social/may272.PNG" alt="AIFA Awards Announcement 2" style={{ filter: 'none' }} />
            <div className="instagram-feed-date">May 27</div>
          </div>
        </div>
        <p className="instagram-feed-text fade-in">
          Follow us <a href="https://www.instagram.com/aifilm.academy" target="_blank" rel="noopener noreferrer">@aifilm.academy</a> for the latest updates on AIFA Awards 2025 and join our community of AI-driven filmmakers.
        </p>
      </section>


      <div style={{ padding: "20px 0", borderTop: "1px solid var(--medium-grey)" }}>
        <div style={{ position: "absolute", left: "20px", display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: "var(--dark-grey)", marginRight: "8px" }}>Supported by</span>
          <InnovateUKImage />
        </div>
        <p style={{ fontSize: "14px", color: "var(--dark-grey)", margin: 0, textAlign: "center" }}>© 2025 AIFA Ventures. All rights reserved</p>
      </div>
        </>
      )}
    </div>
  );
}