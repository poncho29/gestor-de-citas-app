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
        { bgColor: 'bg-red-100', textColor: 'text-red-600', borderColor: '#DC2626' },
        { bgColor: 'bg-blue-100', textColor: 'text-blue-600', borderColor: '#2563EB' },
        { bgColor: 'bg-green-100', textColor: 'text-green-600', borderColor: '#16A34A' },
        { bgColor: 'bg-yellow-100', textColor: 'text-yellow-600', borderColor: '#CA8A04' },
        { bgColor: 'bg-purple-100', textColor: 'text-purple-600', borderColor: '#7C3AED' },
        { bgColor: 'bg-pink-100', textColor: 'text-pink-600', borderColor: '#DB2777' }
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
                eventContent={(eventInfo) => {
                    const { bgColor, textColor, borderColor } = getRandomColor();
                    return (
                        <div
                            className={`rounded-md px-4 py-2 text-sm shadow-sm w-full h-full flex justify-center items-center mb-1 ${bgColor} ${textColor} border-l-8`}
                            style={{ borderLeftColor: borderColor }}
                        >
                            <span className="font-bold">{eventInfo.timeText}</span> - {eventInfo.event.title}
                        </div>
                    );
                }}

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
