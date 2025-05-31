"use client";

import React, { useState, useEffect } from 'react';

/**
 * A component for handling image paths correctly in both development and production environments
 * Works with multiple domains including aifilmacademy.io and aifaventures.com
 */
export default function AIFAImage({ src, alt, className, style }) {
  // We'll use state to store the final src after determining current domain
  const [finalSrc, setFinalSrc] = useState(src);
  
  // For social and support images, determine the best URL on component mount
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;
    
    // For local images, determine if it's a special case (social or support folders)
    const isSocialImage = src.includes('/images/social/');
    const isSupportImage = src.includes('/images/support/');
    
    if (isSocialImage || isSupportImage) {
      // Extract the image filename
      const parts = src.split('/');
      const filename = parts[parts.length - 1];
      const folder = isSocialImage ? 'social' : 'support';
      
      // Get the current domain
      const currentDomain = window.location.origin;
      
      // Set the final src with the current domain
      setFinalSrc(`${currentDomain}/images/${folder}/${filename}`);
    }
  }, [src]);
  
  // External URLs pass through directly
  if (src.startsWith('http')) {
    return (
      <img 
        src={src}
        alt={alt || ''}
        className={className || ''}
        style={style || {}}
      />
    );
  }
  
  // For all other images, use the finalSrc
  return (
    <img 
      src={finalSrc}
      alt={alt || ''}
      className={className || ''}
      style={style || {}}
    />
  );
}