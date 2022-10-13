import React from "react";
import Header from "./Header";
import VideoPlayer from "./VideoPlayer";
import Transcript from "./Transcript";
import "./styles.css";

class App extends React.Component {
  state = { videoSource: "", xmlSource: "" };
  videoSetter = (source) => {
    this.setState({ videoSource: source });
  };
  xmlSetter = (xml) => {
    this.setState({ xmlSource: xml });
    
  };
  render() {
    return (
      <div class="row u-no-wrap offset-5 App">
        <Header onClick={this.videoSetter} onXmlClick={this.xmlSetter} />

        <div
          style={{
            width: "100%",
            marginTop: "100px",
          }}
        >
          <div class="row no-space">
            <div
              class="col-4 u-center vp"
              style={{
                resize: "horizontal",
                overflow: "auto",
                width: "460 px",
                height: "315 px",
                margin: ".4rem",
              }}
            >
              <VideoPlayer mySource={this.state.videoSource} />
            </div>
            <div class="col">
              <Transcript mySource={this.state.xmlSource} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
