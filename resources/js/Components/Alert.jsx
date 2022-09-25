import Tick from '@/Components/icon/Tick'
import Info from '@/Components/icon/Info'

export default function Alert({ message = '',  type = 'success'}) {

  let background = 'bg-sky-500'
  let icon = <Tick color='white'/>

  switch (type) {
    case 'error':
      background = 'bg-rose-500'
      icon = <Info color='white'/>
      break
    default:
      break
  }

  return <div className={`flex justify-start w-full ${background} px-5 py-3 rounded-sm text-white mb-5`}>
    {icon}
    <span className='ml-3'>{message}</span>
  </div>
}
