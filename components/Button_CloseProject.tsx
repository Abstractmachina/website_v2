'use client'

import { useArchActions } from '@/stores/archStore'
import { useRouter } from 'next/navigation';
import React from 'react'

function CloseProjectButton() {
  const router = useRouter();
  const { setSelectedProject } = useArchActions();

  const handleClick = () => {
    setSelectedProject('none');
    router.push('/architecture');
  }

  return (
    <div onClick={handleClick} className=' bg-red-600 min-h-[2rem] min-w-[2rem] hover:bg-red-300 hover:cursor-pointer flex items-center justify-center overflow-auto'>
      <div className=' bg-blue-600 w-14 h-[3px] absolute rotate-45 rounded-full visible'></div>
      <div className=' bg-blue-600 w-14 h-[3px] absolute -rotate-45 rounded-full visible'></div>

    </div>
  )
}

export default CloseProjectButton