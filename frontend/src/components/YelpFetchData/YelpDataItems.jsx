import {useState, useEffect} from 'react'
import { Rating } from 'react-simple-star-rating'
import { Link } from 'react-router-dom';
import { getDistance } from 'geolib';
import './yelp.css'
import interest from './interest.js'


const YelpDataItems =({props}) => {
    console.log(props)
    // props ={name:"Thai food", location:"San Francisco", radius: "5000", sort_by: "review_count"}

    const term = props.name
    const location = 'San Francisco'
    const radius = 5000
    const sort_by = 'review_count' // options: rating, review_count,distance

    const [restaurants, setRestaurants] = useState([])
    const getDataFromYelp = () => {
        fetch(`/api/yelp?term=${term}&radius=${radius}&location=${location}&sort_by=${sort_by}`)
        .then(response => response.json())
        .then(data => JSON.stringify(data))
        .then(stringifiedData => JSON.parse(stringifiedData))
        .then(parsedData => {
            setRestaurants(parsedData);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // use react hook to get all the data 
    useEffect(() => {
        console.log("i'm in useeffect YELP")
        getDataFromYelp()
    }, [])
    console.log(restaurants)
    const topicBackground = {
        background:`url(${props.thumbnail}) 0 0 no-repeat`,
        backgroundSize: "cover"
     }
    return (
        <div className='recommendation-container'>
            <div className='recommendation-head'
            style={{background: `url(${props.thumbnail}) 0 0 no-repeat`, backgroundSize: "cover"}}>
                <div className='recommendation-interest'>{term}</div>
                <div className='recommendation-location'>{location}</div>
            </div>
            <div className='description'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi architecto quo fugit ducimus sed expedita accusamus cumque deleniti quasi assumenda.</div>
            <hr className='right-bar-line'/>
            <div className='uppercase'>PLACES</div>
            {restaurants.map((data,i) => 
            <Link to={{ pathname: `${data.url}` }} target="_blank" key={i}>
            <div className="restaurants-cards">
                <img  src={data.image_url} alt=""  ></img>
                <div className='single-restaurant'>
                <p>{data.name}</p>
                <Rating className='rating' initialValue={data.rating} />
                <div className='miles-address'>
                    <div>
                        {Math.round((data.distance) * 0.00062 * 100) / 100} miles
                    </div>
                    <div> - </div>
                    <div>{data.location.address1}</div>
                </div>
                </div>
            </div>
            </Link>
            )}
        </div>
    )

}

export default YelpDataItems