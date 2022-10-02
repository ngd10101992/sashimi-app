import { useState } from 'react'
import { useForm } from '@inertiajs/inertia-react'
import InputError from '../../Components/InputError'
import InputLabel from '../../Components/InputLabel'
import PrimaryButton from '../../Components/PrimaryButton'
import TextInput from '../../Components/TextInput'
import Alert from '../../Components/Alert'

declare var route: (string?: string) => any

export default function Password() {
  const [alert, SetAlert] = useState({message: '', type: 'success'})
  const { data, setData, post, processing, errors, reset } = useForm({
    oldPassword: '',
    password: '',
    password_confirmation: ''
  })

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.name as any, event.target.value)
  }

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    post(route('password'), {
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
        reset()
      }
    })
  }

  return (
    <form onSubmit={submit}>
      {alert.message && <Alert message={alert.message} type={alert.type} />}
      <div className='mb-4'>
        <InputLabel value="Old Password" />
        <TextInput
          type="password"
          name="oldPassword"
          value={data.oldPassword}
          className="mt-1 block w-full"
          isFocused={true}
          handleChange={onHandleChange}
        />
        <InputError message={errors.oldPassword} className="mt-2" />
      </div>
      <div className='mb-4'>
        <InputLabel value="New Password" />
        <TextInput
          type="password"
          name="password"
          value={data.password}
          className="mt-1 block w-full"
          handleChange={onHandleChange}
        />
        <InputError message={errors.password} className="mt-2" />
      </div>
      <div className='mb-4'>
        <InputLabel value="Confirm New Password" />
        <TextInput
          type="password"
          name="password_confirmation"
          value={data.password_confirmation}
          className="mt-1 block w-full"
          handleChange={onHandleChange}
        />
        <InputError message={errors.password_confirmation} className="mt-2" />
      </div>
      <div className="flex items-center justify-end">
        <PrimaryButton processing={processing}>Update</PrimaryButton>
      </div>
    </form>
  )
}
