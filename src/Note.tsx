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
import rehypeExternalLinks from "rehype-external-links";
import { useNote } from "./NoteLayout";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

type NoteProps = {
  onDelete: (id: string) => void;
  hasDarkTheme: boolean;
};

export default function Note({ onDelete, hasDarkTheme }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <div className={`${hasDarkTheme && "dark"}`}>
      <div
        key={note.id}
        className="flex flex-col md:flex-row justify-between items-start md:items-center sticky top-0 bg-white pt-3 pb-3 border-b-2 dark:bg-slate-950 dark:text-gray-200"
      >
        <div className={`${hasDarkTheme && "dark"}`}>
          <h1 className="text-3xl font-medium">{note.title}</h1>
          {note.tags.length > 0 &&
            note.tags.map((tag) => (
              <Badge id={tag.id} color="blue" className="mr-2">
                {tag.label}
              </Badge>
            ))}
        </div>
        <div className={`flex gap-3 mt-3 md:mt-0 ${hasDarkTheme && "dark"}`}>
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
        className="markdown-container w-full dark:text-gray-300"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          [
            rehypeExternalLinks,
            { target: "_blank", rel: "noopener noreferrer" },
          ],
        ]}
        components={{
          img: ({ node, ...props }) => (
            <Zoom>
              <img {...props} style={{ maxWidth: "100%" }} />
            </Zoom>
          ),
          video: ({ node, ...props }) => {
            const { width = "100%", height = "auto", ...rest } = props;
            return (
              <video
                {...rest}
                controls
                style={{
                  width,
                  height,
                  borderRadius: "8px",
                }}
              >
                Your browser does not support the video tag.
              </video>
            );
          },
          iframe: ({ ...props }) => (
            <div
              style={{
                position: "relative",
                width: props.width || "640px",
                height: props.height || "360px",
                maxWidth: "100%",
                margin: "0 auto",
              }}
            >
              <iframe
                {...props}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "0",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ),
        }}
      >
        {note.markdown}
      </ReactMarkdown>
    </div>
  );
}
