import { fetchServerNoteById as fetchNoteById } from '@/lib/api/serverApi';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotePreviewClient from './NotePreview.client';

interface NotePreviewProps {
  params: Promise<{ id: string }>;
}

const NotePreview = async ({ params }: NotePreviewProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
};

export default NotePreview;
