import { useState } from "react";
import * as XLSX from "xlsx"
import { writeFile } from "fs";

function UploadExcelFile() {

    const humanType = {
      name: '',
      studentID: 0,
      promotionDate: null,
      studyingWhats: [],
      nationality: '대한민국',
      phoneNumber: '',
      churchAttending: '',
      birthday: null,
      studyState: '재학',
      sex: false,
      isOut: false,
      inKakaoTalk: true,
      funnel: '',
      activityState: '',
      fromAbroad: '',
      militaryState: ''
    };
    const humansList = []

    var dataLength=0;
    const [data, setData] = useState([]);
    const [human, setHuman] = useState(humanType);

    async function handleFile(e) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(e.target.files[0]);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, );
        const sheetName = workbook.SheetNames[1];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setData(parsedData);
      }
    }

    function updateHuman() {
      setHuman(data[0]);
      humansList.push(human);
    }

    function getDataLength() {
      for(var i=0; i<30; i++) {
         if(data[i]["name"]!="") {
            dataLength++;
         }
      }
      alert(dataLength);
    }

    function printHumanList() {
      for(var i=0; i<dataLength; i++) {
        console.log(JSON.stringify(humansList[i]));
      }
    }


    return (
        <div>
            <input
                type = 'file'
                accept = '.xlsx, .xls'
                onChange = {handleFile}
            />

            <br></br>
            {data.length > 0 && (
              <table className="table">
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, index) => (
                        <td key={index}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <br></br>
            {JSON.stringify(data[0])}
            <br></br>
            <br></br>
            {JSON.stringify(human)}
            <br></br>
            <br></br>
            <p>-----------</p>
            <button onClick={getDataLength}>update data length</button>
            <button onClick={updateHuman}>update human</button>
            <button onClick={printHumanList}>print human list</button>
            <p>-----------</p>
            <p></p>



        </div>
    )




}

export default UploadExcelFile

