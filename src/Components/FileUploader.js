import { ChangeEvent, useState } from "react"
import './FileUploader.css';

type UploadStatus = "idle" | "uploading" | "success" | "error"; // define different states for when uploading a file

export default function FileUploader() {

    const [file, setFile] = useState(null);
    const [status, setStatus] = useState<UploadStatus>("idle") // status of upload, initial is 'idle'

    function handleFileChange(e) {
        if(e.target.files) { // all the files that are currently in the input. i.e. if there is an input file
            setFile(e.target.files[0]) // only use the first file and make that the 'state' for the useState file. Now I can use the variable file, which is the one uploaded by user
        }
    }


    return (

        <div className="space-y-4">
            <input type='file' onChange={handleFileChange} />
            {file && ( //another way for "if there is a file..."
                <div className = "mb-4 text-sm">
                    <p>File name: {file.name}</p>
                    <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                    <p>Type: {file.type}</p>
                </div>
            )}
            {file && status!="uploading" && // effect: if(file==True && status!="uploading") {...}
                <button>Upload</button>
            }
        </div>

    )
}