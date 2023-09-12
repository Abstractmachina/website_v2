import { useArchActions, useArchStore } from '@/stores/archStore'
import React from 'react'

function CloseProjectButton() {
  const { setSelectedProject } = useArchActions();

  const handleClick = () => {
    setSelectedProject('none');
  }

  return (
    <div onClick={handleClick} className=' bg-red-600 min-h-[2rem] min-w-[2rem] hover:bg-red-300 hover:cursor-pointer'></div>
  )
}

export default CloseProjectButton