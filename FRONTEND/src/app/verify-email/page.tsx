"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { MailOpen, Loader2, ArrowLeft, Gamepad2, Send } from "lucide-react";
import { toast } from "sonner";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) setEmail(emailParam);
  }, [searchParams]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = async () => {
    if (!email) return;
    
    setIsResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) throw error;
      
      toast.success("Correo de confirmación reenviado.");
      setCountdown(60); // Evitar spam, cooldown de 60 segundos
    } catch (error: any) {
      toast.error(error.message || "Error al reenviar el correo.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 pt-24 z-10">
      <div className="w-full max-w-lg flex flex-col items-center rounded-2xl border border-card-border bg-card/80 backdrop-blur-xl shadow-2xl p-10 text-center relative overflow-hidden">
        
        {/* Glow decoration inside card */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/20 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="w-20 h-20 bg-cyan-400/10 rounded-full flex items-center justify-center mb-6 glow-effect border border-cyan-400/30">
          <MailOpen className="w-10 h-10 text-cyan-400" />
        </div>

        <h1 className="text-3xl font-black mb-4 tracking-tight">
          REVISA TU <span className="text-cyan-400">CORREO</span>
        </h1>
        
        <p className="text-gray-400 mb-2">
          Hemos enviado un enlace de confirmación a:
        </p>
        
        <div className="bg-background/50 py-2 px-4 rounded-lg border border-card-border mb-6">
          <span className="font-mono text-cyan-300 font-semibold">{email || "tu correo electrónico"}</span>
        </div>

        <p className="text-sm text-gray-500 mb-8 max-w-sm">
          Haz clic en el enlace del correo para activar tu cuenta. Si no lo ves en tu bandeja de entrada, recuerda revisar la carpeta de <strong>Spam o Correo no deseado</strong>.
        </p>

        <div className="w-full space-y-4">
          <Button 
            variant="outline" 
            className="w-full group" 
            onClick={handleResend}
            disabled={isResending || countdown > 0 || !email}
          >
            {isResending ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <Send className="w-4 h-4 mr-2 group-hover:text-cyan-400 transition-colors" />
            )}
            {countdown > 0 ? `Reenviar disponible en ${countdown}s` : "Reenviar correo de confirmación"}
          </Button>

          <Link href="/login" className="block w-full">
            <Button className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <main className="min-h-screen bg-background text-foreground bg-gaming-gradient flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Wrapping in Suspense because we use useSearchParams */}
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center p-4 z-10">
           <Loader2 className="w-10 h-10 animate-spin text-cyan-400" />
        </div>
      }>
        <VerifyEmailContent />
      </Suspense>
    </main>
  );
}
