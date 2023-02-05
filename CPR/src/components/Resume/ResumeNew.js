import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./resume.css";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// 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
// text-davinci-003
const API_KEY = "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";
const ENGINE_ID = "text-davinci-003";

function ResumeNew() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages([...messages, { text: inputValue, isUser: true }]);
    console.log(messages);
    const response = await axios.post(
      "https://api.openai.com/v1/completions ",
      { model: "text-davinci-003", prompt: `${inputValue}` },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    let out = response.data.choices;
    console.log("~~~~~", out);
    setMessages([
      ...messages,
      { text: response.data.choices[0].text, isUser: false },
    ]);
    console.log(messages);
    setInputValue("");
  };
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <Container fluid className="resume-section">
        <h2>AgroAdvisor</h2>
        <div className="chat-container">
          <div className="messages-container">
            {messages.map((message, index) => (
              <div
                className={`message ${
                  message.isUser ? "user-message" : "bot-message"
                }`}
                key={index}
              >
                <h4 style={{ color: "black" }}>{message.text}</h4>
              </div>
            ))}
          </div>
          <form className="input-container" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your message here..."
              value={inputValue}
              onChange={handleInput}
            />
            <button style={{ marginright: "20px" }} type="submit">
              Send
            </button>
          </form>
        </div>
        <ScrollToTop />
      </Container>
    </div>
  );
}

export default ResumeNew;
