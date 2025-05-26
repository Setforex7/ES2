import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export function Footer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <footer className="bg-black-200 w-full mt-auto">
        <div className="container flex flex-wrap items-center justify-center px-4 py-8 mx-auto lg:justify-between">
            <div className="flex flex-wrap justify-center">
                <ul className="flex items-center space-x-10">
                <li><Link href="/">Início</Link></li>
                <li><Link href="/about">Sobre</Link></li>
                <li><Link href="/contact">Contacta-nos</Link></li>
                <li><Link href="/terms">Termos e condições</Link></li>
            </ul>
        </div>
            <div className="flex justify-center space-x-4 mt-4 lg:mt-0">
                <Link href="#"><Facebook /></Link>
                <Link href="#"><Twitter /></Link>
                <Link href="#"><Instagram /></Link>
                <Link href="#"><Linkedin /></Link>
            </div>
        </div>
        <div className="pb-2">
            <p className="text-center">
                © {new Date().getFullYear()} Todos os direitos reservados. <br />
            </p>
        </div>
    </footer>
  )
}
