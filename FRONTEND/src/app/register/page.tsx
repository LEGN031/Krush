"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { User, Mail, MapPin, Lock, Loader2, Gamepad2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    direccion: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length > 6) score++;
    if (password.length > 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score; // 0 to 5
  };

  const strength = getPasswordStrength(formData.password);

  const getStrengthColor = () => {
    if (strength === 0) return "bg-gray-700";
    if (strength <= 2) return "bg-red-500 shadow-red-500/50";
    if (strength === 3) return "bg-yellow-400 shadow-yellow-400/50";
    return "bg-cyan-400 shadow-cyan-400/50 glow-effect";
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (!formData.termsAccepted) {
      toast.error("Debes aceptar los términos y condiciones");
      return;
    }

    if (strength < 2) {
      toast.error("La contraseña es muy débil");
      return;
    }

    setIsLoading(true);

    try {
      // Crear usuario en Supabase Auth pasando metadata para los Triggers
      const { error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            nombre: formData.nombre,
            direccion: formData.direccion,
          },
        },
      });

      if (authError) throw authError;

      toast.success("¡Registro exitoso! Revisa tu correo.", {
        icon: <ShieldCheck className="text-cyan-400" />
      });
      
      // Redirigir a la página de verificación de correo
      router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);

    } catch (err: any) {
      toast.error(err.message || "Ocurrió un error durante el registro.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground bg-gaming-gradient flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex-1 flex items-center justify-center p-4 pt-24 pb-12 z-10">
        <div className="w-full max-w-5xl flex rounded-2xl overflow-hidden border border-card-border bg-card/80 backdrop-blur-xl shadow-2xl">
          
          {/* Left Side - Register Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative">
            
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-3xl font-bold mb-2 flex items-center justify-center lg:justify-start gap-2">
                Únete a <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">KRUSH</span>
              </h1>
              <p className="text-muted-foreground text-sm">
                Crea tu cuenta y empieza a disfrutar de las mejores ofertas gamer.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              
              <div className="space-y-1 relative">
                <label className="text-xs font-semibold text-gray-300 ml-1 uppercase tracking-wider">
                  Nombre Completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input
                    name="nombre"
                    type="text"
                    placeholder="Tu nombre real o nickname"
                    className="pl-10 h-11"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1 relative">
                <label className="text-xs font-semibold text-gray-300 ml-1 uppercase tracking-wider">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="jugador@ejemplo.com"
                    className="pl-10 h-11"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1 relative">
                <label className="text-xs font-semibold text-gray-300 ml-1 uppercase tracking-wider">
                  Dirección
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input
                    name="direccion"
                    type="text"
                    placeholder="Tu dirección de envío"
                    className="pl-10 h-11"
                    value={formData.direccion}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1 relative">
                  <label className="text-xs font-semibold text-gray-300 ml-1 uppercase tracking-wider">
                    Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-11"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1 relative">
                  <label className="text-xs font-semibold text-gray-300 ml-1 uppercase tracking-wider">
                    Confirmar
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-11"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-1 mt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Seguridad de contraseña:</span>
                    <span className={strength >= 3 ? "text-cyan-400 font-bold" : "text-gray-400"}>
                      {strength === 0 && ""}
                      {strength > 0 && strength <= 2 && "Débil"}
                      {strength === 3 && "Buena"}
                      {strength >= 4 && "Fuerte"}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${getStrengthColor()}`}
                      style={{ width: `${(strength / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-2 pt-2">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-cyan-400 focus:ring-cyan-500 focus:ring-offset-gray-900"
                  />
                </div>
                <label htmlFor="terms" className="text-xs text-gray-400 leading-tight">
                  He leído y acepto los{" "}
                  <Link href="/terms" className="text-cyan-400 hover:underline">Términos de Servicio</Link> y la{" "}
                  <Link href="/privacy" className="text-cyan-400 hover:underline">Política de Privacidad</Link>.
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creando cuenta...
                  </>
                ) : (
                  "Registrarse"
                )}
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-400">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors">
                Inicia sesión aquí
              </Link>
            </p>
          </div>

          {/* Right Side - Banner (Hidden on mobile) */}
          <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              {/* Fallback pattern/image since we don't have a real asset */}
              <div className="w-full h-full opacity-30" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2300e5ff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}></div>
            </div>
            
            <div className="z-10 text-center p-8 flex flex-col items-center">
              <div className="w-24 h-24 bg-cyan-400/20 rounded-2xl flex items-center justify-center mb-6 glow-effect backdrop-blur-sm border border-cyan-400/30">
                <Gamepad2 className="w-12 h-12 text-cyan-400" />
              </div>
              <h2 className="text-4xl font-black tracking-tight text-white mb-4">
                UNLOCK <br /> THE UNIVERSE
              </h2>
              <p className="text-gray-400 max-w-sm text-sm">
                Tu perfil es la llave a cientos de horas de diversión. Administra tus compras, guarda tus favoritos y juega sin límites.
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
