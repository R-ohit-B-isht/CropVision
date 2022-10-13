import React from "react";

const Transcript = (props) => {
  const { mySource } = props;
  const [source, setSource] = React.useState();
  if (mySource !== "" && source !== mySource) {
    setSource(mySource);
    console.log(mySource);
  }
  const inputRef = React.useRef();

  let d = "Type Here"
  const fileData = () => {
    if (source) {
      return d = "hi"
    }
    else {
      return d;
    }
  }
  return (
    <div>
      <textarea
        style={{
          height: "80vh",
          resize: "horizontal",
          overflow: "auto",
          margin: ".2rem",
        }}
        ref={inputRef}
      >
        {fileData()}
      </textarea>
    </div>
  );
};

export default Transcript;
