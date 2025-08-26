'use client'
import css from './NoteForm.module.css'
import  { useId } from 'react'
import { createNote } from '@/lib/ClientApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateNoteTask } from '@/lib/ClientApi'
import { useRouter } from 'next/navigation'
import { useNoteDraft } from '@/lib/store/noteStore'


export default function NoteForm(){

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> ) =>{
        setDraft({
            ...draft,
            [event.target.name]: event.target.value
        })
       

    }

    const router = useRouter()
    const fieldId = useId();
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: createNote,

        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey: ['cardNotes']})
            clearDraft();
            router.push('/notes/filter/all')
        }
    })

    const handleSubmit = (formData: FormData) =>{
        const values = Object.fromEntries(formData) as unknown as CreateNoteTask
        mutate(values)
    }
    const handleClose = () => router.push('/notes/filter/all');

    const {draft, setDraft, clearDraft} = useNoteDraft();

    
    
    

    
    return(
        
        
            
                <form action={handleSubmit} className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-title`}>Title</label>
                    <input defaultValue={draft?.title} onChange={handleChange} id={`${fieldId}-title`} type="text" name="title" className={css.input} />
                    
                </div>

                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-content`}>Content</label>
                    <textarea
                    defaultValue={draft?.content}
                    onChange={handleChange} 
                    id={`${fieldId}-content`}
                    name="content"
                    rows={8}
                    className={css.textarea}
                    />
                    
                </div>

                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-tag`}>Tag</label>
                    <select defaultValue={draft?.tag} onChange={handleChange}  id={`${fieldId}-tag`} name="tag" className={css.select}>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </select>
                    
                </div>

                <div className={css.actions}>
                    <button onClick={handleClose}  type="button" className={css.cancelButton}>
                    Cancel
                    </button>
                    <button
                     
                    type="submit"
                    className={css.submitButton}
                    disabled={false}
                    >
                    Create note
                    </button>
                </div>
            </form>
            
            
        

    )
}