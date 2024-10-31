// app/loading.js
'use client'; // Required if using client-side code

import React from 'react';

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader">Loading...</div>
      <style jsx>{`
        .loader {
          border: 16px solid #f3f3f3;
          border-radius: 50%;
          border-top: 16px solid #3498db;
          width: 120px;
          height: 120px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
