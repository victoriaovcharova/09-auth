import { api } from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';
import { FetchNotesParams } from '@/types/FetchNotesParams';
import { FetchNotesResponse } from '@/types/FetchNotesResponse';
import { CreateNoteDto } from '@/types/CreateNoteDto';

interface AuthPayload {
  email: string;
  password: string;
}

// ================ Session and Login ========

export async function getAuthSession() {
  const res = await api.get('/auth/session');
  return res.data;
}

export async function getCurrentUser(): Promise<User> {
  const res = await api.get<User>('/users/me');
  return res.data;
}

export async function patchUserProfile(data: Partial<User>): Promise<User> {
  const res = await api.patch<User>('/users/me', data);
  return res.data;
}

export async function registerUser(data: AuthPayload): Promise<User> {
  const res = await api.post<User>('/auth/register', data);
  return res.data;
}

export async function loginUser(data: AuthPayload): Promise<User> {
  const res = await api.post<User>('/auth/login', data);
  return res.data;
}

export async function logoutUser(): Promise<void> {
  await api.post('/auth/logout');
}

// ================ NOTES API ========

export async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
  const res = await api.get<FetchNotesResponse>('/notes', { params });
  return res.data;
}

// POST /notes
export async function createNote(note: CreateNoteDto): Promise<Note> {
  const res = await api.post<Note>('/notes', note);
  return res.data;
}

// DELETE /notes/:id
export async function deleteNote(id: string): Promise<Note> {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
}

// GET /notes/:id
export async function fetchNoteById(id: string): Promise<Note> {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
}
