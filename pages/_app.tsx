import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { memo } from 'react'
import PageLayout from '../components/PageLayout'
import { useThemeContext } from '../theme/Context'
import { CssBaseline, ThemeProvider } from '@material-ui/core'

function MyApp({ Component, pageProps }: AppProps) {
  const { appTheme } = useThemeContext();
  
  return (
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ThemeProvider>
  )
}
export default memo(MyApp)
