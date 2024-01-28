import { Flex, TextField, TextArea, Button } from "@radix-ui/themes";
import CreatableSelect from "react-select/creatable";

function NoteForm() {
  return (
    <form>
      <Flex direction="column" gap="3" style={{ maxWidth: 400 }}>
        <div>
          <label htmlFor="title">Title</label>
          <TextField.Input
            id="title"
            variant="soft"
            size="3"
            placeholder="Search the docs…"
          />

          <label htmlFor="tags">Tags</label>
          <CreatableSelect id="tags" isMulti />
        </div>
        <div>
          <label htmlFor="markdown">Body</label>
          <TextArea
            variant="soft"
            size="3"
            rows={10}
            placeholder="Reply to comment…"
          />
        </div>
        <div>
          <Button type="submit" radius="large" variant="solid">
            Submit
          </Button>
          <Button color="crimson" type="button" radius="large" variant="soft">
            Cancel
          </Button>
        </div>
      </Flex>
    </form>
  );
}

export default NoteForm;
