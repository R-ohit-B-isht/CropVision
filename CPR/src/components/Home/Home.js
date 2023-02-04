import React from "react";
import { Container, Row, Col } from "react-bootstrap";
//CPR/Portfolio-Website/src/Assets/crop-monitoring-via-mobile-device.svg
import homeIcon from "../../Assets/crop-monitoring-via-mobile-device.svg";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import ReactWeather from "react-open-weather";
import Weather from "../Weather";
import Home2 from "./Home2";
import Type from "./Type";
import "./home.css";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Welcome!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>{" "}
                To
              </h1>

              <h1 className="heading-name">
                <strong className="main-name"> Crop Vision</strong>
              </h1>

              {/* <div style={{ padding: 30 }} className="type">
                <Type />
              </div> */}
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeIcon}
                alt="home pic"
                className="img-fluid"
                style={{ paddingTop: 50 }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <ReactWeather
        forecast="5days"
        apikey="7ad07aac9b0943040a4abdd2c23dfc4e"
        type="city"
        city="Patiala"
      />
      {/* <Home2 /> */}
      <ScrollToTop />
    </section>
  );
}

export default Home;
