import {useState, useEffect} from 'react'

const YelpDataItems =() => {

    const apiKey = process.env.YELP_API_KEY
    console.log(apiKey)
    const [restaurants, setRestaurants] = useState("")

    // get data from yelp fusion api
    // const getDataFromYelp = () => {
    //     const yelpurl= 
    //     "https://api.yelp.com/v3/businesses/search?term=restaurants&location=SanFrancisco"
    //     const apioptions = {
    //         headers: {
    //             Authorization: `Bearer ${apiKey}`
    //         }
    //     }
    //     return  fetch(yelpurl, apioptions)
    //                         .then( (res) => res.json())
    //                         .then((json) => setYelpData(json.businesses))
    // }

    const fetchData = () => {
        fetch('/api/yelp?term=restaurants&location=SanFrancisco')
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
        fetchData()
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