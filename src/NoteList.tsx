import { Badge, Button, TextField } from "@radix-ui/themes";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "./App";
import { PlusIcon, Pencil1Icon } from "@radix-ui/react-icons";

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
};

function NoteList({ availableTags, notes }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Notes</h1>
        <div className="flex gap-3">
          <Link to="/new">
            <Button radius="large" variant="solid">
              <PlusIcon />
              Create
            </Button>
          </Link>
          <Button color="yellow" type="button" radius="large" variant="soft">
            <Pencil1Icon />
            Edit Tags
          </Button>
        </div>
      </div>
      <form className="flex gap-6 mt-4">
        <div className="flex-1">
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <TextField.Input
            id="title"
            variant="soft"
            size="3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="tags" className="block mb-1 font-medium">
            Tags
          </label>
          <ReactSelect
            id="tags"
            isMulti
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            options={availableTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onChange={(tags) => {
              setSelectedTags(
                tags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              );
            }}
          />
        </div>
      </form>
      <div className="mt-5 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {filteredNotes.map((note) => (
          <div key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </div>
        ))}
      </div>
    </>
  );
}

export default NoteList;

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Link to={`/${id}`}>
      <div className="border-2 p-4 rounded-lg hover:bg-yellow-100 hover:border-yellow-100 transition-colors overflow-hidden">
        <h3 className="text-lg mb-1 font-medium truncate">{title}</h3>
        {tags.length > 0 &&
          tags.map((tag) => (
            <Badge id={tag.id} color="blue" className="mr-2">
              {tag.label && tag.label.length > 20
                ? `${tag.label.substring(0, 20)}...`
                : tag.label}
            </Badge>
          ))}
      </div>
    </Link>
  );
}
