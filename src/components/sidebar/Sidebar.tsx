'use client'

import React, { useState } from 'react'

import Image from 'next/image'


import { IoSearchOutline } from 'react-icons/io5'
import { AiOutlineLogout } from 'react-icons/ai'
import { FaBars } from 'react-icons/fa'

import SidebarLink from './SidebarLinks'

import { BiCalendar } from 'react-icons/bi'


export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }
    return (
        <div className="h-full ">
            <div className="md:hidden p-4">
                <button onClick={toggleSidebar} className="text-gray-700">
                    <FaBars size={24} />
                </button>
            </div>
            <div
                className={`h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0`}
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
                                Sebas
                            </h2>
                            <p className="text-xs text-gray-500">Administrador</p>
                        </div>
                    </div>

                    <div className="flex px-3 border-2 rounded-md focus-within:border focus-within:ring-2 ring-blue-500 border-gray-200 mb-4">
                        <input
                            type="text"
                            className="w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm focus:outline-none text-gray-600 md:mr-2"
                            placeholder="Search"
                        />
                        <button className="rounded-tr-md rounded-br-md px-2 hidden md:block">
                            <IoSearchOutline />
                        </button>
                    </div>


                    <div className="flex flex-col">
                        <SidebarLink href="/dashboard/date" text="Citas" icon={<BiCalendar />} />
                    </div>

                </div>


                <div className="absolute bottom-3 w-full">
                    <button
                        className="text-sm flex items-center font-medium text-gray-700 py-2 px-3 hover:text-red-500 hover:scale-105 rounded-md transition duration-150 ease-in-out w-full"
                        aria-label="Logout"
                    >
                        <AiOutlineLogout className="mr-2" />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
