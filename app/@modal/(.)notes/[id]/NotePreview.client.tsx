"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

export default function NotePreview() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose} showCloseButton={false}>
        <div className={css.container}>Loading note...</div>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={handleClose} showCloseButton={false}>
        <div className={css.container}>
          Error loading note: {error?.message || "Note not found"}
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose} showCloseButton={false}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </div>

          <p className={css.content}>{note.content}</p>

          <div className={css.date}>
            Created: {new Date(note.createdAt).toLocaleDateString()}
            <br />
            Last updated: {new Date(note.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      <button className={css.backBtn} onClick={handleClose}>
        ← Back
      </button>
    </Modal>
  );
}
