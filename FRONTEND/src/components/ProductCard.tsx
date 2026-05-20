"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Eye, Sparkles } from "lucide-react";

export interface Product {
  id: string;
  nombre: string;
  precio: number;
  imagen?: string;
  destacado?: boolean;
  categorias?: {
    nombre: string;
  } | null;
  stock?: number;
  descripcion?: string;
}

// Curated high-fidelity gaming covers from Unsplash for games with null image in Supabase
const CURATED_GAME_COVERS: Record<string, string> = {
  "call of duty": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80", // Shooter gamer
  "zelda": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", // Fantasy mountain landscape
  "fifa": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80", // Soccer stadium pitch
  "red dead": "https://images.unsplash.com/photo-1533240332313-0db49b439ad3?auto=format&fit=crop&w=600&q=80", // Cowboy sunset
  "hollow knight": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80", // Dark cave gothic
  "gran turismo": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80", // Race car
  "stardew valley": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80", // Countryside farm
  "rocket league": "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=600&q=80" // High-speed neon abstract
};

function getGameCover(name: string, imageUrl?: string | null): string {
  if (imageUrl && imageUrl.trim() !== "" && imageUrl !== "null") {
    return imageUrl;
  }
  
  const searchName = name.toLowerCase();
  for (const [key, val] of Object.entries(CURATED_GAME_COVERS)) {
    if (searchName.includes(key)) {
      return val;
    }
  }
  
  // High-quality generic gaming cover fallback
  return "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80";
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { id, nombre, precio, imagen, categorias, stock = 12 } = product;

  // Format currency dynamically as Colombian Pesos or generic currency
  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const categoryName = Array.isArray(categorias)
    ? categorias[0]?.nombre
    : (categorias as any)?.nombre || "General";

  // Use dynamic smart cover selection
  const imageUrl = getGameCover(nombre, imagen);

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-slate-950/60 border border-white/5 hover:border-cyan-400/30 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-500 backdrop-blur-md">
      
      {/* Glow Effect Ambient Background (Visible on card hover) */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      {/* Product Image Section */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        
        {/* Featured Tag */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-400 text-black font-extrabold text-[10px] uppercase tracking-wider shadow-[0_0_10px_rgba(34,211,238,0.5)]">
          <Sparkles className="w-3 h-3 animate-pulse" />
          Destacado
        </div>

        {/* Stock status indicator */}
        <div className="absolute top-3 right-3 z-10 flex items-center px-2 py-0.5 rounded bg-slate-950/80 border border-white/10 text-[9px] font-semibold text-gray-300">
          Stock: {stock}
        </div>

        {/* The Image */}
        <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-500">
          <img
            src={imageUrl}
            alt={nombre}
            className="w-full h-full object-cover transition-transform duration-500"
            onError={(e) => {
              // Set fallback direct image if the sign URL expired or is broken
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80";
            }}
          />
        </div>
        
        {/* Overlay Black Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
        
        {/* Quick view hover action */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            href={`/store/product/${id}`}
            className="p-3 bg-slate-950/90 text-cyan-400 hover:text-black hover:bg-cyan-400 border border-cyan-400/30 rounded-xl transition-all duration-300 shadow-lg cursor-pointer transform translate-y-4 group-hover:translate-y-0"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <button
            onClick={() => {}}
            className="p-3 bg-slate-950/90 text-cyan-400 hover:text-black hover:bg-cyan-400 border border-cyan-400/30 rounded-xl transition-all duration-300 shadow-lg cursor-pointer transform translate-y-4 group-hover:translate-y-0 delay-75"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Card Content Section */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category Tag */}
          <span className="text-[10px] font-black text-cyan-400/80 uppercase tracking-widest block mb-1">
            {categoryName}
          </span>
          
          {/* Product Name */}
          <h3 className="text-lg font-bold text-white tracking-wide line-clamp-1 mb-2 group-hover:text-cyan-300 transition-colors duration-300">
            {nombre}
          </h3>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          {/* Price Container */}
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Precio Digital</span>
            <span className="text-xl font-black text-white tracking-tight drop-shadow-[0_0_6px_rgba(255,255,255,0.1)]">
              {formatPrice(precio)}
            </span>
          </div>

          {/* Action Button */}
          <Link
            href={`/store/product/${id}`}
            className="flex items-center justify-center px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-extrabold tracking-wide uppercase rounded-lg shadow-[0_0_12px_rgba(34,211,238,0.2)] hover:shadow-[0_0_18px_rgba(34,211,238,0.45)] transition-all duration-300 hover:scale-102 cursor-pointer border border-cyan-300/20"
          >
            Ver detalle
          </Link>
        </div>
      </div>

    </div>
  );
}
