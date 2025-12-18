export default function FilesTable({ files }) {
  return (
    <>
      <h3 style={{ marginBottom: "15px" }}>📑 Split Loan Agreements</h3>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th style={th}>Loan ID</th>
            <th style={th}>File Name</th>
            <th style={th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td style={td}>{file.loan_id}</td>
              <td style={td}>{file.file_name}</td>
              <td style={td}>
                <a href={file.file_url} style={link}>
                  View
                </a>{" "}
                |{" "}
                <a href={file.file_url} download style={link}>
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

const th = {
  textAlign: "left",
  padding: "12px",
  fontWeight: "600",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
};

const link = {
  color: "#2563eb",
  textDecoration: "none",
  fontWeight: "500",
};
