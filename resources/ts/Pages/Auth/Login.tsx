import React, { useEffect } from 'react'
import { Head, Link, useForm } from '@inertiajs/inertia-react'
import GuestLayout from '../../Layouts/GuestLayout'
import Checkbox from '../../Components/Checkbox'
import InputError from '../../Components/InputError'
import InputLabel from '../../Components/InputLabel'
import PrimaryButton from '../../Components/PrimaryButton'
import TextInput from '../../Components/TextInput'

declare var route: (string: string) => string

interface Props {
  status: string
  canResetPassword: boolean
}

export default function Login({ status, canResetPassword }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({ email: '', password: '', remember: '' })

    useEffect(() => {
      return () => reset('password')
    }, [])

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const name: any = event.target.name
      setData(name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)
    }

    const submit = (e: React.SyntheticEvent) => {
      e.preventDefault()
      post(route('login'))
    }

    return (
      <GuestLayout>
        <Head title="Log in" />

        {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

        <form onSubmit={submit}>
          <div>
            <InputLabel forInput="email" value="Email" />
            <TextInput
              type="text"
              name="email"
              value={data.email}
              className="mt-1 block w-full"
              autoComplete="username"
              isFocused={true}
              handleChange={onHandleChange}
            />
            <InputError message={errors.email} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel forInput="password" value="Password" />
            <TextInput
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full"
              autoComplete="current-password"
              handleChange={onHandleChange}
            />
            <InputError message={errors.password} className="mt-2" />
          </div>
          <div className="block mt-4">
            <label className="flex items-center">
              <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>
          <div className="flex items-center justify-center mt-4">
            <PrimaryButton className="ml-4" processing={processing}>Log in</PrimaryButton>
          </div>
          <div className="flex items-center justify-center mt-4">
            {canResetPassword &&(<Link href={route('password.request')} className="d-block underline text-sm text-gray-600 hover:text-gray-900">
                Forgot your password?
              </Link>
            )}
          </div>
          <div className="flex items-center justify-center mt-4">
            <Link href={route('register')} className="d-block underline text-sm text-gray-600 hover:text-gray-900">
              Register
            </Link>
          </div>
        </form>
      </GuestLayout>
    )
}
