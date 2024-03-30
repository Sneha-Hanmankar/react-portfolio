import React from "react";
import "../src/sass/components/_file-upload.scss";
import "../src/sass/components/_button.scss";
import "../src/sass/base/_utilities.scss";
import basicFolderImage from "./linea_basic_1.0/_SVG/basic_folder.svg";

export const FileUpload = () => {
  const [files, setFiles] = React.useState([]);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploading, setUploading] = React.useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = [...event.dataTransfer.files];
    setFiles(newFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const uploadFiles = () => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        console.log("progress", progress, event.loaded, event.total);
        setUploadProgress(progress);
      }
    });

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Handle successful upload
        console.log("Upload successful");
        setUploading(false);
        setUploadProgress(0);
      }
    };

    // Create FormData object
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files[]", file);
    });

    // Simulate file upload (replace this with your actual upload logic)
    xhr.open("POST", "your-upload-endpoint");
    xhr.send(formData);

    // Set uploading state to true
    setUploading(true);
  };

  return (
    <>
      <div
        className="file-container"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div class="u-center-text">
          <h3 className="heading-secondary">Select or Drop Files</h3>
        </div>
        <div>
          <div className="img-container">
            <img
              src={basicFolderImage}
              height="100px"
              weight={100}
              class="img-pic"
              alt="file"
            />
          </div>
          <div className="p-btn-container">
            <p class="paragraph p-text">
              Drag and drop a PDF, Microsoft Word, Excel, PowerPoint, or image
              file to use our file uploader v1.
            </p>
            <button class="btn b-margin" onClick={uploadFiles}>
              <input type="files" hidden />
              Select Files v1
            </button>
          </div>
        </div>
      </div>
      <div class="upload-btn">
        <button class="btn upload-btn--1" onClick={uploadFiles}>
          Upload
        </button>
      </div>

      <p>Drag files here</p>
      {uploading && (
        <div>
          <p>Uploading...</p>
          <progress value={uploadProgress} max="100" />
        </div>
      )}
      {files.length > 0 && (
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div>
          <p>Uploading...</p>
          <progress value={uploadProgress} max="100" />
        </div>
      )}
    </>
  );
};
