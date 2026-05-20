"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Gamepad2, 
  ShoppingCart, 
  User, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown, 
  Compass, 
  Home as HomeIcon,
  HelpCircle,
  ShoppingBag
} from "lucide-react";
import { toast } from "sonner";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Dynamic shopping cart count (mocked to make the UI look alive and populated)
  const cartCount = 2;

  // Track page scroll to update glassmorphism aesthetics
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen to Supabase authentication state changes
  useEffect(() => {
    // Get current session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getInitialSession();

    // Set up active listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === "SIGNED_IN") {
        toast.success("¡Sesión iniciada con éxito!");
      }
      if (event === "SIGNED_OUT") {
        toast.info("Sesión cerrada");
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "Error al cerrar sesión");
    }
  };

  const getInitials = (user: any) => {
    const name = user.user_metadata?.nombre || user.email || "";
    return name.charAt(0).toUpperCase();
  };

  const getUserName = (user: any) => {
    return user.user_metadata?.nombre || user.email?.split("@")[0] || "Jugador";
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
      isScrolled 
        ? "bg-slate-950/80 backdrop-blur-lg border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]" 
        : "bg-slate-950/40 backdrop-blur-md border-white/5 py-4"
    }`}>
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group relative z-50">
          <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-500 flex items-center justify-center">
            <Gamepad2 className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-wider text-white uppercase group-hover:text-cyan-400 transition-colors duration-300">
              KRUSH
            </span>
            <span className="text-[9px] font-semibold text-cyan-400/70 tracking-[0.25em] uppercase -mt-1 group-hover:text-cyan-400 transition-colors duration-300">
              Gaming Store
            </span>
          </div>
        </Link>

        {/* DESKTOP MENU LINKS */}
        <div className="hidden md:flex items-center gap-1.5 lg:gap-3 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-xl">
          <Link 
            href="/" 
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
              pathname === "/" 
                ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/20" 
                : "text-gray-300 hover:text-cyan-400 hover:bg-white/5"
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            Inicio
          </Link>
          <Link 
            href="/store" 
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
              pathname === "/store" 
                ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/20" 
                : "text-gray-300 hover:text-cyan-400 hover:bg-white/5"
            }`}
          >
            <Compass className="w-4 h-4" />
            Catálogo
          </Link>
          <Link 
            href="/cart" 
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 relative ${
              pathname === "/cart" 
                ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/20" 
                : "text-gray-300 hover:text-cyan-400 hover:bg-white/5"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Carrito</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-[10px] font-black text-black border-2 border-slate-950 animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* RIGHT SIDE OPTIONS (CART BUTTON, LOGIN/PROFILE) */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* USER PROFILE OR LOGIN CTA */}
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2.5 pl-2.5 pr-3.5 py-1.5 rounded-full bg-slate-900 border border-white/5 hover:border-cyan-400/30 transition-all duration-300 cursor-pointer shadow-inner"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-black font-black text-sm shadow-[0_0_12px_rgba(34,211,238,0.4)] border border-cyan-300/30">
                  {getInitials(user)}
                </div>
                <span className="text-sm font-bold text-gray-200 hover:text-white transition-colors max-w-[120px] truncate">
                  {getUserName(user)}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-cyan-400" : ""}`} />
              </button>

              {/* DROPDOWN MENU */}
              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-slate-950/95 border border-white/10 p-2 shadow-2xl backdrop-blur-xl z-20 animate-in fade-in slide-in-from-top-3 duration-300">
                    <div className="px-4 py-3 border-b border-white/5 mb-1.5">
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Identidad Gamer</p>
                      <p className="text-sm font-black text-white truncate mt-0.5">{getUserName(user)}</p>
                      <p className="text-[10px] text-cyan-400/80 truncate font-mono mt-0.5">{user.email}</p>
                    </div>

                    <Link 
                      href="/profile" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-gray-300 hover:text-white hover:bg-cyan-500/10 transition-colors"
                    >
                      <User className="w-4 h-4 text-cyan-400" />
                      Mi Perfil
                    </Link>

                    <Link 
                      href="/orders" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-gray-300 hover:text-white hover:bg-cyan-500/10 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4 text-cyan-400" />
                      Mis Compras
                    </Link>

                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer text-left mt-1 border-t border-white/5 pt-2"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Cerrar Sesión
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link 
              href="/login" 
              className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black text-sm font-extrabold tracking-wide rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.25)] hover:shadow-[0_0_20px_rgba(34,211,238,0.45)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <div className="flex md:hidden items-center gap-3">
          <Link href="/cart" className="relative p-2.5 rounded-xl bg-slate-900 border border-white/5 text-gray-300">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-cyan-400 text-[9px] font-black text-black border-2 border-slate-950">
                {cartCount}
              </span>
            )}
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-gray-300 hover:text-cyan-400 active:scale-95 transition-all z-50 cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-[65px] right-0 w-[280px] h-[calc(100vh-65px)] bg-slate-950/95 border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl z-45 md:hidden animate-in slide-in-from-right duration-300 backdrop-blur-2xl">
            <div className="space-y-6">
              
              {user && (
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-black font-black text-base shadow-[0_0_12px_rgba(34,211,238,0.3)]">
                    {getInitials(user)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-black text-white truncate">{getUserName(user)}</p>
                    <p className="text-[10px] text-cyan-400/80 truncate font-mono">{user.email}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <p className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest pl-2 mb-2">Navegación</p>
                <Link 
                  href="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                    pathname === "/" 
                      ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/20" 
                      : "text-gray-300 hover:text-cyan-400 hover:bg-white/5"
                  }`}
                >
                  <HomeIcon className="w-4.5 h-4.5" />
                  Inicio
                </Link>
                <Link 
                  href="/store" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                    pathname === "/store" 
                      ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/20" 
                      : "text-gray-300 hover:text-cyan-400 hover:bg-white/5"
                  }`}
                >
                  <Compass className="w-4.5 h-4.5" />
                  Catálogo
                </Link>
              </div>

              {user && (
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <p className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest pl-2 mb-2">Mi Cuenta</p>
                  <Link 
                    href="/profile" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-all"
                  >
                    <User className="w-4.5 h-4.5 text-cyan-400" />
                    Mi Perfil
                  </Link>
                  <Link 
                    href="/orders" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-all"
                  >
                    <ShoppingBag className="w-4.5 h-4.5 text-cyan-400" />
                    Mis Compras
                  </Link>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-white/5">
              {user ? (
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl text-sm font-bold transition-all border border-red-500/20 cursor-pointer"
                >
                  <LogOut className="w-4.5 h-4.5 text-red-500" />
                  Cerrar Sesión
                </button>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center py-3 bg-cyan-400 hover:bg-cyan-300 text-black text-sm font-black rounded-xl shadow-lg shadow-cyan-400/20 transition-all hover:scale-102"
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
