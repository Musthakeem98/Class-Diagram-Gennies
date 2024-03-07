import * as React from 'react';
import plantumlEncoder from 'plantuml-encoder';
import '@/styles/dialogbox.css';

interface DialogBoxProps {
  closeDialog: (event: React.MouseEvent<HTMLButtonElement>) => void;
  classDiagramTopic: string;
  plantUmlSrc: string;
}

function DialogBox({ closeDialog, classDiagramTopic, plantUmlSrc }: DialogBoxProps) {
  const encode = plantumlEncoder.encode(plantUmlSrc);
  const url = `http://www.plantuml.com/plantuml/png/${encode}`;

  const handleDownload = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      const blob = new Blob([xhr.response], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'class_diagram.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    xhr.send();
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h2 className="topic">Class diagram for {classDiagramTopic}</h2>
        <div className="image-container">
          <img src={url} alt="Class Diagram" />
        </div>
        <button className="button" onClick={closeDialog}>Close</button>
        <button className="button" onClick={handleDownload}>Download PNG</button>
        <button className="button" onClick={closeDialog}>Try Another Diagram</button>
      </div>
    </div>
  );
}

export default DialogBox;
