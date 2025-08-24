import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getCurrentUserServer } from "@/lib/api/serverApi";
import css from "./ProfilePage.module.css";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "View and manage your NoteHub profile",
};

export default async function ProfilePage() {
  const user = await getCurrentUserServer();

  if (!user) {
    return (
      <div className={css.mainContent}>
        <div className={css.profileCard}>
          <div>Please sign in to view your profile</div>
        </div>
      </div>
    );
  }

  return (
    <div className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <span>Username:</span>
            <span>{user.username}</span>
          </div>
          <div className={css.usernameWrapper}>
            <span>Email:</span>
            <span>{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
