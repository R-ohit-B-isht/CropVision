import React from "react";
import XMLParser from "react-xml-parser";
import { xml2json, json2xml } from "xml-js";

const Transcript = (props) => {
  const { mySource } = props;
  const [source, setSource] = React.useState();
  if (mySource !== "" && source !== mySource) {
    setSource(mySource);

    console.log("inside Tras");

    var result2 = xml2json(mySource, { compact: false, spaces: 4 });
    console.log(result2, "\n");
    let res = JSON.parse(result2);
   
    /* Accessing the first element of the first element of the elements array. */
    console.log(res.elements[0].elements[0], "\n");
    var xml = new XMLParser().parseFromString(mySource); // Assume xmlText contains the example XML
    console.log(xml);
    // console.log(xml.getElementsByTagName('line'));

    const parser = new DOMParser();
    const xml2 = parser.parseFromString(mySource, "text/xml");
    console.log(xml2);
    //     console.log(xml);
  }
  const inputRef = React.useRef();

  let d = "Type Here";
  const fileData = () => {
    if (source) {
      return (d = "hi");
    } else {
      return d;
    }
  };
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
