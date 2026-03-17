"use client";

import React, { useState } from "react";

const DiprellaAuth: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
      <div className="relative w-full h-screen bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* GRID: Sign In (left) + Sign Up (right) */}
        <div className="grid grid-cols-2 h-full">
          
          {/* LEFT: SIGN IN */}
          <div className="flex flex-col items-center justify-center p-10">
            <h2 className="text-3xl font-bold text-emerald-600 mb-4">
              Sign in to Diprella
            </h2>

            <div className="flex gap-4 mb-4">
              <button className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500">f</button>
              <button className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500">G+</button>
              <button className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500">in</button>
            </div>

            <p className="text-xs text-slate-500 mb-6">or use your email account:</p>

            <form className="w-full max-w-sm flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email"
                className="border border-slate-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-400"
              />
              <input
                type="password"
                placeholder="Password"
                className="border border-slate-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-400"
              />

              <a className="text-xs text-emerald-600 text-right cursor-pointer hover:underline">
                Forgot your password?
              </a>

              <button
                type="submit"
                className="mt-4 bg-emerald-600 text-white rounded-full py-2 text-sm font-semibold hover:bg-emerald-700 transition"
              >
                SIGN IN
              </button>
            </form>
          </div>

          {/* RIGHT: SIGN UP */}
          <div className="flex flex-col items-center justify-center p-10">
            <h2 className="text-3xl font-bold text-emerald-600 mb-4">
              Create Account
            </h2>

            <div className="flex gap-4 mb-4">
              <button className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500">f</button>
              <button className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500">G+</button>
              <button className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500">in</button>
            </div>

            <p className="text-xs text-slate-500 mb-6">or use your email for registration:</p>

            <form className="w-full max-w-sm flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                className="border border-slate-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-400"
              />
              <input
                type="email"
                placeholder="Email"
                className="border border-slate-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-400"
              />
              <input
                type="password"
                placeholder="Password"
                className="border border-slate-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-400"
              />

              <button
                type="submit"
                className="mt-4 bg-emerald-600 text-white rounded-full py-2 text-sm font-semibold hover:bg-emerald-700 transition"
              >
                SIGN UP
              </button>
            </form>
          </div>
        </div>

        {/* GREEN SLIDING PANEL */}
        <div
          className={`
            absolute top-0 w-1/2 h-full bg-emerald-600 text-white 
            flex flex-col items-center justify-center p-10
            transition-transform duration-700 ease-in-out
            ${isSignIn ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {isSignIn ? (
            <>
              <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
              <p className="text-sm text-center mb-8">
                Enter your personal details and start your journey with us
              </p>
              <button
                onClick={() => setIsSignIn(false)}
                className="border border-white rounded-full px-10 py-2 text-sm font-semibold hover:bg-white hover:text-emerald-600 transition"
              >
                SIGN UP
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-sm text-center mb-8">
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={() => setIsSignIn(true)}
                className="border border-white rounded-full px-10 py-2 text-sm font-semibold hover:bg-white hover:text-emerald-600 transition"
              >
                SIGN IN
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiprellaAuth;