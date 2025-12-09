"use client";

import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-lg">
        {/* Animated 404 Text */}
        <div className="mb-8">
          <div className="inline-block relative">
            <h1 className="text-9xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              404
            </h1>
            <div
              className="absolute inset-0 text-9xl font-black text-blue-400 blur-2xl opacity-50 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            >
              404
            </div>
          </div>
        </div>

        {/* Animated ECG/Medical Wave Illustration */}
        <div className="mb-8 flex justify-center h-40 items-center">
          <svg
            viewBox="0 0 800 200"
            className="w-full max-w-2xl"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Medical heartbeat line */}
            <path
              d="M 0,100 L 50,100 L 60,70 L 70,130 L 80,100 L 120,100 L 130,80 L 140,120 L 150,100 L 200,100 L 210,50 L 220,150 L 230,100 L 280,100 L 290,85 L 300,115 L 310,100 L 360,100 L 370,75 L 380,125 L 390,100 L 440,100 L 450,60 L 460,140 L 470,100 L 520,100 L 530,90 L 540,110 L 550,100 L 600,100 L 610,70 L 620,130 L 630,100 L 680,100 L 690,80 L 700,120 L 710,100 L 760,100 L 800,100"
              stroke="url(#ecgGrad)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-ecg"
            />

            {/* Grid background */}
            <defs>
              <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(96, 165, 250)" />
                <stop offset="50%" stopColor="rgb(34, 211, 238)" />
                <stop offset="100%" stopColor="rgb(168, 85, 247)" />
              </linearGradient>
              <pattern
                id="grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="rgba(96, 165, 250, 0.1)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>

            <rect width="800" height="200" fill="url(#grid)" />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold text-white mb-4 animate-fadeIn">
          Page Not Found
        </h2>

        {/* Description */}
        <p
          className="text-slate-300 text-lg mb-8 animate-fadeIn"
          style={{ animationDelay: "0.2s" }}
        >
          Oops! The page you are looking for doesn&apos;t exist. It might have
          been moved or deleted.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn"
          style={{ animationDelay: "0.4s" }}
        >
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 transform"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="px-8 py-3 border-2 border-slate-400 text-slate-300 font-semibold rounded-lg hover:border-slate-300 hover:text-white transition-all duration-300 hover:scale-105 transform"
          >
            Back to Home
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes ecg {
          0% {
            stroke-dasharray: 2000;
            stroke-dashoffset: 2000;
          }
          100% {
            stroke-dasharray: 2000;
            stroke-dashoffset: 0;
          }
        }

        .animate-ecg {
          animation: ecg 4s linear infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
