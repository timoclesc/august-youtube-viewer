import React, {useState} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'
import {previewString, removeHtmlEntities} from './helperFunctions'

function ShowResults(props) {
    const {searchData, selectVideo} = props
    
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    
    const handleSelect = (selectedIndex, e) => {

        // could extend to requery once limit of items is reached
        setIndex(selectedIndex);
        setDirection(e.direction);
    };

    // iterate through results to create carousel items of 3 videos
    let thumbnails = []
    const cardsPerPage = 3

    const mapItems = item =>  {
                    const videoObj = {videoId: item.id.videoId, 
                        title: item.snippet.title, 
                        description: item.snippet.description,
                        thumbnail: item.snippet.thumbnails.high.url}
                        
                    return (
                        
                            <Card onClick={()=>selectVideo(videoObj)} bg="info" className="tn-card">
                                <Card.Img className="tn-img"
                                        src={videoObj.thumbnail}
                                        alt={"thumbnail for " + videoObj.title}
                                        />
                                <Card.Body>
                                    <Card.Title>{removeHtmlEntities(previewString(videoObj.title))}</Card.Title>
                                    <Card.Text>
                                        {previewString(removeHtmlEntities(videoObj.description))}
                                    </Card.Text>
                                    
                                </Card.Body>
                            </Card>
                        )
    }

  
            if (Object.entries(searchData).length !== 0) {
 
                for (let i = 0 ; i <= (searchData.items.length - 3) ; i=i+cardsPerPage) {
                        thumbnails.push(
                            <Carousel.Item key={i}>
                                <div className="carousel-item-styled">
                                    {mapItems(searchData.items[i])}
                                    {mapItems(searchData.items[i+1])}
                                    {mapItems(searchData.items[i+2])}
                                </div> 
                            </Carousel.Item>
                    )
                    
                }

               
            }
    

            

    const carouselSettings = {
        indicators: false,
        onSelect: handleSelect,
        direction: direction,
        wrap: false,
        interval: 0,
        };        

    return (
        <div className="carousel-container">
             
            <Carousel activeIndex={index} {...carouselSettings}>
                {thumbnails}
            </Carousel> 

        </div>
    )
    
}

export default ShowResults
