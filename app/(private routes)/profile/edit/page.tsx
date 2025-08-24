"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { editUser, usersMe } from "@/lib/api/clientApi";
import css from "./EditProfilePage.module.css";

export default function EditProfile() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // при загрузке страницы получить текущие данные пользователя
    async function fetchUser() {
      try {
        const userData = await usersMe();
        setUsername(userData.username);
        setEmail(userData.email);
      } catch (e) {
        setError("Failed to load user data");
      }
    }

    fetchUser();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await editUser({ username });
      router.push("/profile");
    } catch (error) {
      setError("Unable to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src="/profile-photo.png"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form onSubmit={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input 
              id="username" 
              type="text" 
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
             />
          </div>

          <p>Email: {email}</p>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={loading}
            >
            {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
