const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


app.use(cors());
app.use(express.json());    


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to DB"))
.catch(err => console.log("Failed to connect to DB", err));


app.use(`/${process.env.apiKeyWebapp}/user`, require('./routes/user/User'));



app.listen(4500, () => {
    console.log('Server is running on port 4500');
});