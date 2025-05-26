// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Lightbulb, KeyRound, MapPinned, Search, Sparkles, LockKeyhole, Puzzle } from "lucide-react";
import { cn } from "@/lib/utils";

const ClickableEasterEgg = ({ children, secretMessage }: { children: React.ReactNode, secretMessage: string }) => {
  const [clicks, setClicks] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const handleClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    if (newClicks >= 5) {
      setRevealed(true);
      alert(`Easter Egg Encontrado: ${secretMessage}`);
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer transition-transform hover:scale-105 p-4 rounded-lg hover:bg-slate-800/30">
      {children}
      {revealed && <p className="mt-2 text-xs text-green-400 animate-pulse">Segredo revelado!</p>}
    </div>
  );
};

export default function HomePage() {
  const [heroTitle, setHeroTitle] = useState("Descobre os Segredos Escondidos");
  const [secretCode, setSecretCode] = useState("");
  const [cofreAberto, setCofreAberto] = useState(false);

  const handleSecretCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecretCode(e.target.value);
    if (e.target.value.toLowerCase() === "abracadabra") {
      setCofreAberto(true);
    } else {
      setCofreAberto(false);
    }
  };

  useEffect(() => {
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let currentIndex = 0;
    const handler = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === konamiSequence[currentIndex]) {
        currentIndex++;
        if (currentIndex === konamiSequence.length) {
          alert('Konami Code Ativado! ✨ Diversão extra desbloqueada!');
          document.body.classList.toggle('konami-activated');
          currentIndex = 0;
        }
      } else if (event.key.toLowerCase() === konamiSequence[0]) {
        currentIndex = 1;
      } else {
        currentIndex = 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-slate-900/50 text-foreground">

      <section className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 opacity-15 pattern-dots pattern-slate-500 pattern-bg-transparent pattern-size-6 pattern-opacity-20 animate-pulse-slow" // Aumentado opacity para .15, pattern-size para 6 (equivale a 24px se 1 unit = 4px)
          style={{
            backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
            backgroundSize: '24px 24px' // Tamanho do padrão de repetição aumentado
          }}
        ></div>

        <div className="container relative z-10">
          <Lightbulb className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-bounce" />
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight "
            onMouseEnter={() => setHeroTitle("🤫 Shhh... Estás perto!")}
            onMouseLeave={() => setHeroTitle("Descobre os Segredos Escondidos")}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-pink-500 transition-all duration-300 hover:opacity-80">
              {heroTitle}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A aventura começa agora. Cada clique pode revelar uma surpresa. Estás pronto para explorar?
          </p>
          <Button size="lg" className="group relative transition-transform hover:scale-105 active:scale-95" variant="secondary">
            Começar a Caçada!
            <Sparkles className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping absolute right-2 top-1/2 -translate-y-1/2" />
          </Button>
        </div>
      </section>

      <section className="py-16 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Desvenda o Enigma</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-12">
            Pistas estão por toda parte. Observa, interage e descobre o que está oculto à vista de todos.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <ClickableEasterEgg secretMessage="Encontraste a chave mestra dos ícones!">
              <div className="flex flex-col items-center">
                <KeyRound className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Chaves Secretas</h3>
                <p className="text-sm text-muted-foreground">Alguns elementos guardam acesso a... algo mais.</p>
              </div>
            </ClickableEasterEgg>
            <div className="flex flex-col items-center p-6 rounded-lg hover:bg-slate-800/50 transition-colors">
              <Search className="w-12 h-12 text-primary mb-4 transition-transform hover:rotate-[360deg] duration-500" />
              <h3 className="text-xl font-semibold mb-2">Olhar Atento</h3>
              <p className="text-sm text-muted-foreground">Nem tudo é o que parece. Explora os detalhes.</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg hover:bg-slate-800/50 transition-colors">
              <MapPinned className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mapas Inesperados</h3>
              <p className="text-sm text-muted-foreground">Caminhos podem levar a lugares surpreendentes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">Fragmentos do Mapa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 1, title: "O Sussurro da Floresta", special: false },
              { id: 2, title: "O Brilho da Caverna", special: true },
              { id: 3, title: "O Eco da Montanha", special: false }
            ].map((item) => (
              <Card key={item.id} className={cn(
                "bg-slate-800/30 border-slate-700 hover:shadow-primary/20 hover:shadow-lg transition-all duration-300 flex flex-col",
                item.special && "relative overflow-hidden group ring-2 ring-yellow-500/50"
              )}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Puzzle className="w-6 h-6 mr-2 text-primary/80" />
                    {item.title}
                    {item.special && <Sparkles className="w-5 h-5 ml-auto text-yellow-400 animate-pulse group-hover:animate-none" />}
                  </CardTitle>
                  <CardDescription>Um fragmento que te aproxima do desconhecido.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>Informações intrigantes e detalhes que só os mais curiosos notarão...</p>
                  {item.special && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer" onClick={() => alert('Segredo do Card Revelado! Encontraste um mapa raro.')}>
                      <p className="text-yellow-300 text-2xl font-bold p-4 text-center">CLIQUE PARA VER O SEGREDO!</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="text-primary/80 hover:text-primary">Saber mais...</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
          <LockKeyhole className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">O Cofre dos Segredos</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Apenas a palavra-chave correta abrirá o que está guardado. <span className="text-xs italic">(Dica: começa com 'a' e rima com 'mágica')</span>
          </p>
          <div className="max-w-sm mx-auto">
            <input
              type="text"
              value={secretCode}
              onChange={handleSecretCodeInput}
              placeholder="Qual é a senha?"
              className="w-full p-3 rounded-md bg-slate-700/50 border border-slate-600 text-center focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow mb-2"
            />
            {cofreAberto && (
              <div className="mt-4 p-6 bg-green-500/20 border border-green-500 rounded-lg animate-fade-in">
                <h3 className="text-2xl font-bold text-green-300 mb-2">Cofre Aberto!</h3>
                <p className="text-green-200">Parabéns, encontraste um dos maiores segredos!</p>
              </div>
            )}
             {!cofreAberto && secretCode.length > 0 && secretCode.toLowerCase() !== "abracadabra" && (
              <p className="mt-2 text-xs text-red-400">Hmm, essa não parece ser a palavra certa...</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}