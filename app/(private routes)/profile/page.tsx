import Link from "next/link";
import Image from 'next/image';
import { Metadata } from 'next';
import {usersServerMe} from '@/lib/api/serverApi';
import css from "./ProfilePage.module.css";

export const metadata: Metadata = {
  title: 'Profile Page',
  description: 'User profile page with account details and settings.',

  openGraph: {
      title: 'Profile Page',
      description: "User profile page with account details and settings.",
      url: "http://localhost:3000/profile",
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
};

export default async function Profile() {

  const user =  await usersServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src="/profile-photo.png"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
