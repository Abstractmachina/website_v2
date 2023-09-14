import { IVec2d } from '@/types/IVec2d';
import { create } from 'zustand'


interface IHomeStore {
    centerCoordinate: IVec2d,
    actions: {
        setCenterCoord: (newx: number, newy: number) => void;
    }
}

const useHomeStore = create<IHomeStore>()((set) => ({
    centerCoordinate: {x:null, y: null},
    actions: {
        setCenterCoord: (newx, newy) => set((state) => ({ centerCoordinate: { x: newx, y: newy } })),

    }
}));


// PROPERTIES
export const useHomeCenterCoordinate = (): IVec2d => useHomeStore((state) => state.centerCoordinate);

// ACTIONS
export const useHomeActions = () => useHomeStore((state) => state.actions);