interface Props {
  forInput: string;
  value: string;
  className: string;
}

export default function InputLabel({ forInput, value, className = '' }: Props) {
  return (
    <label htmlFor={forInput}
      className={`block font-medium text-sm
        text-gray-700 dark:text-gray-400 `
        + className
      }
    >
      {value}
    </label>
  )
}

InputLabel.defaultProps = {
  className: ''
}
