// Notes metadata configuration with embedded content
// This file defines the available notes and their metadata

export const notesMetadata = [
  {
    id: "formal-language-pdf",
    title: "Formal Language Theory",
    date: "2025-10-14",
    description:
      "Introduction to automata theory and formal language concepts including DFAs and mathematical foundations.",
    url: "/notes/formal_language.pdf",
    tags: [
      "formal-languages",
      "automata",
      "theoretical-computer-science",
      "mathematics",
    ],
  },
];

// Helper function to get note by ID
export const getNoteById = (id) => {
  return notesMetadata.find((note) => note.id === id);
};

// Helper function to get all notes
export const getAllNotes = () => {
  return notesMetadata;
};

// Helper function to search notes
export const searchNotes = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return notesMetadata.filter(
    (note) =>
      note.title.toLowerCase().includes(lowercaseQuery) ||
      note.description.toLowerCase().includes(lowercaseQuery) ||
      note.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
};
