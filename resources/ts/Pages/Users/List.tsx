import React, { useEffect, useState } from 'react'
import axios from 'axios'
import colors from 'tailwindcss/colors'
import { UserType, ContactCodeType } from '../../common/type'
import Search from '../../Components/icon/Search'
import User from './User'

declare var route: (string?: string) => any

export default function List({modalRef}: {modalRef: any}) {
  const [users, setUsers] = useState<[] | UserType[]>([])
  const [contactCodes, setContactCodes] = useState<ContactCodeType | null>(null)
  const [data, setData] = useState({
    search: '',
    limit: 10,
    offset: 0
  })
  const [refreshUsers, setRefreshUsers] = useState(false)

  useEffect(() => {
    if (!data.search.length) return
    const timeOut = setTimeout(() => {
      axios.get(route('users') + `?search=${data.search}&limit=${data.limit}&offset=${data.offset}`)
      .then(response => {
        setUsers(prev => [...prev, ...response.data.users])
        setContactCodes(response.data.contactCodes)
      })
      .catch(error => console.log(error))
    }, 1000)

    return () => clearTimeout(timeOut)
  }, [data, refreshUsers])

  useEffect(() => {
    if (!data.search.length) return
    openModalUsers()
  }, [users.length, contactCodes])

  function handleChangeSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setData(prev => {
      return {...prev, search: event.target.value}
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
        <div className="">
          <div className="custom-scroll overflow-auto" style={{maxHeight: '80vh'}}>
            <ul className="custom-scroll-content">
              {users && users.map(user => <User user={user} contactCodes={contactCodes} key={user.id} />)}
            </ul>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="flex items-center mr-6">
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
