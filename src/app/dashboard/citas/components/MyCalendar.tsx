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
import { Appointment, SimplifiedUser, SimplifiedService } from '@/interfaces';
import { getUsers } from '@/actions/users';
import { getServices } from '@/actions/services';
import { getAppointments } from '@/actions';

import "./styles/myCalendar.css"; // Importa los estilos personalizados

const FullCalendar = dynamic(() => import('@fullcalendar/react'), { ssr: false });

interface Props {
    initialAppointments: Appointment[];
}

export const MyCalendar = ({ initialAppointments }: Props) => {
    const [events, setEvents] = useState<FormData[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments || []);
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState<SimplifiedUser[]>([]);
    const [services, setServices] = useState<SimplifiedService[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedClients = await getUsers();
                const fetchedServices = await getServices(100, 0);

                const result = await getAppointments();

                if (result.ok && Array.isArray(result.data?.appointments)) {
                    setAppointments(result.data.appointments);
                } else {
                    console.error("Error al cargar citas:", result.error || "Datos inválidos");
                }

                setClients(fetchedClients);
                setServices(fetchedServices);

                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            } catch (error) {
                console.error("Error al cargar datos:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEventSubmit = (data: FormData) => {
        const newEvent = {
            title: data.title,
            start: data.start,
            end: data.end || new Date(new Date(data.start).getTime() + 60 * 60 * 1000).toISOString(),
            client: data.client,
            services: data.services,
        };

        setEvents((prevEvents) => {
            const updatedEvents = [...prevEvents, newEvent];
            console.log("Estado actualizado de events:", updatedEvents);
            return updatedEvents;
        });
    };

    const formattedAppointments = Array.isArray(appointments)
        ? appointments.map((appointment) => ({
            title: `Cita con ${appointment.user.name}`,
            start: new Date(appointment.start_time).toISOString(),
            end: new Date(appointment.end_time).toISOString(),
        }))
        : [];

    return (
        <div className="w-full h-screen p-4 flex flex-col">
            {/* Botón "Agregar Evento" */}
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
                        <FormCalendar
                            onSubmit={handleEventSubmit}
                            onCancel={() => { }}
                            clients={clients}
                            services={services}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Calendario */}
            <div className="w-full flex-grow overflow-hidden">
                {loading ? (
                    <div className="w-full h-full flex flex-col gap-4">
                        <Skeleton className="h-10 w-full rounded-md" />
                        <Skeleton className="h-[70vh] w-full rounded-md" />
                    </div>
                ) : (
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin]}
                        initialView="dayGridMonth"
                        events={[...formattedAppointments, ...events]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        locale={esLocale}
                        height="100%" // Asegura que el calendario ocupe toda la altura
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
};