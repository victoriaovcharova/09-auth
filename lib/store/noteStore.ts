import { User } from '../api';
import {create} from 'zustand';

import { persist } from 'zustand/middleware';


 interface CreateTask{
    title: string
    content: string
    tag: 'Todo' | string

}

type NoteDraftStore = {
    draft: CreateTask,
    setDraft: (note: CreateTask) => void,
    clearDraft: () => void,
}

const initialDraft: CreateTask = {
    title: '',
    content: '',
    tag: 'Todo',
}



type isAuthenticatedStore = {
    isAuthenticated: boolean,
    user: User | null,
    setData: (userData: User) => void,
    clearData: () => void
}



export const useNoteDraft = create<NoteDraftStore>()(
    persist(
        (set) =>({
            draft: initialDraft,
            setDraft: (newData: CreateTask) => set({draft: newData}),
            clearDraft: () => set({draft: initialDraft})
        }),
        {
            name: 'note-draft',
            partialize: (state) => ({draft: state.draft})
        }
    )
    
)


export const useUserData = create<isAuthenticatedStore>()(
    persist(
        (set) =>({
            isAuthenticated: false,
            user: null,
            setData: (userData: User) =>{
                set(() => ({user: userData, isAuthenticated: true}))
            },
            clearData: () => {
                set(() => ({user: null, isAuthenticated: false}))
            }
        }),
        {
            name: 'user-data',
            partialize: (state) => ({user: state.user})
        }
    )
)