import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import PDFViewer from "../../components/PDFViewer/PDFViewer";
import { notesMetadata, searchNotes } from "../../data/notes/notesMetadata";
import "./Notes.css";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // All notes are now PDFs only
  const isPDFNote = (note) => {
    return true; // All notes are PDFs now
  };

  useEffect(() => {
    // Load PDF notes directly from metadata
    setLoading(true);
    setError(null);

    try {
      setNotes(notesMetadata);

      // Select the first note by default
      if (notesMetadata.length > 0) {
        setSelectedNote(notesMetadata[0]);
      }
    } catch (err) {
      console.error("Error loading notes:", err);
      setError("Failed to load notes. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredNotes = searchTerm
    ? searchNotes(searchTerm)
        .map((searchResult) =>
          notes.find((note) => note.id === searchResult.id)
        )
        .filter(Boolean)
    : notes;

  if (loading) {
    return (
      <div className="notes-container">
        <Navigation />
        <div className="loading-state">
          <p>Loading notes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notes-container">
        <Navigation />
        <div className="error-state">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notes-container">
      <Navigation />

      <div className="notes-content">
        <div className="notes-sidebar">
          <div className="notes-search">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="notes-list">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`note-item ${
                  selectedNote && selectedNote.id === note.id ? "selected" : ""
                }`}
                onClick={() => setSelectedNote(note)}
              >
                <h3>{note.title}</h3>
                <span className="note-date">{note.date}</span>
                {note.description && (
                  <p className="note-description">{note.description}</p>
                )}
                {note.tags && note.tags.length > 0 && (
                  <div className="note-tags">
                    {note.tags.map((tag, index) => (
                      <span key={index} className="note-tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="note-display">
          {selectedNote ? (
            <div className="note-content">
              <h2>{selectedNote.title}</h2>
              <div className="date-display">
                Last updated: {selectedNote.date}
              </div>
              <PDFViewer
                pdfUrl={selectedNote.url || selectedNote.content}
                title={selectedNote.title}
              />
            </div>
          ) : (
            <div className="empty-state">
              <p>Select a note to view its contents</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
