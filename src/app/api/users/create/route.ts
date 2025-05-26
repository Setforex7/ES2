// src/app/api/users/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, User } from '@/generated/prisma'; 
import bcrypt from 'bcryptjs';
import { CreateUserFormData, CreatedUser, ApiErrorResponse } from '@/lib/types/users'; 

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body: CreateUserFormData = await req.json();
    const { email, name, password } = body;

    if (!email || !password) {
      const errorResponse: ApiErrorResponse = { message: 'Email e password são obrigatórios.' };
      return NextResponse.json(errorResponse, { status: 400 });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      const errorResponse: ApiErrorResponse = { message: 'Formato de email inválido.' };
      return NextResponse.json(errorResponse, { status: 400 });
    }
    if (password.length < 6) {
      const errorResponse: ApiErrorResponse = { message: 'A password deve ter pelo menos 6 caracteres.' };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      const errorResponse: ApiErrorResponse = { message: 'Este email já está registado.' };
      return NextResponse.json(errorResponse, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserFromDb: User = await prisma.user.create({
      data: {
        email,
        name: name || null,
        password: hashedPassword,
      },
    });

    const createdUserResponse: CreatedUser = {
      id: newUserFromDb.id,
      email: newUserFromDb.email,
      name: newUserFromDb.name,
      createdAt: newUserFromDb.createdAt,
      updatedAt: newUserFromDb.updatedAt,
    };

    return NextResponse.json(
      { user: createdUserResponse, message: 'Utilizador criado com sucesso!' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Erro ao criar utilizador:', error);
    const errorResponse: ApiErrorResponse = { message: 'Ocorreu um erro no servidor ao criar o utilizador.' };
    return NextResponse.json(errorResponse, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}