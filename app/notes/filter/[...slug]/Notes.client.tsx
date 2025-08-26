'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import css from './NotesPage.module.css';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import { fetchNotes } from '@/lib/api';

export default function NotesClient({ initialTag }: { initialTag?: string }) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [debouncedSearchTerm] = useDebounce<string>(searchTerm, 500);

  const currentTag = initialTag;

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['notes', page, debouncedSearchTerm, currentTag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearchTerm,
        tag: currentTag === 'All' ? undefined : currentTag,
      }),
    placeholderData: (previousData) => previousData,
  });

  const handleSearchChange = useCallback((value: string): void => {
    setSearchTerm(value);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((selectedPage: number): void => {
    setPage(selectedPage);
  }, []);

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError) {
    return <p>Could not fetch the list of notes. {error.message}</p>;
  }

  const hasNotes: boolean = !!data?.data?.length;
  const totalPages: number = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      <main className={css.main}>
        {hasNotes ? (
          <NoteList notes={data!.data || []} onNoteDeleted={refetch} />
        ) : (
          <p>No notes found. Create your first note!</p>
        )}
      </main>
    </div>
  );
}