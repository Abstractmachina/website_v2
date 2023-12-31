export const map = (value: number, low1: number, high1: number, low2: number, high2: number): number => {
	return low2 + ((value - low1) * (high2 - low2)) / (high1 - low1);
};

export const clamp = (value: number, low: number, high: number): number => {
	if (value <= low) return low;
	else if (value >= high) return high;
	else return value;
};


export const isBrowser = (): boolean => {
	return typeof window !== "undefined";
};

/**
 * get root font size in px as number
 */
export const getRootFontSize = () : number => {
	let rootFontSize = "unset";
	if (isBrowser()) rootFontSize = window.getComputedStyle(document.body).getPropertyValue("font-size");
	if (rootFontSize == "unset") rootFontSize = "16px";
	return parseInt(rootFontSize, 10);
};
