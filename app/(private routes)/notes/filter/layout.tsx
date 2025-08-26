import css from './LayoutNotes.module.css';

type Props = {
    children: React.ReactNode;
    sidebar: React.ReactNode;
}



export default function NotesLayout({ children, sidebar }: Props){
    return (
        <div className={css.container}>
            <aside className={css.sidebar}>{sidebar}</aside>
            <main className={css.notesWrapper}>{children}</main>
        </div>
    );
};