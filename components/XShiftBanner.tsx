import { getRootFontSize, map } from "@/libs/util";
import { IInterval2d } from "@/types/IInterval2d";
import { IVec2d } from "@/types/IVec2d";
import { Alignment } from "@/types/enum_AlignmentX";
import { Direction } from "@/types/enum_direction";
import { motion } from "framer-motion";
import { type } from "os";
import React, { FC, ReactElement } from "react";

type XShiftBannerProps = {
	id: string,
	text: string;
	fontsize: number;
	anchor: IVec2d;
	offset: IVec2d;
	range: IInterval2d;
	current: number;
	direction: Direction;
};

const ShiftTranslateTextBox: FC<XShiftBannerProps> = ({ id, text, fontsize, anchor, offset, range, current, direction }): ReactElement => {
	const rootFontSize = getRootFontSize();

	const translateX = (): number => {
		let dir = 1;
		switch (direction) {
			case Direction.LEFT:
				dir = -1;
				break;
			case Direction.RIGHT:
				dir = 1;
				break;
		}


		return map(current, 0, dir, range.min, range.max);

		return 0;
		// return (x - centerX) * 0.3;
	};


	return (
		<motion.div
			id={id}
			className="fixed font-inter"
			style={{
				top: anchor.y! + offset.y!,
				left: anchor.x! + offset.x!,
				fontSize: rootFontSize * fontsize,
			}}
			animate={{
				x: translateX(),
			}}
			transition={{
				type: "linear",
				duration: 0.01
			}}
		>
			{text}
		</motion.div>
	);
};

export default ShiftTranslateTextBox;
