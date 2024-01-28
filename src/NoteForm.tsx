import { Flex, TextField, TextArea, Button } from "@radix-ui/themes";
import CreatableSelect from "react-select/creatable";

function NoteForm() {
  return (
    <form>
      <Flex direction="row" gap="3">
        <div style={{ flex: "1" }}>
          <label htmlFor="title" className="mb-1 text-red-400">
            Title
          </label>
          <TextField.Input
            id="title"
            variant="soft"
            size="3"
            placeholder="Search the docs…"
          />
        </div>

        <div style={{ flex: "1" }}>
          <label htmlFor="tags">Tags</label>
          <CreatableSelect id="tags" isMulti />
        </div>
      </Flex>
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
    </form>
  );
}

export default NoteForm;
