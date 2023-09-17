import React from 'react'

function Projectpage({ params }: { params: { shortcode: string } }) {
  return (
      <div className='fixed h-full w-1/2 top-0 right-0 p-20 overflow-auto flex flex-col items-end'>
          <p>
          Projectpage
          </p>
          <h1 className='right-0'>{params.shortcode}</h1>
        
    </div>
  )
}

export default Projectpage