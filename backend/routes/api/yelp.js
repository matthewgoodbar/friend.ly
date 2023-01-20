const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');
const apiKey = process.env.YELP_API_KEY;
const client = yelp.client(apiKey);

router.get('/', (req, res) => {
    client.search({
        location: req.query.location,
        term: req.query.term,
        limit: '6',
        sort_by: "review_count"
    }).then(response => {
        // console.log(JSON.stringify(response.jsonBody));
        res.send(response.jsonBody.businesses);
    }).catch(e => {
        console.log(e);
    });
})
module.exports = router;