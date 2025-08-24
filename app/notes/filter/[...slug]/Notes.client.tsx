"use client";

import css from "./NotesPage.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";

import { useDebounce } from "use-debounce";

import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";

type Props = {
  tag: string;
};

export default function NotesClient({ tag }: Props) {
  // console.log(tag);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [debounceQuery] = useDebounce(query, 1000);

  const updateQuery = (query: string) => {
    setQuery(query);
    setPage(1);
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", debounceQuery, page, tag],
    queryFn: () => fetchNotes(debounceQuery, page, tag),

    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onSearch={updateQuery} />
        {data && data.totalPages > 1 && (
          <Pagination page={page} total={data.totalPages} onChange={setPage} />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {isLoading && <span>Loading...</span>}
      {isError && <span className={css.error}>Error</span>}
      {isSuccess && <NoteList notes={data ? data.notes : []} />}
    </div>
  );
}
