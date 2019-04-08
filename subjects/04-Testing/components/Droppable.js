import React, { useState } from "react";

const style = {
  border: "3px solid #ccc",
  padding: 50,
  margin: 10,
  width: 200,
  textAlign: "center",
  display: "inline-block"
};

function readFilesFromEvent(event, callback) {
  const files = [];
  let needToLoadCounter = 0;

  for (let i = 0; i < event.dataTransfer.files.length; i++) {
    let file = event.dataTransfer.files[i];
    if (!file.type.match("image.*")) continue;
    needToLoadCounter++;
    let reader = new FileReader();
    reader.onload = fileEvent => {
      needToLoadCounter--;
      files.push({
        name: file.name,
        data: fileEvent.target.result
      });
      maybeFinish();
    };
    reader.readAsDataURL(file);
  }

  maybeFinish();

  function maybeFinish() {
    if (needToLoadCounter === 0) callback(files);
  }
}

export default function Droppable() {
  const [acceptDrop, setAcceptDrop] = useState(false);
  const [files, setFiles] = useState(null);

  function handleDragOver(event) {
    if (event.dataTransfer.types[0] === "Files") {
      event.preventDefault();
      setAcceptDrop(true);
    }
  }

  function handleDrop(event) {
    event.stopPropagation();
    event.preventDefault();
    setAcceptDrop(false);
    readFilesFromEvent(event, files => {
      setFiles(files);
    });
  }

  return (
    <div
      className="Droppable"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={style}
    >
      {acceptDrop ? "Drop it!" : "Drag a file here"}
      {files &&
        files.map(file => (
          <div>
            <p>
              <b>{file.name}</b>
            </p>
            <img
              src={file.data}
              style={{ maxHeight: "100px", maxWidth: "100px" }}
            />
          </div>
        ))}
    </div>
  );
}
