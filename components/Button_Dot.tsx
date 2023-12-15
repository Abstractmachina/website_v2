"use client";

import React, { FC } from 'react'
import { Direction } from '@/types/enum_direction'

type dotButtonprops = {
    direction: Direction,
    onClickHandler: () => void,
}


const Button_Dot: FC<dotButtonprops> = ({ direction, onClickHandler }) => {
    

    async function handleClick() : Promise<any> {
        await onClickHandler();
    }
    
    return (
        <div className={` h-4 w-4 fixed rounded-full hover:cursor-pointer bg-red-500 ${direction}-0 z-10`} onClick={handleClick}></div>
    )
}

export default Button_Dot