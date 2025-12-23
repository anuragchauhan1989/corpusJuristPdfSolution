const BACKEND_BASE = "http://127.0.0.1:8000";

export default function FilesTable({ files }) {
  if (!files || files.length === 0) return null;

  return (
    <table className="files-table">
      <thead>
        <tr>
          <th>Ref No</th>
          <th>File Name</th>
          <th>View</th>
          <th>Download</th>
        </tr>
      </thead>

      <tbody>
        {files.map((file, index) => (
          <tr key={index}>
            <td>{file.ref_no}</td>
            <td>{file.file_name}</td>
            <td>
              <a
                className="btn btn-view"
                href={`${BACKEND_BASE}${file.file_url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </td>
            <td>
              <a
                className="btn btn-download"
                href={`${BACKEND_BASE}${file.file_url}`}
                download
              >
                Download
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
