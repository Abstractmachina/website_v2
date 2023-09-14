import { IVec2d } from "@/types/IVec2d";
import { Page } from "@/types/enum_page";
import { create } from "zustand"



interface IGlobalStore {
    currentPage: Page,
    nextPage: Page,
    centerCoordinate: IVec2d,
    actions: {
        setCurrentPage: (page: Page) => void,
        setNextPage: (page: Page) => void,
        setCenterCoord: (newx: number, newy: number) => void
    },
}

export const useGlobalStore = create < IGlobalStore>()((set) => ({
    currentPage: Page.HOME,
    // next page is set before routing. This is necessary as framer motion animatepresence is not currently functional in nextjs, so need to use useAnimate to manually set transitions. after successful transition, nextpage should be set to NONE again, until the user is rerouted. 
    nextPage: Page.NONE,
    centerCoordinate: {x:null, y: null},
    actions: {
        setCurrentPage: (page) => set((state) => ({ currentPage: page })),
        setNextPage: (page) => set((state) => ({ nextPage: page })),
        setCenterCoord: (newx, newy) => set((state) => ({ centerCoordinate: { x: newx, y: newy } })),
    }
}))

export const useGlobalCurrentPage = (): Page => useGlobalStore((state) => state.currentPage);
export const useGlobalNextPage = (): Page => useGlobalStore((state) => state.nextPage);
export const useHomeCenterCoordinate = (): IVec2d => useg((state) => state.centerCoordinate);


export const useGlobalActions = () => useGlobalStore((state) => state.actions);