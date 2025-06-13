import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
    ) {
    try {
        const quizId = parseInt(params.id, 10);
        await prisma.quiz.delete({
        where: { id: quizId },
        });

        return NextResponse.json({ message: 'Quiz apagado com sucesso' }, { status: 200 });
    } catch (error) {
        console.error("Falha ao apagar o quiz:", error);
        return NextResponse.json({ error: 'Não foi possível apagar o quiz.' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
    ) {
    try {
        const quizId = parseInt(params.id, 10);
        const { isActive } = await request.json();

        if (typeof isActive !== 'boolean') {
        return NextResponse.json(
            { error: 'O valor de "isActive" é inválido.' },
            { status: 400 }
        );
        }

        const updatedQuiz = await prisma.quiz.update({
        where: { id: quizId },
        data: { isActive },
        });

        return NextResponse.json(updatedQuiz, { status: 200 });
    } catch (error) {
        console.error("Falha ao atualizar o quiz:", error);
        return NextResponse.json(
        { error: 'Não foi possível atualizar o quiz.' },
        { status: 500 }
        );
    }
}