import React from "react";

// Get all the nav-btns in the page
let navBtns = document.querySelectorAll(".nav-btn");

// Add an event handler for all nav-btns to enable the dropdown functionality
navBtns.forEach(function (ele) {
  ele.addEventListener("click", function () {
    // Get the dropdown-menu associated with this nav button (insert the id of your menu)
    let dropDownMenu = document.getElementById("MENU_ID_HERE");

    // Toggle the nav-btn and the dropdown menu
    ele.classList.toggle("active");
    dropDownMenu.classList.toggle("active");
  });
});
const Header = (props) => {
  const inputRef = React.useRef();
  const inputRef2 = React.useRef();
  const [source, setSource] = React.useState();
  const [xmlsource, setXmlSource] = React.useState();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
    props.onClick(url);
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };
  const handleXmlFileChange = (event) => {
    const file2 = event.target.files[0];
    
    var reader = new FileReader();

        reader.onload = function(e) {
          var content = reader.result;
          setXmlSource(content);
          props.onXmlClick(content);
            //Here the content has been read successfuly
            
        }

        reader.readAsText(file2);    
    const url2 = URL.createObjectURL(file2);
    
  };

  const handleXmlChoose = (event) => {
    inputRef2.current.click();
  };
  return (
    <div
      class="header header-fixed u-unselectable header-animated"
      style={{ boxShadow: " 0 4px 30px rgb(0 0 0 / 10%)" }}
    >
      <div class="header-brand">
        <div class="nav-item no-hover">
          <a>
            <h6 class="title">ASR-EDITOR</h6>
          </a>
        </div>
        <div class="nav-item nav-btn" id="header-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="header-nav" id="header-menu">
        <div class="nav-left">
          <div class="nav-item text-center">
            <a href="#">
              <span class="icon">
                <i class="fab fa-wrapper fa-github" aria-hidden="true"></i>
              </span>
            </a>
          </div>
          <div class="nav-item text-center">
            <a href="#">
              <span class="icon">
                <i class="fab fa-wrapper fa-slack" aria-hidden="true"></i>
              </span>
            </a>
          </div>
          <div class="nav-item text-center">
            <a href="#">
              <span class="icon">
                <i class="fab fa-wrapper fa-twitter" aria-hidden="true"></i>
              </span>
            </a>
          </div>
        </div>

        <div class="nav-right">
          <div class="nav-item has-sub toggle-hover" id="dropdown">
            <a class="nav-dropdown-link">Upload</a>
            <input
              ref={inputRef}
              className="VideoInput_input"
              type="file"
              onChange={handleFileChange}
              accept=".mkv,.mp4"
              hidden="true"
            />
            <input
              ref={inputRef2}
              className="Xml_input"
              type="file"
              onChange={handleXmlFileChange}
              accept=".xml,.XML"
              hidden="true"
            />
            <ul class="dropdown-menu dropdown-animated" role="menu">
              <li role="menu-item" onClick={handleChoose}>
                <a href="#">Video</a>
              </li>
              <li role="menu-item" onClick={handleXmlChoose}>
                <a href="#">Transcript</a>
              </li>
            </ul>
          </div>
          
          <div class="nav-item has-sub toggle-hover" id="dropdown">
            <a class="nav-dropdown-link">Generate</a>
           
            <ul class="dropdown-menu dropdown-animated" role="menu">
              <li role="menu-item" onClick={handleChoose}>
                <a href="#">Transcript</a>
              </li>
              <li role="menu-item" onClick={handleXmlChoose}>
                <a href="#">Translation</a>
              </li>
            </ul>
          </div>
          <div class="nav-item has-sub toggle-hover" id="dropdown">
            <a class="nav-dropdown-link">Download</a>
           
            <ul class="dropdown-menu dropdown-animated" role="menu">
            <li role="menu-item" onClick={handleXmlChoose}>
                <a href="#">XML</a>
              </li>
              <li role="menu-item" onClick={handleChoose}>
                <a href="#">PDF</a>
              </li>
              <li role="menu-item" onClick={handleXmlChoose}>
                <a href="#">SRT</a>
              </li>
            </ul>
          </div>

          <div class="nav-item active">
            <a href="#">Editor</a>
          </div>
          <div class="nav-item">
            <a href="#">Translator</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
