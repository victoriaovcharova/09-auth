import css from './profile.module.css'
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getMe } from '@/lib/ClientApi';

export const metadata: Metadata = {
    title: 'Profile',
    description: 'Profile Page',
    openGraph: {
        title: 'Profile',
        description: 'Profile Page',
        url: '/profile',
        images: [{
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: 'Profile Page'
            }],
    }
}

const  Profile = async () =>{
    const data = await getMe()
    return(
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <div className={css.header}>
                    <h1 className={css.formTitle}>Profile Page</h1>
                    <Link href='/profile/edit' className={css.editProfileButton}>
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
                    <p>
                        Username: {data.userName}
                    </p>
                    <p>
                        Email: {data.email}
                    </p>
                </div>
            </div>
        </main>

    )
}

export default Profile;