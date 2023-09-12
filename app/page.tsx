import Footer from '@/components/Footer';
import MouseDial from '@/components/MouseDial';
import Image from 'next/image'
import Link from 'next/link'
import { MouseEventHandler, useState } from 'react';

export default function Home() {

  return (
    <main className="fixed min-h-screen flex-col items-center justify-between p-24">
      <MouseDial/>
    </main>
  )
}
