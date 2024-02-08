import { NoteData, Tag } from "./App";
import NoteForm from "./NoteForm";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
  hasDarkTheme: boolean;
};

function NewNote({
  onSubmit,
  onAddTag,
  availableTags,
  hasDarkTheme,
}: NewNoteProps) {
  return (
    <div className={`${hasDarkTheme && "dark"} pt-2 md:pt-3`}>
      <h1 className="text-3xl font-semibold mb-6 dark:text-gray-200">
        New Note
      </h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
        hasDarkTheme={hasDarkTheme}
      />
    </div>
  );
}

export default NewNote;
