import { Page } from "@/types/enum_page";
import { create } from "zustand"



interface IGlobalStore {
    currentPage: Page,
    nextPage: Page,
    actions: {
        setCurrentPage: (page: Page) => void,
        setNextPage: (page:Page) => void,
    }
}

export const useGlobalStore = create < IGlobalStore>()((set) => ({
    currentPage: Page.HOME,
    // next page is set before routing. This is necessary as framer motion animatepresence is not currently functional in nextjs, so need to use useAnimate to manually set transitions. after successful transition, nextpage should be set to NONE again, until the user is rerouted. 
    nextPage: Page.NONE,
    actions: {
        setCurrentPage: (page) => set((state) => ({ currentPage: page })),
        setNextPage: (page) => set((state) => ({nextPage: page})),
    }
}))

export const useGlobalCurrentPage = (): Page => useGlobalStore((state) => state.currentPage);
export const useGlobalNextPage = (): Page => useGlobalStore((state) => state.nextPage);
export const useGlobalActions = () => useGlobalStore((state) => state.actions);