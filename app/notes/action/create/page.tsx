import NoteForm from '@/components/NoteForm/NoteForm'
import css from './NotesPage.module.css'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Create new note",
  description: "Page for creating new note",
  openGraph: {
    title: `Create new note`,
    description: `Page for creating new note`,
    url: `https://08-zustand-liard.vercel.app/notes/action/create/`,
    images: [
{
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `your note picture`,
        },
    ]
  }
};

const CreateNote = () =>{
    return (
        <>
        <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
	   <NoteForm/>
  </div>
</main>
</>
)
}

export default CreateNote