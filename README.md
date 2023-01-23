[![friend ly-logo](https://user-images.githubusercontent.com/46214277/213944861-26d84a04-5535-4541-a8ca-cfca00ba760e.png)](https://friend-ly.onrender.com/)  <br/>

[Friend.ly](https://friend-ly.onrender.com/) is a social media website for meeting new people based on user location and interests. A group project built with MongoDB, Express.js, Node.js, React.js (MERN) stack.

<br />

![welcome-page](https://user-images.githubusercontent.com/46214277/213945225-cb3159a1-c67a-48ae-b48b-7478f156c60d.gif)


## Technologies
**Backend:** Express.js, Node.js, Sockets.io <br/>
**Frontend:** React-Redux, JavaScript <br/>
**Database:** MongoDB <br/>
**Other:** AWS S3, Yelp API, BigDataCloud API, ZipCodeBase API <br/>

## Features
Users can specify their **location** and **interests** and based on these information the app generates new chat every 24 hours. <br /> <br />
![interests](https://user-images.githubusercontent.com/46214277/213945545-976b2ca3-a872-4e69-b58e-eb3ac3d57f8c.gif) <br /><br />

**Interact** with other participants in the **main** and **private** chat rooms <br /><br />
![messages-page](https://user-images.githubusercontent.com/46214277/213945744-c125de6c-678b-4a62-83e3-b97302729e36.gif) <br /><br />


## Significant Code
#### LOREN IPSUM
```javascript
code snippets

```

#### [Yelp-Fusion library](https://github.com/Yelp/yelp-fusion).
 
Besides the official documents, when i try to fetch data from frontend, it won't work because the CORS policy. To avoid the CORS policy, I installed the [cors library](https://expressjs.com/en/resources/middleware/cors.html).

code snippets
```js
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

```
In the frontend the following code snippet should send your desired data to the backend sever 

```js
const getDataFromYelp = () => {
        fetch(`/api/yelp?term=${term}&radius=${radius}&location=${location}&sort_by=${sort_by}`)
        .then(response => response.json())
        .then(data => JSON.stringify(data))
        .then(stringifiedData => JSON.parse(stringifiedData))
        .then(parsedData => {
            setRestaurants(parsedData);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // use react hook to get all the data 
    useEffect(() => {
        getDataFromYelp()
    }, [])
```

 



## Other Visuals

### Login/Logout functionality 
![login-signup](https://user-images.githubusercontent.com/46214277/213945883-9c7da3b4-858d-40db-82b7-a4fe11b870f2.gif)
