import Image from 'next/image'
import { Inter } from 'next/font/google'
import Landing from '../components/landing'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import Head from 'next/head'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <>
   <Head>
        <title>Relief Route</title>
        <meta name="description" content="App made by teens to connect resources with those impacted in the Israel War." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Navigation/> 
   <Landing/>
   <Footer/>
   </>
  )
}