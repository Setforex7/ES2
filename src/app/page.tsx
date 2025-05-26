import { LoginForm } from "@/components/login-form";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <LoginForm />
      </div>
    </div>
  );
}
