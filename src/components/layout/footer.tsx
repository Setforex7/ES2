import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter, Rss } from 'lucide-react';
import { cn } from '@/lib/utils'; 

interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

export function Footer({ className, ...props }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
  ];

  const footerNavLinks = [
    { href: "/", label: "Início" },
    { href: "/sobre", label: "Sobre Nós" },
    { href: "/contacto", label: "Contacta-nos" }, 
    { href: "/termos", label: "Termos e Condições" }, 
  ];

  return (
    <footer
      className={cn(
        "w-full border-t border-border/60 bg-background text-foreground", 
        className 
      )}
      {...props}
    >
      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 lg:justify-start" aria-label="Footer navigation">
            {footerNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex justify-center space-x-5">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} TeuSite. Todos os direitos reservados.
          </p>
          <p className="mt-1 text-xs text-slate-500 hover:text-primary transition-colors cursor-help" title="Desenvolvido com paixão e alguns easter eggs!">
            Uma pitada de mistério em cada pixel.
          </p>
        </div>
      </div>
    </footer>
  );
}