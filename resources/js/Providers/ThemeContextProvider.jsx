import { createContext, useContext } from "react"
import colors from 'tailwindcss/colors'

const themes = {
  light: {
    textColor: colors.slate[900],
    borderClass: "border-slate-200",
    backgroundClass: "bg-slate-100"
  },
  dark: {
    textColor: colors.slate[50],
    borderClass: "dark:border-slate-800",
    backgroundClass: "dark:bg-slate-900"
  }
}

export const ThemeContext = createContext(themes)
// auth custom hook
export const useTheme = () => useContext(ThemeContext)

function ThemeContextProvider({ children }) {

  return (
    <ThemeContext.Provider value={true}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider