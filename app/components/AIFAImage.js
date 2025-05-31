"use client";

import React from 'react';
import Image from 'next/image';

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
  
  // For local images, let's determine if it's a special case (social or support folders)
  const isSocialImage = src.includes('/images/social/');
  const isSupportImage = src.includes('/images/support/');
  
  // Special handling for social and support images
  if (isSocialImage || isSupportImage) {
    // Extract the image filename
    const parts = src.split('/');
    const filename = parts[parts.length - 1];
    const folder = isSocialImage ? 'social' : 'support';
    
    // In production, use a special CDN pattern
    if (isProduction) {
      // Use absolute URL with domain for these special folders
      const domain = 'https://aifilmacademy.io';
      return (
        <img 
          src={`${domain}/images/${folder}/${filename}`}
          alt={alt || ''}
          className={className || ''}
          style={style || {}}
        />
      );
    }
  }
  
  // For normal images or local development
  // Ensure the src path starts with a slash if it doesn't already
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  
  return (
    <img 
      src={normalizedSrc}
      alt={alt || ''}
      className={className || ''}
      style={style || {}}
    />
  );
}