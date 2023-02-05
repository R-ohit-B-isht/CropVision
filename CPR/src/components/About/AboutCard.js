import React, { useRef ,useState} from "react";
import Card from "react-bootstrap/Card";
import axios from 'axios'
import tempImg from "../../Assets/square-image.png"
import { AiOutlineArrowRight } from "react-icons/ai";

function AboutCard() {
  const [inputImage, setinputImage] = useState("")
  const [source, setSource] = useState("")
  const [disease,setDisease]=useState("")
  const inputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const urlx = URL.createObjectURL(file);
    setSource(urlx);
    setinputImage(file);
    console.log(file)
    const formData = new FormData();
    formData.append("sentFile", file);


    const response = await axios.post(
      "https://8000-rohitbisht-cropvision-3f570jojlkm.ws-us85.gitpod.io/api/diseasedetection/",
      formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        let temData = response
        console.log(temData.data.Disease_Name)
        console.log(response)
        console.log(response.Disease_Name)
        setDisease(temData.data.Disease_Name.toUpperCase())
      })
      .catch((error) => {
        console.error(error);
      });
      // setDisease(response.json())
     

  }
  const handleChoose = (e) => { 
    e.preventDefault();
    inputRef.current.click();
  }
  return (
    <Card className="quote-card-view ">
      <Card.Body>

      

        {(inputImage == "") && <Card.Img style={{ height: "300px", width: "300px" }} variant="top" src={tempImg} />}
        {(inputImage != "") && <div>
          <Card.Img style={{ height: "300px", width: "300px" }} variant="top" src={source} />
          { (!disease.length)&&<><div id="loadingUi" style={{ display: "block" }}>
                <div class="ui active dimmer">
                  <div class="ui indeterminate text loader">Loading Info</div>
                </div>
              </div></>}
        </div>}
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
        <h3>TOMATO LEAF MOLD</h3>
          <br/>
          Method 1:Let the plants air out or expose to dry air conditions.
          <br/>
          Method 2:Spray the plants with fungicide sprays (Recommended: Calcium chloride sprays) and make sure to cover all parts of the plant that is above ground, focusing specifically on the underside of leaves.</p>}
        {(disease == "STRAWBERRY LEAF SCORCH") && <p>
          <h3>Disease : STRAWBERRY LEAF SCORCH</h3>
          <br/>
          Method 1:Let the plant dry out by altering the watering practices and allowing for dryer conditions.
          <br/>
          Method 2:Treat the plant with organic fungicides. (Captan 50 WP & Copper compounds)
          <br/> <br/>Note:Can be prevented most effectively with the use of resistant varieties. (Allstar, Jewell, Midway & etc.).</p>}
        
        {(disease == "TOMATO MOSAIC VIRUS") && <p>
        <h3>TOMATO MOSAIC VIRUS</h3>
          <br/>
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
        <h3>CORN COMMON RUST</h3>
          <br/>
          Method 1:Plant resistant hybrids such as commercial corn.
          <br />
          Method 2:Go for tillage and crop rotation
          <br />
          Method 3:Treat with fungicide such as foliar, Quilt and Quadris.
                    
        </p>}

        {(disease == "CORN GRAY LEAF SPOT") && <p>
        <h3>CORN GRAY LEAF SPOT</h3>
          <br/>
          Method 1:Go for crop rotation and tillage will help to reduce inoculum levels in surface residues.
          <br />
          Method 2:Plant resistant varieties.
          <br />
          Method 3:Treat with fungicide such as azoxystrobin with propiconazole, pyraclostrobin and prothioconazole.
                    
        </p>}
        {(disease == "POTATO EARLY BLIGHT") && <p>
        <h3>Note that there is NO cure for blight on plants.</h3>
          <br /><br />Action 1:Remove and destroy all infected plant.
          <br />Action 2:Disinfect garden tools and equipment to prevent further spread of blight.
          <br />Action 3:Plant resistant varieties or practice crop rotation to prevent blight.
          <br />Action 4:For best control, apply copper-based fungicides earlier before wet weather condition happens.      
        </p>}

        {(disease == "HEALTHY") && <p>
          <h3>Your plant is healthy!</h3>
          <br />
        However, do remember to practice good farming habits as prevention is the best cure diseases!      
        </p>}


      </Card.Body>
    </Card>
  );
}

export default AboutCard;


