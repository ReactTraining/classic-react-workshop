import React from "react";

const style = {
  border: "3px solid #ccc",
  padding: 50,
  margin: 10,
  width: 200,
  textAlign: "center",
  display: "inline-block"
};

function readFilesFromEvent(event, cb) {
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
    if (needToLoadCounter === 0) cb(files);
  }
}

class Droppable extends React.Component {
  state = {
    acceptDrop: false,
    files: null
  };

  handleDragOver = event => {
    if (event.dataTransfer.types[0] === "Files") {
      event.preventDefault();
      this.setState({
        acceptDrop: true
      });
    }
  };

  handleDrop = event => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({
      acceptDrop: false
    });
    readFilesFromEvent(event, files => {
      this.setState({ files });
    });
  };

  render() {
    const { acceptDrop, files } = this.state;

    return (
      <div
        className="Droppable"
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
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
}

export default Droppable;
