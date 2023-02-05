import React, { useRef} from "react";
import Card from "react-bootstrap/Card";
import { AiOutlineArrowRight } from "react-icons/ai";

function AboutCard() {
  const inputRef = useRef();

  const handleFileChange = (e) => {
    console.log(e.target.value)
  }
  const handleChoose = (e) => { 
    inputRef.current.click();
  }
  return (
    <Card className="quote-card-view ">
      <Card.Body>
        <blockquote className="blockquote mb-0" data-aos="zoom-in">
        <i class="video file outline icon" id="outline" type="file" ></i>
        <input
                  ref={inputRef}
                  class="VideoInput_input"
                  type="file"
                  onChange={handleFileChange}
                  accept=".mkv,.mp4,.jpg,.png"
                  hidden={true}
                />

                <div class="ui primary button" onClick={handleChoose} >Add Video or Image</div>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
