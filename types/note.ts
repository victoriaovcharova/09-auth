export interface Note {
 id: number | string;
 title: string;
 content: string;
 createdAt: string;
 updatedAt: string;
 tag: NoteTag;
}

export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export interface NewNoteData {
 title: string;
  content: string;
  tag: NoteTag;
}

export type LoginRequestData = {
 email: string
 password: string
}

export type RegisterRequestData = {
 email: string
 password: string
}

export type CheckSessionRequest = {
  success: boolean;
};

export interface NotesHttpResponse {
  totalPages: number;
  notes: Note[];
  tag?: string;
}