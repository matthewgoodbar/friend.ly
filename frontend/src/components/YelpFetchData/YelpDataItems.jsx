import {useState, useEffect} from 'react'
import { Rating } from 'react-simple-star-rating'
import './yelp.css'

const YelpDataItems =(props) => {
    const term = props.term
    const location = props.location
    const radius = props.radius
    const sort_by = props.sortBy // options: rating, review_count,distance

    const [restaurants, setRestaurants] = useState([])
    const [imgUrl, setImgUrl] = useState("https://s3-media3.fl.yelpcdn.com/bphoto/eyYUz3Xl7NtcJeN7x7SQwg/o.jpg")
    const getDataFromYelp = () => {
        fetch('/api/yelp?term=Dancing&radius=50000&location=94102&limit=3')
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
        <div>
            {restaurants.map((data,i) => 
            <div className="restaurants-cards" key={i}>
                <img  src={data.image_url}  ></img>
                <div className='single-restaurant'>
                <Rating  initialValue={data.rating} />
                    <p>address</p>
                    <p>Phone number</p>
                </div>
            </div>
            )}
        </div>
    )

}

export default YelpDataItems