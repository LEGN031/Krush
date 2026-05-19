import Link from "next/link";
import { Gamepad2 } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-primary/10 rounded-lg group-hover:glow-effect-green transition-all duration-300">
            <Gamepad2 className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-wider text-foreground group-hover:text-primary transition-colors">
            KRUSH
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link href="/store" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
            Tienda
          </Link>
          <Link href="/community" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
            Comunidad
          </Link>
          <Link href="/support" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
            Soporte
          </Link>
        </div>
      </div>
    </nav>
  );
}
