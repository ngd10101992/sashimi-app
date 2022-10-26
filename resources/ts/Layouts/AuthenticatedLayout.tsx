import React, { useEffect, useRef, useState } from 'react'
import { Link, useForm } from '@inertiajs/inertia-react'
import { AuthType, UserType } from '../common/type'
import ThemeContextProvider, { useTheme } from '../Providers/ThemeContextProvider'
import ApplicationLogo from '../Components/ApplicationLogo'
import Notification from '../Components/icon/Notification'
import TwoUser from '../Components/icon/TwoUser'
import Moon from '../Components/icon/Moon'
import Sun from '../Components/icon/Sun'
import Dropdown from '../Components/Dropdown'
import NavLink from '../Components/NavLink'
import ResponsiveNavLink from '../Components/ResponsiveNavLink'
import Modal, { ModalHandle } from '../Components/Modal'
import Avatar from '../Pages/Profile/Avatar'
import Info from '../Pages/Profile/Info'
import Password from '../Pages/Profile/Password'
import List from '../Pages/Users/List'
import UserAdd, { AddUser } from '../Components/UserAdd'

declare var route: (string?: string) => any
declare var Pusher: any

export default function Authenticated({ auth, addList, children }: {children: React.ReactNode, addList:[], auth: AuthType}) {
  const { light, dark } = useTheme()
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false)
  const [themeMode, setThemeMode] = useState(true)
  const [profileTab, SetprofileTab] = useState<'avatar' | 'info' | 'password' | ''>('')
  const modalRef = useRef<ModalHandle>(null)
  const [badge, setBadge] = useState<number>(0)
  const [adds, setAdds] = useState<AddUser[]>(addList)

  useEffect(() => {
    const pusher = new Pusher('2d240a8e1585e1883a5e', {
      cluster: 'ap3',
      authEndpoint: '/broadcasting/auth'
    })

    const channel = pusher.subscribe('private-user.' + auth.user.id)
    channel.bind('AddFriendPusherEvent', function({ userAdd }: {userAdd: AddUser}) {
      setAdds(prev => {
        const newPrev = [...prev]
        newPrev.unshift(userAdd)
        return newPrev
      })
      setBadge(prev => prev + 1)
    })
  }, [])

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setThemeMode(false)
    } else {
      setThemeMode(true)
    }
  }, [])

  useEffect(() => {
    if (!profileTab.length) return
    openModalProfile()
  }, [profileTab])

  function openModalProfile() {
    if (!modalRef.current) throw Error("divRef is not assigned")

    let body = <Avatar />
    switch (profileTab) {
      case 'info':
        body = <Info />
        break;
      case 'password':
        body = <Password />
        break;
      default:
        break;
    }
    const data = {
      header: (
        <>
          <button className={`h-full dark:text-white inline-flex items-center px-7 ${profileTab === 'avatar' || profileTab === '' ? 'border-b-2 border-indigo-400 dark:border-cyan-500 ' : ''}text-sm text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out`} onClick={() => SetprofileTab('avatar')}>Avatar</button>
          <button className={`h-full dark:text-white inline-flex items-center px-7 ${profileTab === 'info' ? 'border-b-2 border-indigo-400 dark:border-cyan-500 ' : ''}text-sm text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out`} onClick={() => SetprofileTab('info')}>Info</button>
          <button className={`h-full dark:text-white inline-flex items-center px-7 ${profileTab === 'password' ? 'border-b-2 border-indigo-400 dark:border-cyan-500 ' : ''}text-sm text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out`} onClick={() => SetprofileTab('password')}>Password</button>
        </>
      ),
      body: body
    }

    modalRef.current.open(data)
  }

  return (
    <ThemeContextProvider>
      <div className={themeMode ? 'light' : 'dark'}>
        <Modal ref={modalRef} />
        <div className={`${light.backgroundClass} ${dark.backgroundClass} h-screen overflow-hidden`}>
          <nav className={`${light.backgroundClass} ${dark.backgroundClass} ${light.borderClass} ${dark.borderClass} border-b fixed w-screen max-h-16`}>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="shrink-0 flex items-center">
                  <Link href="/">
                    <ApplicationLogo color={themeMode ? light.textColor : dark.textColor} />
                  </Link>
                  </div>

                  <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                    <NavLink href={route('room')} active={route().current('room')}>Room</NavLink>
                  </div>
                </div>

                <div className="hidden sm:flex sm:items-center sm:ml-6">
                  <List modalRef={modalRef} />
                  <div className="relative mr-4">
                    <Dropdown>
                      <Dropdown.Trigger>
                        <button type="button" className="inline-flex items-center p-2 text-sm leading-4 font-medium text-gray-500 dark:text-white focus:outline-none transition ease-in-out duration-150">
                          { badge > 0 &&
                            <span className="absolute bg-red-700 bottom-4 left-4 font-bold rounded-full flex justify-center items-center text-white text-xs"
                              style={{width: '20px', height: '20px'}}
                            >
                              {badge}
                            </span>
                          }
                          <TwoUser color={themeMode ? light.textColor : dark.textColor} />
                        </button>
                      </Dropdown.Trigger>

                      <Dropdown.Content width="150">
                        {adds.length ? adds.map((userAdd) => <UserAdd info={userAdd} key={userAdd.id} />) : 'No content'}
                      </Dropdown.Content>
                    </Dropdown>
                  </div>
                  <div className="mr-2"><Notification color={themeMode ? light.textColor : dark.textColor} /></div>
                  <div className="relative mr-2">
                    <div className={` ${light.borderClass} ${dark.borderClass} border-l ml-3 pl-3`}>
                      <button onClick={() => setThemeMode(!themeMode)} className="inline-flex items-center p-2 font-medium focus:outline-none transition ease-in-out duration-150">
                        {themeMode ? <Sun /> : <Moon color="white" />}
                      </button>
                    </div>
                  </div>
                  <div className="relative">
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
                        <button onClick={openModalProfile} className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">Profile</button>
                        <Dropdown.Link href={route('logout')} method="post" as="button">Logout</Dropdown.Link>
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
    </ThemeContextProvider>
  );
}
