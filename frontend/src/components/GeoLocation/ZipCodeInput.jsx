import React, { useState, useRef } from 'react';
import { PuffLoader } from 'react-spinners';
import './GeoLocation.css'

function ZipCodeInput({city, setCity, zipCode, setZipCode, error, setError }) {

  let defaultZip = 94109;
  let defaultCity = "San Francisco"

  const [loading, setLoading] = useState(false);

  const handleZipCodeChange = (event) => {
    const zipCode = event.target.value;
    setZipCode(zipCode);
    // validate zip code using regular expression
    if (!/^\d{5}(?:[-\s]\d{4})?$/.test(zipCode)) {
      setError('Invalid zip code format');
    } else {
      setError('');
    }
  };

  const getUserCity = async (e) =>{
    e.preventDefault();
    let receivedCity=`https://app.zipcodebase.com/api/v1/search?apikey=7f8dd6e0-9825-11ed-b034-7f17be0d755a&codes=${zipCode}&country=us
    `;

    await fetch(receivedCity)
        .then(res => res.json())
        .then(data=>{
            // console.log(data.results[zipCode][0].city)
            setCity(data.results[zipCode][0].city);
          })
    } 

  const findMyLocation = (e) => {
    e.preventDefault();
      setError('');
      setLoading(true);
  
    const success = async (position) => {
      
        // console.log(position)
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // console.log("Latitude:",latitude, "Longitude:",longitude)

    // try{
        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`

        let postCode;
        let currentCity;
        await fetch(geoApiUrl)
            .then(res => res.json())
            .then(data=>{
                // console.log('whole API data object',data)
                currentCity = data.city
                // console.log("this is city:", currentCity)
                postCode = data.postcode
                // console.log('this is postCode',postCode)
                setZipCode(postCode)
                setCity(currentCity)
                setLoading(false)
        })
      }
          const error = () => {
            // console.log("PROBLEM WITH FETCHING DATA")
            setZipCode(defaultZip)
            setCity(defaultCity)
            setError("")
            setLoading(false)
    
    }
      
    
  

    navigator.geolocation.getCurrentPosition(success, error);
    
     
}

  return (
    <div className='zipcode-input'>
      {/* <input type="text" value={zipCode} onChange={handleZipCodeChange} required minLength={5} /> */}
      {/* <button onClick={findMyLocation}>Get Zip Code</button> */}
      {/* {error && <p>{error}</p>} */}

      <label>Zip Code<br />
      {loading && <PuffLoader size={35} color={'purple'} />}
              <input type="number" value={zipCode} onChange={handleZipCodeChange} required minLength={5} maxLength={5}
              onBlur={getUserCity}
                placeholder="Zip code"
              />
            </label>
        <div className="errors">{error && <p>{error}</p>}</div>
        
          <button id="get-zip-btn" onClick={findMyLocation}>Get Zip Code</button>
          
    </div>
  );
}

export default ZipCodeInput;
