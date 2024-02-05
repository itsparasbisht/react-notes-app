import { TextField, TextArea, Button } from "@radix-ui/themes";
import { Link, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { useRef, useState, FormEvent, ChangeEvent } from "react";
import { NoteData, Tag } from "./App";
import { v4 as uuidV4 } from "uuid";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const [markdownInput, setMarkdownInput] = useState(markdown);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownInput,
      tags: selectedTags,
    });
    navigate("..");
  }

  const handleMarkdownChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownInput(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-3 flex-col md:flex-row">
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
            defaultValue={title}
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
      </div>

      <div className="mt-4 flex gap-3 flex-col md:flex-row">
        <div className="flex-1">
          <label htmlFor="markdown" className="block mb-1 font-medium">
            Body
          </label>
          <TextArea
            className="border-2 h-[60vh]"
            id="markdown"
            variant="soft"
            size="3"
            rows={14}
            placeholder="start typing..."
            value={markdownInput}
            required
            onChange={handleMarkdownChange}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="markdown" className="block mb-1 font-medium">
            Markdown Preview
          </label>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            className="markdown-container h-[60vh] border-2 rounded-lg p-4 pt-0 overflow-x-scroll overflow-scroll"
          >
            {markdownInput}
          </ReactMarkdown>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4 mb-4 md:mb-0">
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
