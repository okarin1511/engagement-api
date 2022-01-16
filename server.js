const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

let Vendor = require('./models/vendor');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.post('/add_vendor', (req, res) => {
    const vendorname = req.body.vendorname;
    const engagement = req.body.engagement;

    const newVendor = new Vendor({vendorname, engagement});

    newVendor.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' * err));       
});

app.get('/get_vendor', (req, res) => {
    const vendorname = req.body.vendorname;
    
    Vendor.find({ vendorname: vendorname })
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' * err));
});

app.get('/get_all', (req, res) => {
    
    Vendor.find()
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' * err));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
