"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ProductCard, Product } from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import { Gamepad2, AlertCircle, RefreshCw, Filter, ArrowDownAz, ArrowUpAz } from "lucide-react";

// Curated backup gaming products
const BACKUP_PRODUCTS: Product[] = [
  {
    id: "backup-elden-ring",
    nombre: "Elden Ring: Shadow of the Erdtree",
    precio: 180000,
    imagen: "https://images.unsplash.com/photo-1651079985973-2e452a8ee09f?auto=format&fit=crop&w=600&q=80",
    destacado: true,
    categorias: { nombre: "Acción" },
    stock: 15,
  },
  {
    id: "backup-cyberpunk",
    nombre: "Cyberpunk 2077: Phantom Liberty",
    precio: 140000,
    imagen: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
    destacado: true,
    categorias: { nombre: "Aventura" },
    stock: 8,
  },
  {
    id: "backup-spiderman-2",
    nombre: "Marvel's Spider-Man 2",
    precio: 290000,
    imagen: "https://images.unsplash.com/photo-1608889175123-8ec330b86f84?auto=format&fit=crop&w=600&q=80",
    destacado: true,
    categorias: { nombre: "Acción" },
    stock: 20,
  },
  {
    id: "backup-forza-5",
    nombre: "Forza Horizon 5 Premium",
    precio: 200000,
    imagen: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
    destacado: true,
    categorias: { nombre: "Simulador" },
    stock: 12,
  },
  {
    id: "backup-stardew",
    nombre: "Stardew Valley",
    precio: 60000,
    imagen: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80",
    destacado: false,
    categorias: { nombre: "Simulador" },
    stock: 50,
  },
  {
    id: "backup-hollow",
    nombre: "Hollow Knight",
    precio: 45000,
    imagen: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    destacado: false,
    categorias: { nombre: "Aventura" },
    stock: 30,
  }
];

const CATEGORIES = ["Todos", "Acción", "Aventura", "Deportes", "RPG", "Simulador"];

