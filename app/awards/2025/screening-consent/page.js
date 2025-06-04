"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "../../awards.css";
import "./screening-consent.css";

export default function ScreeningConsent2025() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    newsletter: false,
    artistBio: "",
    artistHeadshot: null,
    artistWebsite: "",
    instagram: "",
    twitter: "",
    filmTitle: "",
    filmDescription: "",
    downloadLink: "",
    downloadPassword: "",
    filmStill: null,
    additionalInfo: "",
    consent: false
  });
  
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.consent) {
      setFormStatus("Please agree to the screening consent terms to submit.");
      return;
    }
    
    setIsSubmitting(true);
    setFormStatus("Submitting...");
    
    // Create FormData object for file uploads
    const submitData = new FormData();
    
    // Add all form fields to FormData
    Object.keys(formData).forEach(key => {
      if (key === 'artistHeadshot' || key === 'filmStill') {
        if (formData[key]) {
          submitData.append(key, formData[key]);
        }
      } else {
        submitData.append(key, formData[key]);
      }
    });
    
    try {
      // Formspree endpoint for screening consent
      const response = await fetch("https://formspree.io/f/mvgajqdv", {
        method: "POST",
        body: submitData,
        headers: {
          Accept: "application/json"
        }
      });
      
      if (response.ok) {
        setFormStatus("Thank you! Your submission has been received.");
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          newsletter: false,
          artistBio: "",
          artistHeadshot: null,
          artistWebsite: "",
          instagram: "",
          twitter: "",
          filmTitle: "",
          filmDescription: "",
          downloadLink: "",
          downloadPassword: "",
          filmStill: null,
          additionalInfo: "",
          consent: false
        });
        
        // Reset file inputs (they don't clear automatically)
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => input.value = '');
        
      } else {
        setFormStatus("Oops! There was a problem submitting your form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("Oops! There was a problem submitting your form.");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="awards-page">
      <Head>
        <title>Screening Consent | AIFA Awards 2025</title>
        <meta name="description" content="Submit your film for consideration in the AIFA Awards 2025. Complete the screening consent form to participate." />
        <meta name="keywords" content="AIFA Awards 2025, screening consent, film submission, AI film festival" />
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

      {/* CONSENT FORM SECTION */}
      <section className="consent-form-section">
        <div className="consent-container">
          <h1 className="consent-title">AIFA Awards 2025<br />SCREENING CONSENT</h1>
          <p className="consent-deadline">Deadline Thurs 29 May 5pm, UK</p>
          
          {formStatus && (
            <div className={`form-status ${formStatus.includes("Thank you") ? "success" : "error"}`}>
              {formStatus}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="consent-form">
            <div className="form-group">
              <label className="form-label">
                Name <span className="required">*</span>
              </label>
              <div className="name-fields">
                <div className="input-group">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                required
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                />
                Sign up for news and updates
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                Artist bio
              </label>
              <textarea
                name="artistBio"
                value={formData.artistBio}
                onChange={handleInputChange}
                placeholder="100 words max"
                maxLength={750}
              ></textarea>
              <div className="field-note">100 words max</div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Artist headshot
              </label>
              <div className="file-input-container">
                <input
                  type="file"
                  id="artistHeadshot"
                  name="artistHeadshot"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <label htmlFor="artistHeadshot" className="file-button">Add a File</label>
                <span className="file-name">{formData.artistHeadshot ? formData.artistHeadshot.name : "No file chosen"}</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Artist website
              </label>
              <input
                type="url"
                name="artistWebsite"
                value={formData.artistWebsite}
                onChange={handleInputChange}
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Instagram
              </label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="@yourusername"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                X
              </label>
              <input
                type="text"
                name="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                placeholder="@yourusername"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Film <span className="required">*</span>
              </label>
              <input
                type="text"
                name="filmTitle"
                value={formData.filmTitle}
                onChange={handleInputChange}
                placeholder="Title, year and country of production"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                About my film <span className="required">*</span>
              </label>
              <textarea
                name="filmDescription"
                value={formData.filmDescription}
                onChange={handleInputChange}
                placeholder="100 words max"
                maxLength={750}
                required
              ></textarea>
              <div className="field-note">100 words max</div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Download link <span className="required">*</span>
              </label>
              <input
                type="url"
                name="downloadLink"
                value={formData.downloadLink}
                onChange={handleInputChange}
                placeholder="https://yourdownloadlink.com"
                required
              />
              <div className="field-note">Minimum 2k resolution / .mp4 or .mov preferred</div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Download password (if needed)
              </label>
              <input
                type="text"
                name="downloadPassword"
                value={formData.downloadPassword}
                onChange={handleInputChange}
                placeholder="Password (if any)"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Film Still <span className="required">*</span>
              </label>
              <div className="file-input-container">
                <input
                  type="file"
                  id="filmStill"
                  name="filmStill"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                />
                <label htmlFor="filmStill" className="file-button">Add a File</label>
                <span className="file-name">{formData.filmStill ? formData.filmStill.name : "No file chosen"}</span>
              </div>
              <div className="field-note">16:9 aspect ratio</div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Anything else you'd like to add
              </label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                placeholder="Additional information"
              ></textarea>
            </div>

            <div className="form-group consent-group">
              <label className="form-label">
                Screening Consent <span className="required">*</span>
              </label>
              <p className="consent-intro">
                Please read and confirm all three statements in order to participate in the AIFA Awards 2025.
              </p>
              
              <div className="consent-terms">
                <p>By submitting, I grant AIFA Ventures Ltd, its partners and its successors the non-exclusive licence to screen my film (as provided here) as part of the international programme for the AIFA Awards 2025.</p>
                <p>I agree that AIFA Ventures Ltd and its partners may use extracts and stills of my film, as well as my name and approved likeness, for related marketing and promotional activities, including but not limited to press releases, social media, website, and printed materials.</p>
                <p>I warrant that I have the necessary rights, licences and permissions to agree to these terms and that my film is original and does not infringe the intellectual property rights or proprietary rights of any third party.</p>
              </div>
              
              <label className="checkbox-label consent-checkbox">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  required
                />
                I agree to all of the above terms
              </label>
            </div>

            <div className="form-submit">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
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

      <div style={{ textAlign: "center", padding: "20px 0", borderTop: "1px solid var(--medium-grey)" }}>
        <p style={{ fontSize: "14px", color: "var(--dark-grey)" }}>© 2025 AIFA Ventures. All rights reserved</p>
      </div>
    </div>
  );
}