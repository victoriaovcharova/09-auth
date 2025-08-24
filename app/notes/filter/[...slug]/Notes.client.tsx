"use client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import NoteList from "@/components/NoteList/NoteList";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { Note } from "@/types/note";
import css from "./NotePage.module.css";
import { useDebounce } from 'use-debounce';
import Link from "next/link";

interface Props {
  initialData: {
    notes: Note[];
    totalPages: number;
  };
  initialTag: string;
}

const NotesClients = ({
  initialData,
  initialTag,
}: Props) => {
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(query, 1000);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setPage(1);
  }, [initialTag]);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", debouncedQuery, page, initialTag],
    queryFn: () => fetchNotes(debouncedQuery ,page, initialTag),
    placeholderData: keepPreviousData,
    initialData,
  });

  useEffect(() => {
    if (!data) return;

    if (data.notes.length === 0) {
      toast.error("No notes found for your request.");
    }
  }, [data, query]);

  const noteData = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <header className={css.toolbar}>
        <SearchBox value={query} onChange={handleInputChange} />
        {isSuccess && noteData.length > 0 && (
          <Pagination total={totalPages} onChange={setPage} page={page} />
        )}
        <button className={css.button} onClick={openModal}>
          <Link href="/notes/action/create" className={css.link}>Create note +</Link>
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {noteData.length > 0 && <NoteList notes={noteData} />}
    </div>
  );
};

export default NotesClients;