export default function Store() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  
  // Filters
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [sortBy, setSortBy] = useState<"none" | "price-asc" | "price-desc">("none");

  const fetchAllProducts = async () => {
    setIsLoading(true);
    setErrorInfo(null);
    let fetchedData: any[] = [];

    try {
      const { data, error } = await supabase
        .from("productos")
        .select(`
          id,
          nombre,
          precio,
          imagen,
          destacado,
          categorias (
            nombre
          )
        `);

      if (error) {
        throw error;
      }
      fetchedData = data || [];
    } catch (err: any) {
      console.warn("Fallo en la consulta. Activando fallback:", err.message);
      
      try {
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("productos")
          .select(`
            id,
            nombre,
            precio,
            imagen,
            categorias (
              nombre
            )
          `);

        if (fallbackError) {
          throw fallbackError;
        }
        
        if (fallbackData) {
          fetchedData = fallbackData;
        }
      } catch (fallbackErr: any) {
        console.error("Fallo total al conectar con Supabase:", fallbackErr.message);
        setErrorInfo("No se pudo obtener datos del servidor. Usando catálogo de contingencia.");
      }
    } finally {
      let finalProducts = [...fetchedData];
      
      if (finalProducts.length === 0) {
        finalProducts = [...BACKUP_PRODUCTS];
      }

      setProducts(finalProducts);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      // Filtrar por categoría
      if (activeCategory !== "Todos") {
        const categoryName = Array.isArray(product.categorias)
          ? product.categorias[0]?.nombre
          : (product.categorias as any)?.nombre;
        if (categoryName?.toLowerCase() !== activeCategory.toLowerCase()) {
          return false;
        }
      }
      // Filtrar por precio
      if (product.precio > maxPrice) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.precio - b.precio;
      if (sortBy === "price-desc") return b.precio - a.precio;
      return 0;
    });

  return (
    <div className="min-h-screen bg-slate-950 text-foreground flex flex-col pt-16 relative overflow-hidden bg-gaming-gradient">
      <Navbar />

      <main className="container mx-auto px-4 lg:px-8 py-12 relative z-10 flex-grow">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Catálogo <span className="text-cyan-400">Completo</span>
          </h1>
          <p className="text-gray-400 max-w-2xl font-medium">
            Explora nuestra colección completa de videojuegos. Encuentra las mejores ofertas, filtra por tus géneros favoritos y descubre tu próxima gran aventura.
          </p>
        </div>

        {errorInfo && (
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-bold mb-8">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorInfo}</span>
            <button 
              onClick={fetchAllProducts}
              className="p-1.5 rounded bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 transition-colors ml-auto"
              title="Reintentar conexión"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de Filtros */}
          <aside className="w-full lg:w-72 shrink-0 space-y-8 bg-slate-900/40 p-6 rounded-2xl border border-white/5 h-fit backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-black text-white uppercase tracking-wider">Filtros</h3>
            </div>

            {/* Filtro de Categorías */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 pl-1 border-l-2 border-cyan-400">Categorías</h4>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-left px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                        isActive
                          ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                          : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filtro de Precio */}
            <div className="pt-4 border-t border-white/5">
              <div className="flex justify-between items-end mb-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 border-l-2 border-cyan-400">Precio Máx</h4>
                <span className="text-sm font-black text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-md border border-cyan-400/20">
                  {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="500000"
                step="10000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-bold mt-2">
                <span>$0</span>
                <span>$500.000+</span>
              </div>
            </div>

            {/* Ordenar por */}
            <div className="pt-4 border-t border-white/5">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 pl-1 border-l-2 border-cyan-400">Ordenar por</h4>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSortBy("none")}
                  className={`text-left px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${sortBy === "none" ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/30" : "text-gray-400 hover:bg-white/5 border border-transparent hover:text-white"}`}
                >
                  Relevancia
                </button>
                <button
                  onClick={() => setSortBy("price-asc")}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${sortBy === "price-asc" ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/30" : "text-gray-400 hover:bg-white/5 border border-transparent hover:text-white"}`}
                >
                  Menor a Mayor
                  <ArrowUpAz className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSortBy("price-desc")}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${sortBy === "price-desc" ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/30" : "text-gray-400 hover:bg-white/5 border border-transparent hover:text-white"}`}
                >
                  Mayor a Menor
                  <ArrowDownAz className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>

          {/* Grid de Productos */}
          <div className="flex-grow">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="rounded-2xl border border-white/5 bg-slate-900/30 p-4 space-y-4 animate-pulse">
                    <div className="aspect-video w-full rounded-xl bg-slate-900/80" />
                    <div className="h-3 w-16 rounded bg-slate-900/80 mt-2" />
                    <div className="h-5 w-3/4 rounded bg-slate-900/80" />
                    <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-4">
                      <div className="space-y-1">
                        <div className="h-2.5 w-12 rounded bg-slate-900/80" />
                        <div className="h-5 w-24 rounded bg-slate-900/80" />
                      </div>
                      <div className="h-9 w-24 rounded bg-slate-900/80" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900/20 rounded-2xl border border-white/5 shadow-inner">
                <div className="p-4 bg-slate-900 rounded-full border border-white/5 mb-4">
                  <Gamepad2 className="w-12 h-12 text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No se encontraron juegos</h3>
                <p className="text-gray-400 max-w-md">Intenta ajustar los filtros para encontrar lo que buscas.</p>
                <button 
                  onClick={() => {
                    setActiveCategory("Todos");
                    setMaxPrice(500000);
                    setSortBy("none");
                  }}
                  className="mt-6 px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black rounded-xl font-black uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                >
                  Limpiar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* FOOTER GAMER PREMIUM */}
      <footer className="mt-auto border-t border-white/5 bg-slate-950/60 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <Gamepad2 className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-lg font-black tracking-wider text-white uppercase">
                  KRUSH Gaming Store
                </span>
              </div>
              <p className="text-gray-400 text-xs max-w-sm leading-relaxed">
                Tu portal de videojuegos digitales de confianza. Licencias 100% auténticas, 
                descarga instantánea, y las mejores ofertas gamer los 365 días del año.
              </p>
            </div>
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider pl-1 border-l-2 border-cyan-400">
                Categorías
              </h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">Acción y Disparos</span></li>
                <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">Aventura y Rol (RPG)</span></li>
                <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">Deportes y Carreras</span></li>
                <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">Estrategia y Simulación</span></li>
              </ul>
            </div>
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider pl-1 border-l-2 border-cyan-400">
                Soporte y Seguridad
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                ¿Tienes alguna duda sobre la activación gamer de tus códigos? 
                Escríbenos directamente a <span className="text-cyan-400 font-bold hover:underline cursor-pointer">soporte@krush.com</span>.
              </p>
              <div className="flex items-center gap-2 pt-2 text-[10px] font-bold text-cyan-400/80">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                Soporte 24/7 Gamer Activo
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
            <span className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase">
              © {new Date().getFullYear()} KRUSH Gaming Store. Todos los derechos reservados.
            </span>
            <div className="flex gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              <span className="hover:text-cyan-400 transition-colors cursor-pointer">Términos</span>
              <span className="hover:text-cyan-400 transition-colors cursor-pointer">Privacidad</span>
              <span className="hover:text-cyan-400 transition-colors cursor-pointer">Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
