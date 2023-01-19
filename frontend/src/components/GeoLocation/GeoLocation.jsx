import {React, useRef} from 'react'


const GeoLocation = () => {
    let currentZipCode= useRef(null);
    let currentZipNeighbours = useRef(null);

    // default zip code
    let defaultZip = 94108;

    //default zip code neighbours in 5 miles radius
    let defaultZipNeighbours = [{code: '94104'}, {code: '94101'}, {code: '94133'}, {code: '94111'}, {code: '94113'},{code: '94109'}, {code: '94102'},{code: '94105'},{code: '95105'},{code: '94119'},{code: '94120'},{code: '94125'},{code: '94126'},{code: '94137'},{code: '94139'},{code: '94140'},{code: '94141'},{code: '94142'},{code: '94144'},{code: '94145'},{code: '94146'},{code: '94147'},{code: '94151'},{code: '94159'},{code: '94160'},{code: '94161'},{code: '94163'},{code: '94164'},{code: '94172'},{code: '94177'},{code: '94188'},{ code: '94103'},{code: '94106'},{code: '94123'},{code: '94115'},{code: '94158'},{code: '94107'},{code: '94117'},{code: '94114'},{code: '94110'},{code: '94130'},{code: '94118'}]

    
    


    

    const findMyLocation = () => {

        const success = async (position) => {
            console.log(position)
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("Latitude:",latitude, "Longitude:",longitude)
    
            const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    
            let postCode;
            await fetch(geoApiUrl)
                .then(res => res.json())
                .then(data=>{
                    console.log(data)
                    postCode = data.postcode
                    console.log('this is postCode',postCode)
                    currentZipCode.current.innerText = postCode
                })
            
             const desiredRadius = 5 //miles   
    
    
            const radiusApi =`https://app.zipcodebase.com/api/v1/radius?apikey=7f8dd6e0-9825-11ed-b034-7f17be0d755a&code=${postCode}&radius=${desiredRadius}&country=us`
    
            let zipNeighbours;
             await fetch(radiusApi)
                .then(res => res.json())
                .then(dataRadius=>{
                    console.log(dataRadius)
                    zipNeighbours = dataRadius.results?.map(el=> el.code)
                    currentZipNeighbours.current.innerText=zipNeighbours;
                })

        }
    
        const error = () => {
            // status.textContent = "Unable to retrieve your location"
            console.log("PROBLEM WITH FETCHING DATA")
            currentZipCode.current.innerText = defaultZip;
            currentZipNeighbours.current.innerText= defaultZipNeighbours.map(el=> el.code)

        }
    
        navigator.geolocation.getCurrentPosition(success, error);
    
    }
    
  return (
    <>
        <div>GeoLocation</div> <br />
        <button onClick={findMyLocation}>GEO CHECK</button> <br />
        <div>
            <p>Your location: <span ref={currentZipCode}></span> </p><br />
            <p>Your neighbours: <span ref={currentZipNeighbours}></span></p>
        </div>

        <button onClick={findMyLocation}>Update Your GEO</button> <br />
    </>
  )
}

export default GeoLocation