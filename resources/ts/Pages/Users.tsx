import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import colors from 'tailwindcss/colors'
import { UserType } from '../common/type'
import Search from '../Components/icon/Search'
import PrimaryButton from '../Components/PrimaryButton'

declare var route: (string?: string) => any

export default function Users({modalRef}: {modalRef: any}) {
  const [users, setUsers] = useState<null | UserType[]>(null)
  const [data, setData] = useState({
    search: '',
    limit: 10,
    offset: 0
  })

  useEffect(() => {
    const timeOut = setTimeout(() => {
      axios.get(route('users') + `?search=${data.search}&limit=${data.limit}&offset=${data.offset}`)
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }, 1000)

    return () => clearTimeout(timeOut)
  }, [data])

  useEffect(() => {
    openModalUsers()
  }, [users])

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
  }, [users])

  function handleChangeSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setData((prev) => {
      return {...prev, search: event.target.value};
    })
  }
  function openModalUsers() {
    if (!modalRef.current) throw Error("divRef is not assigned")

    modalRef.current.open({
      header: (
        <div className="h-full flex items-center px-3">
          <label className="relative w-full">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <Search color={colors.slate[400]} />
            </span>
            <input className="placeholder:italic placeholder:text-slate-400
              bg-white w-full border dark:bg-gray-900
              border-gray-100 dark:border-gray-800 rounded-md
              py-2 pl-10 pr-3 shadow-sm focus:outline-none
              focus:border-sky-500 focus:ring-sky-500
              focus:ring-1 sm:text-sm dark:text-white"
              placeholder="Search name or email..." type="text" name="search"
              onChange={handleChangeSearch}
            />
          </label>
        </div>
      ),
      body: (
        <div className="h-5/6 relative pr-5">
          <div className="scroll w-2 h-full absolute bg-transparent -right-1">
            <div className="scroll-bar w-full bg-gray-300 dark:bg-gray-700 absolute top-0 rounded-lg" />
          </div>
          <div className="custom-scroll relative overflow-auto" style={{height: '400px'}}>
            <ul className=" custom-scroll-content">
              { users &&
                users.map((user, index) => (
                  <li className="flex py-4 first:pt-0 last:pb-0" key={index}>
                    <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                    <div className="ml-3 overflow-hidden">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-sm text-slate-500 truncate">{user.email}</p>
                    </div>
                    <div className='flex flex-1 justify-end'>
                      <PrimaryButton processing={null}>Add</PrimaryButton>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      )
    })
  }

  return (
    <div className='mr-6'>
      <label className="relative">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <Search color={colors.slate[400]} />
        </span>
        <div className="italic text-slate-400
          bg-white w-full border dark:bg-gray-900
          border-gray-100 dark:border-gray-800 rounded-md
          py-2 pl-10 pr-3 shadow-sm focus:outline-none
          hover:border-sky-500 hover:ring-sky-500
          hover:ring-1"
          style={{cursor: 'pointer'}}
          onClick={openModalUsers}
        >Search users...</div>
      </label>
    </div>
  )
}
