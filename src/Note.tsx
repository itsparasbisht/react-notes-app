import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import { Badge, Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { useNote } from "./NoteLayout";

export default function Note() {
  const note = useNote();
  return (
    <div className="flex justify-between items-center gap-1">
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
        <Button color="red" type="button" radius="large" variant="soft">
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
  );
}
