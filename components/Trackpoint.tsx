'use client'

import { useArchStore } from "@/libs/stateManagement";
import { isBrowser } from "@/libs/util";
import { IPosition } from "@/types/IPosition";
import { motion } from "framer-motion";
import React, { FC, ReactElement, useState } from "react";


type TrackpointProps = {
    pos: IPosition;
}


const Trackpoint: FC<TrackpointProps> = ({ pos }): ReactElement => {
    // sizes in rem
    const expandedSize: number = 6;
    const collapsedSize: number = 1;

    const { previewIsVisible } = useArchStore();



    return (
        <motion.div
            
			id="trackpoint"
			className="fixed w-4 h-4 rounded-full inset-x-0 inset-y-0 mx-auto z-10"
			style={{ backgroundColor: "rgb(23 23 23)" }}
			initial={{
				y: isBrowser() ? window.innerHeight / 2 : 0,
			}}
            animate={{
                y: pos.y,
                height: previewIsVisible ? `${expandedSize}rem` : `${collapsedSize}rem`,
                width: previewIsVisible ? `${expandedSize}rem` : `${collapsedSize}rem`,
            }}
			transition={{ type: "tween", duration: 0.1}}
		></motion.div>
	);
}

export default Trackpoint;
