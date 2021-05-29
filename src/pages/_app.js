import React from 'react'

import { ThemeContextProvider } from '../contexts/ThemeContext'
import './styles.css'

function MyApp({ Component, pageProps }) {
    return (
        <ThemeContextProvider>
            <div className="app">
                <Component {...pageProps} />
            </div>
        </ThemeContextProvider>
    )
}

export default MyApp