import React from "react";
import "./PDFViewer.css";

const PDFViewer = ({ pdfUrl, title }) => {
  return (
    <div className="pdf-viewer">
      <div className="pdf-header">
        <h3>{title}</h3>
      </div>
      <div className="pdf-container">
        <iframe
          src={pdfUrl}
          title={title}
          className="pdf-iframe"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default PDFViewer;
