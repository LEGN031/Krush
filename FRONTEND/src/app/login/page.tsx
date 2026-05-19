"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Mail, Lock, Loader2, Gamepad2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Redirect to home/dashboard on successful login
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al iniciar sesión.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground bg-gaming-gradient flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex-1 flex items-center justify-center p-4 pt-24 z-10">
        <div className="w-full max-w-5xl flex rounded-2xl overflow-hidden border border-card-border bg-card/80 backdrop-blur-xl shadow-2xl">
          
          {/* Left Side - Auth Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative">
            
            <div className="mb-10 text-center lg:text-left">
              <h1 className="text-3xl font-bold mb-2 flex items-center justify-center lg:justify-start gap-2">
                Bienvenido a <span className="text-primary">KRUSH</span>
              </h1>
              <p className="text-muted-foreground text-sm">
                Inicia sesión para acceder a tu biblioteca y ofertas exclusivas.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-md bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2 relative">
                <label className="text-sm font-medium text-gray-300 ml-1">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <Input
                    type="email"
                    placeholder="jugador@ejemplo.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-medium text-gray-300">
                    Contraseña
                  </label>
                  <Link 
                    href="/forgot-password" 
                    className="text-xs text-secondary hover:text-secondary/80 hover:underline transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-400">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="text-primary hover:text-[#00e65c] font-semibold transition-colors">
                Regístrate
              </Link>
            </p>
          </div>

          {/* Right Side - Banner (Hidden on mobile) */}
          <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              {/* Fallback pattern/image since we don't have a real asset */}
              <div className="w-full h-full opacity-30" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2300e5ff\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}></div>
            </div>
            
            <div className="z-10 text-center p-8 flex flex-col items-center">
              <div className="w-24 h-24 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 glow-effect-green backdrop-blur-sm border border-primary/30">
                <Gamepad2 className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-4xl font-black tracking-tight text-white mb-4">
                LEVEL UP <br /> YOUR GAME
              </h2>
              <p className="text-gray-400 max-w-sm text-sm">
                Únete a la comunidad de KRUSH Store y accede al catálogo más grande de juegos con las mejores ofertas.
              </p>
            </div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-0" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-card z-0" />
          </div>
        </div>
      </div>
    </main>
  );
}
