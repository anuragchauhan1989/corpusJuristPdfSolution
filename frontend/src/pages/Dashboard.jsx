import { useState } from "react";
import UploadBox from "../components/UploadBox";
import FilesTable from "../components/FilesTable";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [files, setFiles] = useState([]);

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">📄 Loan Agreement PDF Splitter</h1>
        <p className="subtitle">
          Upload a combined loan agreement PDF to automatically split it into
          individual loan files.
        </p>

        <UploadBox setFiles={setFiles} />
      </div>

      {files.length > 0 && (
        <div className="card">
          <FilesTable files={files} />
        </div>
      )}
    </div>
  );
}
