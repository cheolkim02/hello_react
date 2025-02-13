import React from 'react'
import DownloadImgButton from './DownloadImgButton';
const img="C:\Users\cheol\OneDrive\Desktop\Day1Screenshot.png"

export const Home = () => {

  return (
    <div>
      <h1>Home</h1>
      <div className="ImgDownload">
        <img src={img} onClick={DownloadImgButton} />
      </div>
    </div>
  )
}

export default Home;