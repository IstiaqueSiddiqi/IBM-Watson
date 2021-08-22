import '@fontsource/roboto';
// import '../styles/globals.css'
import CssBaseline from '@material-ui/core/CssBaseline';
import React, { memo, useState, useEffect, useLayoutEffect } from 'react'
import type { AppProps } from 'next/app'
import { getTheme, ThemeContext } from '../theme/Context'
import { ThemeProvider } from '@material-ui/core';

function MyApp({ Component, pageProps }: AppProps) {
  const [appTheme, setAppTheme] = useState<any>(getTheme());

  useEffect(() => {
    const mode = localStorage.getItem('themeMode') ?? 'light';
    setAppTheme(getTheme(mode))
  }, []);

  return (
    <ThemeContext.Provider value={{ appTheme, setAppTheme }}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
export default memo(MyApp)
