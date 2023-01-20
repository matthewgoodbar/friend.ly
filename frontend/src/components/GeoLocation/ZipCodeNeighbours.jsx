import {React, useState} from 'react';
import { useEffect } from 'react';


const FindNeighbours = ({ zipCode }) => {
    const [neighbours, setNeighbours] = useState([]);

        // default zip code
        let defaultZip = 94108;

        // default browser
        let desiredRadius = 5 

        //default zip code neighbours in 5 miles radius
        let defaultZipNeighbours = [{code: '94104'}, {code: '94101'}, {code: '94133'}, {code: '94111'}, {code: '94113'},{code: '94109'}, {code: '94102'},{code: '94105'},{code: '95105'},{code: '94119'},{code: '94120'},{code: '94125'},{code: '94126'},{code: '94137'},{code: '94139'},{code: '94140'},{code: '94141'},{code: '94142'},{code: '94144'},{code: '94145'},{code: '94146'},{code: '94147'},{code: '94151'},{code: '94159'},{code: '94160'},{code: '94161'},{code: '94163'},{code: '94164'},{code: '94172'},{code: '94177'},{code: '94188'},{ code: '94103'},{code: '94106'},{code: '94123'},{code: '94115'},{code: '94158'},{code: '94107'},{code: '94117'},{code: '94114'},{code: '94110'},{code: '94130'},{code: '94118'}]

    useEffect(() => {
        const radiusApi =`https://app.zipcodebase.com/api/v1/radius?apikey=7f8dd6e0-9825-11ed-b034-7f17be0d755a&code=${zipCode}&radius=${desiredRadius}&country=us`

         fetch(radiusApi)
            .then(res=>res.json())
            .then(dataRadius=>{
                // console.log(dataRadius)
                setNeighbours(dataRadius.results?.map(el=>el.code))
            })

    },[zipCode]);
    return (
        <div>
            {neighbours.map(neighbour => (
                <p key={neighbour}>{neighbour}</p>
            ))}
        </div>
    );
};

export default FindNeighbours;
