import { cookies } from "next/headers";
import { api } from "./api";
import type { User } from "@/types/user";
import type { Note, NoteTag } from "@/types/note";

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

const getServerCookies = async (): Promise<string> => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};

// Users API
export const getCurrentUserServer = async (): Promise<User | null> => {
  try {
    const cookieHeader = await getServerCookies();
    const response = await api.get("/users/me", {
      headers: { Cookie: cookieHeader },
    });
    return response.data;
  } catch {
    return null;
  }
};

// Notes API
export const fetchNotesServer = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const cookieHeader = await getServerCookies();
  const response = await api.get("/notes", {
    params,
    headers: { Cookie: cookieHeader },
  });
  return response.data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieHeader = await getServerCookies();
  const response = await api.get(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });
  return response.data;
};
