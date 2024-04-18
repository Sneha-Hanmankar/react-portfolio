import React, { useRef, useEffect, useCallback } from "react";
import "../src/sass/components/_file-upload.scss";
import "../src/sass/components/_button.scss";
import "../src/sass/base/_utilities.scss";
import basicFolderImage from "./linea_basic_1.0/_SVG/basic_folder.svg";
import Trash from "../src/linea_basic_1.0/_SVG/basic_trashcan.svg";
import FileImg from "../src/linea_basic_1.0/_SVG/basic_sheet.svg";

export const FileUpload = () => {
  const [base64, setBase64] = React.useState([]);
  const dropArea = useRef(null);
  const [deleteAll, setDeleteAll] = React.useState([]);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    unhighlight();
  }, []);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  function highlight() {
    dropArea.current?.classList.add("highlight", "animate");
  }

  function unhighlight() {
    dropArea.current?.classList.remove("highlight", "animate");
  }

  useEffect(() => {
    const currentDropArea = dropArea.current;

    if (!currentDropArea) return;

    const handleDragEnter = () => {
      highlight();
    };

    const handleDragLeave = () => {
      unhighlight();
    };

    currentDropArea.addEventListener("dragenter", handleDragEnter);
    currentDropArea.addEventListener("dragover", highlight);
    currentDropArea.addEventListener("dragleave", handleDragLeave);
    currentDropArea.addEventListener("drop", handleDrop);

    return () => {
      currentDropArea.removeEventListener("dragenter", handleDragEnter);
      currentDropArea.removeEventListener("dragover", highlight);
      currentDropArea.removeEventListener("dragleave", handleDragLeave);
      currentDropArea.removeEventListener("drop", handleDrop);
    };
  }, [handleDrop]); // Run this effect only once on mount

  const handleFileUpload = (event) => {
    console.log("event", event);
    if (event !== null || event !== undefined) {
      // Programmatically trigger the click event of the hidden file input
      const fileInput = document.getElementById("fileInput");
      fileInput.click(event);
    }
  };

  function filesToBase64(fileTypes) {
    return new Promise((resolve, reject) => {
      const promises = [];

      fileTypes.forEach((fileType) => {
        const reader = new FileReader();
        reader.onload = () => {
          // Extract Base64 data from the result
          const base64Data = reader.result.split(",")[1]; // Remove data URL scheme
          const base64URL = `data:${fileType.type};base64,${base64Data}`;
          promises.push({
            fileName: fileType.name,
            fileSize: fileType.size,
            fileExt: fileType.type,
            base64Str: base64Data,
            imgURL: base64URL,
          });

          // Resolve the promise when all files have been read
          if (promises.length === fileTypes.length) {
            resolve(promises);
          }
        };

        reader.onerror = () => {
          reader.abort();
          reject(new Error("Failed to read file as Base64"));
        };

        reader.readAsDataURL(fileType);
      });
    });
  }

  const handleInputChange = (event) => {
    const newFiles = [...event.target.files];
    filesToBase64(newFiles)
      .then((base64Array) => {
        setBase64((prevArr) => [...prevArr, ...base64Array]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeImage = (fileData) => {
    const updatedArr = base64.filter((data) => data.fileName !== fileData);
    setBase64([...updatedArr]);
  };

  const handleCheckbox = (event) => {
    if (event.target.checked) {
      setDeleteAll([...base64]);
    } else {
      setDeleteAll([]);
    }
  };

  return (
    <>
      <div className="file-container">
        {/* display the uploaded files in table format */}
        {base64.length > 0 ? (
          <>
            <div className="file-upload-table">
              <div className="table-headers">
                <div className="checkbox" key={2}>
                  <input
                    type="checkbox"
                    onChange={handleCheckbox}
                    checked={deleteAll.length > 0}
                  />
                </div>
                <div className="header-names" key={1}>
                  File Details
                </div>
              </div>
              <div className="table-body">
                {base64.map((fileData) => {
                  return (
                    <>
                      <div
                        key={fileData.fileName}
                        className={`selected-image-card ${deleteAll.length > 0 ? "bgItem" : ""} `}
                      >
                        <span>
                          <img
                            src={Trash}
                            alt="Delete"
                            height={20}
                            width={20}
                            onClick={() => removeImage(fileData.fileName)}
                          />
                        </span>
                        <span>
                          {fileData.imgURL !== undefined &&
                            (fileData.fileExt === "application/pdf" ? (
                              <img
                                src={FileImg}
                                alt="preview"
                                height={100}
                                width={100}
                              />
                            ) : (
                              <img
                                src={`data:${fileData.fileExt};base64,${fileData.base64Str}`}
                                alt="preview"
                                height="60vw"
                                width="60vw"
                              />
                            ))}
                        </span>
                        <span>{fileData.fileName}</span>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="upload-btn">
              <button className="btn upload-btn--1">Upload</button>
            </div>
          </>
        ) : (
          <>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={handleFileUpload}
              ref={dropArea}
            >
              <div className="u-center-text">
                <h3 className="heading-secondary">
                  Click / Select / Drop Files
                </h3>
              </div>
              <div className="img-container">
                <img
                  src={basicFolderImage}
                  height="100px"
                  weight={100}
                  className="img-pic" // corrected class to className
                  alt="file"
                />
              </div>
              <div style={{ width: "60vw", margin: "auto" }}>
                <p className="paragraph">
                  Drag and drop a PDF, Microsoft Word, Excel, PowerPoint, or
                  image file to use our file uploader v1.
                </p>
                {/* Hidden file input */}
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleInputChange}
                  hidden
                  multiple
                />
                {/* Button to trigger file upload */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button className="btn">Select Files v1</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
