import {useState, useEffect} from 'react'
import { Rating } from 'react-simple-star-rating'
import { Link } from 'react-router-dom';
import { getDistance } from 'geolib';
import './yelp.css'
import interest from './interest.js'


const YelpDataItems =(props) => {
    props ={term:"Thai food", location:"San Francisco", radius: "5000", sort_by: "review_count"}

    const term = props.term
    const location = props.location
    const radius = props.radius
    const sort_by = props.sort_by // options: rating, review_count,distance

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
            // console.log(error);
        });
    }

    // use react hook to get all the data 
    useEffect(() => {

        getDataFromYelp()
    }, [])

    return (
        <div className='recommendation-container'>
            <div className='recommendation-head'
            style={{backgroundImage: `url(${interest[term].imgUrl})`}}>
                <div className='recommendation-interest'>Thai food</div>
                <div className='recommendation-location'>San Francisco</div>
            </div>
            <div className='description'>{interest[term].description}</div>
            <hr className='right-bar-line'/>
            <div className='uppercase'>PLACES</div>
            {restaurants.map((data,i) => 
            <Link to={{ pathname: `${data.url}` }} target="_blank">
            <div className="restaurants-cards" key={i}>
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