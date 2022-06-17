import '../tailwind/tailwind.css'
import type { AppProps } from 'next/app'
import Navegation from '../components/NavegationBar'
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Toaster 
      position="bottom-center"
      reverseOrder={false}
      />
      <Navegation />
      <div className="h-screen bg-neutral-100">
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
