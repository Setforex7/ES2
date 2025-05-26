"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useCreateUser } from "@/lib/hooks/useCreateUser"; 
import { CreateUserFormData } from "@/lib/types/users"; 
import { Loader2 } from "lucide-react"; 

interface CreateUserFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignInForm({ className, ...props }: CreateUserFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const { createUser, isLoading, error: apiError, successMessage, createdUser } = useCreateUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null); 

    if (password !== passwordConfirmation) {
      setFormError("As passwords não coincidem.");
      return;
    }
    if (password.length < 6) {
      setFormError("A password deve ter pelo menos 6 caracteres.");
      return;
    }
    if (!email) {
        setFormError("O email é obrigatório.");
        return;
    }

    const formData: CreateUserFormData = { email, password };
    if (name) { 
      formData.name = name;
    }

    await createUser(formData);
  };

  useEffect(() => {
    if (successMessage && createdUser) {
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
    }
  }, [successMessage, createdUser]);

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-2xl mx-auto", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8 w-full">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Cria a tua conta</h1>
                <p className="text-muted-foreground text-balance">
                  Regista-te para aceder a todas as funcionalidades.
                </p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="name">Nome (Opcional)</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="O teu nome..."
                  disabled={isLoading}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email-register">Email</Label>
                <Input
                  id="email-register"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ex@example.com..."
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password-register">Password</Label>
                <Input
                  id="password-register"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password..."
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="passwordConfirmation">Confirmar Password</Label>
                <Input
                  id="passwordConfirmation"
                  value={passwordConfirmation}
                  type="password"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="Confirma a password..."
                  required
                  disabled={isLoading}
                />
              </div>

              {(formError || apiError) && (
                <p className="text-sm text-red-500 text-center bg-red-500/10 p-2 rounded-md">
                    {formError || apiError}
                </p>
              )}
              {successMessage && (
                <p className="text-sm text-green-600 text-center bg-green-500/10 p-2 rounded-md">
                    {successMessage} {createdUser && `Bem-vindo, ${createdUser.email}!`}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Criar Conta"
                )}
              </Button>

              <div className="text-center text-sm">
                Já tens uma conta?{" "}
                <a href="/login" className="underline underline-offset-4 hover:text-primary">
                  Faz login
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/images/mickey.jpeg" 
              alt="Imagem de Registo"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Ao clicar Criar Conta, estás a aceitar os nossos <a href="/terms">Termos de serviço</a>{" "}
        e <a href="/privacy">Política de privacidade</a>.
      </div>
    </div>
  );
}