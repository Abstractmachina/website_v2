import { motion } from 'framer-motion'
import React from 'react'

function ProjectIndexRow() {
  return (
      <motion.div className='flex flex-row justify-between text-white'>
          <span>2000</span>
          <span>Project Title</span>
          <span>Type</span>
          <span>Affiliation</span>
    </motion.div>
  )
}

export default ProjectIndexRow