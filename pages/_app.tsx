import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, NextUIProvider } from "@nextui-org/react"

const theme = createTheme({
  type: "dark",
  theme: {
    colors: {
      primary: '#ADD8E6',
      lightGreen: '#98FB98',
      lightYellow: '#F0E68C',
      lightPurple: '#8E44AD',
      lightPink: '#FFC6D9',
      darkPurple: '#663399',
      darkYellow: '#FFA500',
      darkRed: '#A52A2A',
      default: '#D5D8DC'
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