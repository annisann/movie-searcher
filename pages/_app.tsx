import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, NextUIProvider } from "@nextui-org/react"

const theme = createTheme({
  type: "dark",
  theme: {
    colors: {
      primary: '#ADD8E6',
      secondary: '#663399',
      error: '#A52A2A',
      success: '#98FB98',
      warning: '#F0E68C'
    },
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={theme}>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}