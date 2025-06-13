// src/components/quiz/CreateQuizForm.tsx

'use client';

import { useState } from 'react';
import { useForm, useFieldArray, Control, UseFormRegister } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, PlusCircle } from 'lucide-react';
import type { QuizFormData } from '@/lib/types/quiz';

function OptionsArray({
  qIndex,
  control,
  register,
}: {
  qIndex: number;
  control: Control<QuizFormData>;
  register: UseFormRegister<QuizFormData>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${qIndex}.options`,
  });

  return (
    <div className="space-y-4 pt-2">
      <Label>Opções de Resposta (Marque a correta)</Label>
      <div className="space-y-3">
        {fields.map((option, oIndex) => (
          <div key={option.id} className="flex items-center gap-3">
            <input
              type="radio"
              id={`q${qIndex}-o${oIndex}`}
              {...register(`questions.${qIndex}.correctOptionIndex`, { valueAsNumber: true })}
              value={oIndex}
              className="h-4 w-4 accent-primary focus:ring-primary"
            />
            <Label htmlFor={`q${qIndex}-o${oIndex}`} className="sr-only">
              Marcar opção {oIndex + 1} como correta
            </Label>
            <Input
              placeholder={`Texto da opção ${oIndex + 1}`}
              {...register(`questions.${qIndex}.options.${oIndex}.text`, {
                required: 'O texto da opção é obrigatório',
              })}
              className="flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => remove(oIndex)}
            >
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="mt-2"
        onClick={() => append({ text: '' })}
      >
        <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Opção
      </Button>
    </div>
  );
}

export function CreateQuizPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuizFormData>({
    defaultValues: {
      title: '',
      description: '',
      questions: [{ text: '', options: [{ text: '' }, { text: '' }], correctOptionIndex: 0 }],
    },
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = async (data: QuizFormData) => {
    try {
      const response = await fetch('/api/quizzes/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao enviar o formulário');
      }

      console.log('Quiz criado com sucesso:', await response.json());
      setIsOpen(false);
      reset();
    } catch (error) {
      console.error(error);
      alert(`Erro ao criar o quiz: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Criar Novo Quiz</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar um Novo Quiz</DialogTitle>
          <DialogDescription>
            Preencha os detalhes abaixo. Pode adicionar várias perguntas e opções.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Quiz</Label>
              <Input id="title" {...register('title', { required: 'O título é obrigatório' })} />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição (Opcional)</Label>
              <Input id="description" {...register('description')} />
            </div>
          </div>

          <div className="space-y-5">
            {fields.map((question, qIndex) => (
              <Card key={question.id} className="bg-muted/50">
                <CardHeader className="flex flex-row items-center justify-between py-4">
                  <CardTitle className="text-lg">Pergunta {qIndex + 1}</CardTitle>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(qIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remover Pergunta</span>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`q-text-${qIndex}`}>Texto da Pergunta</Label>
                    <Input
                      id={`q-text-${qIndex}`}
                      placeholder="Qual é a capital de Portugal?"
                      {...register(`questions.${qIndex}.text`, { required: 'O texto da pergunta é obrigatório.' })}
                    />
                    {errors.questions?.[qIndex]?.text && (
                      <p className="text-sm text-red-500">{errors.questions[qIndex].text?.message}</p>
                    )}
                  </div>
                  <OptionsArray control={control} qIndex={qIndex} register={register} />
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => append({ text: '', options: [{ text: '' }, { text: '' }], correctOptionIndex: 0 })}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Pergunta
          </Button>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancelar</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'A Guardar...' : 'Guardar Quiz'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}