import css from "./page.module.css";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "Sorry, but the column for this request does not exist in NoteHub. Check the address or return to the main one",
  openGraph: {
    title: "Page not found",
    description:
      "Sorry, but the column for this request does not exist in NoteHub. Check the address or return to the main one",
    url: "http://localhost:3001/5",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub — online notes manager",
      },
    ],
    type: "article",
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
