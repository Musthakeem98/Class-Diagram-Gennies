// pages/index.js (or any other Next.js page)

import React, { useState } from "react";
import "@/styles/markdown.css";
import dynamic from "next/dynamic";
import CancelIcon from "@mui/icons-material/Cancel";

interface CodeWinProps {
  closeCodeDialog: (event: React.MouseEvent<HTMLButtonElement>) => void;
  classDiagramTopic: string;
  classDiagramCode: string;
}
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function MarkdownEditor({ closeCodeDialog, classDiagramCode }: CodeWinProps) {
  const [value, setValue] = useState(classDiagramCode);

  return (
    <div>
      <div className="dialog-overlay">
        <div>
          <div className="markdown_header">
            <h1>Markdown Editor</h1>
            <button onClick={closeCodeDialog}>
              <CancelIcon />
            </button>
          </div>
          <MDEditor value={value} onChange={setValue} />
        </div>
      </div>
    </div>
  );
}

export default MarkdownEditor;
