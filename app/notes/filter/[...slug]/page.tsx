import { fetchNotes } from "@/lib/api";
import NoteClient from "./Notes.client";
import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];

  const title = `Notes by: ${tag}`;
  const description = `Here are all the notes filtered by "${tag}".`;
  const url = `https://your-domain.com/notes/filter/${tag}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: `https://ac.goit.global/fullstack/react/notehub-og-meta.jpg`,
          width: 1200,
          height: 630,
          alt: `Notes filtered by ${tag}`,
        },
      ],
    },
  };
}

const Notes = async ({ params }: Props) => {
  const { slug } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes("", 1, slug[0]),
  });



  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient tag={slug[0]} />
    </HydrationBoundary>
  );
};

export default Notes;
