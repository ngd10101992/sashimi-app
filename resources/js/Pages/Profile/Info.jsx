import { useForm } from '@inertiajs/inertia-react'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'

export default function Info({ info }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: info.email,
    name: info.name,
  })

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  }

  const submit = (e) => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <form onSubmit={submit}>
      <div className='mb-4'>
        <InputLabel forInput="name" value="Name" />
        <TextInput
          type="text"
          name="name"
          value={info.name}
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
          value={info.email}
          className="mt-1 block w-full"
          autoComplete="username"
          isFocused={true}
          handleChange={onHandleChange}
        />
        <InputError message={errors.email} className="mt-2" />
      </div>
      <div className="flex items-center justify-end">
        <PrimaryButton processing={processing}>Update</PrimaryButton>
      </div>
    </form>
  )
}
