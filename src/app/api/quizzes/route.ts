// src/app/api/quizzes/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const quizzes = await prisma.quiz.findMany({
      orderBy: {
        createdAt: 'desc', 
      },
      include: {
        creator: { 
          select: {
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            questions: true,
          },
        },
      },
    });
    return NextResponse.json(quizzes);
  } catch (error) {
    console.error("Falha ao obter os quizzes:", error);
    return NextResponse.json({ error: 'Não foi possível obter os quizzes.' }, { status: 500 });
  }
}