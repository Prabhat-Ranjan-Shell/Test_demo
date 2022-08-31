import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const Convertor = () => {

    let [selectedFile, setSelectedFile] = useState([]);

    const fileUploadHandler = (e) => {
        console.log("I am inside uploader");
        setSelectedFile(e.target.files[0]);
    }

    const handleFileSelect = (e) => {
        console.log("I am inside button click");
        if(selectedFile) {
            console.log('File Selected!');
            let fileReader = new FileReader();
            fileReader.onload = function(e) {
                let data = e.target.result;
                let workbook = XLSX.read(data, {
                    type: 'binary'
                });
                workbook.SheetNames.forEach(sheet => {
                    let rowObject = XLSX.utils.sheet_to_row_object_array(
                        workbook.Sheets[sheet]
                    );
                    let jsonObject = JSON.stringify(rowObject);
                    document.getElementById('jsonData').innerHTML = jsonObject;
                    console.log(jsonObject);
                })
            }
            fileReader.readAsBinaryString(selectedFile);
        }
    }

    return (
        <>
            <h2>File Converted!!</h2>
            <input type="file" id="fileUpload" accept=".xls,.xlsx" onChange={fileUploadHandler} /><br />
            <button type="button" id="uploadExcel" onClick={handleFileSelect}>Convert</button>
            <pre id="jsonData"></pre>
        </>
    )
}

export default Convertor;