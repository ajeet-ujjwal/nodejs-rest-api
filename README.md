# movie-api

## Description

This project involves creating restful apis for movies using Node.js, Express and MongoDB.
jsonwebtoken is used for authentication of users.


## Technologies Used
* [MongoDB](https://www.mongodb.com/)
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [Postman](https://www.postman.com/) (tool for testing apis)


## Installation

* Install [MongoDB](https://www.mongodb.com/) (v4.4.3)
* Install [Node.js](https://nodejs.org/en/) (v14.16.0)
* run the MongoDB server
* npm install (command to install nodejs project dependencies)
* node app.js  (command to run the server)


## Features and API Endpoints

Feature | Api Endpoint
------------ | -------------
Register a new User | POST localhost:5000/register
Login a User | POST localhost:5000/login
Create a Movie | POST localhost:5000/movies
Details of a Movie | GET localhost:5000/movies/:id
Getting a list of movies filterable by a query | GET localhost:5000/movies?search=avengers
Favourite a Movie | POST localhost:5000/favourite/:id
Get a list of all favorited movies | GET localhost:5000/favourites

## Important Notes

* **x-auth-token need to be passed in the header of each request for authentication. This token will be retrieved from login endpoint.**

* **For details about endpoints and testing of endpoints, import the json file inside postman_collection folder to postman.**
