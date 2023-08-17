const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');
const contactRoute = require("./routes/contact");


mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connection success"))
.catch(err => console.log(err));

const app = express();

app.use(express.json());
app.use(cors({ 
    origin: [ 'http://127.0.0.1:3000', 'http://localhost:3000' ],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
});

app.use("/contact", contactRoute);



module.exports = app;