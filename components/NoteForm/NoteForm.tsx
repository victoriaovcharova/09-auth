"use client"

import css from "./NoteForm.module.css";
import { useId } from "react";
import type { NewNoteData } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from '@/lib/store/noteStore';

export default function NoteForm() {
  const fieldId = useId();
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
	 
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const queryClient = useQueryClient();

  const addNoteMutation = useMutation({
    mutationFn: (newNote: NewNoteData) => {
      return addNote(newNote);
    },

    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
router.push('/notes/filter/All')
      
    },
  });

  const handleCancel = () => router.push('/notes/filter/All');

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NewNoteData;
    // console.log(values);
    addNoteMutation.mutate(values)
  };

  return (

      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <input
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
            defaultValue={draft?.title} onChange={handleChange}
          />

        
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <textarea
            
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
            defaultValue={draft?.content} onChange={handleChange}
          />
         
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <select
            defaultValue={draft?.tag} onChange={handleChange}
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>

        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false} >
            Create note
          </button>
        </div>
      </form>
    
  );
}