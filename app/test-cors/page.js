'use client';

import { useState, useEffect } from 'react';

export default function TestCorsPage() {
  const [getResult, setGetResult] = useState(null);
  const [postResult, setPostResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTestGet = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/test-cors', {
        method: 'GET',
      }).catch(error => {
        console.error("Network error:", error);
        throw new Error("Network error - please check your connection");
      });
      
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError);
        throw new Error("Failed to parse server response");
      }
      
      if (!response.ok) {
        throw new Error(data?.error || `Server error: ${response.status}`);
      }
      
      setGetResult(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Error testing GET:", err);
      setError(err.message || "Failed to test GET request");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestPost = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/test-cors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test: 'data' }),
      }).catch(error => {
        console.error("Network error:", error);
        throw new Error("Network error - please check your connection");
      });
      
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError);
        throw new Error("Failed to parse server response");
      }
      
      if (!response.ok) {
        throw new Error(data?.error || `Server error: ${response.status}`);
      }
      
      setPostResult(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Error testing POST:", err);
      setError(err.message || "Failed to test POST request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">CORS Test Page</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Test GET Request</h2>
        <button 
          onClick={handleTestGet}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Testing...' : 'Test GET'}
        </button>
        
        {getResult && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-medium mb-2">Response:</h3>
            <pre className="whitespace-pre-wrap bg-white p-2 rounded border">
              {getResult}
            </pre>
          </div>
        )}
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Test POST Request</h2>
        <button 
          onClick={handleTestPost}
          disabled={isLoading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Testing...' : 'Test POST'}
        </button>
        
        {postResult && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-medium mb-2">Response:</h3>
            <pre className="whitespace-pre-wrap bg-white p-2 rounded border">
              {postResult}
            </pre>
          </div>
        )}
      </div>
      
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded border border-red-300">
          <h3 className="font-medium mb-2">Error:</h3>
          <p>{error}</p>
        </div>
      )}
      
      <div className="mt-8 p-4 bg-yellow-50 rounded">
        <h2 className="text-lg font-semibold mb-2">Debugging Information</h2>
        <p className="mb-2">Check the browser console for detailed request/response information.</p>
        <p>This page includes improved error handling to show precisely what's going wrong with API requests.</p>
      </div>
    </div>
  );
}