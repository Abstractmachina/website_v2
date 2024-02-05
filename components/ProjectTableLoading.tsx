import React from 'react'

function ProjectTableLoading() {
  return (
    <span className="h-screen w-full flex justify-center items-center">
      <span className="animate-ping relative flex h-10 w-10  rounded-full bg-purple-400 opacity-75"></span>
    </span>
  )
}

export default ProjectTableLoading