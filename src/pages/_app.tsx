import '@/assets/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import ContextProvider from '@/context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider user={pageProps.user}>
      <Component {...pageProps} />{' '}
      <Toaster
        toastOptions={{
          className: 'dark:bg-gray-900 dark:text-white ',
          duration: 5000,
        }}
        position='top-center'
        reverseOrder={false}
      />
    </ContextProvider>
  )
}
