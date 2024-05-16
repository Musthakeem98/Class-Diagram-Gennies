import * as React from "react";
import plantumlEncoder from "plantuml-encoder";
import "@/styles/dialogbox.css";
import { useState } from "react";
import MarkdownEditor from "./CodeWindow";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

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
  const [isCodeWinEnable, setCodeWindEnable] = useState(false);
  const [markDownCode, setCode] = useState("");

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

  const generateJavaCode = async (event: any) => {
    try {
      const response = await axios.post(`http://localhost:3005/code`, {
        plant_uml: plantUmlSrc,
      });
      console.log(
        "Data posted successfully:",
        response.data.plantuml_code.choices[0].message.content
      );

      setCodeWindEnable(true);
      closeDialog;
      setCode(response.data.plantuml_code.choices[0].message.content);
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  };
  const closeCodeDialog = () => {
    setCodeWindEnable(false);
  };
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <div className="header">
          <h2 className="topic">Class diagram for {classDiagramTopic}</h2>
          <button onClick={closeDialog}>
            <CancelIcon />
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
      {isCodeWinEnable && (
        <MarkdownEditor
          closeCodeDialog={closeDialog}
          classDiagramCode={markDownCode}
        />
      )}
    </div>
  );
}

export default DialogBox;
