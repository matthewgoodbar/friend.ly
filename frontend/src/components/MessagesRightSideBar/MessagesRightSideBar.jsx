import {React,useState, useEffect}  from 'react'
import './MessagesRightSideBar.css'
import { Rating } from 'react-simple-star-rating'
import './MessagesRightSideBar.css'
import interest from "../YelpFetchData/interest.js"

const MessagesRightSideBar = (props) => {
    props ={term:'Thai food', location:'San Francisco', radius: '5000', sort_by: 'review_count'}

    const term = props.term
    const location = props.location
    const radius = props.radius
    const sort_by = props.sort_by // options: rating, review_count,distance

    const styling = {
        background:"url(https://friendly-aa.s3.us-west-1.amazonaws.com/thumbnails/thaifood.jpg) 0 0 no-repeat",
        backgroundSize: "cover"
     }

    const [restaurants, setRestaurants] = useState([])
    const getDataFromYelp = () => {
        fetch(`/api/yelp?term=${term}&radius=${radius}&location=${location}&sort_by=${sort_by}`)
        .then(response => response.json())
        .then(data => JSON.stringify(data))
        .then(stringifiedData => JSON.parse(stringifiedData))
        .then(parsedData => {
            setRestaurants(parsedData);
            // setRestaurantName(parsedData[0].name)
        })
        .catch((error) => {
            // console.log(error);
        });
    }

    // use react hook to get all the data 
    useEffect(() => {
        getDataFromYelp()
    }, [])
    
  return (
    <aside className="rightSidebar">
        <div className="innerAside">
            <div className="top" style={styling}>
                <div className="gradient"></div>
                <h4>Thai Food</h4>
                <h3>
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 6.11465C5.34375 6.11465 5.63812 5.9948 5.88313 5.75511C6.12771 5.51582 6.25 5.22803 6.25 4.89172C6.25 4.55541 6.12771 4.26741 5.88313 4.02772C5.63812 3.78843 5.34375 3.66879 5 3.66879C4.65625 3.66879 4.36208 3.78843 4.1175 4.02772C3.8725 4.26741 3.75 4.55541 3.75 4.89172C3.75 5.22803 3.8725 5.51582 4.1175 5.75511C4.36208 5.9948 4.65625 6.11465 5 6.11465ZM5 12C4.91667 12 4.83333 11.9847 4.75 11.9541C4.66667 11.9236 4.59375 11.8828 4.53125 11.8318C3.01042 10.5172 1.875 9.29692 1.125 8.17101C0.375 7.04469 0 5.99236 0 5.01401C0 3.48535 0.502708 2.26752 1.50813 1.36051C2.51313 0.453503 3.67708 0 5 0C6.32292 0 7.48688 0.453503 8.49187 1.36051C9.49729 2.26752 10 3.48535 10 5.01401C10 5.99236 9.625 7.04469 8.875 8.17101C8.125 9.29692 6.98958 10.5172 5.46875 11.8318C5.40625 11.8828 5.33333 11.9236 5.25 11.9541C5.16667 11.9847 5.08333 12 5 12Z" fill="white"/>
                    </svg> San Francisco</h3>
            </div>
            <p>{interest[term].description}</p>
            <div className="places">
                <h5 className="uppercase">Places</h5>
                <ul>
                    <li><a href="/yelp-or-google-link">Restaurant Name</a></li>
                    <li><a href="/yelp-or-google-link">Restaurant Name</a></li>
                    <li><a href="/yelp-or-google-link">Restaurant Name</a></li>
                </ul>
            </div>
        </div>
    </aside>
  )
}

export default MessagesRightSideBar