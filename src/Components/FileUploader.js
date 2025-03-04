import axios from 'axios';
import { ChangeEvent, useState } from "react";
import './FileUploader.css';

// UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export default function FileUploader() {

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('')
    const [fileContent, setFileContent] = useState('')
    const [status, setStatus] = useState('idle');
    const [uploadProgress, setUploadProgress] = useState(0);


    function handleFileChange(e) {
        if(e.target.files) { // all the files that are currently in the input. i.e. if there is an input file
            setFile(e.target.files[0]) // only use the first file and make that the 'state' for the useState file. Now I can use the variable file, which is the one uploaded by user
        }
    }

    async function handleFileUpload() {
        if (!file) return;

        setStatus("uploading");
        setUploadProgress(0);

        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post("https://httpbin.org/post", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (ProgressEvent) => { // axios에서 제공하는 progress. 실시간으로 setUploadProgress 가능
                    const progress = ProgressEvent.total
                    ? Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
                    : 0;
                setUploadProgress(progress);
                }
            });
            
            setStatus("success");
            setUploadProgress(100);

            // parsing start
            const reader = new FileReader();
            reader.readAsText(file)
            reader.onload = () => {
                setFileName(file.name)
                setFileContent(reader.result)
            }
            reader.onerror = () => {
                console.log('file error', reader.error)
            }

        } catch {
            setStatus("error");
            setUploadProgress(0);
        };
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

            {status === 'uploading' && (
                <div className="space-y-2">
                    <div className='h-2.5 w-full rounded-full bg-gray-200'>
                        <div
                            className='h-2.5 rounded-full bg-blue-600 transition-all duration-300'
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                    <p className='text-sm text-gray-600'>{uploadProgress}% uploaded</p>
                </div>
            )}
            
            {file && status!="uploading" && (
                <button onClick={handleFileUpload}>Upload</button>
            )}

            {status === 'success' && (
                <div>
                    <p className="text-sm text-green-600">File uploaded successfully!</p>
                    <br></br>
                    <p>File name: {fileName}</p>
                    <p>File content: </p>
                    <br></br>
                    <p>{fileContent}</p>
                </div>
            )}

            {status === 'error' && (
                <p className="text-sm text-red-600">Upload failed. Please try again.</p>
            )}

        </div>

    )
}