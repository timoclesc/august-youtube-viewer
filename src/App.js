import React from 'react';
import './App.css';

import Search from './Search'
import Viewer from './Viewer'


class App extends React.Component{
  state = {
      savedVideos: [],
      thisVideo: {}
  }

  // function provided as prop to save videos
  toggleSavedVideo = () => {
      const {videoId} = this.state.thisVideo
      const savedVideoIds = this.state.savedVideos.map( item => item.videoId)
      
      if(savedVideoIds.length !== 0 && savedVideoIds.includes(videoId)) {
          this.setState(
            prevState => {
              const newVids = prevState.savedVideos.filter(
                element => element.videoId !== videoId
              )
              return {
                savedVideos: newVids
              }
            }
          )
          console.log(JSON.stringify(this.state.savedVideos))
      } else {
        this.setState( 
          prevState => { return {savedVideos: [...prevState.savedVideos, prevState.thisVideo]}}
        )
        console.log(JSON.stringify(this.state.savedVideos))
      }
  }
  
  // function provided as prop to change current video this clicked 
  watchThisVideo = videoObj => {
      this.setState({thisVideo: videoObj})
  }


  render() {
      return (
        <div className="app-container">
          <Search selectVideo={this.watchThisVideo}/>

          {
            Object.entries(this.state.thisVideo).length !== 0 ?
            <Viewer 
                
                toggleSaveVideo={this.toggleSavedVideo} 
                savedVideos={this.state.savedVideos}
                videoObj={this.state.thisVideo}
                watchThisVideo={this.watchThisVideo}/> : ""
          }
         
        </div>
      )  
  } 
}
export default App
