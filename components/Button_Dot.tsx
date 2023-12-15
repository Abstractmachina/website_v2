"use client";

import React, { FC } from 'react'
import { Direction } from '@/types/enum_direction'

type dotButtonprops = {
    direction: Direction,
    onClickHandler: () => void,
}


const Button_Dot: FC<dotButtonprops> = ({direction, onClickHandler}) => {
    
    return (
        <div className={` h-4 w-4 fixed rounded-full bg-red-500 ${direction}-0 z-10`}></div>
    )
}

export default Button_Dot