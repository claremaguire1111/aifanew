'use client';

import { useState } from 'react';
import './profile.css';

// Example placeholder data – update these arrays with your own images for each section as needed.
const placeholderData = {
  myAifa: [
    { id: 1, type: 'video', src: '/videos/demo.mp4' },
    { id: 2, type: 'image', src: '/images/placeholder1.jpg' },
    { id: 3, type: 'image', src: '/images/placeholder2.jpg' },
    { id: 4, type: 'image', src: '/images/placeholder9.jpg' },
    { id: 5, type: 'image', src: '/images/placeholder10.jpg' },
    { id: 6, type: 'image', src: '/images/placeholder11.jpg' },
    { id: 7, type: 'image', src: '/images/placeholder12.jpg' },
    { id: 8, type: 'image', src: '/images/placeholder13.jpg' },
    { id: 9, type: 'image', src: '/images/placeholder14.jpg' },
    { id: 10, type: 'image', src: '/images/placeholder15.jpg' },
    { id: 11, type: 'image', src: '/images/placeholder16.jpg' },
    { id: 12, type: 'image', src: '/images/placeholder24.jpg' },
    { id: 13, type: 'image', src: '/images/placeholder25.jpg' },
    { id: 14, type: 'image', src: '/images/placeholder26.jpg' },
    { id: 15, type: 'image', src: '/images/placeholder27.jpg' },
    { id: 16, type: 'image', src: '/images/placeholder28.jpg' },
    { id: 17, type: 'image', src: '/images/placeholder29.jpg' },
    { id: 18, type: 'image', src: '/images/placeholder30.jpg' },
    { id: 19, type: 'image', src: '/images/placeholder31.jpg' },
    { id: 20, type: 'image', src: '/images/placeholder32.jpg' },
  ],
  myClasses: [
    { id: 21, type: 'image', src: '/images/placeholder3.jpg' },
    { id: 22, type: 'image', src: '/images/placeholder4.jpg' },
    { id: 23, type: 'image', src: '/images/placeholder17.jpg' },
    { id: 24, type: 'image', src: '/images/placeholder18.jpg' },
    { id: 25, type: 'image', src: '/images/placeholder33.jpg' },
    { id: 26, type: 'image', src: '/images/placeholder34.jpg' },
    { id: 27, type: 'image', src: '/images/placeholder35.jpg' },
    { id: 28, type: 'image', src: '/images/placeholder36.jpg' },
    { id: 29, type: 'image', src: '/images/placeholder37.jpg' },
    { id: 30, type: 'image', src: '/images/placeholder38.jpg' },
    { id: 31, type: 'image', src: '/images/placeholder39.jpg' },
    { id: 32, type: 'image', src: '/images/placeholder40.jpg' },
    { id: 33, type: 'image', src: '/images/placeholder41.jpg' },
    { id: 34, type: 'image', src: '/images/placeholder42.jpg' },
    { id: 35, type: 'image', src: '/images/placeholder43.jpg' },
    { id: 36, type: 'image', src: '/images/placeholder44.jpg' },
    { id: 37, type: 'image', src: '/images/placeholder45.jpg' },
    { id: 38, type: 'image', src: '/images/placeholder46.jpg' },
    { id: 39, type: 'image', src: '/images/placeholder47.jpg' },
    { id: 40, type: 'image', src: '/images/placeholder48.jpg' },
  ],
  myFriends: [
    { id: 41, type: 'image', src: '/images/placeholder5.jpg' },
    { id: 42, type: 'image', src: '/images/placeholder6.jpg' },
    { id: 43, type: 'image', src: '/images/placeholder19.jpg' },
    { id: 44, type: 'image', src: '/images/placeholder20.jpg' },
    { id: 45, type: 'image', src: '/images/placeholder49.jpg' },
    { id: 46, type: 'image', src: '/images/placeholder50.jpg' },
    { id: 47, type: 'image', src: '/images/placeholder51.jpg' },
    { id: 48, type: 'image', src: '/images/placeholder52.jpg' },
    { id: 49, type: 'image', src: '/images/placeholder53.jpg' },
    { id: 50, type: 'image', src: '/images/placeholder54.jpg' },
    { id: 51, type: 'image', src: '/images/placeholder55.jpg' },
    { id: 52, type: 'image', src: '/images/placeholder56.jpg' },
    { id: 53, type: 'image', src: '/images/placeholder57.jpg' },
    { id: 54, type: 'image', src: '/images/placeholder58.jpg' },
    { id: 55, type: 'image', src: '/images/placeholder59.jpg' },
    { id: 56, type: 'image', src: '/images/placeholder60.jpg' },
    { id: 57, type: 'image', src: '/images/placeholder61.jpg' },
    { id: 58, type: 'image', src: '/images/placeholder62.jpg' },
    { id: 59, type: 'image', src: '/images/placeholder63.jpg' },
    { id: 60, type: 'image', src: '/images/placeholder64.jpg' },
  ],
  myGifts: [
    { id: 61, type: 'image', src: '/images/placeholder7.jpg' },
    { id: 62, type: 'image', src: '/images/placeholder8.jpg' },
    { id: 63, type: 'image', src: '/images/placeholder23.jpg' },
    { id: 64, type: 'image', src: '/images/placeholder22.jpg' },
    { id: 65, type: 'image', src: '/images/placeholder65.jpg' },
    { id: 66, type: 'image', src: '/images/placeholder66.jpg' },
    { id: 67, type: 'image', src: '/images/placeholder67.jpg' },
    { id: 68, type: 'image', src: '/images/placeholder68.jpg' },
    { id: 69, type: 'image', src: '/images/placeholder69.jpg' },
    { id: 70, type: 'image', src: '/images/placeholder70.jpg' },
    { id: 71, type: 'image', src: '/images/placeholder71.jpg' },
    { id: 72, type: 'image', src: '/images/placeholder72.jpg' },
    { id: 73, type: 'image', src: '/images/placeholder73.jpg' },
    { id: 74, type: 'image', src: '/images/placeholder74.jpg' },
    { id: 75, type: 'image', src: '/images/placeholder75.jpg' },
    { id: 76, type: 'image', src: '/images/placeholder76.jpg' },
    { id: 77, type: 'image', src: '/images/placeholder77.jpg' },
    { id: 78, type: 'image', src: '/images/placeholder78.jpg' },
    { id: 79, type: 'image', src: '/images/placeholder79.jpg' },
    { id: 80, type: 'image', src: '/images/placeholder80.jpg' },
  ],
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('myAifa');
  const pinnedItems = placeholderData[activeTab] || [];

  return (
    <div className="profile-container px-6 py-10 max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="profile-header flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 mb-8">
        <img
          src="/images/placeholder-avatar.jpg"
          alt="Suzanne Vang"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-extrabold">Suzanne Vang</h1>
          <p className="text-sm text-gray-400">@suzannevang</p>
          {/* Numbers under her name */}
          <div className="mt-2 text-sm text-gray-400">
            Classes: 11 | Friends: 350
          </div>
        </div>
        <div className="ml-auto flex space-x-3 mt-4 sm:mt-0">
          <button className="profile-btn">Share</button>
          <button className="profile-btn">Edit profile</button>
        </div>
      </div>

      {/* Tabs without badges */}
      <div className="profile-tabs flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('myAifa')}
          className={`profile-tab px-3 py-1 rounded-full transition ${activeTab === 'myAifa' ? 'ring-2 ring-white' : ''}`}
        >
          My Aifa
        </button>
        <button
          onClick={() => setActiveTab('myClasses')}
          className={`profile-tab px-3 py-1 rounded-full transition ${activeTab === 'myClasses' ? 'ring-2 ring-white' : ''}`}
        >
          My Classes
        </button>
        <button
          onClick={() => setActiveTab('myFriends')}
          className={`profile-tab px-3 py-1 rounded-full transition ${activeTab === 'myFriends' ? 'ring-2 ring-white' : ''}`}
        >
          My Friends
        </button>
        <button
          onClick={() => setActiveTab('myGifts')}
          className={`profile-tab px-3 py-1 rounded-full transition ${activeTab === 'myGifts' ? 'ring-2 ring-white' : ''}`}
        >
          My Gifts
        </button>
      </div>

      {/* Masonry Columns for a Pinterest-like layout */}
      <div className="columns-2 sm:columns-3 md:columns-4 gap-4">
        {pinnedItems.map((item) => (
          <div
            key={item.id}
            className="mb-4 break-inside-avoid rounded-xl overflow-hidden shadow hover:shadow-md transition"
          >
            {item.type === 'image' ? (
              <img src={item.src} alt="Placeholder" className="w-full h-auto" />
            ) : (
              <video src={item.src} controls className="w-full h-auto" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
