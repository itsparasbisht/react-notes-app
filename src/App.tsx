import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./NewNote";
import { useLocalStorage } from "./useLocalStorage";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import NoteList from "./NoteList";
import NoteLayout from "./NoteLayout";
import Note from "./Note";
import EditNote from "./EditNote";

export type NoteData = {
  title: string;
  teaser: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  teaser: string;
  markdown: string;
  tagIds: string[];
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const [hasDarkTheme, setHasDarkTheme] = useState(false);

  useEffect(() => {
    const systemDarkThemeEnabled = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (systemDarkThemeEnabled) setHasDarkTheme(true);
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    if (hasDarkTheme) {
      body!.style.backgroundColor = "#020617";
    } else {
      body!.style.backgroundColor = "#ffffff";
    }
  }, [hasDarkTheme]);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes: RawNote[]) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes: RawNote[]) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  }

  function onDeleteNote(id: string) {
    setNotes((prevNotes: RawNote[]) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  function addTag(tag: Tag) {
    setTags((prev: Tag[]) => [...prev, tag]);
  }

  function updateTag(id: string, label: string) {
    setTags((prevTags: Tag[]) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  function deleteTag(id: string) {
    setTags((prevTags: Tag[]) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <NoteList
            notes={notesWithTags}
            availableTags={tags}
            onUpdateTag={updateTag}
            onDeleteTag={deleteTag}
            hasDarkTheme={hasDarkTheme}
            toggleTheme={setHasDarkTheme}
          />
        }
      />
      <Route
        path="/new"
        element={
          <NewNote
            onSubmit={onCreateNote}
            onAddTag={addTag}
            availableTags={tags}
            hasDarkTheme={hasDarkTheme}
          />
        }
      />
      <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
        <Route
          index
          element={<Note onDelete={onDeleteNote} hasDarkTheme={hasDarkTheme} />}
        />
        <Route
          path="edit"
          element={
            <EditNote
              onSubmit={onUpdateNote}
              onAddTag={addTag}
              availableTags={tags}
              hasDarkTheme={hasDarkTheme}
            />
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
