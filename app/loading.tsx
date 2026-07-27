'use client'

import React from 'react'

const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background to-muted">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin"></div>
          <div
            className="absolute inset-2 rounded-full border-4 border-transparent border-b-accent opacity-50 animate-spin"
            style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
          ></div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Loading</h2>
          <p className="text-sm text-muted-foreground">Please wait while we prepare everything...</p>
        </div>

        {/* Dot animation */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GlobalLoading
