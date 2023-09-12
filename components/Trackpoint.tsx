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

	const [baseFontSize, setBaseFontSize] = useState<number>(16);
	const [yShift, setYShift] = useState(0);

	const [diameter, setDiameter] = useState<string>(previewIsVisible ? `${expandedSize}rem` : `${collapsedSize}rem`);

	useEffect(() => {
		let rootFontSize = "unset";
		if (isBrowser()) rootFontSize = window.getComputedStyle(document.body).getPropertyValue("font-size");
		if (rootFontSize == "unset") rootFontSize = "16px";
		setBaseFontSize(parseInt(rootFontSize, 10));
	}, []);

	useEffect(() => {
		setYShift(calcYShift());
	}, [previewIsVisible]);

	const calcYShift = (): number => {
		const remMultiplier = previewIsVisible ? expandedSize : collapsedSize;
		return (baseFontSize * remMultiplier) / 2;
	};

	return (
		<motion.div
			id="trackpoint"
			className="fixed w-4 h-4 rounded-full inset-x-0 inset-y-0 mx-auto z-10 flex items-center overflow-visible justify-end"
			style={{ backgroundColor: "#171717", }}
			initial={{
				y: isBrowser() ? window.innerHeight / 2 : 0,
			}}
			animate={{
				y: pos.y - yShift,
				height: previewIsVisible ? `${expandedSize}rem` : `${collapsedSize}rem`,
				width: previewIsVisible ? `${expandedSize}rem` : `${collapsedSize}rem`,
			}}
            transition={{ type: "tween", duration: 0.1 }}
        >
            { previewIsVisible &&
                <motion.div className="z-20 min-w-[2000px] h-[1px] bg-white"></motion.div>
            }
        </motion.div>
	);
};

export default Trackpoint;
