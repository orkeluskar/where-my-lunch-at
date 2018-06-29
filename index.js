require('dotenv').config();
const yelp = require('yelp-fusion');
const express = require('express');
const app = express();
const apiKey = process.env.apiKey;
const client = yelp.client(apiKey);
const PORT = process.env.PORT || 3001;

//mimicing in-memory db;
let user = {};

//list all registered routes
const listRoutes = (req, res) => {
    let routes = [];
    app._router.stack.forEach(function (middleware) {
        if(middleware.route) {
            routes.push(Object.keys(middleware.route.methods) + " -> " + middleware.route.path);
        }
    });
    res.send(JSON.stringify(routes, null, 4));
}

//resuable search function
const searchLunch = (searchParams) => {
    var res =   client.search(searchParams).then(response => {
                    return(response.jsonBody.businesses);
                }).catch(e => {
                    return {status: 400, Message: JSON.parse(e.response.body)}
                })
    return res;
}

//Lunch finder
const findLunch = async (req, res) => {
    const results = await searchLunch(req.query);
    res.send(results)
}

//Business reviews
const getReviews = (req, res) => {
    client.reviews(req.params.id).then(response => {
        res.send(response.jsonBody.reviews);
    }).catch(e => {
        res.send({status: 400, Message: JSON.parse(e.response.body)})
    });
}

//full details for the business
const fullDetails = (req, res) => {
    client.business(req.params.id).then(response => {
        res.send(response.jsonBody);
      }).catch(e => {
        res.send({status: 400, Message: JSON.parse(e.response.body)})
    });
}

// Keeping user history in-memory in user variable
const ateAt = (req, res) => {
    if (req.query.userName === undefined)
        res.send({status:400, Message: 'Enter your UserName'})
    else{ 
        const userName = req.query.userName;
        let business = req.query.business;
        if (!(userName in user))
            user[userName] = {};
        user[userName][business] = true;
        console.log(user);
        res.send({status: 200, Message: {'history': user[userName]}})
    }
}

// Tired of eating at same place? Exclude previous places where you ate
const tryNew = async (req, res) => {
    const places = await searchLunch(req.query);

    if (req.query.userName === undefined)
        res.send({status:400, Message: 'Enter your UserName'})
    else if(user[req.query.userName] === undefined){
        res.send({status:400, Message: 'No history found. Please add a place to your history at /ateat/:id'})
    }
    else{
        const userName = req.query.userName;
        let newPlaces = [];
        await places.map(place => {
            (place.id in user[userName]) ? null : newPlaces.push(place)
        })
        res.send(newPlaces);
    }
}

//routes
app.get('/', listRoutes);
app.get('/lunch', findLunch);
app.get('/reviews/:id', getReviews);
app.get('/details/:id', fullDetails);
app.get('/ateat', ateAt);
app.get('/trynew', tryNew);

//listener
app.listen(PORT, () => console.log(`listening on port ${PORT}`))