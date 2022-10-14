import React from "react";

export default function VideoPlayer(props) {
  const { width, height, mySource } = props;

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();
  if (mySource !== "" && source !== mySource) {
    setSource(mySource);
  
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  return (
    <div className="VideoInput">
      <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mkv,.mp4"
        hidden="true"
      />
      {!source && <button onClick={handleChoose}>Choose</button>}
      {source && (
        <div class="u-none u-block-md u-flex-lg">
          <video
            className="VideoInput_video"
            width="100%"
            // height={height}
            controls
            src={source}
          />
        </div>
      )}
      <div className="VideoInput_footer">
        {(source && <div></div>) || "Upload Video"}
      </div>
    </div>
  );
}
