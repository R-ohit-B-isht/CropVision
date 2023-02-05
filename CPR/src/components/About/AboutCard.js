import React, { useRef ,useState} from "react";
import Card from "react-bootstrap/Card";
import tempImg from "../../Assets/square-image.png"
import { AiOutlineArrowRight } from "react-icons/ai";

function AboutCard() {
  const [inputImage, setinputImage] = useState("")
  const [source, setSource] = useState("")
  const [disease,setDisease]=useState("")
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const urlx = URL.createObjectURL(file);
    setSource(urlx);
    setinputImage(file);
    console.log(file)
  }
  const handleChoose = (e) => { 
    e.preventDefault();
    inputRef.current.click();
  }
  return (
    <Card className="quote-card-view ">
      <Card.Body>

      

        {(inputImage == "") && <Card.Img style={{ height: "300px", width: "300px" }} variant="top" src={tempImg} />}
        {(inputImage!="")&&<Card.Img style={{height:"300px",width:"300px"}} variant="top" src={source} />}
        <blockquote className="blockquote mb-0" data-aos="zoom-in">
          
          <row>
        <input
                  ref={inputRef}
                  className="VideoInput_input"
                  type="file"
                  onChange={handleFileChange}
                  accept=".jpg,.png"
                  hidden={true}
                />

          <div class="ui primary button" onClick={handleChoose} >Add Image</div>
          </row>
        </blockquote>
      </Card.Body>
      <Card.Body>
        {(disease == "TOMATO LEAF MOLD") && <p>
          Method 1:Let the plants air out or expose to dry air conditions.
          <br/>
          Method 2:Spray the plants with fungicide sprays (Recommended: Calcium chloride sprays) and make sure to cover all parts of the plant that is above ground, focusing specifically on the underside of leaves.</p>}
        {(disease == "STRAWBERRY LEAF SCORCH") && <p>
          Method 1:Let the plant dry out by altering the watering practices and allowing for dryer conditions.
          <br/>
          Method 2:Treat the plant with organic fungicides. (Captan 50 WP & Copper compounds)\n\nNote:\nCan be prevented most effectively with the use of resistant varieties. (Allstar, Jewell, Midway & etc.).</p>}
        
          {(disease == "TOMATO MOSAIC VIRUS") && <p>
          Note that there is NO cure for this viral disease!
          <br />
          <br/>
          Action 1:Remove and destroy all infected plant.
          <br />
          Action 2:Spot treat with least-toxic, natural pest control products (Safer Soap & Bon-Neem) to reduce the disease carrying insects
          <br />
          Action 3:Plant resistant varieties or purchase transplants from a reputable source.
          <br />
          Action4:Wash your hands frequently and disinfect garden tools and equipment to reduce contamination risk.
        </p>}

        {(disease == "CORN COMMON RUST") && <p>
          Method 1:\nPlant resistant hybrids such as commercial corn.
          <br />
          Method 2:Go for tillage and crop rotation
          <br />
          Method 3:Treat with fungicide such as foliar, Quilt and Quadris.
                    
        </p>}

        {(disease == "CORN GRAY LEAF SPOT") && <p>
          Method 1:Go for crop rotation and tillage will help to reduce inoculum levels in surface residues.
          <br />
          Method 2:Plant resistant varieties.
          <br />
          Method 3:Treat with fungicide such as azoxystrobin with propiconazole, pyraclostrobin and prothioconazole.
                    
        </p>}
        {(disease == "POTATO EARLY BLIGHT") && <p>
          Note that there is NO cure for blight on plants.
          <br /><br />Action 1:Remove and destroy all infected plant.
          <br />Action 2:Disinfect garden tools and equipment to prevent further spread of blight.
          <br />Action 3:Plant resistant varieties or practice crop rotation to prevent blight.
          <br />Action 4:For best control, apply copper-based fungicides earlier before wet weather condition happens.      
        </p>}

        {(disease == "HEALTHY") && <p>
          Your plant is healthy!
          <br />
        However, do remember to practice good farming habits as prevention is the best cure diseases!      
        </p>}


      </Card.Body>
    </Card>
  );
}

export default AboutCard;


