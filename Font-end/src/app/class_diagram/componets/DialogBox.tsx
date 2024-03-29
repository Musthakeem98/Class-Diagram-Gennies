import * as React from "react";
import plantumlEncoder from "plantuml-encoder";
import "@/styles/dialogbox.css";
import { useState } from "react";
import MarkdownEditor from "./CodeWindow";

interface DialogBoxProps {
  closeDialog: (event: React.MouseEvent<HTMLButtonElement>) => void;
  classDiagramTopic: string;
  plantUmlSrc: string;
}

function DialogBox({
  closeDialog,
  classDiagramTopic,
  plantUmlSrc,
}: DialogBoxProps) {
  const encode = plantumlEncoder.encode(plantUmlSrc);
  const url = `http://www.plantuml.com/plantuml/png/${encode}`;

  const handleDownload = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = () => {
      const blob = new Blob([xhr.response], { type: "image/png" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "class_diagram.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    xhr.send();
  };
  const [isCodeWinEnable, setCodeWindEnable] = useState(false);

  function generateJavaCode(event: any): void {
    setCodeWindEnable(true);
    closeDialog;
  }

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <div className="header">
          <h2 className="topic">Class diagram for {classDiagramTopic}</h2>
          <button className="button" onClick={closeDialog}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="image-container">
          <img src={url} alt="Class Diagram" />
        </div>
        <div className="footer">
          <button className="button generate-button" onClick={generateJavaCode}>
            Generate code in JAVA
          </button>
          <button className="button download-button" onClick={handleDownload}>
            <i className="fas fa-download"></i> Download PNG
          </button>
          <button className="button try-again-button" onClick={closeDialog}>
            Try Another Diagram
          </button>
        </div>
      </div>
      {isCodeWinEnable && <MarkdownEditor />}
    </div>
  );
}

export default DialogBox;
