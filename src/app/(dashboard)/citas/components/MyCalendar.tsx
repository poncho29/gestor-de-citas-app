'use client'

import React, { useState } from 'react';

import dynamic from 'next/dynamic';

import FormCalendar from './FormCalendar';

import dayGridPlugin from '@fullcalendar/daygrid';

import timeGridPlugin from '@fullcalendar/timegrid';

import esLocale from '@fullcalendar/core/locales/es';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { FormData } from './FormCalendar';

const FullCalendar = dynamic(() => import('@fullcalendar/react'), { ssr: false });

export default function MyCalendar() {
    const [events, setEvents] = useState<FormData[]>([
        {
            title: 'Evento de prueba',
            start: new Date().toISOString(),
            end: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
        },
    ]);

    const handleEventSubmit = (data: FormData) => {
        setEvents((prevEvents) => [
            ...prevEvents,
            {
                title: data.title,
                start: data.start,
                end: data.end,
            },
        ]);
    };

    const handleCancel = () => {
        console.log('Formulario cancelado');
    };

    return (
        <div className="w-[80vw] h-[60vh] mx-auto">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                locale={esLocale}
                dayCellClassNames="day-cell"
                contentHeight="80vh"
                slotMinWidth={80}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: 'short',
                }}
                slotLabelFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                }}
                slotDuration="00:30:00"
            />

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mt-4">Agregar Evento</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crear Evento</DialogTitle>
                    </DialogHeader>
                    <FormCalendar onSubmit={handleEventSubmit} onCancel={handleCancel} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
