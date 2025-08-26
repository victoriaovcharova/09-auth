
"use client"
import Link from "next/link";
import css from "./TagsMenu.module.css";
import { useState } from "react";

type Tag = "All" | "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
const tags: Tag[] = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];
// type Props = {
//    tags: Tag[]; 
// };
const TagsMenu = () => {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);


  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>Notes</button>
      {isOpen && (
      <ul className={css.menuList}>
        {tags.map((tag, index) => {
          return (
            <li key={index} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={toggle}>
                {tag}
              </Link>
            </li>
          );
        })}
      </ul>
      )}
    </div>
  );
};

export default TagsMenu;
