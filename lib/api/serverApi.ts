// lib/api/serverApi.ts

import { nextServer } from "./api";
import { User } from "@/types/user";

import { Note } from "@/types/note";
import { cookies } from "next/headers";

export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
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

  const cookieStore = await cookies();

  const response = await nextServer.get<NoteResponse>(
    `/notes?perPage=12&sortBy=created`,
    {
      params,
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );

  // console.log(response.data);

  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const deleteNote = async (noteId: string) => {
  const cookieStore = await cookies();
  const response = await nextServer.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};
