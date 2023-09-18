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
    <div onClick={handleClick} className=' bg-red-600 min-h-[2rem] min-w-[2rem] hover:bg-red-300 hover:cursor-pointer'></div>
  )
}

export default CloseProjectButton