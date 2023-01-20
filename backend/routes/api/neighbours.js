const express = require('express');
const router = express.Router();
// const yelp = require('yelp-fusion');
const apiKey = process.env.ZIP_CODE_BASE_API;
// const client = yelp.client(apiKey);

router.get('/', async (req, res) => {
    const radiusApi =`https://app.zipcodebase.com/api/v1/radius?apikey=7f8dd6e0-9825-11ed-b034-7f17be0d755a&code=${req.body.zipCode}&radius=${req.body.desiredRadius}&country=us`

    let neigbours;
    await fetch(radiusApi)
        .then(res=>res.json())
        .then(dataRadius=>{
        // console.log(dataRadius)
        neigbours=dataRadius.results?.map(el=>el.code);
    })
    return neigbours;
})
module.exports = router;