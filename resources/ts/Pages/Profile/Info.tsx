import { useState } from 'react'
import { useForm, usePage } from '@inertiajs/inertia-react'
import { InteriaPageType } from '../../common/type'
import InputError from '../../Components/InputError'
import InputLabel from '../../Components/InputLabel'
import PrimaryButton from '../../Components/PrimaryButton'
import TextInput from '../../Components/TextInput'
import Alert from '../../Components/Alert'

declare var route: (string?: string) => any

export default function Info() {
  const { auth } = usePage<InteriaPageType>().props
  const [alert, SetAlert] = useState({message: '', type: 'success'})
  const { data, setData, post, processing, errors, reset } = useForm({
    email: auth.user.email,
    name: auth.user.name
  })

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.name as any, event.target.value)
  }

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    post(route('info'), {
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
    <form onSubmit={submit}>
      {alert.message && <Alert message={alert.message} type={alert.type} />}
      <div className='mb-4'>
        <InputLabel forInput="name" value="Name" />
        <TextInput
          type="text"
          name="name"
          value={data.name}
          className="mt-1 block w-full"
          autoComplete="username"
          isFocused={true}
          handleChange={onHandleChange}
        />
        <InputError message={errors.name} className="mt-2" />
      </div>
      <div className='mb-4'>
        <InputLabel forInput="email" value="Email" />
        <TextInput
          type="text"
          name="email"
          value={data.email}
          className="mt-1 block w-full"
          autoComplete="username"
          isFocused={true}
          handleChange={onHandleChange}
          disabled={true}
        />
        <InputError message={errors.email} className="mt-2" />
      </div>
      <div className="flex items-center justify-end">
        <PrimaryButton processing={processing}>Update</PrimaryButton>
      </div>
    </form>
  )
}
