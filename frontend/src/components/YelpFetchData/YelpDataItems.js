import {useState, useEffect} from 'react'

const YelpDataItems =(props) => {
    const term = props.term
    const location = props.location
    const radius = props.radius
    const sort_by = props.sortBy // options: rating, review_count,distance

    const [restaurants, setRestaurants] = useState("")
    const getDataFromYelp = () => {
        fetch('/api/yelp?term=Thaifood&location=SanDiego&limit=3')
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


    if(restaurants){
        return   
        (<div >
            {restaurants.businesses}
        </div>)
    }
}

export default YelpDataItems