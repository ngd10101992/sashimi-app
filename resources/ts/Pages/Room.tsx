import { useEffect } from 'react';
import { Head } from '@inertiajs/inertia-react'
import colors from 'tailwindcss/colors'
import { AuthType } from '../common/type'
import { useTheme } from '../Providers/ThemeContextProvider'
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout'
import Search from '../Components/icon/Search'

export default function Room(props: { auth: AuthType, errors: object}) {
  const { light, dark } = useTheme()

  useEffect(() => {
    let box = document.querySelector('.custom-scroll') as HTMLDivElement
    let content = document.querySelector('.custom-scroll-content') as HTMLElement
    let scrollBar = document.querySelector('.scroll-bar') as HTMLDivElement
    let boxHeight = box.offsetHeight
    let contentHeight = content.offsetHeight
    let scrollBarHeight = (boxHeight/contentHeight) * 100

    scrollBar.style.height = scrollBarHeight + "%"
    scrollBarHeight = scrollBar.offsetHeight

    let percentBar = (scrollBarHeight/boxHeight) * 100

    box.addEventListener('scroll', function() {
      let top = (box.scrollTop/100) * percentBar
      scrollBar.style.top = top + 'px'
    })
  }, [])

  return (
    <AuthenticatedLayout auth={props.auth}>
      <Head title="Room" />
      <div className="flex h-screen pt-16 pb-8">
        <div className={`${light.borderClass} ${dark.borderClass} w-80 h-full border-r p-4 relative`}>
          <label className="relative block mb-8">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <Search color={colors.slate[400]} />
            </span>
            <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border dark:bg-gray-900 border-gray-100 dark:border-gray-800 rounded-md py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for my friend..." type="text" name="search" />
          </label>
          <div className="scroll w-2 h-5/6 absolute bg-transparent right-1">
            <div className="scroll-bar w-full bg-gray-300 dark:bg-gray-800 absolute top-0 rounded-lg" />
          </div>
          <div className="custom-scroll relative overflow-auto" style={{height: '90%'}}>
            <ul className="divide-y dark:divide-gray-800 custom-scroll-content">
              {['Kristen Ramos', 'Floyd Miles', 'Courtney Henry', 'Ted Fox', 'Courtney Henry', 'Courtney Henry', 'Courtney Henry', 'Courtney Henry', 'Courtney Henry', 'Courtney Henry', 'Courtney Henry', 'Courtney Henry'].map((name, index) => (
                <li className="flex py-4 first:pt-0 last:pb-0" key={index}>
                  <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  <div className="ml-3 overflow-hidden">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{name}</p>
                    <p className="text-sm text-slate-500 truncate">kristen.ramos@example.com</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grow h-full"></div>
      </div>
    </AuthenticatedLayout>
  );
}
