"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "./social-maps-forever.css";

export default function SocialMapsForever() {
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

  const socialPosts = [
    {
      date: "May 28",
      posts: [
        {
          type: "Thread Start",
          content: "🎥 AIFA AWARDS 2025 JURY\nWe're honored to work with these remarkable individuals\n\nEach jury member brings a wealth of expertise in fashion, film, art, and AI",
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
          content: "🎥 AIFA AWARDS 2025 JURY\nWe couldn't be prouder to have them on board\n\nJoin us on June 3 at NFC Lisbon to find out who they've selected!",
          isThreadStart: false,
          isThreadEnd: true
        }
      ]
    },
    {
      date: "May 29",
      posts: [
        {
          type: "Standard Post",
          content: "🎥 Featured Artist – David Sheldrick\nWe're shining a light on his bold fusion of AI-driven imagery, nature, and fashion\n\nHis award-winning approach truly exemplifies the spirit of AIFA 2025",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "May 30",
      posts: [
        {
          type: "Standard Post",
          content: "🎥 AIFA PARTNERS 2025\nWe're thrilled to collaborate with Sedition, Muse Frame, and NOPRBLM this year\n\nDiscussions with Anthropic and Klana are underway—stay tuned",
          isThreadStart: false,
          isThreadEnd: false
        }
      ]
    },
    {
      date: "May 31",
      posts: [
        {
          type: "Standard Post",
          content: "🎥 Countdown to June 3\nOnly a few days left until we reveal our winners at NFC Lisbon\n\nWe can't wait to share these visionary AI-driven films with you",
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
          type: "Morning Post",
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
          type: "Long-Form Article",
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
          type: "Long-Form Article",
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
          type: "Long-Form Article",
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
          type: "Long-Form Article",
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
          content: "🎥 AIFA x Sotheby's – A Summer of Learning\nIt's been an incredible (and educational) few weeks collaborating with Sotheby's and our many partners",
          isThreadStart: true,
          isThreadEnd: false
        },
        {
          type: "Thread",
          content: "As the AIFA summer season comes to a close, we want to thank our artists, jurors, sponsors, and the venues who kindly hosted us",
          isThreadStart: false,
          isThreadEnd: false
        },
        {
          type: "Thread End",
          content: "And a huge thank you to you, our global community, for joining us on this journey from Lisbon to London and beyond\n\nStay tuned for what's next in the AIFA world!",
          isThreadStart: false,
          isThreadEnd: true
        }
      ]
    },
    {
      date: "Late July (Optional/Adjust Date)",
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
        <title>AIFA Social Media Content Calendar | AI Film Academy</title>
        <meta name="description" content="AIFA's social media content calendar for promoting the 2025 Awards and events" />
        <meta name="robots" content="noindex,nofollow" />
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
      <section className="social-hero">
        <div className="social-hero-content">
          <h1 className="social-hero-title">Social Media Calendar</h1>
          <p className="social-hero-subtitle">AIFA Awards 2025 Campaign</p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="social-content">
        <h2 className="content-title fade-in">Content Calendar</h2>
        <p className="content-description fade-in">
          This calendar outlines our social media strategy for the AIFA Awards 2025 campaign.
          Each post includes space for an Instagram-sized image, and content will be adapted 
          for various platforms including Twitter, Instagram, and LinkedIn.
        </p>

        <div className="social-posts">
          {socialPosts.map((dateSection, dateIndex) => (
            <div className="date-section fade-in" key={dateIndex}>
              <h3 className="date-heading">{dateSection.date}</h3>
              <div className="post-grid">
                {dateSection.posts.map((post, postIndex) => {
                  const isThread = post.type.includes("Thread");
                  const isLongForm = post.type.includes("Long-Form");
                  
                  return (
                    <div 
                      className={`post-item ${isThread ? 'thread-post' : ''} ${isLongForm ? 'long-form-post' : ''} ${post.isThreadStart ? 'thread-start' : ''} ${post.isThreadEnd ? 'thread-end' : ''}`}
                      key={postIndex}
                    >
                      {isThread && <div className="thread-indicator"></div>}
                      <div className="post-image-box">
                        <span>[Instagram-sized image placeholder]</span>
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
                href="https://www.instagram.com/aifilm.academy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://x.com/aifilmacademy"
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

      <div style={{ textAlign: "center", padding: "20px 0", borderTop: "1px solid var(--medium-grey)" }}>
        <p style={{ fontSize: "14px", color: "var(--dark-grey)" }}>© 2025 AIFA Ventures. All rights reserved</p>
      </div>
    </div>
  );
}