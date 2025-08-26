export interface Note {
  title: string;
  content: string;
  tag: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: string;
}
