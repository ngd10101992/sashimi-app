import { useEffect } from 'react';
import { Head } from '@inertiajs/inertia-react'
import colors from 'tailwindcss/colors'
import { AuthType, UserType } from '../common/type'
import { useTheme } from '../Providers/ThemeContextProvider'
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout'
import Search from '../Components/icon/Search'
import Video from '../Components/icon/Video'

export default function Room(props: { auth: AuthType, addList: [], friends: UserType[], errors: object}) {
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
    <AuthenticatedLayout auth={props.auth} addList={props.addList}>
      <Head title="Room" />
      <div className="flex h-screen pt-16 pb-4">
        <div className={`${light.borderClass} ${dark.borderClass} w-80 h-full border-r p-4 relative`}>
          <label className="relative block mb-8">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <Search color={colors.slate[400]} />
            </span>
            <input className="placeholder:italic placeholder:text-slate-400
                            bg-white w-full border dark:bg-gray-900
                            border-gray-100 dark:border-gray-800 rounded-md
                            py-2 pl-10 pr-3 shadow-sm focus:outline-none
                            focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    placeholder="Search for my friend..." type="text" name="search"
            />
          </label>
          <div className="scroll w-2 h-5/6 absolute bg-transparent right-1">
            <div className="scroll-bar w-full bg-gray-300 dark:bg-gray-800 absolute top-0 rounded-lg" />
          </div>
          <div className="custom-scroll relative overflow-auto" style={{height: '90%'}}>
            <ul className="divide-y dark:divide-gray-800 custom-scroll-content">
              {props.friends.length && props.friends.map((friend: UserType) => (
                <li className="flex py-4 first:pt-0 last:pb-0" key={friend.id}>
                  <img className="h-10 w-10 rounded-full" src={friend.avatar} alt="avatar" />
                  <div className="ml-3 overflow-hidden">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{friend.name}</p>
                    <p className="text-sm text-slate-500 truncate">kristen.ramos@example.com</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grow h-full">
          <div className="h-5/6">
            <div className={`${light.borderClass} ${dark.borderClass} border-b p-4 flex justify-between items-center`}>
              <span className="text-2xl font-medium text-slate-700 dark:text-white">Nakamura</span>
              <div>
                <Video color='white'/>
              </div>
            </div>
          </div>
          <div className="h-1/6 px-3">
            <div className="h-full border rounded-md border-slate-700"></div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
