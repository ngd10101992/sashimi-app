import { useEffect, useRef, useState } from "react"
import { useForm, usePage } from '@inertiajs/inertia-react'
import Button from '@/Components/Button'
import Alert from '@/Components/Alert'


export default function Profile({ info }) {
  const [avatarSrc, SetAvatarSrc] = useState(info.avatar)
  const inputAvatar = useRef(null)
  const [alert, SetAlert] = useState({message: '', type: 'success'})

  const { data, setData, post, progress, errors } = useForm({
    avatar: null,
  })

  useEffect(() => {
    console.log(errors);
  }, [])

  function handlechangeAvatar(event) {
    const reader = new FileReader
    setData('avatar', event.target.files[0])
    reader.readAsDataURL(event.target.files[0])
    reader.onload = e => SetAvatarSrc(e.target.result)
  }

  function handleSubmitAvatar(e) {
    e.preventDefault()
    post(route('avatar'), {
      preserveScroll: true,
      onSuccess: ({props}) => {
        if (props.flash.success) {
          SetAlert({
            message: props.flash.success.message,
            type: 'success'
          })
        } else {
          SetAlert({
            message: props.flash.error.message,
            type: 'error'
          })
        }
      }
    })
  }

  return (
    <form onSubmit={handleSubmitAvatar}>
      {alert.message && <Alert message={alert.message} type={alert.type} />}
      <div className="flex items-center space-x-6">
        <div className="shrink-0">
          <img className="h-16 w-16 object-cover rounded-full" src={avatarSrc} />
        </div>
        <label className="block">
          <span className="sr-only">Choose profile photo</span>
          <input type="file"
            ref={inputAvatar}
            className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
            "
            onChange={handlechangeAvatar}
          />
        </label>
      </div>
      {errors.avatar && <span class="mt-2 text-pink-600 text-sm">{errors.avatar}</span>}
      <div className="mt-5 text-right"><Button label="Update" /></div>
    </form>
  )
}
