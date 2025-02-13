import { ChangeEvent, useState } from "react"

export default function FileUploader() {

    const [file, setFile] = useState(null);

    function handleFileChange(e) {
        if(e.target.files) { // all the files that are currently in the input
            setFile(e.target.files[0])
        }
    }

    return (
        <div>
            <input type='file' onChange={handleFileChange} />
        </div>
    )
}