import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Search from '@/Components/icon/Search'
import colors from 'tailwindcss/colors'
import { Head } from '@inertiajs/inertia-react'

export default function Room(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Room" />
            <div className="flex h-screen pt-16">
                <div className="w-80 h-full border-r border-gray-100 dark:border-slate-800 p-4">
                    <label className="relative block mb-8">
                        <span className="sr-only">Search</span>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <Search color={colors.slate[400]} />
                        </span>
                        <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border dark:bg-gray-900 border-gray-100 dark:border-gray-800 rounded-md py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for my friend..." type="text" name="search" />
                    </label>
                    <ul role="list" class="divide-y divide-gray-800">
                        {['Kristen Ramos', 'Floyd Miles', 'Courtney Henry', 'Ted Fox'].map((name) => (
                            <li class="flex py-4 first:pt-0 last:pb-0">
                                <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                <div class="ml-3 overflow-hidden">
                                    <p class="text-sm font-medium text-slate-900">{name}</p>
                                    <p class="text-sm text-slate-500 truncate">kristen.ramos@example.com</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="grow h-full"></div>
            </div>
        </AuthenticatedLayout>
    );
}
