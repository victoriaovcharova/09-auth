import Link from 'next/link';
import css from './ProfilePage.module.css';
import { Metadata } from 'next';
import Image from 'next/image';
import { getProfile } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Personal user page',
  openGraph: {
    title: 'Profile',
    description: 'Personal user page',
    siteName: 'NoteHub',
    url: 'https://08-zustand-livid.vercel.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Notenub logo',
      },
    ],
  },
};

export default async function Profile() {
  const user = await getProfile();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src="https://ac.goit.global/fullstack/react/default-avatar.jpg"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username:{user.username} </p>
          <p>Email:{user.email}</p>
        </div>
      </div>
    </main>
  );
}
