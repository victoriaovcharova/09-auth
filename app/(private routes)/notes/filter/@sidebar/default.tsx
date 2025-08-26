// import TagsMenu from "@/components/TagsMenu/TagsMenu"
import Link from "next/link";
import css from "./SidebarNotes.module.css";

type Tag = "All" | "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
const tags: Tag[] = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];

const SidebarNotes = async () => {
  return (
    <ul className={css.menuList}>
      {tags.map((tag, index) => {
        return (
          <li key={index} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        );
      })}
      
    </ul>
  );
};

export default SidebarNotes;
