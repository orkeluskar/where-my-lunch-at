# Simple lunch finder

## Motivation for the idea

- Ever wondered where to eat?
- Ever had to search for **places to eat**?
- Ever wanted to try some **new place** to eat?

This service is a one-stop answer all of these questions.

Find places near you, add places you ate at, try new places to eat.


## Introduction

> This server makes use of the following to solve the lunch finding problem:

1. Yelp's [Fusion API](https://www.yelp.com/developers/documentation/v3)
2. [Node client](https://github.com/tonybadguy/yelp-fusion) for Yelp's fusion APIs
3. For simplicity purposes of this challenge I've used **in-memory datastructure** to **store user history**. **Instead of using Persistence layer** (SQL, NoSQL etc).


## Getting started

1. Clone the repo
   ```bash
   git clone https://github.com/orkeluskar/where-my-lunch-at.git
   ```
2. Install all the dependencies
   ```
   npm install
   ```
3. Get your Yelp's fusion API Key [here](https://www.yelp.com/developers/v3/manage_app)
4. Create `.env` file to supply Yelp's API Key, with following content
   ```
   apiKey=YOUR_API_KEY
   ```
5. Run your app
   ```
   npm start
   ```


## Endpoints

| Name | Path | Description |
|- | - | - |
| List Routes | / | List of all routes |
| Find Places | [/lunch](#lunch) | Search for places by keyword, location, rating etc |
| Reviews | [/reviews/:id](#reviewsid) | Upto 3 reviews for a business |
| Business Details | [/details/:id](#detailsid) | Full details provided by Yelp for the business |
| History | [/ateat](#ateat) | Store history of places you ate |
| Try New | [/trynew](#trynew) | Try new places to eat by hiding places from history |


## Request Params

### /lunch

Returns a list of upto 1000 places

**Request**
```
/lunch
```

**Parameters**

Complete list of parameters can be found [here](https://www.yelp.com/developers/documentation/v3/business_search)

**Example**

Request:
```
/lunch?latitude=40.7455905&longitude=-74.1526816&sort_by=rating&open_now=true
```

Response:
```
[
    {
        "id": "oFSRNJrl9MOZCiFTNwP1Xw",
        "alias": "tops-diner-east-newark",
        "name": "Tops Diner",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/xU8VNB-30qzJaMrirRfl4g/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/tops-diner-east-newark?adjust_creative=k4eAdnyKj_qERFUN3UagKg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=k4eAdnyKj_qERFUN3UagKg",
        "review_count": 1803,
        "categories": [
            {
                "alias": "diners",
                "title": "Diners"
            },
            {
                "alias": "desserts",
                "title": "Desserts"
            },
            {
                "alias": "breakfast_brunch",
                "title": "Breakfast & Brunch"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 40.750599218258,
            "longitude": -74.1639269064518
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "500 Passaic Ave",
            "address2": "",
            "address3": "",
            "city": "East Newark",
            "zip_code": "07029",
            "country": "US",
            "state": "NJ",
            "display_address": [
                "500 Passaic Ave",
                "East Newark, NJ 07029"
            ]
        },
        "phone": "+19734810490",
        "display_phone": "(973) 481-0490",
        "distance": 1098.8929420128534
    },
    .
    .
    .
    .
]
```


---
### /reviews/:id

**Request**
```
/reviews/:id
```

**Parameters**

Complete list of parameters can be found [here](https://www.yelp.com/developers/documentation/v3/business_reviews)

**Example**

Request:
```
/reviews/oFSRNJrl9MOZCiFTNwP1Xw
```

Response:
```
[
    {
        "id": "ZuMZZuoJP7dyPW8X8GvA4Q",
        "url": "https://www.yelp.com/biz/tops-diner-east-newark?hrid=ZuMZZuoJP7dyPW8X8GvA4Q&adjust_creative=k4eAdnyKj_qERFUN3UagKg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=k4eAdnyKj_qERFUN3UagKg",
        "text": "Stopped in from the Newark AP at the recommendation from my son and boy was this a good stop. I'm not to big on dinners, but this place was off the chain.I...",
        "rating": 5,
        "time_created": "2018-06-14 16:25:54",
        "user": {
            "image_url": "https://s3-media1.fl.yelpcdn.com/photo/MLXaCu8KkDFpjBNdeFjTRw/o.jpg",
            "name": "Paul P."
        }
    },
    {
        "id": "N6a_OG0bEku87uAPYvksSg",
        "url": "https://www.yelp.com/biz/tops-diner-east-newark?hrid=N6a_OG0bEku87uAPYvksSg&adjust_creative=k4eAdnyKj_qERFUN3UagKg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=k4eAdnyKj_qERFUN3UagKg",
        "text": "The food here is pretty good! \n\nI was here with my friends for a late night nite to eat and we have always talked about coming here. Our waiter was nice but...",
        "rating": 4,
        "time_created": "2018-06-29 01:01:45",
        "user": {
            "image_url": "https://s3-media2.fl.yelpcdn.com/photo/BO5NIVvyuceGHpetnuSoAQ/o.jpg",
            "name": "Nadia D."
        }
    },
    {
        "id": "2KvVipl12746sh2kvww1Gg",
        "url": "https://www.yelp.com/biz/tops-diner-east-newark?hrid=2KvVipl12746sh2kvww1Gg&adjust_creative=k4eAdnyKj_qERFUN3UagKg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=k4eAdnyKj_qERFUN3UagKg",
        "text": "Top's is the holy grail of post-call days for the hospital. When the night plays out right, and you have buddies with you, sign-out was effecicient, and the...",
        "rating": 4,
        "time_created": "2018-06-25 17:09:34",
        "user": {
            "image_url": "https://s3-media3.fl.yelpcdn.com/photo/pX2f0zqmaAuq_p1rASeOmA/o.jpg",
            "name": "Francisco G."
        }
    }
]
```

---
### /details/:id

Straightforward as [reviews](#/reviews/:id).
Detailed docs [here](https://www.yelp.com/developers/documentation/v3/business)



### /ateat

Stores places by their id in-memory for that user

**Request**
```
/ateat
```

**Parameters**

| Name | Type | Description |
| - | - | - |
| business | string | id of the business |
| userName | string | User name of the person visited the business |

**Example**

Request:
```
/ateat/?business=XJofZdWC-oRQSDZD0sJGnA&userName=omkar
```

Response:
```
{
    "status": 200,
    "Message": {
        "history": {
            "oFSRNJrl9MOZCiFTNwP1Xw": true
        }
    }
}
```

---
### /trynew

Try something new! This one excludes the places the user has already ate at.

**Request**
```
/trynew
```

**Parameters**

| Name | Type | Description |
| - | - | - |
| business | string | id of the business |
| userName | string | User name of the person visited the business |
| location | string | Required if either latitude or longitude is not provided. Specifies the combination of "address, neighborhood, city, state or zip, optional country" to be used when searching for businesses. |
| latitude | decimal | Required if location is not provided. Latitude of the location you want to search nearby. |
| longitude | decimal | Required if location is not provided. Longitude of the location you want to search nearby. |


**Example**

Request:
```
/trynew?latitude=40.7455905&longitude=-74.1526816&userName=omkar
```

Response:
```
[
    {
        "id": "tmbW6_dJs5-UXhvROO093Q",
        "alias": "casa-d-paco-newark",
        "name": "Casa d'Paco",
        "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/qU4hYla0BL8RFJJsBb55dQ/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/casa-d-paco-newark?adjust_creative=k4eAdnyKj_qERFUN3UagKg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=k4eAdnyKj_qERFUN3UagKg",
        "review_count": 411,
        "categories": [
            {
                "alias": "spanish",
                "title": "Spanish"
            },
            {
                "alias": "tapas",
                "title": "Tapas Bars"
            },
            {
                "alias": "wine_bars",
                "title": "Wine Bars"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 40.7253867313068,
            "longitude": -74.1631700644341
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "73 Warwick St",
            "address2": "",
            "address3": "",
            "city": "Newark",
            "zip_code": "07105",
            "country": "US",
            "state": "NJ",
            "display_address": [
                "73 Warwick St",
                "Newark, NJ 07105"
            ]
        },
        "phone": "+18623079466",
        "display_phone": "(862) 307-9466",
        "distance": 2414.1154057311865
    },
    .
    .
    .
]
```