import React from "react";
import XMLParser from "react-xml-parser";
import { xml2json, json2xml } from "xml-js";
import './texteditor.css'
// const Transcript = (props) => {
//   const { mySource } = props;
//   const [source, setSource] = React.useState();
//   if (mySource !== "" && source !== mySource) {
//     setSource(mySource);

//     console.log("inside Tras");

//     var result2 = xml2json(mySource, { compact: false, spaces: 4 });
//     console.log(result2, "\n");
//     let res = JSON.parse(result2);
   
//     /* Accessing the first element of the first element of the elements array. */
//     console.log(res.elements[0].elements[0], "\n");
//     var xml = new XMLParser().parseFromString(mySource); // Assume xmlText contains the example XML
//     console.log(xml);
//     // console.log(xml.getElementsByTagName('line'));

//     const parser = new DOMParser();
//     const xml2 = parser.parseFromString(mySource, "text/xml");
//     console.log(xml2);
//     //     console.log(xml);
//   }
//   const inputRef = React.useRef();

//   let d = "Type Here";
//   const fileData = () => {
//     if (source) {
//       return (d = "hi");
//     } else {
//       return d;
//     }
//   };
//   return (
//     <div>
//       <textarea
//         style={{
//           height: "80vh",
//           resize: "horizontal",
//           overflow: "auto",
//           margin: ".2rem",
//         }}
//         ref={inputRef}
//       >
//         {fileData()}
//       </textarea>
//     </div>
//   );
// };


class Transcript extends React.Component {
  state={source:"",language:"english",line:[],textAreaValue:"Insert Text Here!!"}

  handleTextChange=(e)=>{
    this.setState({textAreaValue:e.target.value})
    var arr = this.state.textAreaValue.split("\n");
  
    console.log(arr.length)
  
  }
  render() {

    const textarea = document.querySelector('textarea')
      const lineNumbers = document.querySelector('.line-numbers')

    if(textarea!==undefined){
    //   textarea.addEventListener('onkeyup', event => {
    //   const numberOfLines = event.target.value.split('\\n').length

    //   lineNumbers.innerHTML = Array(numberOfLines)
    //     .fill('<span></span>')
    //     .join('')
    // })

    // textarea.addEventListener('keydown', event => {
    //   if (event.key === 'Tab') {
    //     const start = textarea.selectionStart
    //     const end = textarea.selectionEnd

    //     textarea.value = textarea.value.substring(0, start) + '\\t' + textarea.value.substring(end)

    //     event.preventDefault()
    //   }
    // })
}





    const { mySource } = this.props;
  
  if (mySource !== "" && this.state.source !== mySource) {
    this.setState({source:mySource})

    var result2 = xml2json(mySource, { compact: false, spaces: 4 });
    // console.log(result2, "\n");
    let res = JSON.parse(result2);
   
   /* Setting the language of the transcript to the state. */
    this.setState({language:res.elements[0].attributes.lang})

    let timeAndSpeaker=[]
    for(let i in res.elements[0].elements ){
      let time=res.elements[0].elements[i].attributes.timestamp
      let speaker=res.elements[0].elements[i].attributes.speaker
      let lineText=""
      for(let j in res.elements[0].elements[i].elements){
        if(res.elements[0].elements[i].elements[j].elements!==undefined){
          // console.log(res.elements[0].elements[i].elements[j].type)
          lineText +=res.elements[0].elements[i].elements[j].elements[0].text+" "
        }
      }
      lineText+='\n'
      timeAndSpeaker.push({time,speaker,lineText})
      
    }
    this.setState({line:timeAndSpeaker})

    let myString=""
      timeAndSpeaker.forEach(element => {
        myString+="["+element.speaker+"] : "+element.lineText
      });
      this.setState({textAreaValue:myString})
      console.log(myString);
    var xml = new XMLParser().parseFromString(mySource); // Assume xmlText contains the example XML
    // console.log(xml);
    // console.log(xml.getElementsByTagName('line'));

    const parser = new DOMParser();
    const xml2 = parser.parseFromString(mySource, "text/xml");
    // console.log(xml2);
    //     console.log(xml);
  }
 

  
    return (
      <div >
        {/* <div class="line-numbers">
        <span></span>
      </div> */}
        <textarea
          style={{
            height: "80vh",
            resize: "horizontal",
            overflow: "auto",
            margin: ".2rem",
          }}
          id="t"
         value={this.state.textAreaValue} 
         onChange={this.handleTextChange}
         autocomplete="on" 
         autocorrect="on"
         spellcheck={true}
        //  onKeyUp={event => {
          

        //   const numberOfLines = this.state.textAreaValue.split('\n').length
        //   console.log(numberOfLines)
        //   lineNumbers.innerHTML = Array(numberOfLines)
        //     .fill('<span></span>')
        //     .join('')
        // }}
          
        // onKeyDown= {event => {
        //   console.log('keydown')
        //   if (event.key === 'Tab') {
        //     const start = this.selectionStart
        //     const end = this.selectionEnd
    
        //     this.value = this.value.substring(0, start) + '\t' + this.value.substring(end)
    
        //     event.preventDefault()
        //   }
        // }}

        />
      </div>
    );
  }

};




export default Transcript;
