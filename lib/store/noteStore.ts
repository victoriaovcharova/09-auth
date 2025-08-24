import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NoteTag } from "@/types/note";

export interface DraftNote {
  title: string;
  content: string;
  tag: NoteTag;
}

const initialDraft: DraftNote = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteStore {
  draft: DraftNote;
  setDraft: (updates: Partial<DraftNote>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (updates) =>
        set((state) => ({
          draft: { ...state.draft, ...updates },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft-storage",
    }
  )
);
