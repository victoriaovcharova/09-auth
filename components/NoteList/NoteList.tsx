import css from "./NoteList.module.css";
import type { Note } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Link from "next/link";
import { deleteNote } from "@/lib/api/clientApi";


interface NoteListProps {
  notes: Note[];
}
export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => {
      return deleteNote(id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <>
      {notes.length === 0 && <span>Not found</span>}
      {notes.length > 0 && (
        <ul className={css.list}>
          {notes.map((note) => {
            return (
              <li key={note.id} className={css.listItem}>
                <h2 className={css.title}>{note.title}</h2>
                <p className={css.content}>{note.content}</p>
                <div className={css.footer}>
                  <span className={css.tag}>{note.tag}</span>
                  <Link className={css.link} href={`/notes/${note.id}`} scroll={false}>
                    View details
                  </Link>
                  <button
                    onClick={() => deleteNoteMutation.mutate(note.id)}
                    className={css.button}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
