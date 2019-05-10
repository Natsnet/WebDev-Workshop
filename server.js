const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Message = require('./models/message');

const PORT = process8080;

// Assign the value of your mongoDB connection string to this constant
const dbConnectString = "";

// Updating mongoose's promise version
mongoose.Promise = global.Promise;

// Connecting to MongoDB through Mongoose
mongoose.connect(dbConnectString).then(() => {
    console.log('connected to the db');
}).catch((err) => {
    console.log(err);
});

// Middleware to parse the request body as json
app.use(bodyParser.json());

// GET all the previous messages
app.get('/api/message', (req, res) => {
    Message.find({}).exec((err, messages) => {
        if(err) {
            res.send(err).status(500);
        } else {
            res.send(messages).status(200);
        }
    });
});

// POST a new message
app.post('/api/message', (req, res) => {
    Message.create(req.body).then((message) => {
        res.send(message).status(200);
    }).catch((err) => {
        console.log(err);
        res.send(err).status(500);
    });
});

if(process.env.Node_EVN === "production") {
    app.use(express.static("./client/build"));
    

}

// Start the server at the specified PORT
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});