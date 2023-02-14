// Entry point into backend app, create and initialise express app here
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const db = require('./db');  // ./ means current directory

const app = express();

app.use(cors())
app.use(express.json());  // attaches the body to the request object, under req.body, as a Javascript object

// Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        // const results = await db.query("SELECT * FROM restaurants");
        const results = await db.query(
            "select * from restaurants LEFT JOIN (select restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating from reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;")
        
        res.status(200).json({
            status: "success",
            results: results.rows.length,  // best practice to give the no of results
            data: {
                restaurants: results.rows
            }
        });
    } catch(err) {
        console.log(err);
    }
    
});

// Get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.params.id);  // what we want is in params['id']
    try {
        const restaurants = await db.query("select * from restaurants LEFT JOIN (select restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating from reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id=$1;",
                        [req.params.id]);
        
        const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id = $1",
                        [req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurants.rows[0],
                reviews: reviews.rows
            }
        })
    } catch(err) {
        console.log(err);
    }
})

// Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body);
    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) RETURNING *",
        [req.body.name, req.body.location, req.body.price_range])

        // by default, postgres does not return the data of the inserted restaurant
        // we need to add returning *, which returns in rows

        console.log(results)

        res.status(201).json({
            status: "sucess",
            data: {
                restaurant: results.rows[0]
            }
        })

    } catch(err) {
        console.log(err);
    }
})

// Update, need to update all of the fields cos its a put request
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4 RETURNING *", 
        [req.body.name, req.body.location, req.body.price_range, req.params.id])

        res.status(200).json({
            status: "sucess",
            data: results.rows[0]
        })
    } catch(err) {
        console.log(err)
    }
    
})

// Delete
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("DELETE FROM restaurants WHERE id=$1", [req.params.id])
        res.status(204).json({
            status: "success"
        })
    } catch(err) {
        console.log(err);
    }
})

// Add a review
app.post("/api/v1/restaurants/:id/addreview", async (req, res) => {
    try {
        const review = await db.query("INSERT INTO reviews (restaurant_id, name, body, rating) values ($1, $2, $3, $4) RETURNING *",[
            req.params.id, req.body.name, req.body.body, req.body.rating
        ])
        console.log(review.rows)
        res.status(201).json({
            status: "success",
            data: {
                reviews: review.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})


const port = process.env.PORT || 3001;  // If PORT is not defined, default is 3001.
app.listen(port, () => {
    // once server starts up, do this
    console.log(`Listening on port ${port}`)
});

