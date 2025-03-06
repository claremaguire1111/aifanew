'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

export default function SocialSharing({ filmUrl }) {
  const [publishSuccess, setPublishSuccess] = useState(false);
  const shareUrl = filmUrl;
  const title = 'Check out my AI-generated short film!';
  const router = useRouter();

  const handlePublish = async () => {
    try {
      await axios.post('/api/gallery', {
        filmUrl,
        title: 'My AI Short Film',
        group: 'class',
      });
      setPublishSuccess(true);
      // Navigate to profile page after publish
      router.push('/profile');
    } catch (err) {
      console.error('Error publishing to gallery:', err);
    }
  };

  return (
    <div className="bg-white/10 p-6 rounded-xl shadow-xl backdrop-blur-sm mt-6">
      <h2 className="text-2xl font-semibold mb-4">Share Your Creation</h2>
      <div className="mb-4">
        <video src={filmUrl} controls className="w-full rounded" />
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <TwitterShareButton url={shareUrl} title={title}>
          <button className="btn">Share on X</button>
        </TwitterShareButton>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <button className="btn">Share on Instagram</button>
        </a>
        <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
          <button className="btn">Share on TikTok</button>
        </a>
        <FacebookShareButton url={shareUrl} quote={title}>
          <button className="btn">Share on Facebook</button>
        </FacebookShareButton>
      </div>
      <div className="mt-6">
        <button onClick={handlePublish} className="btn">
          Publish to Aifa Gallery
        </button>
        {publishSuccess && (
          <p className="text-green-400 mt-2">Published!</p>
        )}
      </div>
    </div>
  );
}
