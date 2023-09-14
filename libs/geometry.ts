import { IVec2d } from "@/types/IVec2d";
import { isBrowser } from "./util";

export const distance = (v1: IVec2d, v2: IVec2d, signed: boolean = true): IVec2d => {
    
    if (v1.x == null || v2.x == null || v1.y == null || v2.y == null) {
        return { x: null, y: null };
    }
		const dist : IVec2d = {x: (v2.x - v1.x), y: (v2.y - v1.y)}
    return signed ? dist : { x: Math.abs(dist.x!), y: Math.abs(dist.y!) };
}



/**
 * Calculate the center coordinate of the current DOM window. if not a browser, will return 0.
 * @param {any} storeValue function that stores the calculated vector
 * @returns {any}
 */
export const getWindowCenterCoordinate = (storeValue: (x:number, y:number) => void) :void => {
		const centerX = Math.round(isBrowser() ? window.innerWidth / 2 : 0);
		const centerY = Math.round(isBrowser() ? window.innerHeight / 2 : 0);
		storeValue(centerX, centerY);
}