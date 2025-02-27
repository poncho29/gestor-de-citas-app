'use client';

import React, { useState, useEffect } from 'react';

import dynamic from 'next/dynamic';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';

import { FormCalendar, FormData } from './FormCalendar';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

import { getRandomColor } from '@/utils/getRandomColor';

import { AiOutlinePlus } from 'react-icons/ai';

import { Appointment } from '@/interfaces';

import "./styles/myCalendar.css";

const FullCalendar = dynamic(() => import('@fullcalendar/react'), { ssr: false });

interface Props {
    appointments: Appointment[];
}

export const MyCalendar = ({ appointments }: Props) => {
    const [events, setEvents] = useState<FormData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setEvents([
                {
                    title: 'Evento de prueba',
                    start: new Date().toISOString(),
                    end: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
                },
            ]);
            setLoading(false);
        }, 2000);
    }, []);

    const handleEventSubmit = (data: FormData) => {
        setEvents((prevEvents) => [...prevEvents, { ...data }]);
    };

    const handleCancel = () => {
        console.log('Formulario cancelado');
    };

    const formatedAppointments = appointments.map((appointment) => ({
        title: `Cita con ${appointment.user.name}`,
        start: new Date(appointment.start_time).toISOString(),
        end: new Date(appointment.end_time).toISOString(),
    }));

    return (
        <div className="w-full h-screen p-4 flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
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
            <div className="w-full flex-grow h-[85vh] overflow-hidden">
                {loading ? (
                    <div className="w-full h-full flex flex-col gap-4">
                        <Skeleton className="h-10 w-full rounded-md" />
                        <Skeleton className="h-[70vh] w-full rounded-md" />
                    </div>
                ) : (
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin]}
                        initialView="dayGridMonth"
                        events={formatedAppointments}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        locale={esLocale}
                        height="100%"
                        contentHeight="auto"
                        eventContent={(eventInfo) => {
                            const { bgColor, textColor, borderColor } = getRandomColor();
                            return (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div
                                                className={`rounded-md px-2 py-1 text-xs sm:text-sm shadow-sm flex items-center border-l-4 ${bgColor} ${textColor} overflow-hidden text-ellipsis whitespace-nowrap`}
                                                style={{ borderLeftColor: borderColor, maxWidth: '100%' }}
                                            >
                                                <span className="font-bold">{eventInfo.timeText}</span> - {eventInfo.event.title}
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-gray-800 text-white p-2 rounded-md shadow-lg">
                                            {eventInfo.event.title}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
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
                )}
            </div>
        </div>
    );
}
