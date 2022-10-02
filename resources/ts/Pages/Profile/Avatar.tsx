import { useEffect, useRef, useState } from "react"
import { useForm, usePage } from '@inertiajs/inertia-react'
import { InteriaPageType } from '../../common/type'
import PrimaryButton from '../../Components/PrimaryButton'
import Alert from '../../Components/Alert'

declare var route: (string?: string) => any



export default function Avatar() {
  const { auth } = usePage<InteriaPageType>().props
  const [avatarSrc, SetAvatarSrc] = useState(auth.user.avatar)
  const [alert, SetAlert] = useState({message: '', type: 'success'})
  const inputAvatar = useRef(null)

  const { data, setData, post, progress, errors, processing } = useForm({
    avatar: null,
  })

  function handlechangeAvatar(event: React.ChangeEvent<HTMLInputElement>): void {
    const file: any = event.target.files![0]
    const reader = new FileReader
    setData('avatar', file)
    reader.readAsDataURL(file)
    reader.onload = (e: any) => SetAvatarSrc(e.target.result)
  }

  function handleSubmitAvatar(e: React.SyntheticEvent) {
    e.preventDefault()
    post(route('avatar'), {
      preserveScroll: true,
      onSuccess: ({props}) => {
        const { success, error }: any = props.flash
        if (success) {
          SetAlert({
            message: success.message,
            type: 'success'
          })
        } else {
          SetAlert({
            message: error.message,
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
      {errors.avatar && <span className="mt-2 text-pink-600 text-sm">{errors.avatar}</span>}
      <div className="flex items-center justify-end">
        <PrimaryButton processing={processing}>Update</PrimaryButton>
      </div>
    </form>
  )
}
