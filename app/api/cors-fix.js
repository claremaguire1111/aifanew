// cors-fix.js - Utility for standardized CORS handling

import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * Standardized CORS headers to ensure consistent handling across routes
 */
export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
  'Access-Control-Max-Age': '86400',
};

/**
 * Creates a standard OPTIONS response for preflight requests
 * @returns {NextResponse} A NextResponse with CORS headers and 204 status
 */
export function handleOptionsRequest() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}

/**
 * Wraps a response with proper CORS headers
 * @param {Object} data - The response data to be JSON-encoded
 * @param {Object} options - Response options (status, additional headers)
 * @returns {NextResponse} A NextResponse with proper CORS headers
 */
export function corsResponse(data, options = {}) {
  const { status = 200, headers = {} } = options;
  
  return NextResponse.json(data, {
    status,
    headers: {
      ...CORS_HEADERS,
      ...headers
    }
  });
}

/**
 * Creates an error response with proper CORS headers
 * @param {string} message - Error message
 * @param {number} status - HTTP status code
 * @param {Object} additionalData - Additional data to include in the response
 * @returns {NextResponse} A NextResponse with error details and CORS headers
 */
export function corsErrorResponse(message, status = 400, additionalData = {}) {
  return NextResponse.json({
    success: false,
    error: message,
    ...additionalData
  }, {
    status,
    headers: CORS_HEADERS
  });
}