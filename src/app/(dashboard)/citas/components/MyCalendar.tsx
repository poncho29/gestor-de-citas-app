'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import FormCalendar from './FormCalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AiOutlinePlus } from 'react-icons/ai';

import { FormData } from './FormCalendar';

import "./styles/myCalendar.css";


const FullCalendar = dynamic(() => import('@fullcalendar/react'), { ssr: false });

const getRandomColor = () => {
    const colors = [
        'border-red-500',
        'border-blue-500',
        'border-green-500',
        'border-yellow-500',
        'border-purple-500',
        'border-pink-500'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

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
        <div className="w-full h-full mx-auto capitalize p-6 bg-white">
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
                contentHeight="75vh"
                slotMinWidth={80}
                eventContent={(eventInfo) => (
                    <div
                        className={`text-black bg-transparent border ${getRandomColor()} rounded-lg px-4 py-2 text-sm shadow-sm w-full h-full flex justify-center items-center mb-1`}
                    >
                        <span className="font-bold">{eventInfo.timeText}</span> - {eventInfo.event.title}
                    </div>
                )}
                slotLabelFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                }}
                slotDuration="00:30:00"
                dayCellClassNames="border border-gray-200"
            />

            <div className="flex justify-end mt-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-200 flex items-center gap-2 px-4 py-2 rounded-lg">
                            <AiOutlinePlus size={18} />
                            Agregar Evento
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md bg-white shadow-md rounded-lg p-6">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-semibold text-gray-800">Crear Evento</DialogTitle>
                        </DialogHeader>
                        <FormCalendar onSubmit={handleEventSubmit} onCancel={handleCancel} />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
