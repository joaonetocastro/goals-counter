import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { CountersProvider } from '../shared/hooks/useCounters.hook'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CountersProvider>
        <Component {...pageProps} />
      </CountersProvider>
    </ChakraProvider>
  )
}
