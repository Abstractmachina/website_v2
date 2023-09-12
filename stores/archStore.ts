import { IPosition } from '@/types/IPosition';
import { create } from 'zustand'


interface IArchStore {
    previewIsVisible: boolean;
    previewPostion: IPosition;
    showPreview: (on: boolean) => void;
}

export const useArchStore = create<IArchStore>()((set) => ({
    previewIsVisible: false,
    previewPostion: { x: 0, y: 0 },
    showPreview: (on) => set((state) => ({previewIsVisible: on}))
}))