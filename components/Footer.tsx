'use client'

import { useGlobalCurrentPage } from '@/stores/globalStore'
import { motion } from 'framer-motion';
import React from 'react'

function Footer() {
  const currentPage = useGlobalCurrentPage();


  return (
    <footer className='fixed bottom-0 left-0 py-2 px-6 flex justify-between min-w-full'>
      <motion.div>About</motion.div>
      <motion.div>Blog</motion.div>
      </footer>
  )
}

export default Footer