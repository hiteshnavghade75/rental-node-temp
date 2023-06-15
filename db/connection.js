const mongoose = require("mongoose")
require("dotenv").config();
let BASE_URL = process.env.DB_URL;

mongoose.connect(BASE_URL)
    .then(() => {
        console.log("Connected to db...")
    })
    .catch(() => {
        console.log("Failed to connect to db")
    })

