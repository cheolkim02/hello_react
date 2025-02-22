import { useState } from "react";
import * as XLSX from "xlsx"

function UploadExcelFile() {

    const [data, setData] = useState([]);

    async function handleFile(e) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(e.target.files[0]);
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data)
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(sheet);
          setData(parsedData);
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
        
        </div>
    )




}

export default UploadExcelFile

