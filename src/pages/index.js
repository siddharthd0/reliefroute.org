import Image from 'next/image'
import { Inter } from 'next/font/google'
import Landing from '../components/landing'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <>
    <Navigation/> 
   <Landing/>
   <Footer/>

   </>
  )
}
