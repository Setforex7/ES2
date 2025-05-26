// app/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
// Importa os ícones que planeias usar (exemplos da lucide-react)
// import { Search, Egg, Film, Gamepad, Code, Database, UsersCheck, Sparkles, Send } from "lucide-react";

export default function HomePage() {
  const easterEggTypes = [
    {
      title: "Jogos Épicos",
      description: "Descobre níveis secretos, itens escondidos e referências hilariantes nos teus videojogos favoritos.",
      categoryLink: "/easter-eggs/games"
    },
    {
      title: "Cinema e Séries",
      description: "Desde cameos subtis a mensagens ocultas no cenário, o mundo do cinema está cheio de surpresas.",
      categoryLink: "/easter-eggs/movies"
    },
    {
      title: "Mistérios do Software",
      description: "Explora os segredos que os programadores deixaram para trás, de comandos ocultos a piadas internas.",
      categoryLink: "/easter-eggs/software"
    },
  ];

  const platformFeatures = [
    {
      title: "Base de Dados Gigante",
      description: "A nossa coleção de Easter Eggs não para de crescer, abrangendo todas as tuas mídias preferidas!",
    },
    {
      title: "Comunidade de Detetives",
      description: "Encontraste um segredo? Partilha com outros caçadores e ajuda a expandir o nosso universo de descobertas.",
    },
    {
      title: "Filtros de Mestre",
      description: "Pesquisa e filtra facilmente para encontrares exatamente o Easter Egg que procuras, quando quiseres.",
    },
  ];

  // Define um padding vertical padrão para as secções para consistência
  const sectionPadding = "py-12 md:py-20 lg:py-24";

  return (
    <main className="flex-grow">
      <section className={`container mx-auto grid items-center gap-6 ${sectionPadding}`}>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            A Caça aos Tesouros Escondidos Começa!
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
            Mergulha no universo dos Easter Eggs! Explora segredos em jogos, filmes, software e mais. Prepara-te para a descoberta!
          </p>
        </div>
        <div className="mx-auto flex w-full max-w-md flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/explore" passHref>
            <Button size="lg" className="w-full sm:w-auto">
              Explorar Coleção
            </Button>
          </Link>
          <Link href="/submit-egg" passHref>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Submeter um Achado
            </Button>
          </Link>
        </div>
      </section>

      <section id="egg-types" className={`container mx-auto space-y-10 ${sectionPadding}`}>
        <div className="mx-auto flex max-w-xl flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl">Mergulha nos Tipos de Segredos</h2>
          <p className="leading-normal text-muted-foreground sm:text-lg">
            De referências culturais a funcionalidades secretas, os Easter Eggs são incrivelmente diversos.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-4xl lg:grid-cols-3 lg:max-w-6xl">
          {easterEggTypes.map((type) => (
            <Card key={type.title} className="bg-card text-card-foreground flex flex-col text-center items-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="items-center">
                
                <CardTitle className="text-2xl">{type.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{type.description}</p>
              </CardContent>
              <CardFooter>
                <Link href={type.categoryLink} passHref>
                  <Button variant="ghost" className="text-primary hover:text-primary/80">
                    Ver mais em {type.title.split(' ')[0]}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section id="platform-features" className={`space-y-10 ${sectionPadding} bg-slate-50/30 dark:bg-black/20 dark:border-y dark:border-border/10`}>
        <div className="container mx-auto"> 
            <div className="mx-auto flex max-w-xl flex-col items-center space-y-4 text-center mb-10 md:mb-12">
                <h2 className="text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl">O Teu Arsenal de Caçador</h2>
                <p className="leading-normal text-muted-foreground sm:text-lg">
                    Tudo o que precisas para a tua jornada de descoberta e partilha de Easter Eggs.
                </p>
            </div>
            <div className="mx-auto grid justify-center gap-x-8 gap-y-10 sm:grid-cols-1 md:max-w-2xl lg:grid-cols-3 lg:max-w-5xl">
            {platformFeatures.map((feature) => (
                <div key={feature.title} className="flex flex-col items-center text-center p-4">
                
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
            ))}
            </div>
        </div>
      </section>

      <section id="cta" className={`w-full bg-primary text-primary-foreground ${sectionPadding}`}>
        <div className="container mx-auto flex max-w-2xl flex-col items-center justify-center gap-5 text-center px-4">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl">
            Pronto para te Tornares uma Lenda?
          </h2>
          <p className="max-w-lg leading-normal sm:text-lg">
            Cria a tua conta para guardar os teus achados, votar nos favoritos e submeter os teus próprios Easter Eggs para a comunidade!
          </p>
          <Link href="/register" passHref>
            <Button size="lg" variant="secondary" className="mt-4 px-8 py-6 text-lg">
              Juntar-me à Caçada!
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}