import React, { useEffect, useRef } from 'react';

interface Props {
  type: string
  name: string
  value: string
  className: string
  autoComplete: string
  required: boolean
  isFocused: boolean
  disabled: boolean
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TextInput({
  type = 'text',
  name,
  value,
  className,
  autoComplete,
  required,
  isFocused,
  disabled,
  handleChange
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) throw Error("divRef is not assigned");
    if (isFocused) inputRef.current.focus()
  }, [])

  return (
    <div className="flex flex-col items-start">
      <input
        type={type}
        name={name}
        value={value}
        className={
          `border-gray-300 focus:border-indigo-300 focus:ring
          dark:bg-slate-900 dark:text-white dark:border-gray-600
          dark:focus:ring-cyan-500
          disabled:bg-gray-100 disabled:text-gray-400
          dark:disabled:bg-slate-800 dark:disabled:text-gray-400
          focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm `
          + className
        }
        ref={inputRef}
        autoComplete={autoComplete}
        required={required}
        onChange={e => handleChange(e)}
        disabled={disabled}
      />
    </div>
  )
}

TextInput.defaultProps = {
  required: false,
  disabled: false,
  isFocused: false,
  autoComplete: "",
  name: ""
}
