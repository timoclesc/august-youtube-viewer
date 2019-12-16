import React from 'react'
import Thumbnail from './Thumbnail'

function Favourites (props) {
    let thumbnails
 
    if (Object.entries(props.savedVideos).length !== 0) {
        thumbnails = props.savedVideos.map(
            item => <Thumbnail 
                data={item} 
                selectVideo={props.selectVideo} 
                />)
        }

    return (
        <div className="favourite-container">  
        <p className="favourite-header"><i className="fas fa-heart fav-ico"></i> My Favourites</p>
            {thumbnails}
        </div>
    )
}

export default Favourites