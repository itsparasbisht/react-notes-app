import NoteForm from "./NoteForm";
import { Heading } from "@radix-ui/themes";

function NewNote() {
  return (
    <div>
      <Heading size="7" style={{ marginBottom: "15px" }}>
        New Note
      </Heading>
      <NoteForm />
    </div>
  );
}

export default NewNote;
