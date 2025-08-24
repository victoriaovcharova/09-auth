import { api } from "./api";
import type { User } from "@/types/user";
import type { Note, NoteTag } from "@/types/note";

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// Auth API
export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const register = async (credentials: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", credentials);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const getSession = async (): Promise<{ success: boolean }> => {
  const response = await api.get("/auth/session");
  return response.data;
};

// Users API
export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/users/me");
  return response.data;
};

export const updateUser = async (userData: Partial<User>): Promise<User> => {
  const response = await api.patch("/users/me", userData);
  return response.data;
};

// Notes API
export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const response = await api.get("/notes", { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (noteData: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const response = await api.post("/notes", noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};
