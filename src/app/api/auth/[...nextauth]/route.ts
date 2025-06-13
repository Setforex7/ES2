import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import { prisma } from "@/lib/prisma" 
import type { User } from "@prisma/client"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciais inválidas");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user.password) {
          throw new Error("Utilizador não encontrado ou senha não configurada");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Senha incorreta");
        }
      
        return user;
      }
    })
  ],

 
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const u = user as User
        token.id = u.id;
        token.name = u.name;
        token.email = u.email;
      }
      return token;
    },
    session({ session, token }) {
        if (session.user) {
            session.user.id = token.id as string;
            session.user.name = token.name;
            session.user.email = token.email;
        }
      return session;
    }
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, 
  pages: {
    signIn: '/login', 
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };