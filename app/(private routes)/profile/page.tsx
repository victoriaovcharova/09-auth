import Link from 'next/link';
import css from './Profile.module.css';
import Image from 'next/image';
import { Metadata } from 'next';
import { getServerMe } from '@/lib/api/serverApi';

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();
  return {
    title: `${user.username} | NoteHub`,
    description: `${user.username} profile page`,
    openGraph: {
      title: 'Profile Page',
      description: `${user.username} profile page`,
      url: 'https://09-auth-three-lake.vercel.app/profile',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub',
        },
      ],
    },
  };
}

const Profile = async () => {
  const user = await getServerMe();
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
          <Image src={user.avatar} alt="User Avatar" width={120} height={120} className={css.avatar} />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
