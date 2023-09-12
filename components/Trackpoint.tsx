"use client";

import { useArchStore } from "@/stores/archStore";
import { isBrowser } from "@/libs/util";
import { IPosition } from "@/types/IPosition";
import { motion } from "framer-motion";
import React, { FC, ReactElement, useState, useEffect } from "react";

type TrackpointProps = {
	pos: IPosition;
};

const Trackpoint: FC<TrackpointProps> = ({ pos }): ReactElement => {
	const { previewIsVisible } = useArchStore();

	// sizes in rem
	const expandedSize: number = 6;
    const collapsedSize: number = 1;
    let rootFontSize = "unset";
    if (isBrowser()) rootFontSize = window.getComputedStyle(document.body).getPropertyValue("font-size");
    if (rootFontSize == "unset") rootFontSize = "16px";
    const fontSize = parseInt(rootFontSize, 10);
    const [yShift, setYShift] = useState(0);

	const [diameter, setDiameter] = useState<string>(previewIsVisible ? `${expandedSize}rem` : `${collapsedSize}rem`);

    useEffect(() => {        
    }, []);
    
    useEffect(() => {
        setYShift(calcYShift());
    }, [previewIsVisible]);


    const calcYShift = () : number => {
        const remMultiplier = previewIsVisible ? expandedSize : collapsedSize;
        return (fontSize * remMultiplier) / 2; 
    };

	return (
		<motion.div
			id="trackpoint"
			className="fixed w-4 h-4 rounded-full inset-x-0 inset-y-0 mx-auto z-10"
			style={{ backgroundColor: "rgb(23 23 23)" }}
			initial={{
				y: isBrowser() ? window.innerHeight / 2 : 0,
			}}
			animate={{
				y: pos.y - yShift,
				height: previewIsVisible ? `${expandedSize}rem` : `${collapsedSize}rem`,
				width: previewIsVisible ? `${expandedSize}rem` : `${collapsedSize}rem`,
			}}
			transition={{ type: "tween", duration: 0.1 }}
		></motion.div>
	);
};

export default Trackpoint;
