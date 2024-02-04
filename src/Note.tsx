import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import { Badge, Button } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { useNote } from "./NoteLayout";

type NoteProps = {
  onDelete: (id: string) => void;
};

export default function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center gap-1 mb-4">
        <div>
          <h1 className="text-3xl font-medium">{note.title}</h1>
          {note.tags.length > 0 &&
            note.tags.map((tag) => (
              <Badge id={tag.id} color="blue" className="mr-2">
                {tag.label}
              </Badge>
            ))}
        </div>
        <div className="flex gap-3">
          <Link to={`/${note.id}/edit`}>
            <Button color="green" type="button" radius="large" variant="soft">
              <Pencil1Icon />
              Edit
            </Button>
          </Link>
          <Button
            color="red"
            type="button"
            radius="large"
            variant="soft"
            onClick={() => {
              onDelete(note.id);
              navigate("/");
            }}
          >
            <ExclamationTriangleIcon />
            Delete
          </Button>
          <Link to="..">
            <Button color="indigo" type="button" radius="large" variant="soft">
              <ArrowLeftIcon />
              Back
            </Button>
          </Link>
        </div>
      </div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
      >
        {note.markdown}
      </ReactMarkdown>
    </>
  );
}
