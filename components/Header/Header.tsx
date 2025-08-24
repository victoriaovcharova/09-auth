'use client';

import Link from 'next/link';
import css from './Header.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" className={css.headerLink} aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/">Home</Link>
          </li>
          <li className={css.navigationItem}>
            <TagsMenu />
          </li>
          <li className={css.navigationItem}>
            <AuthNavigation />
          </li>
        </ul>
      </nav>
    </header>
  );
}
