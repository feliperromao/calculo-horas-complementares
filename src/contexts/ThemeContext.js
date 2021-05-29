import { createContext, useContext, useEffect, useState } from "react"

export const ThemeContext = createContext()

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme')

    if (theme) {
      if (theme === 'dark') {
        setTheme(true)
      }
    }
  }, [])

  function setDarkTheme() {
    setTheme(!theme)
  }

  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', 'dark')
      addParamOnDocument('dark')
    } else {
      localStorage.setItem('theme', 'light')
      addParamOnDocument('light')
    }
  }, [theme])

  function addParamOnDocument(colorScheme) {
    document.documentElement.setAttribute('data-theme', colorScheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  return useContext(ThemeContext)
}