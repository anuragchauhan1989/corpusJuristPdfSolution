import { useState } from "react";
import UploadBox from "./components/UploadBox";
import FilesTable from "./components/FilesTable";
import "./App.css";

function App() {
  const [response, setResponse] = useState(null);
  const [search, setSearch] = useState("");

  // Filter files by reference number
  const filteredFiles =
    response?.files?.filter((file) =>
      file.ref_no.toLowerCase().includes(search.toLowerCase())
    ) || [];

  // CSV Export
  const downloadCSV = () => {
    if (!response || !response.files) return;

    const headers = ["Ref No", "File Name", "File URL"];
    const rows = response.files.map((f) => [
      f.ref_no,
      f.file_name,
      f.file_url,
    ]);

    const csvContent =
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "split_pdfs.csv";
    a.click();
  };

  return (
    <div className="app-container">
      <div className="card">
        {/* Header */}
        <div className="header">
          <h1>PDF Loan Agreement Splitter</h1>
          <p>
            Upload a combined loan agreement PDF and automatically split it into
            individual agreements.
          </p>
        </div>

        {/* Upload */}
        <UploadBox setResponse={setResponse} />

        {/* Results */}
        {response && (
          <>
            <p className="status-success">✅ Processing complete</p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "12px 0",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <p>
                Total files generated: <b>{response.total_files}</b>
              </p>

              <button
                className="btn btn-download"
                onClick={downloadCSV}
              >
                Export CSV
              </button>
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Search by Ref No..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "12px",
              }}
            />

            {/* Files Table */}
            <FilesTable files={filteredFiles} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
