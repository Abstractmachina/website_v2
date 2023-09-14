import { IVec2d } from "@/types/IVec2d";

export const distance = (v1: IVec2d, v2: IVec2d, signed: boolean = true): IVec2d => {
    
    if (v1.x == null || v2.x == null || v1.y == null || v2.y == null) {
        return { x: null, y: null };
    }
		const dist : IVec2d = {x: (v2.x - v1.x), y: (v2.y - v1.y)}
    return signed ? dist : { x: Math.abs(dist.x!), y: Math.abs(dist.y!) };
}
