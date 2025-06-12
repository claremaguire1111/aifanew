"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./dulwich.css";

export default function DulwichPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedReel, setGeneratedReel] = useState(null);
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const exampleImagePath = "/images/Dulwich/Yinka.jpg";
  const demoVideoPath = "/videos/demo.mp4";

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const animatedElements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.1 });
    animatedElements.forEach((el) => observer.observe(el));
    return () => animatedElements.forEach((el) => observer.unobserve(el));
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleFileChange = (e) => {
    setError(null);
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (!selectedFile.type.includes("image/")) {
      setError("Please select an image file");
      return;
    }
    
    // Check file size (5MB limit)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Image is too large. Please use an image smaller than 5MB.");
      return;
    }
    
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setStep(2);
  };

  const handlePromptChange = (e) => setPrompt(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please upload an image first");
    if (!prompt.trim()) return setError("Please enter a prompt for animation");

    setError(null);
    setIsLoading(true);
    setStep(3);

    // For now, simply use the demo video after a simulated delay
    // This ensures the feature works without relying on the API
    setTimeout(() => {
      console.log("Using demo video while API issues are being resolved");
      setGeneratedReel(demoVideoPath);
      setError("We're currently using a demonstration video while we update our generation system. Your custom animation will be available soon.");
      setStep(4);
      setIsLoading(false);
    }, 3000);
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setPrompt("");
    setGeneratedReel(null);
    setStep(1);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleShare = () => {
    if (!generatedReel) return;
    const a = document.createElement("a");
    a.href = generatedReel;
    a.download = "dulwich-animated-sculpture.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    alert(
      `Animation downloaded! Remember to tag @dulwichgallery and use #howiseeit when you share it${
        isMobile ? "" : " on social media"
      }.`
    );
  };

  return (
    <div className="dulwich-page">
      {/* HEADER */}
      <header className={`header ${headerScrolled ? "scrolled" : ""}`}>
        <Link href="/" className="logo">
          <img
            src="/images/AIFAlogo.png"
            alt="AIFA Logo"
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
          <Link href="/" onClick={toggleMenu}>Home</Link>
          <Link href="/awards/2025" onClick={toggleMenu}>Awards 2025</Link>
          <Link href="/awards/2024" onClick={toggleMenu}>Awards 2024</Link>
          <Link href="/film-chat" onClick={toggleMenu}>Chat</Link>
          <Link href="/dulwich" onClick={toggleMenu}>Dulwich</Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="dulwich-hero">
        <div className="hero-image-container">
          <img src="/images/Dulwich/dulwich-hero1.png" alt="Dulwich Picture Gallery" className="hero-background-image" />
          <div className="hero-overlay"></div>
        </div>
        <div className="dulwich-hero-content">
          <h1 className="dulwich-hero-title">Dulwich Picture Gallery</h1>
          <p className="dulwich-hero-subtitle">Animate the Sculptures</p>
          <p className="dulwich-hero-tagline">Let Your Imagination Flow</p>
        </div>
      </section>

      {/* MAIN */}
      <main className="dulwich-container">
        <div className="dulwich-intro fade-in">
          <h2>Bring Sculptures to Life</h2>
          <p>
            Join us at Dulwich Picture Gallery and experience the stunning
            Sculpture by Yinka Shonibare. We invite you to get inspired by what
            you see, upload an image and tell your own story from what you feel
            while viewing the piece. Watch your moving image come to life.
          </p>
        </div>

        <div className="dulwich-process-flow fade-in">
          {["Take a picture of the sculpture", "Upload your image", "Write a text prompt", "Generate a 10s reel", "Share on social media"].map((text, i) => (
            <div className="process-step" key={i}>
              <div className="step-number">{i + 1}</div>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <div className="dulwich-animation-creator fade-in">
          {step === 1 && (
            <div className="upload-section">
              <h3>Upload Your Sculpture Photo</h3>
              <div className="example-container">
                <p>Example:</p>
                <img src={exampleImagePath} alt="Example sculpture" className="example-image" />
              </div>
              <div className="upload-container">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="file-input"
                  id="sculpture-upload"
                />
                <label htmlFor="sculpture-upload" className="upload-button">Upload Image</label>
                <p className="upload-help">or take a photo directly with your camera</p>
                <p className="upload-limit">(Maximum image size: 5MB)</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="prompt-section">
              <h3>Create Your Animation</h3>
              <div className="preview-container">
                <img src={preview} alt="Uploaded sculpture" className="preview-image" />
              </div>
              <form onSubmit={handleSubmit} className="prompt-form">
                <label htmlFor="animation-prompt">
                  Describe how you want to animate the sculpture:
                </label>
                <textarea
                  id="animation-prompt"
                  value={prompt}
                  onChange={handlePromptChange}
                  placeholder="e.g. 'Make the sculpture dance gracefully in a garden setting'"
                  rows={4}
                  required
                />
                <div className="form-buttons">
                  <button type="button" onClick={handleReset} className="reset-button">Start Over</button>
                  <button type="submit" className="generate-button">Generate Animation</button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="processing-section">
              <h3>Creating Your Animation</h3>
              <div className="loading-animation"><div className="spinner"></div></div>
              <p>Please wait while we bring your sculpture to life...</p>
              <p className="processing-time">This may take a minute or two.</p>
            </div>
          )}

          {step === 4 && (
            <div className="result-section">
              <h3>Your Animated Sculpture</h3>
              <div className="video-container">
                <video src={generatedReel || demoVideoPath} controls autoPlay loop className="result-video" />
                {error && <div className="demo-notice"><p>{error}</p></div>}
              </div>

              <div className="sharing-instructions">
                <h4>How to share your creation:</h4>
                <ol className="instruction-steps">
                  <li>Download your animation</li>
                  <li>Create a post with your animation</li>
                  <li>Tag <span className="tag">@dulwichgallery</span> and use <span className="hashtag">#howiseeit</span></li>
                  <li>Share it with the community!</li>
                </ol>
              </div>

              <div className="share-container" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button onClick={handleShare} className="share-button download-btn">
                  📥 Download Animation
                </button>
                <button onClick={handleReset} className="new-animation-button">
                  Create Another Animation
                </button>
              </div>
            </div>
          )}

          {error && step !== 4 && (
            <div className="error-message">{error}</div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <section className="contact-us-section" id="contact">
        <div className="footer-column">
          <h3>Get in Touch</h3>
          <ul>
            <li><a href="mailto:aifa@aifilm.academy">aifa@aifilm.academy</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Navigate</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/awards/2025">Awards 2025</Link></li>
            <li><Link href="/awards/2024">Awards 2024</Link></li>
            <li><Link href="/film-chat">Chat</Link></li>
            <li><Link href="/dulwich">Dulwich</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Follow</h3>
          <ul>
            <li><a href="https://www.instagram.com/aifa_ventures/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://x.com/aifaventures" target="_blank" rel="noopener noreferrer">X (Twitter)</a></li>
            <li><a href="https://www.linkedin.com/company/aifa-ventures" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </section>

      <div style={{ padding: "20px 0", borderTop: "1px solid var(--medium-grey)", textAlign: "center" }}>
        <div style={{ marginBottom: "15px" }}>
          <span style={{ fontSize: "12px", color: "var(--dark-grey)" }}>Supported by</span>
          <img src="/images/support/innovateuk.jpg" alt="Innovate UK" style={{ height: "20px", width: "auto", marginLeft: "8px" }} />
        </div>
        <p style={{ fontSize: "14px", color: "var(--dark-grey)" }}>© 2025 AIFA Ventures. All rights reserved</p>
      </div>
    </div>
  );
}