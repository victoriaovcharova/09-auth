"use client";

import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { updateUser, UpdateUserRequest } from "@/lib/api/clientApi";

export default function EditProfile() {
  const router = useRouter();

  const { user, setUser } = useAuthStore();

  const handleSubmit = async (formData: FormData) => {
    try {
      // Типізуємо дані форми
      const formValues = Object.fromEntries(formData);

      if (user) {
        formValues.email = user.email;
      }

      // Виконуємо запит
      const res = await updateUser(formValues as UpdateUserRequest);
      // Виконуємо редірект або відображаємо помилку
      if (res) {
        setUser(res);
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user && (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              name="username"
              defaultValue={user?.username}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => {
                router.back();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
