import { Flex, TextField, TextArea, Button } from "@radix-ui/themes";
import { Link, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { useRef, useState, FormEvent } from "react";
import { NoteData, Tag } from "./App";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

function NoteForm({ onSubmit, onAddTag, availableTags }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="row" gap="3">
        <div className="flex-1">
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <TextField.Input
            id="title"
            variant="soft"
            size="3"
            placeholder="enter title..."
            ref={titleRef}
            required
          />
        </div>

        <div className="flex-1">
          <label htmlFor="tags" className="block mb-1 font-medium">
            Tags
          </label>
          <CreatableSelect
            id="tags"
            isMulti
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            options={availableTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onCreateOption={(label) => {
              const newTag = { id: uuidV4(), label };
              onAddTag(newTag);
              setSelectedTags((prev) => [...prev, newTag]);
            }}
            onChange={(tags) => {
              setSelectedTags(
                tags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              );
            }}
          />
        </div>
      </Flex>

      <div className="mt-4">
        <label htmlFor="markdown" className="block mb-1 font-medium">
          Body
        </label>
        <TextArea
          id="markdown"
          variant="soft"
          size="3"
          rows={10}
          placeholder="start typing..."
          ref={markdownRef}
          required
        />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <Button type="submit" radius="large" variant="solid">
          Save
        </Button>
        <Link to="..">
          <Button color="crimson" type="button" radius="large" variant="soft">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}

export default NoteForm;
