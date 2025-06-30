"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "./events.css";

export default function Events() {
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

  // Upcoming Events data
  const upcomingEvents = [
    {
      id: 1,
      date: "17",
      month: "JUN",
      year: "2025",
      title: "AIFA Co-Founders Guest Lecture At Sotheby's Institute",
      time: "6:00 PM - 8:00 PM",
      location: "Sotheby's Institute",
      description: "Leo Crane will be hosting a Sotheby's Institute event as lecturer, with Clare Maguire guest lecturing to discuss entrepreneurship in creative industries and how technology plays a role.",
      tags: ["Private", "WIRED Summer Labs"]
    },
    {
      id: 2,
      date: "19",
      month: "JUL",
      year: "2025",
      title: "AIFA x art'otel London Hoxton",
      time: "7:00 PM - 10:00 PM",
      location: "art'otel London Hoxton, 1-3 Rivington St, London EC2A 3DT, UK",
      description: "AIFA Awards 2025 Ceremony - The main ceremony for the AIFA Awards 2025, celebrating excellence in AI-generated filmmaking with VIP screenings and exclusive presentations.",
      tags: ["Invitation Only", "WIRED Summer Labs"]
    },
    {
      id: 3,
      date: "22",
      month: "JUL",
      year: "2025",
      title: "AIFA Private Breakfast",
      time: "8:00 AM",
      location: "Private Location, London",
      description: "AIFA Awards 2025 Morning Breakfast - An invite-only breakfast in London to hold a discussion regarding the future of technology within the creative industries.",
      tags: ["Invitation Only", "WIRED Summer Labs"]
    },
    {
      id: 4,
      date: "22",
      month: "JUL",
      year: "2025",
      title: "AIFA x Asprey Studio",
      time: "10:30 AM - 12:30 PM",
      location: "1st floor, 34-36 Bruton Street, London W1J 6QX",
      description: "AIFA Awards 2025 - An invitation-only gathering at Asprey Studio to celebrate the future of creativity and technology, bringing together innovators and thought leaders.",
      tags: ["Invitation Only", "WIRED Summer Labs"]
    }
  ];
  
  // Past Events data
  const pastEvents = [
    {
      id: 1,
      date: "07",
      month: "NOV",
      year: "2024",
      title: "AIFilm 3 Partnership in Arizona",
      time: "All Day",
      location: "Arizona, United States",
      description: "AIFA was delighted to partner with AIFilm 3 in Arizona to champion the future of film and tech, fostering innovation in AI-generated filmmaking.",
      tags: ["Partnership"]
    },
    {
      id: 2,
      date: "10",
      month: "NOV",
      year: "2024",
      title: "ASVOFF Film Festival Jury",
      time: "2:00 PM - 6:00 PM",
      location: "Paris, France",
      description: "Co-Founders Leo Crane and Clare Maguire served as jury members at the prestigious ASVOFF Film Festival, evaluating innovative AI-generated films.",
      tags: ["Festival"]
    },
    {
      id: 3,
      date: "16",
      month: "JUL",
      year: "2024",
      title: "Gazelli Art House Tour",
      time: "5:00 PM - 7:00 PM",
      location: "Gazelli Art House, London",
      description: "Community members were taken on an exclusive tour with Co-Founders Leo Crane and Clare Maguire, exploring the intersection of AI art and traditional gallery spaces.",
      tags: ["Community"]
    },
    {
      id: 4,
      date: "26",
      month: "JUN",
      year: "2024",
      title: "AIFA at Coopers Yard London",
      time: "7:00 PM - 9:00 PM",
      location: "Coopers Yard, London",
      description: "A special film screening event showcasing the best of AI-generated filmmaking from the AIFA Awards 2024.",
      tags: ["Public"]
    },
    {
      id: 5,
      date: "18",
      month: "JUN",
      year: "2024",
      title: "AIFA Co-Founders Guest Lecture At Sotheby's Institute",
      time: "6:00 PM - 8:00 PM",
      location: "Sotheby's Institute",
      description: "AIFA Co-Founders delivered an exclusive guest lecture on AI in creative industries at Sotheby's Institute.",
      tags: ["Public"]
    },
    {
      id: 6,
      date: "12",
      month: "JUN",
      year: "2024",
      title: "AIFA Co-Founder Leo Crane Panel Discussion",
      time: "2:00 PM - 4:00 PM",
      location: "Alan Turing Institute, London",
      description: "AIFA Co-Founder Leo Crane joined a panel discussion at the Alan Turing Institute to discuss the future of AI and creative industries.",
      tags: ["Public"]
    },
    {
      id: 7,
      date: "10",
      month: "JUN",
      year: "2024",
      title: "AIFA x Sotheby's Institute Panel",
      time: "6:30 PM - 8:30 PM",
      location: "Asprey Studio, London",
      description: "A collaborative panel discussion between AIFA and Sotheby's Institute exploring the intersection of fine art, luxury, and AI-generated content.",
      tags: ["Public"]
    },
    {
      id: 8,
      date: "04",
      month: "JUN",
      year: "2024",
      title: "Casa Nua Exhibition",
      time: "6:00 PM - 9:00 PM",
      location: "Casa Nua, Brazil",
      description: "AIFA Awards finalists were exhibited at Casa Nua event in Brazil, with Leo Crane stating, \"We are delighted to showcase our artists globally to champion the future of innovation.\"",
      tags: ["Exhibition"]
    },
    {
      id: 9,
      date: "04",
      month: "JUN",
      year: "2024",
      title: "AIFA in Lisbon",
      time: "11:00 AM - 1:00 PM",
      location: "NFC Lisbon",
      description: "AIFA's showcase event in Lisbon, featuring the latest in AI-generated filmmaking and digital art.",
      tags: ["Public"]
    },
    {
      id: 10,
      date: "29",
      month: "MAY",
      year: "2024",
      title: "AIFA Awards 2024",
      time: "7:00 PM - 10:00 PM",
      location: "NFC Lisbon",
      description: "The inaugural AIFA Awards ceremony celebrating the most innovative AI-generated films.",
      tags: ["Public"]
    }
  ];

  return (
    <div className="home-page">
      <Head>
        <title>Events | AIFA</title>
        <meta name="description" content="Discover upcoming AIFA events, including the AIFA Awards 2025 ceremony, workshops, lectures, and exclusive gatherings." />
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
      <section className="events-hero">
        <div className="events-hero-content">
          <h1 className="events-hero-title">AIFA Events</h1>
          <p className="events-hero-subtitle">Join us for a series of innovative events exploring the future of creativity</p>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="intro-section">
        <div className="intro-container">
          <h2 className="section-header fade-in">Connecting Creative Communities</h2>
          <p className="intro-text fade-in">
            AIFA hosts events throughout the year, bringing together innovators in art, technology, and film. From our 
            prestigious AIFA Awards ceremonies to exclusive lectures, workshops, and collaborative sessions, we create 
            spaces where creative professionals, technologists, and institutions can connect and explore the evolving 
            landscape of AI-enhanced storytelling.
          </p>
          <p className="intro-text fade-in">
            Below you'll find our upcoming events for 2025, as well as highlights from our past gatherings. We invite you 
            to join us at these exciting occasions that shape the conversation around the future of entertainment.
          </p>
        </div>
      </section>

      {/* UPCOMING EVENTS TIMELINE SECTION */}
      <section className="events-timeline-section">
        <div className="timeline-container">
          <h2 className="section-header fade-in">Upcoming Events</h2>
          <div className="events-timeline fade-in">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="event-item">
                <div className="event-date">
                  {event.date}
                  <span className="event-month">{event.month}</span>
                  <span className="event-year">{event.year}</span>
                </div>
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  <div className="event-meta">
                    <div className="event-time">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {event.time}
                    </div>
                    <div className="event-location">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {event.location}
                    </div>
                  </div>
                  <p className="event-description">{event.description}</p>
                  {event.tags && event.tags.map((tag, index) => (
                    <span key={index} className={`event-tag ${tag.toLowerCase().replace(' ', '-')}-tag`}>{tag}</span>
                  ))}
                  <div className="event-buttons">
                    {event.title === "AIFA x art'otel London Hoxton" ? (
                      <Link href="/events/artotel-awards-2025" className="event-button">Event Page</Link>
                    ) : event.title === "AIFA Private Breakfast" ? (
                      <Link href="/events/morning-breakfast-2025" className="event-button">Event Page</Link>
                    ) : event.title === "AIFA Co-Founders Guest Lecture At Sotheby's Institute" ? (
                      <Link href="/events/sothebys-2025" className="event-button">Event Page</Link>
                    ) : event.title === "AIFA x Asprey Studio" ? (
                      <Link href="/events/asprey-2025" className="event-button">Event Page</Link>
                    ) : (
                      <Link href="#" className="event-button">Event Page</Link>
                    )}
                    {event.title === "AIFA x art'otel London Hoxton" ? (
                      <a 
                        href="https://lu.ma/event/evt-RqYMwDBNqf0Xuvb" 
                        className="event-button secondary"
                      >
                        Register Now
                      </a>
                    ) : event.title === "AIFA x Asprey Studio" ? (
                      <a 
                        href="https://lu.ma/event/evt-ycbJMAMjVtMwuM4" 
                        className="event-button secondary"
                      >
                        Register Now
                      </a>
                    ) : (
                      <a href="#" className="event-button secondary">Request Invitation</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* PAST EVENTS TIMELINE SECTION */}
      <section className="events-timeline-section past-events-section">
        <div className="timeline-container">
          <h2 className="section-header fade-in">Past Events</h2>
          <div className="events-timeline fade-in">
            {pastEvents.map((event) => (
              <div key={event.id} className="event-item past-event">
                <div className="event-date">
                  {event.date}
                  <span className="event-month">{event.month}</span>
                  <span className="event-year">{event.year}</span>
                </div>
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  <div className="event-meta">
                    <div className="event-time">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {event.time}
                    </div>
                    <div className="event-location">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {event.location}
                    </div>
                  </div>
                  <p className="event-description">{event.description}</p>
                  {event.tags && event.tags.map((tag, index) => (
                    <span key={index} className={`event-tag ${tag.toLowerCase().replace(' ', '-')}-tag`}>{tag}</span>
                  ))}
                  <div className="event-buttons">
                    {event.title === "AIFA in Lisbon" ? (
                      <Link href="/events/lisbon-2025" className="event-button">Event Page</Link>
                    ) : event.title === "Casa Nua Exhibition" ? (
                      <Link href="/events/casa-nua-2024" className="event-button">Event Page</Link>
                    ) : event.title === "ASVOFF Film Festival Jury" ? (
                      <Link href="/events/asvoff-2024" className="event-button">Event Page</Link>
                    ) : event.title === "Gazelli Art House Tour" ? (
                      <Link href="/events/gazelli-2024" className="event-button">Event Page</Link>
                    ) : event.title === "AIFA at Coopers Yard London" ? (
                      <Link href="/events/coopers-yard-2024" className="event-button">Event Page</Link>
                    ) : event.title === "AIFA Co-Founders Guest Lecture At Sotheby's Institute" ? (
                      <Link href="/events/sothebys-2024" className="event-button">Event Page</Link>
                    ) : event.title === "AIFA x Sotheby's Institute Panel" ? (
                      <Link href="/events/asprey-2024" className="event-button">Event Page</Link>
                    ) : event.title === "AIFilm 3 Partnership in Arizona" ? (
                      <Link href="/events/aifilm-3-arizona" className="event-button">Event Page</Link>
                    ) : event.title === "AIFA Co-Founder Leo Crane Panel Discussion" ? (
                      <Link href="/events/alan-turing-2024" className="event-button">Event Page</Link>
                    ) : event.title === "AIFA Awards 2024" ? (
                      <Link href="/awards/2024" className="event-button">Event Page</Link>
                    ) : event.title === "Invite Only Morning Breakfast" ? (
                      <Link href="/events/morning-breakfast-2025" className="event-button">Event Page</Link>
                    ) : (
                      <a href="#" className="event-button">Event Info</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WIRED SUMMER LABS SECTION */}
      <section className="summer-labs-section">
        <div className="summer-labs-container fade-in">
          <h2 className="section-header">WIRED Summer Labs</h2>
          <p className="summer-labs-description">
            All our July events are part of the prestigious WIRED Summer Labs program, a celebration of innovation, 
            creativity, and technology. WIRED Summer Labs brings together pioneers from various industries to 
            showcase groundbreaking ideas and foster meaningful collaborations.
          </p>
          <p className="summer-labs-description">
            As proud participants in WIRED Summer Labs, AIFA is excited to present a series of events that highlight 
            the transformative potential of AI in creative fields, particularly in filmmaking and visual storytelling.
          </p>
        </div>
      </section>
      
      {/* PRESS SECTION */}
      <section className="press-section">
        <div className="press-container fade-in">
          <h2 className="section-header">Press & Media</h2>
          <p className="press-description">
            Media representatives interested in covering AIFA events are invited to register for a media pass.
            Media passes provide access to press materials, interviews with artists and founders, and admission to events.
          </p>
          <div className="press-buttons">
            <Link href="/events/media-pass" className="press-button">Apply for Media Pass</Link>
            <Link href="/events/aifa-awards-2025-press-release" className="press-button secondary">View Press Release</Link>
          </div>
        </div>
      </section>
      
      {/* SPONSORSHIP SECTION */}
      <section className="press-section" style={{ backgroundColor: "var(--light-grey)" }}>
        <div className="press-container fade-in">
          <h2 className="section-header">Sponsorship Opportunities</h2>
          <p className="press-description">
            Partner with AIFA to connect your brand with innovation and creativity. Our sponsorship packages offer
            exclusive benefits including named award sponsorship, brand visibility, and access to our creative community.
          </p>
          <div className="press-buttons">
            <Link href="/events/very-nice-sponsor-package" className="press-button">Vultr Sponsorship Package</Link>
            <a href="mailto:aifa@aifilm.academy?subject=Sponsorship%20Inquiry" className="press-button secondary">Contact for Sponsorship</a>
          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="contact-section">
        <div className="contact-container">
          <h2 className="section-header fade-in">Join Our Community</h2>
          <p className="contact-description fade-in">
            Stay informed about our upcoming events and be the first to know about special announcements, 
            collaborations, and opportunities to get involved with AIFA.
          </p>
          
          <form className="contact-form fade-in" action="https://formspree.io/f/mnnqqvqd" method="POST">
            <div className="form-group">
              <input type="text" name="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Your Email" required />
            </div>
            <div className="form-group full-width">
              <select name="interest" required>
                <option value="" disabled selected>I'm most interested in...</option>
                <option value="Awards">AIFA Awards</option>
                <option value="Educational Events">Educational Events</option>
                <option value="Industry Networking">Industry Networking</option>
                <option value="AI Technology">AI Technology</option>
                <option value="All Events">All AIFA Events</option>
              </select>
            </div>
            <div className="form-group full-width">
              <textarea name="message" placeholder="Any specific events or topics you'd like to hear more about? (Optional)" rows="4"></textarea>
            </div>
            <button type="submit">Subscribe</button>
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