import { IPosition } from '@/types/IPosition';
import { create } from 'zustand'


interface IArchStore {
    previewIsVisible: boolean,
    previewPostion: IPosition,
    selectedProject: string,
    actions: {
        showPreview: (on: boolean) => void;
        setPosition: (newx: number, newy: number) => void;
        setSelectedProject: (projectId: string) => void;
    }
}

export const useArchStore = create<IArchStore>()((set) => ({
    previewIsVisible: false,
    previewPostion: { x: 0, y: 0 },
    selectedProject: 'none',
    actions: {
        showPreview: (on) => set((state) => ({ previewIsVisible: on })),
        setPosition: (newx, newy) => set((state) => ({ previewPostion: { x: newx, y: newy } })),
        setSelectedProject: (projectId) => set((state) => ({ selectedProject: projectId }))
    }
}));


export const useArchPreviewVisibility = () : boolean => useArchStore((state) => state.previewIsVisible);
export const useArchPreviewPosition = (): IPosition => useArchStore((state) => state.previewPostion);
export const useArchSelectedProject = () => useArchStore((state) => state.selectedProject);

export const useArchActions = () => useArchStore((state) => state.actions);