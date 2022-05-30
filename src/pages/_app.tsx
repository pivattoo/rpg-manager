import '../tailwind/tailwind.css'
import type { AppProps } from 'next/app'
import Navegation from '../Components/Navegation'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navegation />
      <div className="h-screen bg-neutral-100">
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
