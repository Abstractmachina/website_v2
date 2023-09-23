'use client'

import { useGlobalActions } from '@/stores/globalStore'
import { Page } from '@/types/enum_page';
import React from 'react'

function Programming() {
  const {setCurrentPage}= useGlobalActions();

  setCurrentPage(Page.PROGRAMMING);

  return (
    <div>Coming Soon!</div>
  )
}

export default Programming