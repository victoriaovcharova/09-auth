'use client'

import css from './TagsMenu.module.css'
import Link from 'next/link'
import { useState } from 'react';

const tags = ["All","Todo", "Work", "Personal", "Meeting", "Shopping"];


export default function TagsMenu() {
    const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
    return (
        <div className={css.menuContainer}>
            <button onClick={toggle} className={css.menuButton}>
                Notes ▾
            </button>
            {isOpen && (
                <ul className={css.menuList}>
                   {tags.map(tag => (
                    <li key={tag} className={css.menuItem}>
                        <Link href={`/notes/filter/${tag}`} onClick={toggle} className={css.menuLink}>
                            {tag}
                        </Link>
                    </li>
                ))}
                </ul>
                )}
        </div>
    );
}