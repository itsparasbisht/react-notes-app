import { NoteData, Tag } from "./App";
import NoteForm from "./NoteForm";
import { useNote } from "./NoteLayout";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
  hasDarkTheme: boolean;
};

function EditNote({
  onSubmit,
  onAddTag,
  availableTags,
  hasDarkTheme,
}: EditNoteProps) {
  const note = useNote();
  return (
    <div className={`${hasDarkTheme && "dark"} pt-2 md:pt-3`}>
      <h1 className="text-3xl font-semibold mb-6 dark:text-gray-200">
        Edit Note
      </h1>
      <NoteForm
        title={note.title}
        teaser={note.teaser}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
        hasDarkTheme={hasDarkTheme}
      />
    </div>
  );
}

export default EditNote;
