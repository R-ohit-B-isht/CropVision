import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import ProjectCard from "./ProjectCards";
import axios from 'axios';
import PrivateChat from "../../Assets/Projects/PrivateChat.png";
import Portfolio from "../../Assets/Projects/Portfolio.png";
import Ecart from "../../Assets/Projects/ecart.png";
import ExpenseTracker from "../../Assets/Projects/ExpenseTracker.png";

import "./project.css";
const Constant = {
  newsApiKey: 'pub_166031ee927e8064260dfb2313c642e98a34f',
  baseUrl: 'https://newsdata.io/api/1/news?',
  // topHeadLine: 'news?',
  language: 'en'
};
function Projects() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get(
         "https://newsdata.io/api/1/news?apikey=pub_166031ee927e8064260dfb2313c642e98a34f&q=agriculture"
        //`${Constant.baseUrl}${Constant.topHeadLine}?apiKey=${Constant.newsApiKey}&language=${Constant.language}`
      );
      const data =  response.data;
      setArticles(data.results);
      console.log(data.results)
    }catch (error) {
      console.error(error.message);
    }
    };
    fetchData();
  }, []);
  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">
           Recent <strong className="Fluorescent-Blue">News </strong>
        </h1>
        <p>Here are Top news related to Agriculture.</p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
        {(articles)&&articles.map((article, index) => (
        <Col md={6} lg={4} className="project-card">
        <ProjectCard
          key={index}
          imgPath={article.image_url}
          title={article.title}
          description={article.description}
          ghLink={article.link}
          demoLink={article.link}
        />
        </Col>
      ))}

          {/* <Col md={6} lg={4} className="project-card">
            <ProjectCard
              imgPath={Portfolio}
              title="Portfolio Website"
              description="My personal Portfolio Website build with React and Bootstrap. It is fully responsive website which supports both dark and light mode."
              ghLink="https://github.com/rahuljha4171/Portfolio-Website"
              demoLink="https://rahuljha.tech/"
            />
          </Col>
          <Col md={6} lg={4} className="project-card">
            <ProjectCard
              imgPath={PrivateChat}
              title="Private Chat"
              description="A Personal Chat Application to share resources and hangout with friends build with react.js, css, and Firebase. Have features which allows user for realtime messaging, image sharing and search user."
              ghLink="#"
              demoLink="https://chat-app-rahuljha4171.vercel.app/"
            />
          </Col>

          <Col md={6} lg={4} className="project-card">
            <ProjectCard
              imgPath={ExpenseTracker}
              title="Expense Tracker"
              description="An online expense tracker using React, Node, Express, and MongoDB as the database. It allows you to keep track of your expenses, investments, and savings. All past transactions are listed, and you can also delete them. "
              ghLink="https://github.com/rahuljha4171/Expense-Tracker"
              demoLink="https://expense-tracker.rahuljha4171.vercel.app/"
            />
          </Col> */}
        </Row>
      </Container>
      <ScrollToTop />
    </Container>
  );
}

export default Projects;
