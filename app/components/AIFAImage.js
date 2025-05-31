"use client";

import React from 'react';

/**
 * A component for handling image paths correctly in both development and production environments
 */
export default function AIFAImage({ src, alt, className, style }) {
  // Check if we're in a production environment
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Ensure the src path starts with a slash if it doesn't already
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  
  // In production, use a relative path (remove the leading slash)
  const finalSrc = isProduction ? normalizedSrc.substring(1) : normalizedSrc;
  
  return (
    <img 
      src={finalSrc}
      alt={alt || ''}
      className={className || ''}
      style={style || {}}
    />
  );
}