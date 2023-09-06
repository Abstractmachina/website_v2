import './globals.css'
import type { Metadata } from 'next'
import { Inter, Open_Sans } from 'next/font/google'
import localfont from 'next/font/local';
import {AnimatePresence} from 'framer-motion';
import Footer from '@/components/Footer';


const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-opensans',
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

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
    <html lang="en" className={` ${inter.className} ${monolisk.variable}  ${openSans.className}`}>
      <body >{children}</body>
      <Footer/>
    </html>
  )
}
