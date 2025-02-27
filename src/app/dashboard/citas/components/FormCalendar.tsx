'use client'

import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface FormData {
    title: string;
    start: string;
    end: string;
}

interface FormCalendarProps {
    onSubmit: (data: FormData) => void;
    onCancel: () => void;
}

export const FormCalendar = ({ onSubmit, onCancel }: FormCalendarProps) => {
    const { register, handleSubmit, reset, watch } = useForm<FormData>();

    const handleFormSubmit: SubmitHandler<FormData> = (data) => {
        onSubmit(data);
        reset();
    };

    const now = new Date().toISOString().slice(0, 16);

    const startDate = watch("start", now);

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">

            <div>
                <Label htmlFor="title">Título</Label>
                <Input
                    id="title"
                    {...register('title', { required: 'El título es obligatorio' })}
                />
            </div>

            <div>
                <Label htmlFor="start">Fecha y Hora de Inicio</Label>
                <Input
                    type="datetime-local"
                    id="start"
                    {...register('start', { required: 'La fecha y hora de inicio son obligatorias' })}
                    min={now}
                />
            </div>


            <div>
                <Label htmlFor="end">Fecha y Hora de Fin</Label>
                <Input
                    type="datetime-local"
                    id="end"
                    {...register('end', {
                        required: 'La fecha y hora de fin son obligatorias',
                        validate: (value) => value > startDate || "La hora de fin debe ser después de la de inicio"
                    })}
                    min={startDate}
                />
            </div>


            <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit">Crear Evento</Button>
            </div>
        </form>
    );
}
