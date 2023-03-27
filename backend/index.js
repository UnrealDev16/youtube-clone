const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require('path');
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(function (err) {
  if(err){
    console.log(err);
  }
  else{
    console.log("Connected to Database");
  }
});

const db = client.db("mydb");
const videos = db.collection("videos");

async function insertVideo(fileLoc,title,description,author,duration){
  let date_ob = new Date();

  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();

  await videos.insertOne({
    video: fileLoc,
    title: title,
    desc: description,
    author: author,
    views: 0,
    likes: 0,
    comments: [[]],
    duration: duration,
    date: year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
  });
}

app.get('/video/:id', async (req, res) => {
  try {
    const range = req.headers.range;
    const video = req.params.id;
    console.log(video);
    if (!range) {
      return res.status(400).json({ error: 'Range not requested' });
    }
    const videoPath = path.join(__dirname, 'videos', `${video}.mp4`);
    const videoSize = fs.statSync(videoPath).size;
    if (!videoSize) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, { start, end });

    videoStream.pipe(res);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/videos', async (req, res) => {
  try {
    const db = client.db("mydb");
    const videos = db.collection("videos");
    const docs = await videos.find().limit(10).toArray();
    const videoArray = [];
    docs.forEach((doc) => {
      const videoObj = {
        "video": doc.video,
        "title": doc.title,
        "author": doc.author,
        "views": doc.views,
        "duration": doc.duration,
        "thumbnail": doc.thumbnail
      };
      videoArray.push(videoObj);
    });
    return res.json(videoArray);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/videoinfo",async (req,res) => {
    const arg = req.query.id;
    console.log(arg)
    const foundVideo = await videos.findOne({
      "video": arg
    })
    return res.json(foundVideo)
})

app.post("/newvid", async (req, res) => {
  
});

function getRandomSubset(array, count) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

app.listen(5000);
