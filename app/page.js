"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import "./home.css"; // local styles for Home

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorColor, setCursorColor] = useState("#ffffff");
  const videoRefs = useRef([]);
  const imageRefs = useRef([]);

  // Track mouse position -> custom circle cursor
  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let newCursorColor = "#ffffff";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          const bgColor = window.getComputedStyle(section).backgroundColor;
          // If background is white => cursor black
          if (bgColor === "rgb(255, 255, 255)") {
            newCursorColor = "#000000";
          }
        }
      });

      setCursorColor(newCursorColor);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Intersection Observer for lazy‐loading images + videos
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.tagName === "VIDEO") {
            const vid = entry.target;
            vid.src = vid.dataset.src || "";
            vid.load();
          } else if (entry.target.tagName === "IMG") {
            const img = entry.target;
            img.src = img.dataset.src || "";
          }
          observer.unobserve(entry.target);
        }
      });
    }, options);

    videoRefs.current.forEach((video) => observer.observe(video));
    imageRefs.current.forEach((image) => observer.observe(image));
  }, []);

  // Parallax effect for images
  useEffect(() => {
    const handleScroll = () => {
      imageRefs.current.forEach((image) => {
        if (image && image.classList.contains("parallax-image")) {
          const scrollY = window.scrollY;
          const offset = image.getBoundingClientRect().top + window.scrollY;
          const parallaxSpeed = 0.3;
          image.style.transform = `translateY(${(scrollY - offset) * parallaxSpeed}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className="home-page">
      {/* CUSTOM CURSOR */}
      <div
        className="custom-cursor"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          backgroundColor: cursorColor,
        }}
      />

      {/* HEADER */}
      <header className="header">
      <Link href="/" className="logo">
  <img
    src="/images/AIFAlogo.png"
    alt="AIFA Logo"
    style={{ width: "50px", height: "auto" }}
  />
</Link>
        <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </div>
        <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
          {/* Only 'Home' and 'Chat' */}
          <Link href="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link href="/film-chat" onClick={toggleMenu}>
            Chat
          </Link>
        </nav>
      </header>

      {/* ABOUT SECTION (Fullscreen Video) */}
      <motion.section
        className="about-section"
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="video-wrapper">
          <video
            data-src="/videos/7677235-hd_1920_1080_25fps.mp4"
            ref={(el) => el && videoRefs.current.push(el)}
            autoPlay
            loop
            muted
            playsInline
            className="background-video"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="overlay">
        <h1 className="hero-text">
  <img
    src="/images/AIFAlogo.png"
    alt="AIFA Logo"
    style={{ width: "200px", height: "auto" }}
  />
</h1>

          <h2 className="hero-subtext">Do you want to be a Filmmaker? <p>Chat to Hollywood stars and ask them your questions</p></h2>
          {/* Button => "/film-chat" */}
          <Link href="/film-chat" className="hero-button" style={{ marginTop: "20px" }}>
            Chat to Hollywood Stars
          </Link>
        </div>
      </motion.section>

      {/* ABOUT DESCRIPTION SECTION */}
      <motion.section
        className="about-description-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="text-content">
          <h2 className="section-header">A positive future for online entertainment</h2>
          <p>
  AIFA is developing educational tools and resources to help you create the films
  you’ve always envisioned. Now you can learn the craft side-by-side with your
  favorite Hollywood movie stars and directors—gaining insights, guidance, and
  practical knowledge every step of the way. We're making the art of filmmaking
  more accessible and inclusive for everyone, so you can bring your cinematic
  visions to life.
</p>        </div>
      </motion.section>

      {/* AWARDS SECTION */}
      <motion.section
        className="awards-section"
        id="awards"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="awards-content">
          <h1 className="awards-heading">Awards</h1>
          <p className="awards-subtext">
            We empower creators, entrepreneurs, and the future of creativity and
            technology through our annual awards. Our first awards were held in
            Lisbon in 2024, celebrating outstanding achievements in arts and
            technology.
          </p>
          <div className="awards-grid">
            <div className="award-item">
              <img
                data-src="/images/aifa_image_3.JPG"
                ref={(el) => el && imageRefs.current.push(el)}
                alt="Award Ceremony"
                className="award-image parallax-image"
              />
            </div>
            <div className="award-item">
              <img
                data-src="/images/aifa-web-13.jpg"
                ref={(el) => el && imageRefs.current.push(el)}
                alt="Award Winner"
                className="award-image parallax-image"
              />
            </div>
            <div className="award-item">
              <img
                data-src="/images/aifa-web-14.jpg"
                ref={(el) => el && imageRefs.current.push(el)}
                alt="Award 3"
                className="award-image parallax-image"
              />
            </div>
            <div className="award-item">
              <img
                data-src="/images/aifa_image_4.JPG"
                ref={(el) => el && imageRefs.current.push(el)}
                alt="Award 4"
                className="award-image parallax-image"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* PARTNERSHIPS SECTION */}
      <motion.section
        className="partnerships-section"
        id="partnerships"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="partnerships-content">
          <div className="text-content">
            <h1>Partnerships and Events</h1>
            <p>
              We are committed to developing partnerships and hosting events that
              support the future of online entertainment and filmmaking. Our
              initiatives include the annual AIFA Awards, collaborations with the
              Sotheby's Institute, and involvement in ASVOFF, among others.
            </p>
            <p>
              By working with renowned institutions and participating in
              significant industry events, we continue to foster creativity,
              innovation, and technological growth at the highest levels,
              ensuring that both culture and technology evolve hand-in-hand.
            </p>
          </div>
          <div className="video-box">
            <video
              data-src="/videos/video-section-3.mp4"
              ref={(el) => el && videoRefs.current.push(el)}
              autoPlay
              loop
              muted
              playsInline
              className="partnership-video"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </motion.section>

{/* Services (Offerings) Section */}
<motion.section
  className="services-section"
  id="services"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={sectionVariants}
>
  <h1 className="services-heading parallax-image">What we offer</h1>
  <div className="services-grid">
    
    {/* Education */}
    <div className="service-box">
      <h2>Education</h2>
      <p>
        Have fun making films! Collaborate on your ideas with your favorite Hollywood stars, directors, and more.
      </p>
    </div>
    
    {/* Community */}
    <div className="service-box">
      <h2>Community</h2>
      <p>
        We’ve built the world’s first Film AI Agent on X (Twitter) to bring you facts, fiction, and the latest news in film.
      </p>
    </div>
    
    {/* Awards */}
    <div className="service-box">
      <h2>Awards</h2>
      <p>
        Proud hosts of one of the world’s first AI Film Awards in Lisbon 2024, returning this year with even more innovation.
      </p>
    </div>
    
    {/* Partnerships */}
    <div className="service-box">
      <h2>Partnerships</h2>
      <p>
        We’ve partnered with top institutions, including Sotheby’s Institute. Our community joined us for a lecture on the Future of Film.
      </p>
    </div>
    
    {/* Press */}
    <div className="service-box">
      <h2>Press</h2>
      <p>
        We have been featured in leading publications, including L'Officiel, Binance, and Decrypt.
      </p>
    </div>
    
    {/* Exhibits */}
    <div className="service-box">
      <h2>Exhibits</h2>
      <p>
        Featured artists from our awards have been exhibited globally since our inaugural event in 2024.
      </p>
    </div>
    
  </div>
</motion.section>

      

      {/* BRANDS SECTION */}
      <motion.section
        className="brands-section"
        id="brands"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="moving-brands">
          <div className="brand-row">
            <img
              data-src="/partners/01_Galxe_B_White Full Logo.png"
              ref={(el) => el && imageRefs.current.push(el)}
              alt="Galxe"
            />
            <img
              data-src="/partners/BrightLogo-IconText-White.png"
              ref={(el) => el && imageRefs.current.push(el)}
              alt="BrightLogo"
            />
            <img
              data-src="/partners/Casa Nua 3 wh tr.png"
              ref={(el) => el && imageRefs.current.push(el)}
              alt="Casa Nua"
            />
            <img
              data-src="/partners/DressX lighter.png"
              ref={(el) => el && imageRefs.current.push(el)}
              alt="DressX"
            />
            <img
              data-src="/partners/Muse Frame wh text.png"
              ref={(el) => el && imageRefs.current.push(el)}
              alt="Muse Frame"
            />
            <img
              data-src="/partners/Non Fun Gerbils Wh tr.png"
              ref={(el) => el && imageRefs.current.push(el)}
              alt="Non Fun Gerbils"
            />
            <img
              data-src="/partners/object_subject_form_mark_wht.png"
              ref={(el) => el && imageRefs.current.push(el)}
              alt="Object Subject"
            />
            <img
              data-src="/partners/sedition logo wh long.png"
              ref={(el) => el && imageRefs.current.push(el)}
              alt="Sedition"
            />
            <img
              data-src="/partners/W3S-Light-Logo-x3 wh.png"
              ref={(el) => el && imageRefs.current.push(el)}
              alt="W3S"
            />
          </div>
        </div>
      </motion.section>

      {/* CONTACT SECTION */}
      <motion.section
        className="contact-us-section"
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="footer-column">
          <h3>Get in Touch</h3>
          <ul>
            <li>
              <a href="mailto:aifa@aifilm.academy">aifa@aifilm.academy</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li>
              <a href="#about">Chat to the stars</a>
            </li>
            <li>
              <a href="#awards">Awards</a>
            </li>
            <li>
              <a href="#partnerships">Partnerships</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          {/* 
            3) Change from "Social" to "Community"
          */}
          <h3>Community</h3>
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
      </motion.section>

      {/* SIGN-UP SECTION */}
      <motion.section
        className="signup-section"
        id="signup"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="signup-box">
          <h1>Sign Up</h1>
          <p>
            Stay informed and inspired by signing
            up to receive the latest updates and resources directly to your
            inbox. Including creator grants, job offerings, interviews, and more.
          </p>
          <form action="https://formspree.io/f/mnnqqvqd" method="POST">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </motion.section>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>© AIFA 2024</p>
        <p>Developed by NOPRBLM</p>
      </div>
    </div>
  );
}
