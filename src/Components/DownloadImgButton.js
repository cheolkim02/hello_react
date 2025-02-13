import { saveAs } from 'file-saver'
import React from 'react'

export const DownloadImgButton = (imgURL) => {
    const downloadImg=(imgURL)=> {
        saveAs(imgURL, 'downloaded_image.png')
    }
    return (
        <div>
            <button
                onClick={downloadImg}
            >
                Download image
            </button>
        </div>
    )
}

export default DownloadImgButton;

