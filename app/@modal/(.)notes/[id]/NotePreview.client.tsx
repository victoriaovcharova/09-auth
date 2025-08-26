'use client'
import { useRouter } from 'next/navigation';
import {DehydratedState, useQuery, HydrationBoundary} from "@tanstack/react-query";
import { fetchNoteById } from '@/lib/ClientApi';
import Modal from "@/components/Modal/Modal";
import css from './NotePreview.module.css'

interface NoteModalPreviewProps{
    id: string,
    dehydratedState: DehydratedState
    
}



const NoteModalPreview = ({id, dehydratedState}: NoteModalPreviewProps) =>{

    const router = useRouter();
    const handleClose = () => router.back();

    

    const {data, isLoading, error} = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false
    })


    if(isLoading){
        return(
          <HydrationBoundary state={dehydratedState}>
            <Modal onClose={handleClose}>
                <p>Loading...</p>
            </Modal>
          </HydrationBoundary>
            
        )
    }

    if(error){
        return(
          <HydrationBoundary state={dehydratedState}>
            <Modal onClose={handleClose}>
                <p>Something went wrong...</p>
            </Modal>
          </HydrationBoundary>  
        )
        
    }


    return(
      <HydrationBoundary state={dehydratedState}>
        <Modal onClose={handleClose}>
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{data?.title}</h2>
            </div>
            <div>
              <p className={css.content}>{data?.content}</p>
            </div>
          </div>
          <div className={css.infoDiv}>
            <button className={css.backBtn} onClick={handleClose}>Close</button>
            <p className={css.tag}>{data?.tag}</p>
            <p className={css.date}>{data?.createdAt.slice(0, 10)}</p>
          </div>
          
            
          
        </div>
      </Modal>

      </HydrationBoundary>
      
    )

}


export default NoteModalPreview;