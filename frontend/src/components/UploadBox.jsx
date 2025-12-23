import axios from "axios";
import { useState, useRef } from "react";

const API_BASE = "http://127.0.0.1:8000";

export default function UploadBox({ setResponse }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleUpload = async (file) => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${API_BASE}/api/upload-pdf`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setResponse(res.data);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Drag & drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    if (loading) return;
    const file = e.dataTransfer.files[0];
    handleUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {/* Upload Area */}
      <div
        className="upload-area"
        onClick={() => !loading && fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="upload-icon">☁️</div>

        <div className="upload-text">
          Drag & drop files here or <b>click to upload</b>
        </div>

        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          onChange={(e) => handleUpload(e.target.files[0])}
          disabled={loading}
        />

        <button
          className="choose-btn"
          type="button"
          disabled={loading}
        >
          Choose File
        </button>
      </div>

      {/* Error */}
      {error && (
        <p style={{ color: "red", marginTop: "12px" }}>
          {error}
        </p>
      )}

      {/* Loader Overlay */}
      {loading && (
        <div className="loader-overlay">
          <div className="loader-box">
            <p style={{ fontSize: "16px", fontWeight: 500 }}>
              ⏳ Splitting PDF…
            </p>
            <p style={{ fontSize: "13px", color: "#6b7280" }}>
              Large files may take a few minutes. Please don’t refresh.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
