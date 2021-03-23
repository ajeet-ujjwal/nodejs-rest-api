const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const allRoutes = require('./api/routes/all-routes');

const app = express();
app.use(bodyParser.json());

app.use('/', allRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(
        'mongodb://localhost:27017/movie-api', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
    .then(() => {
        app.listen(PORT, () => console.log('server is running'))
    })
    .catch(err => {
        console.log(err);
    });