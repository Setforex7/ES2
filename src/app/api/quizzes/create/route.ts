// src/app/api/quizzes/create/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { QuizFormData } from '@/lib/types/quiz';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // NOTA: Numa aplicação real, o ID do utilizador viria de uma sessão de autenticação.
    // Para este exemplo, estamos a usar um valor fixo.
    const creatorId = 1; // Substitua isto pela lógica de autenticação real.

    const body: QuizFormData = await request.json();
    const { title, description, questions } = body;

    if (!title || !questions || questions.length === 0) {
      return NextResponse.json({ error: 'O título e pelo menos uma pergunta são obrigatórios.' }, { status: 400 });
    }

    // Usamos uma transação para garantir que todas as operações (criar quiz, perguntas, opções)
    // sejam bem-sucedidas ou falhem em conjunto.
    const newQuiz = await prisma.$transaction(async (tx) => {
      // 1. Criar o Quiz
      const quiz = await tx.quiz.create({
        data: {
          title,
          description: description || '',
          creatorId,
        },
      });

      // 2. Iterar e criar cada Pergunta e as suas Opções
      for (const questionData of questions) {
        const question = await tx.question.create({
          data: {
            text: questionData.text,
            quizId: quiz.id,
          },
        });

        // Prepara os dados para as opções
        const optionsToCreate = questionData.options.map((opt, index) => ({
          text: opt.text,
          isCorrect: index === questionData.correctOptionIndex,
          questionId: question.id,
        }));

        // 3. Criar todas as opções para a pergunta atual
        await tx.option.createMany({
          data: optionsToCreate,
        });
      }

      return quiz;
    });

    return NextResponse.json(newQuiz, { status: 201 });

  } catch (error) {
    console.error("Falha ao criar o quiz:", error);
    return NextResponse.json({ error: 'Ocorreu um erro ao criar o quiz.' }, { status: 500 });
  }
}