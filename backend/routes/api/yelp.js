const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');
const apiKey = process.env.YELP_API_KEY;
const client = yelp.client(apiKey);

router.get('/', (req, res) => {
    client.search({
        location: req.params.location,
        // offset: '0',
        // limit: '50'
    }).then(response => {
        console.log(JSON.stringify(response.jsonBody));
        res.send(response.jsonBody.businesses);
    }).catch(e => {
        console.log(e);
    });
})
module.exports = router;