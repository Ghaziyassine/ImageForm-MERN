//imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const multer = require('multer');
const path = require('path');

const ImageModel = require('./models/imageModel.js')


const app = express();

//middleware
app.use(express.json());
app.use(cors()); // Add this line to enable CORS

app.use(express.static('public'))

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({
    storage: storage
});


//create
app.post('/upload', upload.single('file'), (req, res) => {
    const { description } = req.body;  // get description from request body
    ImageModel.create({ image: req.file.filename, description: description })
        .then(result => res.json(result))
        .catch(err => console.log(err));
});


//get 
app.get('/getImage', (req, res) => {
    ImageModel.find()
        .then(images => res.json(images))
        .catch(err => res.json(err))

})


//conection to mongodb 
mongoose.connect("mongodb://127.0.0.1:27017")
    .then(() => {
        console.log("you are connected to database")
        app.listen(3000, () => {
            console.log("server is running  port 3000");
        });
    }).catch(() => {
        console.log("Connection failed")
    });


