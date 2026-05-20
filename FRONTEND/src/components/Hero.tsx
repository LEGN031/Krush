"use client";

import React from "react";
import Link from "next/link";
import { Compass, ShieldCheck, Zap, Users, Trophy } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-background">
      
      {/* Background Neon Ambient Glows */}
      <div className="absolute top-1/4 left-0 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Dynamic Grid Overlay (Modern Gaming Theme) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-left duration-700">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/25 text-cyan-400 text-xs font-black uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              Catálogo Gamer Actualizado 2026
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight uppercase">
              Compra tus <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.25)]">
                videojuegos
              </span> <br />
              favoritos
            </h1>

            {/* Description */}
            <p className="text-gray-400 text-base sm:text-lg max-w-xl font-medium leading-relaxed">
              Explora una biblioteca inmensa con entregas inmediatas de licencias digitales. 
              Sube de nivel tu colección con ofertas relámpago, soporte prioritario 
              y la experiencia gamer definitiva en <span className="text-cyan-400 font-bold">KRUSH Gaming Store</span>.
            </p>

            {/* Button Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link 
                href="/store"
                className="w-full sm:w-auto px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold tracking-wide rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 border border-cyan-300/30 cursor-pointer"
              >
                <Compass className="w-5 h-5" />
                Ver catálogo
              </Link>
              <Link 
                href="/register"
                className="w-full sm:w-auto px-8 py-4 border border-cyan-400 text-cyan-400 bg-cyan-400/5 hover:bg-cyan-400/15 font-extrabold tracking-wide rounded-xl shadow-inner hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                Crear cuenta
              </Link>
            </div>

            {/* Micro Stats Section */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5 w-full max-w-lg">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-cyan-400 font-black text-xl sm:text-2xl font-mono">
                  <Zap className="w-4 h-4 shrink-0 text-cyan-400" />
                  100%
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Inmediato</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-cyan-400 font-black text-xl sm:text-2xl font-mono">
                  <Users className="w-4 h-4 shrink-0 text-cyan-400" />
                  15K+
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Gamers</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-cyan-400 font-black text-xl sm:text-2xl font-mono">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-400" />
                  Garantía
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">De Compra</span>
              </div>
            </div>

          </div>

          {/* Right Column - Illustration Banner */}
          <div className="lg:col-span-5 flex justify-center items-center relative animate-in fade-in zoom-in-95 duration-1000 delay-150">
            
            {/* Glowing neon ring behind banner */}
            <div className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-[80px] opacity-20 animate-pulse pointer-events-none" />
            
            {/* Floating Container for Banner Image */}
            <div className="relative w-full max-w-[460px] aspect-square rounded-3xl border border-white/10 bg-slate-950/40 p-4 shadow-2xl backdrop-blur-md overflow-hidden group hover:border-cyan-400/40 transition-all duration-700 animate-float">
              
              {/* Corner Sci-fi Reticles */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

              <img
                src="/hero-banner.png"
                alt="Krush Store Gaming Banner"
                className="w-full h-full object-cover rounded-2xl group-hover:scale-103 transition-transform duration-700"
                onError={(e) => {
                  // Unsplash gaming setup fallback in case file is missing
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80";
                }}
              />

              {/* Holographic overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10 opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />
            </div>

            {/* Decorative Mini Badges Floating */}
            <div className="absolute -top-3 -right-3 sm:-right-6 bg-slate-900/90 border border-white/10 p-3 rounded-2xl flex items-center gap-2.5 shadow-2xl backdrop-blur-md animate-bounce [animation-duration:4s]">
              <div className="p-1.5 bg-cyan-500/20 rounded-lg">
                <Trophy className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-gray-500 font-extrabold uppercase tracking-wider">Top Store</span>
                <span className="text-xs font-black text-white">#1 en Ofertas</span>
              </div>
            </div>
            
          </div>

        </div>
      </div>
      
      {/* Dynamic styles injected for the float animation */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
