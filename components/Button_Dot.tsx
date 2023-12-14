"use client";

import React, { FC } from 'react'
import { Direction } from '@/types/enum_direction'

type dotButtonprops = {
    direction: Direction,
}


const Button_Dot: FC<dotButtonprops> = ({direction}) => {
    
    return (
        <div className={`fixed rounded-full bg-red-500 ${direction}-0 z-10`}></div>
    )
}

export default Button_Dot