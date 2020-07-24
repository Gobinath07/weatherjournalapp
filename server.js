// Setup empty JS object to act as endpoint for all routes
projectData =[];

// Require Express to run server and routes
const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');




// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port ='8003';

const server = app.listen(port,listening);

function listening(){
console.log(`running on localhost: ${port}`);

}
app.post('/newData', (req, res) => {
    console.log(req.body);
    newEntry={
        date:req.body.date,
        temp:req.body.temp,
        city:req.body.city,
        feeling:req.body.feeling
    }
 projectData.push(newEntry)
 console.log(projectData);
})

app.get('/newData',sendData);

function sendData(req, res){
    res.send(JSON.stringify(projectData));

}

