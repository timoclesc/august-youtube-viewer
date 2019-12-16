import React from 'react'
import Button from 'react-bootstrap/Button'
import {removeHtmlEntities} from './helperFunctions'
import Favourites from './Favourites'

function Viewer (props) {
    let viewerRef = React.createRef();
    const {videoId, title, description} = props.videoObj
    const {savedVideos, watchThisVideo} = props
    let savedVidIds
    let buttonText

    if(savedVideos.length === 0) {
        buttonText = "save to favourites"
    }
    else {
         savedVidIds = savedVideos.map( item => item.videoId)
         buttonText = savedVidIds.includes(videoId) ? "remove from favourites" : "save to favourites"

    }

    const scrollToRef = (ref) => window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth'})   
    
        // use hook so can be triggered when new video is chosen
    React.useEffect(
        () => {
            scrollToRef(viewerRef)
            console.log("focused")},
            [videoId]
    )
    

    return (
        
        <div className="viewer-container" ref={viewerRef}>
            <div className="vid-container">
            <div className="embed-responsive embed-responsive-16by9 frame">
                <iframe title={title}
                    className="embed-responsive-item"
                    src={"https://www.youtube.com/embed/" + videoId}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                        >
                </iframe>

            </div>
            <h2>{removeHtmlEntities(title)}</h2>
            <p className="feature-desc">{removeHtmlEntities(description)}</p>
            <Button className="btn-small" variant={buttonText === "save to favourites" ? "primary" : "danger"} onClick={props.toggleSaveVideo}>{buttonText}</Button>
            </div>
            
          
            <Favourites 
                className="favourites-container"
                selectVideo={watchThisVideo} 
                savedVideos={savedVideos} />
        </div>
    )
}

Viewer.defaultProps = {
    savedVideos:    []
}

export default Viewer