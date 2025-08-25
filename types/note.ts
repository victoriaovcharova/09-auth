export type NoteTag =
  | "Todo"
  | "Work"
  | "Personal"
  | "Shopping"
  | "Meeting"
  | "Ideas"
  | "Travel"
  | "Finance"
  | "Health"
  | "Important";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}
