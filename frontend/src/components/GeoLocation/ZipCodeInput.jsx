import React, { useState, useRef } from 'react';

function ZipCodeInput({city, setCity, zipCode, setZipCode, error, setError }) {
  // let currentZipCode= useRef(null);
  // let currentZipNeighbours = useRef(null);
  // default zip code
  let defaultZip = 94109;
  let defaultCity = "San Francisco"

  //default zip code neighbours in 5 miles radius
  // let defaultZipNeighbours = [{code: '94104'}, {code: '94101'}, {code: '94133'}, {code: '94111'}, {code: '94113'},{code: '94109'}, {code: '94102'},{code: '94105'},{code: '95105'},{code: '94119'},{code: '94120'},{code: '94125'},{code: '94126'},{code: '94137'},{code: '94139'},{code: '94140'},{code: '94141'},{code: '94142'},{code: '94144'},{code: '94145'},{code: '94146'},{code: '94147'},{code: '94151'},{code: '94159'},{code: '94160'},{code: '94161'},{code: '94163'},{code: '94164'},{code: '94172'},{code: '94177'},{code: '94188'},{ code: '94103'},{code: '94106'},{code: '94123'},{code: '94115'},{code: '94158'},{code: '94107'},{code: '94117'},{code: '94114'},{code: '94110'},{code: '94130'},{code: '94118'}]
  

  // const [zipCode, setZipCode] = useState('');
  // const [city, setCity] = useState("");
  // const [error, setError] = useState('');

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

    // let output;
        await fetch(receivedCity)
            .then(res => res.json())
            .then(data=>{
                console.log(data.results[zipCode][0].city)
                setCity(data.results[zipCode][0].city);
                // zipNeighbours = dataRadius.results?.map(el=> el.code)
                // currentZipNeighbours.current.innerText=zipNeighbours;
            })
            // console.log(city)
    // setCity(output)
  }

  const findMyLocation = (e) => {
    e.preventDefault();
      // setError('');
  
    const success = async (position) => {
        console.log(position)
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("Latitude:",latitude, "Longitude:",longitude)

        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`

        let postCode;
        let currentCity;
        await fetch(geoApiUrl)
            .then(res => res.json())
            .then(data=>{
                console.log('whole API data object',data)
                currentCity = data.city
                console.log("this is city:", currentCity)
                postCode = data.postcode
                console.log('this is postCode',postCode)
                setZipCode(postCode)
                setCity(currentCity)
                // currentZipCode.current.innerText = postCode
            })
        
        //  const desiredRadius = 5 //miles   


        // const radiusApi =`https://app.zipcodebase.com/api/v1/radius?apikey=7f8dd6e0-9825-11ed-b034-7f17be0d755a&code=${postCode}&radius=${desiredRadius}&country=us`

        // let zipNeighbours;
        //  await fetch(radiusApi)
        //     .then(res => res.json())
        //     .then(dataRadius=>{
        //         console.log(dataRadius)
        //         zipNeighbours = dataRadius.results?.map(el=> el.code)
        //         // currentZipNeighbours.current.innerText=zipNeighbours;
        //     })

    }

    const error = () => {
        // status.textContent = "Unable to retrieve your location"
        console.log("PROBLEM WITH FETCHING DATA")
        setZipCode(defaultZip)
        setCity(defaultCity)
        setError("")
        // currentZipCode.current.innerText = defaultZip;
        // currentZipNeighbours.current.innerText= defaultZipNeighbours.map(el=> el.code)

    }

    navigator.geolocation.getCurrentPosition(success, error);

}

  return (
    <div className='zipcode-input'>
      {/* <input type="text" value={zipCode} onChange={handleZipCodeChange} required minLength={5} /> */}
      {/* <button onClick={findMyLocation}>Get Zip Code</button> */}
      {/* {error && <p>{error}</p>} */}

      <label>Zip Code<br />
              <input type="number" value={zipCode} onChange={handleZipCodeChange} required minLength={5} maxLength={5}
              onBlur={getUserCity}
                placeholder="Zip code"
              />
            </label>
        <div className="errors">{error && <p>{error}</p>}</div>
          <button onClick={findMyLocation}>Get Zip Code</button>
          
    </div>
  );
}

export default ZipCodeInput;
