import { useArchStore } from '@/stores/archStore'
import React from 'react'

function CloseProjectButton() {
  const { setSelectedProject } = useArchStore();

  const handleClick = () => {
    setSelectedProject('none');
  }

  return (
    <div onClick={handleClick} className=' bg-red-600 min-h-[2rem] min-w-[2rem] hover:bg-red-300'></div>
  )
}

export default CloseProjectButton