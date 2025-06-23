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
  const [taskId, setTaskId] = useState(null);
  const [taskCheckInterval, setTaskCheckInterval] = useState(null);
  const fileInputRef = useRef(null);

  const exampleImagePath = "/images/Dulwich/Yinka.jpg";
  const demoVideoPath = "/videos/demo.mp4";

  // Function to properly format image for Runway API
  const prepareImageForAPI = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Keep the full data URI format for Runway API
        // According to RunwayML docs, the API expects the full data URI
        const dataUri = reader.result;
        console.log('Prepared image data URI (first 50 chars):', dataUri.substring(0, 50) + '...');
        resolve(dataUri);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Generate animation using our API endpoints
  const generateAnimation = async (imageFile, promptText) => {
    try {
      console.log('Preparing to generate animation');
      
      // Prepare the image in the correct format
      const base64Image = await prepareImageForAPI(imageFile);
      
      // Log image size in KB to debug size issues
      const imageSizeKB = Math.round((base64Image.length * 3/4) / 1024);
      console.log(`Base64 image size: ~${imageSizeKB}KB`);
      
      // Prepare the payload for our server endpoint
      const payload = {
        base64Image: base64Image,
        promptText: promptText
      };
      
      // Log the payload structure (without the full image data for brevity)
      const payloadCopy = JSON.parse(JSON.stringify(payload));
      if (payloadCopy.base64Image) {
        payloadCopy.base64Image = payloadCopy.base64Image.substring(0, 50) + '...';
      }
      console.log('Sending payload to server:', JSON.stringify(payloadCopy, null, 2));
      
      // Use our API for all environments - this will work in dev and production
      console.log('Sending request to create task');
      
      // Try multiple API routes in sequence
      const endpoints = [
        // First try the new Google Gemini video endpoint
        '/api/gemini-video',
        // Then try the Dulwich-specific API routes
        '/api/dulwich/create',
        // Legacy API routes as fallbacks
        '/api/generate-animation',
        '/api/runway-wrapper',
        '/api/runway-direct/create'
      ];
      
      let response = null;
      let data = null;
      let success = false;
      let lastError = null;
      
      // Try each endpoint until one works
      for (const endpoint of endpoints) {
        try {
          console.log(`Trying endpoint: ${endpoint}`);
          
          response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
          
          console.log(`Response from ${endpoint}: ${response.status}`);
          
          // Parse the response
          data = await response.json();
          console.log(`Data from ${endpoint}:`, data);
          
          if (response.ok && (data.id || data.taskId || data.success)) {
            success = true;
            console.log(`Successfully created task with endpoint ${endpoint}`);
            break;
          } else {
            console.error(`Endpoint ${endpoint} failed:`, data.error || 'Unknown error');
            lastError = new Error(data.error || `Server error from ${endpoint}: ${response.status}`);
          }
        } catch (endpointError) {
          console.error(`Error with endpoint ${endpoint}:`, endpointError);
          lastError = endpointError;
        }
      }
      
      if (!success) {
        throw lastError || new Error('All endpoints failed');
      }
      
      // Successfully created task
      const taskId = data.id || data.taskId || data.task?.id;
      console.log('Successfully created task with ID:', taskId);
      return { taskId };
    } catch (error) {
      console.error('Error generating animation:', error);
      throw error;
    }
  };
  
  // Check task status using our API endpoints
  const checkTaskStatus = async (taskId) => {
    try {
      console.log(`Checking status for task ${taskId}`);
      
      // Try multiple status endpoints in sequence
      const statusEndpoints = [
        // First try the new Google Gemini video endpoint
        `/api/gemini-video?taskId=${taskId}`,
        // Then try the Dulwich-specific API routes
        `/api/dulwich/status?taskId=${taskId}`,
        // Legacy API routes as fallbacks
        `/api/generate-animation?taskId=${taskId}`,
        `/api/runway-direct/status?taskId=${taskId}`
      ];
      
      let response = null;
      let status = null;
      let success = false;
      let lastError = null;
      
      // Try each endpoint until one works
      for (const endpoint of statusEndpoints) {
        try {
          console.log(`Trying status endpoint: ${endpoint}`);
          
          response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache, no-store',
              'Pragma': 'no-cache'
            }
          });
          
          console.log(`Response from ${endpoint}: ${response.status}`);
          
          // Try to parse the response
          try {
            const text = await response.text();
            try {
              status = JSON.parse(text);
              console.log(`Status from ${endpoint}:`, status);
              
              if (response.ok && status.status) {
                success = true;
                console.log(`Successfully retrieved status with endpoint ${endpoint}`);
                break;
              } else {
                console.error(`Endpoint ${endpoint} failed:`, status.error || 'Unknown error');
                lastError = new Error(status.error || `Server error from ${endpoint}: ${response.status}`);
              }
            } catch (e) {
              console.error(`Failed to parse response as JSON from ${endpoint}:`, text);
              lastError = new Error(`Invalid response from ${endpoint}: ${text.substring(0, 100)}...`);
            }
          } catch (readError) {
            console.error(`Failed to read response text from ${endpoint}:`, readError);
            lastError = readError;
          }
        } catch (endpointError) {
          console.error(`Error with status endpoint ${endpoint}:`, endpointError);
          lastError = endpointError;
        }
      }
      
      if (!success) {
        return {
          status: 'FAILED',
          error: lastError?.message || 'All status endpoints failed'
        };
      }
      
      return status;
    } catch (error) {
      console.error('Error checking task status:', error);
      return {
        status: 'FAILED',
        error: error.message || 'Network error checking task status'
      };
    }
  };

  // Handle task status polling
  useEffect(() => {
    // Clean up polling interval when component unmounts
    return () => {
      if (taskCheckInterval) {
        clearInterval(taskCheckInterval);
      }
    };
  }, [taskCheckInterval]);

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

  const handleTextOnlySubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return setError("Please enter a description of your sculpture");

    setError(null);
    setIsLoading(true);
    setStep(3);

    try {
      // Call the Gemini API directly with text only (no image)
      console.log('Processing text-only prompt:', prompt);
      
      // Make a direct request to the Gemini API endpoint with text-only data
      const response = await fetch('/api/gemini-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          textOnlyPrompt: prompt,
          promptText: prompt
        })
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Text-only task started with response:', data);
      
      if (data.taskId) {
        setTaskId(data.taskId);
        
        // Start polling for task status
        let errorCount = 0;
        const maxErrors = 3;
        
        const interval = setInterval(async () => {
          try {
            const status = await checkTaskStatus(data.taskId);
            console.log('Text-only task status:', status.status);
            
            if (status.status === 'SUCCEEDED') {
              clearInterval(interval);
              setTaskCheckInterval(null);
              
              // Handle success the same way as image-based generation
              if (status.output && status.output.videoUrl) {
                console.log('Setting video URL to:', status.output.videoUrl);
                setGeneratedReel(status.output.videoUrl);
                
                // Handle Gemini description if available
                if (status.isGemini && status.geminiDescription) {
                  console.log('Gemini description found, preparing to display');
                  window.geminiDescription = status.geminiDescription;
                  
                  setTimeout(() => {
                    const descriptionElement = document.getElementById('gemini-description');
                    const previewElement = document.getElementById('gemini-text-preview');
                    const viewButton = document.getElementById('view-full-description');
                    
                    if (descriptionElement && previewElement && viewButton) {
                      console.log('Found description elements, displaying description');
                      descriptionElement.style.display = 'block';
                      const previewText = window.geminiDescription.substring(0, 300) + '...';
                      previewElement.textContent = previewText;
                      
                      viewButton.onclick = () => {
                        alert(window.geminiDescription);
                      };
                    } else {
                      console.error('Could not find description elements in DOM');
                    }
                  }, 1000);
                } else {
                  console.log('No Gemini description found in status');
                }
                
                // Force display of result section
                setStep(4);
                setIsLoading(false);
                
                // Ensure the video is shown by directly manipulating DOM if needed
                setTimeout(() => {
                  const videoElement = document.querySelector('.result-video');
                  if (videoElement) {
                    console.log('Found video element, ensuring it is visible');
                    videoElement.style.display = 'block';
                    videoElement.src = status.output.videoUrl;
                    videoElement.load();
                    videoElement.play().catch(e => console.error('Video autoplay failed:', e));
                  } else {
                    console.error('Could not find video element in DOM');
                  }
                }, 1000);
              } else {
                // Handle missing output URL
                console.error('Task succeeded but no output URL provided');
                setError('Generation completed, but the output is missing');
                setGeneratedReel(demoVideoPath);
                setStep(4);
                setIsLoading(false);
              }
            } else if (status.status === 'FAILED') {
              clearInterval(interval);
              setTaskCheckInterval(null);
              
              setError(status.error || 'Generation failed');
              setGeneratedReel(demoVideoPath);
              setStep(4);
              setIsLoading(false);
            }
            
            // Reset error count on successful status check
            errorCount = 0;
          } catch (error) {
            errorCount++;
            console.error(`Polling error (${errorCount}/${maxErrors}):`, error.message);
            
            if (errorCount >= maxErrors) {
              clearInterval(interval);
              setTaskCheckInterval(null);
              
              setError(`Unable to check task status - using demo video instead`);
              setGeneratedReel(demoVideoPath);
              setStep(4);
              setIsLoading(false);
            }
          }
        }, 5000);
        
        setTaskCheckInterval(interval);
      } else {
        throw new Error('No task ID returned from API');
      }
    } catch (error) {
      console.error('Error in text-only processing:', error);
      
      setError(`Error: ${error.message} - Using demo video instead`);
      setGeneratedReel(demoVideoPath);
      setStep(4);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please upload an image first");
    if (!prompt.trim()) return setError("Please enter a prompt for animation");

    setError(null);
    setIsLoading(true);
    setStep(3);

    try {
      // Start the animation generation process
      const { taskId } = await generateAnimation(file, prompt);
      console.log('Animation task started with ID:', taskId);
      setTaskId(taskId);
      
      // Start polling for task status with improved error handling
      let errorCount = 0;
      const maxErrors = 3; // Allow up to 3 consecutive errors before falling back
      
      const interval = setInterval(async () => {
        try {
          const status = await checkTaskStatus(taskId);
          console.log('Task status:', status.status);
          
          // Reset error count on successful status check
          if (!status.error) {
            errorCount = 0;
          }
          
          if (status.status === 'SUCCEEDED') {
            clearInterval(interval);
            setTaskCheckInterval(null);
            
            // Task completed successfully
            console.log('Animation generated successfully:', status.output?.[0]);
            
            if (status.output && status.output[0]) {
              setGeneratedReel(status.output[0]);
              setError(null); // Clear any previous errors
            } else if (status.output && status.output.videoUrl) {
              // Handle Gemini API response
              setGeneratedReel(status.output.videoUrl);
              
              // Check if this is a Gemini response with description
              if (status.isGemini && status.geminiDescription) {
                console.log('Gemini description available, will display it after rendering');
                // Store the Gemini description to be displayed after rendering
                window.geminiDescription = status.geminiDescription;
                
                // Add code to display the description after component renders
                setTimeout(() => {
                  const descriptionElement = document.getElementById('gemini-description');
                  const previewElement = document.getElementById('gemini-text-preview');
                  const viewButton = document.getElementById('view-full-description');
                  
                  if (descriptionElement && previewElement && viewButton) {
                    // Show the description container
                    descriptionElement.style.display = 'block';
                    
                    // Set the preview text (first 300 characters)
                    const previewText = window.geminiDescription.substring(0, 300) + '...';
                    previewElement.textContent = previewText;
                    
                    // Add click handler for the view button
                    viewButton.onclick = () => {
                      alert(window.geminiDescription);
                    };
                  }
                }, 500);
              }
              
              setError(null);
            } else if (status.demoUrl) {
              // Use the demo URL provided by the API
              console.log('Using demo URL provided by API:', status.demoUrl);
              setError('Animation generated successfully, but using demo video');
              setGeneratedReel(status.demoUrl);
            } else {
              // Handle missing output URL
              console.error('Task succeeded but no output URL provided');
              setError('Animation generated successfully, but the video URL is missing');
              setGeneratedReel(demoVideoPath);
            }
            
            setStep(4);
            setIsLoading(false);
          } else if (status.status === 'FAILED') {
            clearInterval(interval);
            setTaskCheckInterval(null);
            
            // Task failed
            console.error('Animation generation failed:', status.error);
            setError(status.error || 'Animation generation failed');
            
            // Fall back to demo video if generation fails
            if (status.demoUrl) {
              setGeneratedReel(status.demoUrl);
            } else {
              setGeneratedReel(demoVideoPath);
            }
            setStep(4);
            setIsLoading(false);
          } else if (status.error) {
            // Status check returned an error but we'll keep polling
            errorCount++;
            console.error(`Status check error (${errorCount}/${maxErrors}):`, status.error);
            
            // If we've hit the maximum number of consecutive errors, fall back
            if (errorCount >= maxErrors) {
              clearInterval(interval);
              setTaskCheckInterval(null);
              
              console.error(`Too many consecutive errors (${errorCount}), falling back to demo video`);
              setError(`Lost connection to server after ${maxErrors} attempts - using demo video instead`);
              
              setGeneratedReel(demoVideoPath);
              setStep(4);
              setIsLoading(false);
            }
          }
          // For other statuses (PENDING, PROCESSING, etc.), continue polling
        } catch (pollError) {
          console.error('Error polling task status:', pollError);
          
          // Count the error and fall back if we hit the limit
          errorCount++;
          console.error(`Polling error (${errorCount}/${maxErrors}):`, pollError.message);
          
          if (errorCount >= maxErrors) {
            clearInterval(interval);
            setTaskCheckInterval(null);
            
            console.error(`Too many consecutive errors (${errorCount}), falling back to demo video`);
            setError(`Unable to check task status after ${maxErrors} attempts - using demo video instead`);
            
            setGeneratedReel(demoVideoPath);
            setStep(4);
            setIsLoading(false);
          }
        }
      }, 5000); // Check every 5 seconds
      
      setTaskCheckInterval(interval);
    } catch (error) {
      console.error('Error in image processing:', error);
      
      // More detailed error message
      const errorMessage = error.message || 'Failed to process the image';
      console.error('Animation generation failed with error:', errorMessage);
      
      // Check if this is an API-specific error that we can provide more details for
      let userFriendlyMessage = 'Animation generation failed';
      
      if (errorMessage.includes('API key') || errorMessage.includes('authentication')) {
        userFriendlyMessage = 'Authentication error - please try again later';
      } else if (errorMessage.includes('timeout') || errorMessage.includes('network')) {
        userFriendlyMessage = 'Network error - please check your connection and try again';
      } else if (errorMessage.includes('Invalid API Version')) {
        userFriendlyMessage = 'API compatibility error - please contact support';
      } else {
        userFriendlyMessage = `Error: ${errorMessage}`;
      }
      
      // Set user-friendly error message and continue with demo video
      setError(`${userFriendlyMessage} - Using demo video instead`);
      
      // Fall back to demo video on error
      // If there's a demo URL in the error response, use it
      if (error.demoUrl) {
        setGeneratedReel(error.demoUrl);
      } else {
        setGeneratedReel(demoVideoPath);
      }
      setStep(4);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setPrompt("");
    setGeneratedReel(null);
    setStep(1);
    setError(null);
    setTaskId(null);
    
    // Clear any ongoing polling
    if (taskCheckInterval) {
      clearInterval(taskCheckInterval);
      setTaskCheckInterval(null);
    }
    
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

        {/* Educational section about sculpture */}
        <div className="sculpture-education fade-in">
          <h2>Understanding Sculpture: An Art Form</h2>
          <div className="education-content" style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px" }}>
            <div className="education-text">
              <p>
                Sculpture is a three-dimensional art form that has been practiced for thousands of years. 
                It involves creating forms by shaping materials like stone, metal, clay, or wood. 
                Unlike two-dimensional art, sculpture invites viewers to experience it from multiple perspectives 
                and often engages with the space around it.
              </p>
              <p>
                The art of sculpture connects us to our earliest ancestors who carved figurines from ivory and stone, 
                and continues to evolve with contemporary artists exploring new materials and concepts, including digital media.
              </p>
            </div>
            
            <div className="sculpture-techniques" style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
              <h3>Traditional Sculpture Techniques</h3>
              <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", listStyleType: "none", padding: 0 }}>
                <li><strong>Carving:</strong> Removing material from a solid block</li>
                <li><strong>Modeling:</strong> Building up forms with malleable materials</li>
                <li><strong>Casting:</strong> Pouring liquid material into a mold</li>
                <li><strong>Assembling:</strong> Joining different pieces together</li>
                <li><strong>Welding:</strong> Fusing metal components</li>
                <li><strong>3D Printing:</strong> Creating objects layer by layer</li>
              </ul>
            </div>
          </div>
          
          <div className="digital-sculpture-intro" style={{ backgroundColor: "#f0f8ff", padding: "25px", borderRadius: "10px", marginBottom: "30px" }}>
            <h3>From Physical to Digital</h3>
            <p>
              Today, sculpture transcends physical boundaries. Digital technologies allow artists to create virtual sculptures 
              that could never exist in the physical world, defying gravity, using impossible materials, 
              or existing in augmented reality.
            </p>
            <p>
              With AI, we can translate your ideas into visual forms, helping you explore concepts and imagine 
              new possibilities without the constraints of physical materials.
            </p>
          </div>
        </div>

        <div className="dulwich-animation-creator fade-in">
          <h2>Create Your Vision</h2>
          <p style={{ marginBottom: "30px" }}>
            Now it's your turn to bring your artistic vision to life. You can either upload a photo of an existing sculpture 
            to animate it, or simply describe your sculptural concept with words and let AI help visualize it.
          </p>
          
          <div className="creation-options" style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
            <button 
              onClick={() => setStep(1)} 
              className="option-button" 
              style={{ 
                flex: 1, 
                padding: "20px", 
                backgroundColor: step === 1 ? "#444" : "#777", 
                color: "white", 
                border: "none", 
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Upload Image
            </button>
            <button 
              onClick={() => setStep(5)} 
              className="option-button" 
              style={{ 
                flex: 1, 
                padding: "20px", 
                backgroundColor: step === 5 ? "#444" : "#777", 
                color: "white", 
                border: "none", 
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Text Description Only
            </button>
          </div>
          
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
          
          {step === 5 && (
            <div className="text-only-section">
              <h3>Describe Your Sculptural Vision</h3>
              <p className="prompt-help">
                Let your imagination flow. Describe the sculpture you envision - its form, materials, 
                meaning, and how it might move or transform. Be as detailed or abstract as you wish.
              </p>
              <form onSubmit={handleTextOnlySubmit} className="text-prompt-form">
                <textarea
                  id="sculpture-description"
                  value={prompt}
                  onChange={handlePromptChange}
                  placeholder="Describe your sculptural concept... (e.g., 'A flowing figure made of liquid metal, reaching upward toward the sky, with ribbons of light emanating from within')"
                  rows={6}
                  required
                  style={{ width: "100%", padding: "15px", marginBottom: "20px", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <button 
                  type="submit" 
                  className="generate-button"
                  style={{ 
                    backgroundColor: "#444", 
                    color: "white", 
                    border: "none", 
                    padding: "12px 25px", 
                    borderRadius: "5px", 
                    cursor: "pointer",
                    fontSize: "16px"
                  }}
                >
                  Generate Digital Sculpture
                </button>
              </form>
              
              <div className="examples-section" style={{ marginTop: "30px" }}>
                <h4>Inspiration Prompts:</h4>
                <div className="example-prompts" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {[
                    "A figure emerging from a block of stone, half-formed and straining to break free",
                    "Intertwined ribbons of colored glass that catch and refract light",
                    "A kinetic sculpture with parts that move in the wind like a living organism",
                    "An abstract form representing the concept of hope, made of translucent materials",
                    "A digital sculpture showing the transformation from human to nature"
                  ].map((examplePrompt, i) => (
                    <button 
                      key={i}
                      onClick={() => setPrompt(examplePrompt)}
                      style={{ 
                        padding: "8px 15px", 
                        backgroundColor: "#f0f0f0", 
                        border: "1px solid #ddd", 
                        borderRadius: "20px",
                        fontSize: "14px",
                        cursor: "pointer"
                      }}
                    >
                      {examplePrompt.substring(0, 30)}...
                    </button>
                  ))}
                </div>
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
              <p className="processing-time">This may take 1-2 minutes to complete.</p>
              
              {/* Better status information */}
              <div className="status-info">
                {taskId ? (
                  <>
                    <p className="status-message">✅ Task submitted successfully</p>
                    <p className="status-help">
                      We're processing your animation. This uses AI to transform your image
                      and may take up to 2 minutes. Please don't close this window.
                    </p>
                  </>
                ) : (
                  <p className="status-message">Submitting your request...</p>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="result-section">
              <h3>Your Animated Sculpture</h3>
              <div className="video-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <video src={generatedReel || demoVideoPath} controls autoPlay loop className="result-video" style={{ maxWidth: "100%" }} />
                {error && (
                  <div className="error-notice">
                    <p>{error}</p>
                    {error.includes("demo video") && (
                      <p className="demo-note">
                        <strong>Note:</strong> You're currently viewing a demo video. 
                        The AI generation service is experiencing temporary issues. 
                        Please try again later to create your own unique animation.
                      </p>
                    )}
                  </div>
                )}
              </div>
              
              {/* Gemini description section - will be shown if geminiDescription is available */}
              <div 
                id="gemini-description"
                className="gemini-description" 
                style={{ 
                  display: 'none',
                  margin: '20px 0',
                  padding: '15px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '5px',
                  border: '1px solid #dee2e6'
                }}
              >
                <h4 style={{ marginTop: '0' }}>AI-Generated Video Description:</h4>
                <div className="description-text" style={{ maxHeight: '150px', overflow: 'auto', marginBottom: '10px' }}>
                  <p id="gemini-text-preview"></p>
                </div>
                <button 
                  id="view-full-description"
                  style={{
                    backgroundColor: '#444',
                    color: 'white',
                    border: 'none',
                    padding: '8px 15px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  View Full Description
                </button>
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