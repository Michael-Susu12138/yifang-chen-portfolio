import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Navigation from "../../components/Navigation/Navigation";
import "./Notes.css";

// Sample notes - these would eventually come from your backend or file system
const sampleNotes = [
  {
    id: 1,
    title: "Machine Learning Basics",
    date: "2024-05-10",
    content: `
# Machine Learning Fundamentals

## Supervised Learning

Supervised learning is a type of machine learning where the model is trained on labeled data. The model learns to map inputs to outputs based on example input-output pairs.

### Key Algorithms

- Linear Regression
- Logistic Regression
- Decision Trees
- Random Forests
- Support Vector Machines
- Neural Networks

## Code Example

\`\`\`python
import numpy as np
from sklearn.linear_model import LinearRegression

# Sample data
X = np.array([[1, 1], [1, 2], [2, 2], [2, 3]])
y = np.array([1, 2, 2, 3])

# Create and train the model
model = LinearRegression()
model.fit(X, y)

# Make predictions
prediction = model.predict(np.array([[3, 5]]))
print(prediction)
\`\`\`
`,
  },
  {
    id: 2,
    title: "Transformers and Attention",
    date: "2024-05-15",
    content: `
# Transformer Architecture & Attention Mechanisms

## Attention Mechanism

Attention allows models to focus on specific parts of the input sequence when generating output.

### Self-Attention

Self-attention relates different positions of a single sequence to compute a representation of the sequence.

\`\`\`
Attention(Q, K, V) = softmax(QK^T / √dk)V
\`\`\`

## Transformer Architecture

The transformer architecture consists of:

1. Encoder stack
2. Decoder stack
3. Multi-head attention layers
4. Feed-forward networks
5. Residual connections

## Implementation Example

\`\`\`python
import torch
import torch.nn as nn

class SelfAttention(nn.Module):
    def __init__(self, embed_size, heads):
        super(SelfAttention, self).__init__()
        self.embed_size = embed_size
        self.heads = heads
        self.head_dim = embed_size // heads
        
        self.query = nn.Linear(embed_size, embed_size)
        self.key = nn.Linear(embed_size, embed_size)
        self.value = nn.Linear(embed_size, embed_size)
        self.fc_out = nn.Linear(embed_size, embed_size)
        
    def forward(self, query, key, value, mask=None):
        # Implementation details...
        return out
\`\`\`
`,
  },
];

const Notes = () => {
  const [notes, setNotes] = useState(sampleNotes);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // In a real app, you might fetch notes from an API here
    if (notes.length > 0 && !selectedNote) {
      setSelectedNote(notes[0]);
    }
  }, [notes, selectedNote]);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              </div>
            ))}
          </div>
        </div>

        <div className="note-display">
          {selectedNote ? (
            <div className="markdown-content">
              <h2>{selectedNote.title}</h2>
              <div className="date-display">
                Last updated: {selectedNote.date}
              </div>
              <ReactMarkdown
                children={selectedNote.content}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
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
