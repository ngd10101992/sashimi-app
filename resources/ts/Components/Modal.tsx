import { useRef, useState, forwardRef, useImperativeHandle } from "react"

interface Props {
  width?: string
}

interface OpenProps {
  header: React.ReactNode
  body: React.ReactNode
  footer?: React.ReactNode
}

export type ModalHandle = {
  open: (props: OpenProps) => void
}


const Modal = forwardRef<ModalHandle, Props>((props, ref) => {
  const { width } = props
  const [open, SetOpen] = useState(false)
  const [header, SetHeader] = useState<React.ReactNode>(null)
  const [body, SetBody] = useState<React.ReactNode>(null)
  const [footer, SetFooter] = useState<React.ReactNode>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    open: ({header = null, body = null, footer = null}) => {
      SetOpen(true)
      SetHeader(header)
      SetBody(body)
      SetFooter(footer)
    }
  }))

  function close() {
    SetOpen(false)
  }


  return (
    <>
      {open && <div ref={modalRef} className="flex items-center justify-center animate-fade backdrop-blur-sm bg-slate-900/20 w-screen h-screen fixed top-0 left-0" style={{zIndex: 999}}>
        <div className="absolute top-0 left-0 w-full h-full" onClick={close} />
        <div className={`${width} bg-white dark:bg-slate-800 rounded-md drop-shadow-2xl`}>
          <header className="flex items-center justify-between w-full h-16 border-b border-slate-200 dark:border-slate-700">
            <div className="h-full">{header}</div>
            <button className="w-9 h-7 mr-4 rounded-md bg-gray-100 dark:bg-slate-700 text-xs dark:text-slate-400" onClick={() => SetOpen(false)}>ESC</button>
          </header>
          <div className="h-full p-4">{body}</div>
          {footer && <footer className="flex items-center justify-between px-4 w-full h-16 border-t border-slate-200 dark:border-slate-700">{footer}</footer>}
        </div>
      </div>}
    </>
  )
})

Modal.defaultProps = {
  width: 'w-1/3'
}

export default Modal
