'use client'

import { useState } from 'react'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'

export default function Navbar({ active }: { active?: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isSignedIn, isLoaded } = useUser()

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-100 relative">
      <a href="/" className="text-base font-medium">
        TaskFlow<span className="text-blue-600">AI</span>
      </a>

      {/* Desktop */}
      <div className="hidden md:flex gap-5 items-center">
        <a href="/toolkits" className={`text-sm transition-colors ${active === 'toolkits' ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-900'}`}>
          Toolkits
        </a>
        <a href="/how-to-use" className={`text-sm transition-colors ${active === 'how-to-use' ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-900'}`}>
          How to use AI
        </a>
        <a href="/about" className={`text-sm transition-colors ${active === 'about' ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-900'}`}>
          About
        </a>

        {/* Afișare condiționată bazată pe starea de încărcare și autentificare */}
        {isLoaded && (
          <>
            {!isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <button className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="text-sm px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    Get started
                  </button>
                </SignUpButton>
              </>
            ) : (
              <UserButton afterSignOutUrl="/" />
            )}
          </>
        )}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-gray-500"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 px-6 py-4 flex flex-col gap-4 z-50 md:hidden">
          <a href="/toolkits" className="text-sm text-gray-700" onClick={() => setMenuOpen(false)}>Toolkits</a>
          <a href="/how-to-use" className="text-sm text-gray-700" onClick={() => setMenuOpen(false)}>How to use AI</a>
          <a href="/about" className="text-sm text-gray-700" onClick={() => setMenuOpen(false)}>About</a>
          
          {isLoaded && (
            <>
              {!isSignedIn ? (
                <>
                  <SignInButton mode="modal">
                    <button className="text-sm text-gray-700 text-left">Sign in</button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="text-sm px-4 py-2 bg-gray-900 text-white rounded-lg font-medium text-center">
                      Get started
                    </button>
                  </SignUpButton>
                </>
              ) : (
                <div className="flex justify-start pt-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  )
}