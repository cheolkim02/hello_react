import React from 'react'
import FileUploader from '../Components/FileUploader.js';
import UploadExcelFile from '../Components/UploadExcelFile.js'

export const Home = () => {

  return (
    <div>
      <h1>Home</h1>
      <div>
        <UploadExcelFile />
      </div>
    </div>
  )
}

export default Home;