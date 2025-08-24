"use client";

import { useParams } from "next/navigation";
import css from "./NoteDetails.module.css"
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

const NoteDetailsClient = () => {

    const {id} = useParams<{id: string}>()
    const {data:note, isLoading, error} = useQuery({
        queryKey: ['note', id],
        queryFn: ()=> fetchNoteById(id),
        refetchOnMount: false,
    })

    if (isLoading) {
      return <Loader/>
    }

    if (error || !note) {
      return <ErrorMessage/>
    }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note?.title}</h2>
        </div>
        <p className={css.content}>{note?.content}</p>
        <p className={css.date}>{note?.createdAt}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient
