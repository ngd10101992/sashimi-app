export default function Button(props) {
  const { label = 'Submit' } = props

  return (
    <button className="outline-double outline-3 outline-offset-2
      outline-sky-500 px-3 py-1 rounded-sm text-sky-500
      hover:bg-sky-500 hover:text-white transition-all
      "
      type="submit"
    >
      {label}
    </button>
  )
}
