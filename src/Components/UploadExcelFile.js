import { useState } from "react";
import * as XLSX from "xlsx"

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
    var humansList = []

    const [data, setData] = useState([]);
    const [human, setHuman] = useState({
      name: 'a',
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
    });



    function checkReady() {
      if(data.length) {
        updateHuman();
      }
      else {
        alert(data.length);
        setTimeout(checkReady, 1000);
      }
    }

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

    const updateHuman = (i) => {
      setHuman(previousState => {
        return {
          ...previousState,
          name: data[i]["name"],
          studentID: 202231155555
        }
      });
    }

    function doTheThing() {
      alert(data.length)
      for(var i=0; i<data.length; i++) {
        updateHuman(i);
        alert(human.name)
        humansList.push(Object.values(human));
      }
      
    }

    function printHumansList() {
      humansList.forEach(function(entry) {
        console.log(entry);
      })
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
            <p>
              {human.name}
              {human.studentID}
            </p>
            <br></br>
            <p>-----------</p>
            <button onClick={doTheThing}>Do the thing!</button>
            <button onClick={printHumansList}>print humans list</button>
            <p>-----------</p>
            <p></p>



        </div>
    )




}

export default UploadExcelFile

