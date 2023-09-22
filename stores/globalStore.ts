import { isBrowser } from "@/libs/util";
import { IVec2d } from "@/types/IVec2d";
import { Page } from "@/types/enum_page";
import { create } from "zustand"



interface IGlobalStore {
    currentPage: Page,
    nextPage: Page,
    centerCoordinate: IVec2d,
    rootFontSize: number,
    clientSize: IVec2d,
    actions: {
        setCurrentPage: (page: Page) => void,
        setNextPage: (page: Page) => void,
        setCenterCoord: (newx: number, newy: number) => void
        setRootFontSize: (val: number) => void,
        setClientSize: (pos: IVec2d) => void,
    },
}

export const useGlobalStore = create < IGlobalStore>()((set) => ({
    currentPage: Page.HOME,
    // next page is set before routing. This is necessary as framer motion animatepresence is not currently functional in nextjs, so need to use useAnimate to manually set transitions. after successful transition, nextpage should be set to NONE again, until the user is rerouted. 
    nextPage: Page.NONE,
    centerCoordinate: { x: null, y: null },
    rootFontSize: 16,
    clientSize: {x:isBrowser() ? window.innerWidth : 0, y: isBrowser() ? window.innerHeight : 0},
    actions: {
        setCurrentPage: (page) => set((state) => ({ currentPage: page })),
        setNextPage: (page) => set((state) => ({ nextPage: page })),
        setCenterCoord: (newx, newy) => set((state) => ({ centerCoordinate: { x: newx, y: newy } })),
        setRootFontSize: (val) => set((state) => ({ rootFontSize: val })),
        setClientSize: (val) => set((state) => ({clientSize: val})),
    }
}))

export const useGlobalCurrentPage = (): Page => useGlobalStore((state) => state.currentPage);
export const useGlobalNextPage = (): Page => useGlobalStore((state) => state.nextPage);
export const useGlobalCenterCoordinate = (): IVec2d => useGlobalStore((state) => state.centerCoordinate);
export const useGlobalRootFontSize = (): number => useGlobalStore((state) => state.rootFontSize);
export const useGlobalClientSize = (): IVec2d => useGlobalStore((state) => state.clientSize);

export const useGlobalActions = () => useGlobalStore((state) => state.actions);