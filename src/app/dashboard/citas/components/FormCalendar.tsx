'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { MultiSelect } from './MultiSelect';
import { formatCurrency } from '@/utils';
import { SimplifiedUser, SimplifiedService } from '@/interfaces';
import { DialogClose } from '@/components/ui/dialog';

import { useState } from 'react';
import UserForm from '../../usuarios/components/UserForm';

export interface FormData {
    title: string;
    start: string;
    end?: string;
    client: string;
    services: string[];
}

interface FormCalendarProps {
    onSubmit: (data: FormData) => void;
    onCancel: () => void;
    clients: SimplifiedUser[];
    services: SimplifiedService[];
}

export const FormCalendar = ({ onSubmit, onCancel, clients, services }: FormCalendarProps) => {
    const { register, handleSubmit, reset, watch } = useForm<FormData>();
    const [availableClients, setAvailableClients] = useState<SimplifiedUser[]>(clients);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    const handleFormSubmit: SubmitHandler<FormData> = (data) => {
        console.log("Enviando datos desde FormCalendar:", data);
        onSubmit(data);
        reset();
    };

    const now = new Date().toISOString().slice(0, 16);


    const handleCreateClient = async (newClient: SimplifiedUser) => {
        setAvailableClients((prevClients) => [...prevClients, newClient]);
        setIsUserModalOpen(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <div>
                    <Label htmlFor="title">Título</Label>
                    <Input id="title" {...register('title', { required: true })} />
                </div>

                <div>
                    <Label htmlFor="client">Cliente</Label>
                    <div className="flex items-center gap-2">
                        <Select {...register('client', { required: true })}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un cliente" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableClients
                                    .filter((client) => !!client.id)
                                    .map((client) => (
                                        <SelectItem key={client.id} value={client.id!}>
                                            {client.name} ({client.email})
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setIsUserModalOpen(true)}
                        >
                            Crear Cliente
                        </Button>
                    </div>
                </div>

                <div>
                    <Label htmlFor="services">Servicios</Label>
                    <MultiSelect
                        id="services"
                        options={services
                            .filter((service) => !!service.id)
                            .map((service) => ({
                                value: service.id!,
                                label: `${service.name} (${formatCurrency(service.price)}) - ${service.duration} min`,
                            }))}
                        onChange={(selected) => {
                            reset({ ...watch(), services: selected });
                        }}
                        placeholder="Selecciona los servicios"
                    />
                </div>

                <div>
                    <Label htmlFor="start">Fecha y Hora de Inicio</Label>
                    <Input
                        type="datetime-local"
                        id="start"
                        {...register('start', { required: true })}
                        min={now}
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <DialogClose asChild>
                        <Button type="button" variant="outline" onClick={onCancel}>
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button type="submit">Crear Evento</Button>
                </div>
            </form>

            <UserForm
                isOpen={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
                onSubmit={handleCreateClient}
                initialData={undefined}
                title="Crear Nuevo Cliente"
                submitText="Guardar Cliente"
            />
        </>
    );
};