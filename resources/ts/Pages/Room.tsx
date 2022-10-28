import { useEffect, useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/inertia-react'
import axios from 'axios'
import colors from 'tailwindcss/colors'
import { AuthType, UserType } from '../common/type'
import { getPermissionsVideo } from '../common/helpers'
import { useTheme } from '../Providers/ThemeContextProvider'
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout'
import Search from '../Components/icon/Search'
import Video from '../Components/icon/Video'
import Send from '../Components/icon/Send'
import Happy from '../Components/icon/Happy'

declare var route: (string?: string) => any
declare var Pusher: any

interface messagesType extends UserType{
  content: string
  content_created_at: string
}

export default function Room(props: { auth: AuthType, addList: [], friends: UserType[], errors: object}) {
  const messageFormData:{targetId: null | string, message: string} = {
    targetId: null,
    message: ''
  }
  const { auth } = props
  const { light, dark } = useTheme()
  const messageForm = useForm(messageFormData)
  const [hasMedia, setHasMedia] = useState(false)
  const [currentTargetUser, setCurrentTargetUser] = useState<UserType | null>(null)
  const [messages, setMessages] = useState<messagesType[]>([])
  const myVideoRef = useRef<HTMLVideoElement | null>(null)

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

  useEffect(() => {
    const pusher = new Pusher('2d240a8e1585e1883a5e', {
      cluster: 'ap3',
      authEndpoint: '/broadcasting/auth'
    })

    const channel = pusher.subscribe('private-user.' + auth.user.id)
    channel.bind('ChatMessagePusherEvent', function({ userSend }: {userSend: messagesType}) {
      setMessages((prev: messagesType[]) => [userSend, ...prev])
    })
  }, [])

  function startVideoCall() {
    getPermissionsVideo()
    .then(function(stream: any) {
      setHasMedia(true)
      try {
        myVideoRef.current!.srcObject = stream
      } catch (error) {
        myVideoRef.current!.src = URL.createObjectURL(stream)
      }
      myVideoRef.current!.play()
    })
    .catch(err => {
      throw new Error(`Unable to fetch stream ${err}`)
    })
  }

  function stopVideoCall() {
    myVideoRef.current!.pause()
    setHasMedia(false)
  }

  function setTargetUser(targetUser: UserType) {
    messageForm.setData('targetId', targetUser.id)
    setCurrentTargetUser(targetUser)

    axios.post(route('get-messages'), {
      targetId: targetUser.id
    })
    .then(response => {
      setMessages(response.data)
    })
    .catch(error => console.log(error))
  }

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    messageForm.setData(event.target.name as any, event.target.value)
  }

  const submitSendMessage = (e: React.SyntheticEvent) => {
    e.preventDefault();
    messageForm.post(route("send-message"), {
      preserveScroll: true,
      onSuccess: ({ props }) => {
        const { success, error }: any = props.flash
        if (success) {
          setMessages((prev: messagesType[]) => {
            prev.unshift(success.userSend)
            return prev
          })
        } else {
          console.log(error);
        }
        messageForm.setData('message', '')
      }
    })
  }

  return (
    <AuthenticatedLayout auth={auth} addList={props.addList}>
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
                focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm
              "
              placeholder="Search for my friend..." type="text" name="search"
            />
          </label>
          <div className="scroll w-2 h-5/6 absolute bg-transparent right-1">
            <div className="scroll-bar w-full bg-gray-300 dark:bg-gray-800 absolute top-0 rounded-lg" />
          </div>
          <div className="custom-scroll relative overflow-auto" style={{height: '90%'}}>
            <ul className="divide-y dark:divide-gray-800 custom-scroll-content">
              {props.friends.map((friend: UserType) => (
                <li onClick={() => setTargetUser(friend)} className="flex py-4 first:pt-0 last:pb-0 cursor-pointer" key={friend.id}>
                  <img className="h-10 w-10 rounded-full" src={friend.avatar} alt="avatar" />
                  <div className="ml-3 overflow-hidden">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{friend.name}</p>
                    <p className="text-sm text-slate-500 truncate">{friend.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {currentTargetUser &&
          <>
            <div className="grow h-full pb-24 relative">
              <div className="h-full">
                <div className={`${light.borderClass} ${dark.borderClass} border-b p-4 flex justify-between items-center`}>
                  <span className="text-2xl font-medium text-slate-700 dark:text-white">{currentTargetUser.name}</span>
                  <div>
                    <span onClick={startVideoCall} className="cursor-pointer"><Video color='white'/></span>
                  </div>
                </div>
                {/* <div className="overflow-auto custom-scroll flex flex-col-reverse" style={{maxHeight: '85%'}}> */}
                <div className="overflow-auto custom-scroll flex flex-col-reverse" style={{maxHeight: '90%'}}>
                  {!!messages.length && messages.map((userSend: messagesType, index) => {
                    return (
                      <div className="py-7 border-t border-gray-100 dark:border-gray-800" key={index}>
                        <div className="px-7">
                          <div className="flex mb-3">
                            <img className="w-10 h-10 rounded-md" src={userSend.avatar} alt="avatar" />
                            <div className="flex flex-col justify-between pl-2">
                              <span className="text-white relative bottom-0.5">{userSend.name}</span>
                              <span className="text-gray-400 text-xs relative top-0.5">{userSend.content_created_at}</span>
                            </div>
                          </div>
                          <p className="text-white">{userSend.content}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="px-7 z-10 absolute w-full bottom-0 h-24">
                <div className="p-1 px-3 bg-white border dark:bg-gray-900 border-gray-100 dark:border-gray-800 rounded-md">
                  <form onSubmit={submitSendMessage}>
                    <input className="placeholder:italic placeholder:text-slate-400
                      bg-white w-full border-none dark:bg-gray-900
                      py-2 px-0 shadow-sm focus:outline-none text-white
                    "
                      name="message"
                      value={messageForm.data.message}
                      onChange={onHandleChange}
                      placeholder="Enter message..."
                    />
                    <div className="flex justify-between py-2">
                      <button type="submit"><Happy color={colors.slate[400]} /></button>
                      <button type="submit"><Send color={messageForm.data.message.length ? colors.cyan[400] : colors.slate[400]} /></button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {hasMedia &&
              <div className="fixed z-50 top-2/4 left-2/4 -translate-x-1/2 -translate-y-2/4 border w-3/4 h-3/4 rounded-lg backdrop-blur-md bg-slate-50">
                <video width={200} height={200} ref={myVideoRef}></video>
                <button onClick={stopVideoCall} className="w-20 h-20 bg-red-600 rounded-full text-white cursor-pointer">Stop</button>
              </div>
            }
          </>
        }
      </div>
    </AuthenticatedLayout>
  );
}
