import React, { useEffect, useState } from 'react'
import colors from 'tailwindcss/colors'
import ApplicationLogo from '@/Components/ApplicationLogo'
import Notification from '@/Components/icon/Notification'
import TwoUser from '@/Components/icon/TwoUser'
import Moon from '@/Components/icon/Moon'
import Sun from '@/Components/icon/Sun'
import Dropdown from '@/Components/Dropdown'
import NavLink from '@/Components/NavLink'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink'
import { Link } from '@inertiajs/inertia-react'

export default function Authenticated({ auth, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  const [themeMode, SetThemeMode] = useState('ligth')

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      SetThemeMode('dark')
    } else {
      SetThemeMode('ligth')
    }
  }, [])

  return (
    <div className={themeMode}>
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
        <nav className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 fixed w-screen max-h-16">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="shrink-0 flex items-center">
                  <Link href="/">
                    <ApplicationLogo color={themeMode === 'dark' ? 'white' :  colors.gray[900]} />
                  </Link>
                </div>

                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                  <NavLink href={route('room')} active={route().current('room')}>Room</NavLink>
                </div>
              </div>

              <div className="hidden sm:flex sm:items-center sm:ml-6">
                <div className="ml-3"><TwoUser color={themeMode === 'dark' ? 'white' :  colors.gray[900]} /></div>
                <div className="ml-3"><Notification color={themeMode === 'dark' ? 'white' :  colors.gray[900]} /></div>
                <div className="ml-3 relative">
                  <Dropdown>
                    <Dropdown.Trigger>
                      <div className="border-l border-slate-200 ml-6 pl-6 dark:border-slate-800">
                        <button type="button" className="inline-flex items-center p-2 font-medium focus:outline-none transition ease-in-out duration-150">
                          {themeMode === "ligth" ? <Sun /> : <Moon color="white" />}
                        </button>
                      </div>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                      <button onClick={() => SetThemeMode('ligth')} className="flex items-center w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
                        <Sun /><span className="ml-2">Light</span>
                      </button>
                      <button onClick={() => SetThemeMode('dark')} className="flex items-center w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
                        <Moon /><span className="ml-2">Dark</span>
                      </button>
                    </Dropdown.Content>
                  </Dropdown>
                </div>
                <div className="ml-3 relative">
                  <Dropdown>
                    <Dropdown.Trigger>
                      <button type="button" className="inline-flex items-center p-2 text-sm leading-4 font-medium text-gray-500 dark:text-white focus:outline-none transition ease-in-out duration-150">
                        {auth.user.name}
                        <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                      <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                    </Dropdown.Content>
                  </Dropdown>
                </div>
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                <button onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                >
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
            <div className="pt-2 pb-3 space-y-1">
              <ResponsiveNavLink href={route('room')} active={route().current('room')}>Room</ResponsiveNavLink>
            </div>

            <div className="pt-4 pb-1 border-t border-gray-200">
              <div className="px-4">
                <div className="font-medium text-base text-gray-800">{auth.user.name}</div>
                <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
              </div>

              <div className="mt-3 space-y-1">
                <ResponsiveNavLink method="post" href={route('logout')} as="button">Log Out</ResponsiveNavLink>
              </div>
            </div>
          </div>
        </nav>

        <main>{children}</main>
      </div>
    </div>
  );
}
