"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";
import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

const NotePreview = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;
  if (error || !note) return <ErrorMessage />;

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.content}>{note.tag}</p>
          <p className={css.date}>{note.createdAt}</p>
          <button className={css.button} onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreview;
