import React from 'react'
import {previewString, removeHtmlEntities} from './helperFunctions'

function Thumbnail (props) {
    const {data: videoObj, selectVideo} = props


    return (

        <div className="favourite-item" onClick={()=>selectVideo(videoObj)}>
           
                <img
                    className=""
                    src={videoObj.thumbnail}
                    alt={"thumbnail for " + videoObj.title}
                    style={{objectFit:"cover"}}
                />
                <div>
                    <p>{previewString(removeHtmlEntities(videoObj.title))}</p>
                </div>
                
        </div>
    )

}

export default Thumbnail