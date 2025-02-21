'use client'

import React, { useState } from 'react';

import Image from 'next/image';

import { useAuth } from '@/context/hook/useAuth';

import SidebarLink from './SidebarLinks';

import { AiOutlineHome, AiOutlineSearch, AiOutlineMenu, AiOutlineUser, AiOutlineCalendar, AiOutlineLogout, AiOutlineBank } from "react-icons/ai";

export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { user, logoutCtx } = useAuth();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div
                className={`fixed lg:relative h-screen shadow-xl px-3 w-60 overflow-x-hidden transition-transform duration-300 ease-in-out
                bg-white z-50 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                <div className="space-y-3 mt-5">
                    <div id="profile" className="space-y-3 text-center">
                        <Image
                            src="/barberia.jpg"
                            alt="avatar"
                            width={200}
                            height={200}
                            className="w-20 h-20 rounded-full mx-auto"
                        />
                        <div>
                            <h2 className="font-medium text-xs md:text-sm text-blue-500">
                                {user && user?.name}
                            </h2>
                            <p className="text-xs text-gray-500">{user && user?.roles[0]}</p>
                        </div>
                    </div>

                    <div className="flex px-3 border-2 rounded-md focus-within:border focus-within:ring-2 ring-blue-500 border-gray-200 mb-4">
                        <input
                            type="text"
                            className="w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm focus:outline-none text-gray-600 md:mr-2"
                            placeholder="Buscar..."
                        />
                        <button className="rounded-tr-md rounded-br-md px-2 hidden md:block">
                            <AiOutlineSearch />
                        </button>
                    </div>

                    <div className="flex flex-col gap-1">
                        <SidebarLink href="/dashboard/citas" text="Citas" icon={<AiOutlineCalendar />} />
                        <SidebarLink href="/dashboard/servicios" text="Servicios" icon={<AiOutlineHome />} />
                        <SidebarLink href="/dashboard/usuarios" text="Usuarios" icon={<AiOutlineUser />} />
                        <SidebarLink href="/dashboard/empresas" text="Empresas" icon={<AiOutlineBank />} />
                    </div>
                </div>

                <div className="absolute bottom-3 w-full">
                    <button
                        className="text-sm flex items-center font-medium text-gray-700 py-2 px-3 hover:text-red-500 hover:scale-105 rounded-md transition duration-150 ease-in-out w-full"
                        aria-label="Logout"
                        onClick={logoutCtx}
                    >
                        <AiOutlineLogout className="mr-2" />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </div>

            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={toggleSidebar}
                    className="text-gray-700 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md"
                >
                    <AiOutlineMenu size={24} />
                </button>
            </div>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
}
