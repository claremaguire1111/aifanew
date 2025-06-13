// This file gets the jury voting password from environment variables
// with a hardcoded fallback for development environments

// In production, this should be set in Vercel environment variables
export const JURY_VOTING_PASSWORD = process.env.NEXT_PUBLIC_JURY_VOTING_PASSWORD || 'AIFA2025Jury';