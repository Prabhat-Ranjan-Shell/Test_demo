import React from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import html2pdf  from "html2pdf.js";

class App extends React.Component {
    // componentDidMount() {
    //     window.html2canvas = html2canvas;
    //     var doc = new jsPDF({
    //         orientation: "potrait",
    //         unit: "px"
    //         // format: [4, 2]
    //     });

    //     var content = document.getElementById("content-22");
    //     console.log("content", content);
    //     console.log("document.body", document.body);
    //     doc.html(content, {
    //         callback: function (doc) {
    //             console.log("in callback");
    //             doc.save();
    //         }
    //     });
    // }

    generatePDF = () => {
        // Choose the element that our invoice is rendered in.
        const element = document.getElementById('content-22');
        // Choose the element and save the PDF for our user.
        html2pdf().from(element).save('abc');
    }

    render() {
        return (
            <>
                <button onClick= {()=> this.generatePDF()}>Download as PDF</button>
                <div className="App content-22" id="content-22">
                    <p>Prabhat Ranjan</p>
                    <p>Hello World!</p>
                </div>
            </>
        );
    }
}
export default App;
