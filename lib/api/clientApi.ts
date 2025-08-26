import { User } from "@/types/user";
import { nextServer } from "./api";
import { NewNoteData, Note } from "@/types/note";

export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export type UpdateUserRequest = {
  email: string;
  username: string;
};

export const updateUser = async (data: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", data);
  return res.data;
};

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

export interface Params {
  page: number;
  search?: string;
  tag?: string;
}

export const fetchNotes = async (
  query: string,
  page: number,
  tag: string
): Promise<NoteResponse> => {
  const params: Params = {
    page,
  };

  if (query) {
    params.search = query;
  }

  if (tag !== "All") {
    params.tag = tag;
  }

  const response = await nextServer.get<NoteResponse>(
    `/notes?perPage=12&sortBy=created`,
    {
      params,
    }
  );

  // console.log(response.data);

  return response.data;
};

export const addNote = async (newNote: NewNoteData): Promise<Note> => {
  const response = await nextServer.post<Note>(`/notes`, newNote);

  return response.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);

  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`);
  return data;
};
