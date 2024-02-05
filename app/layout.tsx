import './globals.css'
import type { Metadata } from 'next'
import { Inter, Open_Sans, Roboto, Source_Serif_4 } from 'next/font/google'
import localfont from 'next/font/local';
import {AnimatePresence} from 'framer-motion';
import Footer from '@/components/Footer';


const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-opensans',
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
const roboto = Roboto({
  weight: ['100', '400', '900'],
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-roboto',
})

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  display: 'optional',
  variable: '--font-source-serif',
});

const monolisk = localfont({
  src: [
    {
      path: '../public/fonts/monolisk_black.woff',
      weight: '400',
      style: 'normal'
    },
  ],
  variable: '--font-monolisk'
});

const monument = localfont({
  src: [
    {
      path: '../public/fonts/PPMonumentExtended-Black.otf',
      weight: '900',
      style: 'normal',
    }
  ],
  variable: '--font-monument'
})

export const metadata: Metadata = {
  title: 'Taole Chen\'s Website',
  description: 'Personal Website of Taole Chen',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${monument.variable} ${openSans.className} ${sourceSerif4.variable} ${roboto.className}`}>
      <body >
        {children}
        {/* <Footer /> */}
      </body>
      
    </html>
  )
}
