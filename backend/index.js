const express = require("express")
const cors = require("cors")
const fs = require("fs")

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/video",async (req,res) => {
    const range = req.headers.range;
    const { videoid } = req.body;
    if(!range){
        res.json({"status":"Range not requested"})
    }

})

app.listen(5000)