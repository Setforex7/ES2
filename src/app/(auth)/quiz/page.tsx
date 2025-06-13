'use client';

import { useState, useEffect, useCallback } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { CreateQuizPopup } from '@/components/shared/createQuizForm';

type QuizData = {
  id: number;
  title: string;
  isActive: boolean;
  createdAt: string;
  winnersCount: number;
  _count: {
    questions: number;
  };
};

export default function ManageQuizzesPage() {
    const [quizzes, setQuizzes] = useState<QuizData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [quizToDelete, setQuizToDelete] = useState<number | null>(null);

    const fetchQuizzes = useCallback(async () => {
        setLoading(true);
        try {
        const response = await fetch('/api/quizzes');
        if (!response.ok) throw new Error('Falha ao carregar os dados');
        const data = await response.json();
        setQuizzes(data);
        } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido');
        } finally {
        setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchQuizzes();
    }, [fetchQuizzes]);

  const openDeleteDialog = (id: number) => {
    setQuizToDelete(id);
    setIsAlertOpen(true);
  };

  const handleDelete = async () => {
    if (quizToDelete === null) return;
    try {
      await fetch(`/api/quizzes/${quizToDelete}`, { method: 'DELETE' });
      setQuizzes(quizzes.filter((quiz) => quiz.id !== quizToDelete));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao apagar');
    } finally {
        setIsAlertOpen(false);
        setQuizToDelete(null);
    }
  };

  const handleToggleStatus = async (quizId: number, currentStatus: boolean) => {
    try {
        const response = await fetch(`/api/quizzes/${quizId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isActive: !currentStatus }),
        });
        if (!response.ok) throw new Error('Falha ao atualizar o estado');
        const updatedQuiz = await response.json();
        setQuizzes(quizzes.map(q => q.id === quizId ? { ...q, isActive: updatedQuiz.isActive } : q));
    } catch (err) {
        alert(err instanceof Error ? err.message : 'Erro ao alterar o estado');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gerir Quizzes</h1>
        <CreateQuizPopup />
      </div>

      {loading && <p>A carregar quizzes...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título do Quiz</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="text-center">Nº de Perguntas</TableHead>
                <TableHead className="text-center">Vencedores</TableHead>
                <TableHead className="text-center">Criado em</TableHead>
                <TableHead><span className="sr-only">Ações</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                  <TableRow key={quiz.id}>
                    <TableCell className="font-medium">{quiz.title}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${quiz.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span>{quiz.isActive ? 'Ativo' : 'Inativo'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{quiz._count.questions}</TableCell>
                    <TableCell className="text-center">{quiz.winnersCount}</TableCell>
                    <TableCell className="text-center">{new Date(quiz.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleToggleStatus(quiz.id, quiz.isActive)}>
                            {quiz.isActive ? 'Desativar' : 'Ativar'}
                          </DropdownMenuItem>
                          <DropdownMenuItem disabled>Editar</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => openDeleteDialog(quiz.id)} className="text-red-500 focus:text-red-500">
                            Apagar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Ainda não foram criados quizzes.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação irá apagar permanentemente o quiz e todos os dados associados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Apagar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}