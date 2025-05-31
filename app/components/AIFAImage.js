"use client";

import React from 'react';

/**
 * A component for handling image paths correctly in both development and production environments
 */
export default function AIFAImage({ src, alt, className, style }) {
  // Check if we're in a production environment
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Handle the case of URLs vs relative paths
  if (src.startsWith('http')) {
    // External URL - use as is
    return (
      <img 
        src={src}
        alt={alt || ''}
        className={className || ''}
        style={style || {}}
      />
    );
  }
  
  // For local images:
  
  // Ensure the src path starts with a slash if it doesn't already
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  
  // Handle image paths for Vercel deployment
  let finalSrc = normalizedSrc;
  
  return (
    <img 
      src={finalSrc}
      alt={alt || ''}
      className={className || ''}
      style={style || {}}
    />
  );
}