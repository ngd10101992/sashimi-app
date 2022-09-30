import { createContext, useContext } from "react"
import colors from 'tailwindcss/colors'

const themes = {
  light: {
    textColor: colors.slate[900],
    textClass: 'text-slate-900',
    borderClass: 'border-slate-200',
    backgroundClass: 'bg-slate-100',
  },
  dark: {
    textColor: colors.slate[50],
    textClass: 'dark:text-slate-50',
    borderClass: 'dark:border-slate-800',
    backgroundClass: 'dark:bg-slate-900'
  }
}

export const ThemeContext = createContext(themes)
// auth custom hook
export const useTheme = () => useContext(ThemeContext)

function ThemeContextProvider({ children }: { children: React.ReactNode }) {

  return (
    <ThemeContext.Provider value={themes}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider