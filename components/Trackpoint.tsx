'use client'

import { useArchStore } from "@/libs/stateManagement";
import { isBrowser } from "@/libs/util";
import { IPosition } from "@/types/IPosition";
import { motion } from "framer-motion";
import React, { FC, ReactElement, useState } from "react";


type TrackpointProps = {
    pos: IPosition;
    showPreview: boolean;
}


const Trackpoint: FC<TrackpointProps> = ({ pos, showPreview }): ReactElement => {
    // sizes in rem
    const expandedSize: number = 6;
    const collapsedSize: number = 1;

    const archStore = useArchStore();


	
    

    return (
        <motion.div
            
			id="center_circle"
			className="fixed w-4 h-4 rounded-full inset-x-0 inset-y-0 mx-auto z-10"
			style={{ backgroundColor: "rgb(23 23 23)" }}
			initial={{
				y: isBrowser() ? window.innerHeight / 2 : 0,
			}}
            animate={{
                y: pos.y,
                height: showPreview ? `${expandedSize}rem` : `${collapsedSize}rem`,
                width: showPreview ? `${expandedSize}rem` : `${collapsedSize}rem`,
            }}
			transition={{ type: "tween" }}
		></motion.div>
	);
}

export default Trackpoint;
