import {useState, useEffect} from 'react'
import { Rating } from 'react-simple-star-rating'
import { getDistance } from 'geolib';
import './yelp.css'
import interest from './interest.js'

const YelpDataItems =(props) => {
    const term = props.term
    const location = props.location
    const radius = props.radius
    const sort_by = props.sortBy // options: rating, review_count,distance

    const [restaurants, setRestaurants] = useState([])
    const getDataFromYelp = () => {
        fetch('/api/yelp?term=Thaifood&radius=1000&location=94102&limit=6')
        .then(response => response.json())
        .then(data => JSON.stringify(data))
        .then(stringifiedData => JSON.parse(stringifiedData))
        .then(parsedData => {
            setRestaurants(parsedData);
            // setRestaurantName(parsedData[0].name)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // use react hook to get all the data 
    useEffect(() => {
        getDataFromYelp()
    }, [])
    console.log(restaurants)
    return (
        <div className='recommendation-container'>
            <div className='recommendation-head'
            style={{backgroundImage: `url(${interest['Thai food'].imgUrl})`}}>
                <div className='recommendation-interest'>Thai food</div>
                <div className='recommendation-location'>San Francisco</div>
            </div>
            <div className='description'>{interest['Thai food'].description}</div>
            <hr className='right-bar-line'/>
            <div className='uppercase'>PLACES</div>
            {restaurants.map((data,i) => 
            <div className="restaurants-cards" key={i}>
                <img  src={data.image_url}  ></img>
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
            )}
        </div>
    )

}

export default YelpDataItems