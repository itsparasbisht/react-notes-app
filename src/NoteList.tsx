import { Badge, Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { hasDarkTheme, Tag } from "./App";
import { PlusIcon, Pencil1Icon, Cross1Icon } from "@radix-ui/react-icons";

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  onUpdateTag: (id: string, labe: string) => void;
  onDeleteTag: (id: string) => void;
};

type EditTagsModalProps = {
  availableTags: Tag[];
  open: boolean;
  setOpen: () => void;
  onUpdateTag: (id: string, labe: string) => void;
  onDeleteTag: (id: string) => void;
};

function NoteList({
  availableTags,
  notes,
  onUpdateTag,
  onDeleteTag,
}: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [isEditTagsModalOpen, setIsEditTagsModalOpen] = useState(false);

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
      <div className="flex justify-between dark:bg-slate-950">
        <h1 className="text-3xl font-semibold dark:text-gray-200">Notes</h1>
        <div className={`flex gap-3 ${hasDarkTheme && "dark"}`}>
          <Link to="/new">
            <Button radius="large" variant="solid">
              <PlusIcon />
              Create
            </Button>
          </Link>
          <Button
            color="yellow"
            type="button"
            radius="large"
            variant="soft"
            onClick={() => setIsEditTagsModalOpen(true)}
          >
            <Pencil1Icon />
            Edit Tags
          </Button>
        </div>
      </div>
      <form className="flex gap-6 mt-4 dark:text-gray-300">
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
            className="dark:!text-gray-300"
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
            className="text-black"
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: hasDarkTheme ? "#020B26" : "#EDF2FE",
                borderColor: hasDarkTheme ? "#020B26" : "#FFFFFF",
              }),
            }}
          />
        </div>
      </form>

      {filteredNotes.length === 0 &&
        title === "" &&
        selectedTags.length === 0 && (
          <div className="flex justify-center items-center h-[60vh]">
            <p className="font-light text-gray-500">
              No notes added, create a new note &nbsp;
            </p>
            <Link to="/new">
              <Button radius="large" variant="soft">
                <PlusIcon />
                Create
              </Button>
            </Link>
          </div>
        )}

      <div className="mt-5 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {filteredNotes.map((note) => (
          <div key={note.id}>
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              tags={note.tags}
            />
          </div>
        ))}
      </div>
      <EditTagsModal
        availableTags={availableTags}
        open={isEditTagsModalOpen}
        setOpen={() => setIsEditTagsModalOpen(false)}
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />
    </>
  );
}

export default NoteList;

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Link to={`/${id}`} key={id}>
      <div
        key={id}
        className="border-2 p-4 rounded-lg hover:bg-yellow-100 hover:border-yellow-100 transition-colors overflow-hidden dark:text-gray-300 dark:border-indigo-950 dark:hover:bg-indigo-950 dark:hover:border-indigo-950"
      >
        <h3 className="text-lg mb-1 font-medium truncate">{title}</h3>
        {tags.length > 0 &&
          tags.map((tag) => (
            <Badge
              id={tag.id}
              color="blue"
              className={`mr-2 ${hasDarkTheme && "dark"}`}
            >
              {tag.label && tag.label.length > 20
                ? `${tag.label.substring(0, 20)}...`
                : tag.label}
            </Badge>
          ))}
      </div>
    </Link>
  );
}

function EditTagsModal({
  availableTags,
  open,
  setOpen,
  onDeleteTag,
  onUpdateTag,
}: EditTagsModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Content
        style={{ maxWidth: 450 }}
        className={`${
          hasDarkTheme && "dark"
        } dark:text-white dark:!bg-slate-950"`}
      >
        <h3 className="text-xl font-semibold">Edit Tags</h3>
        <p>Make changes to your tags.</p>

        <form className="flex flex-col gap-2 max-h-[350px] overflow-y-scroll mt-3 pr-4">
          {availableTags.map((tag) => (
            <div key={tag.id} className="flex justify-between items-center">
              <div className="flex-1 mr-3">
                <TextField.Input
                  id="title"
                  variant="soft"
                  size="3"
                  defaultValue={tag.label}
                  onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                  className="dark:!text-indigo-500"
                />
              </div>
              <Button
                variant="soft"
                color="red"
                onClick={() => onDeleteTag(tag.id)}
              >
                <Cross1Icon />
              </Button>
            </div>
          ))}
        </form>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="solid" color="indigo">
              Cancel
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
