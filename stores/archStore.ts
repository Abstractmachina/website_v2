import { IPosition } from '@/types/IPosition';
import { create } from 'zustand'


interface IArchStore {
    previewIsVisible: boolean,
    previewPostion: IPosition,
    selectedProject: string,
    trackpointAnimateable: boolean,
    projectIndexScrollY: number,
    actions: {
        showPreview: (on: boolean) => void;
        setPosition: (newx: number, newy: number) => void;
        setSelectedProject: (projectId: string) => void;
        setTrackpointAnimateable: (doAnimate: boolean) => void;
        setProjecIndexScrollY: (offset: number) => void;
    }
}

const useArchStore = create<IArchStore>()((set) => ({
    previewIsVisible: false,
    previewPostion: { x: 0, y: 0 },
    selectedProject: 'none',
    trackpointAnimateable: false,
    projectIndexScrollY: 0,
    actions: {
        showPreview: (on) => set((state) => ({ previewIsVisible: on })),
        setPosition: (newx, newy) => set((state) => ({ previewPostion: { x: newx, y: newy } })),
        setSelectedProject: (projectId) => set((state) => ({ selectedProject: projectId })),
        setTrackpointAnimateable: (doAnimate) => set((state) => ({ trackpointAnimateable: doAnimate })),
        setProjecIndexScrollY: (offset) => set((state) => ({projectIndexScrollY: offset}))
    }
}));


export const useArchPreviewVisibility = () : boolean => useArchStore((state) => state.previewIsVisible);
export const useArchPreviewPosition = (): IPosition => useArchStore((state) => state.previewPostion);
export const useArchSelectedProject = () => useArchStore((state) => state.selectedProject);
export const useArchTrackpointAnimateable = () => useArchStore((state) => state.trackpointAnimateable);
export const useArchIndexScrollY = () => useArchStore((state) => state.projectIndexScrollY);

export const useArchActions = () => useArchStore((state) => state.actions);