
import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import ShowResults from './ShowResults'
import {mockData} from './data'
import {Transition} from 'react-transition-group'


function Search(props) {
    const API_KEY = "AIzaSyCHBKJsVrWEt1_qJMH2rk2ku9IHxdswH14"
    const IS_DEV = false
    const [searchTerm, setSearchTerm] = useState("")
    const [searchData, setSearchData] = useState({})

    // animation constants
    const duration = 500;
    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
        }
    const translateStyle={
        transition: `all ${duration}ms ease-in-out`,
        transform: `translate(50%,100%)`
    }
    
    const transTransitionStyles = {
        entering: {transform: `translate(50%, 0)`},
        entered:  {transform: `translate(50%, 0)`},
        exiting:  { transform: `translate(50%,100%)`},
        exited:  {transform: `translate(50%,100%)`},
        }

    const transitionStyles = {
        entering: { opacity: 0 },
        entered:  { opacity: 1 },
        exiting:  { opacity: 0 },
        exited:  { opacity: 0 },
        }
    
    //controlled input handler
    const handleChange = (e)=> {
        const {value} = e.target
        setSearchTerm(value)
    }

    // API call
    const search = (e) => {
        e.preventDefault()
        if (IS_DEV) {
            setSearchData(mockData)
        } else {
            const url = "https://www.googleapis.com/youtube/v3/search?"
            const params = {
                q:searchTerm,
                safeSearch: "moderate",
                maxResults: 48,
                part: "snippet",
                key: API_KEY,
                type: "video"
            }
            const paramString = Object.keys(params).map( key => key + "=" + encodeURIComponent(params[key])).join("&")
    
            fetch(url+paramString)
                .then(res => res.json(),   
                    err => console.log(err))
                .then( data => {setSearchData(data)})
        }

    }
    // Serach form and results carousel wrapped in transition function
    return (
        < >
            <Transition in={Object.values(searchData).length !== 0} timeout={duration}>
            {state => (
                <form className="search-form" 
                    onSubmit={search} 
                    style={{
                    ...translateStyle,
                    ...transTransitionStyles[state]
                    }}> 
                    <h1> Watch YouTube in peace</h1>
                    <div className="input-container">
                        <i className="fas fa-search"></i>
                        <input type="text" 
                            name="searchTerm" 
                            value={searchTerm} 
                            onChange={handleChange}
                            placeholder="" />
                        <Button variant="primary" onClick={search}>search</Button>
                    </div>
                </form> )}
            </Transition>
            
            <Transition in={Object.values(searchData).length !== 0} timeout={duration}>

            {state => (
                <div style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                    }}>
                        <ShowResults searchData={searchData} selectVideo={props.selectVideo}/>
                </div>
            )}        
            </Transition>
            
            

        </ >
    )
    
}

export default Search
