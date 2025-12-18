export default function UploadBox({ setFiles }) {
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // mock response
    setTimeout(() => {
      setFiles([
        {
          loan_id: "LN-1001",
          file_name: "loan_LN-1001.pdf",
          file_url: "#",
        },
        {
          loan_id: "LN-1002",
          file_name: "loan_LN-1002.pdf",
          file_url: "#",
        },
      ]);
    }, 1000);
  };

  return (
    <div>
      <label style={{ fontWeight: "600" }}>Upload PDF</label>
      <br />
      <input
        type="file"
        accept="application/pdf"
        onChange={handleUpload}
        style={{ marginTop: "10px" }}
      />
    </div>
  );
}
