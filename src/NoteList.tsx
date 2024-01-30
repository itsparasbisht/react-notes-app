import { Button, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "./App";
import { PlusIcon, Pencil1Icon } from "@radix-ui/react-icons";

type NoteListProps = {
  availableTags: Tag[];
};

function NoteList({ availableTags }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

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
    </>
  );
}

export default NoteList;
