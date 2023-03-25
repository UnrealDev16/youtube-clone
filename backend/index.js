const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require('path')
const { MongoClient } = require("mongodb");

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb://127.0.0.1/";
const client = new MongoClient(uri);

const db = client.db("mydb")
const users = db.collection("users")
const videos = db.collection("videos")

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
    likes: 0,
    comments: [[]],
    duration: duration,
    date: year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
  })
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

  app.get('/videos', (req, res) => {
    const videosPath = path.join(__dirname, 'videos');
    fs.readdir(videosPath, (err, files) => {
      if (err) {
        res.status(500).json({ error: 'Failed to read videos directory' });
      } else {
        const videoFiles = files.filter(file => file.endsWith('.mp4'));
        const randomFiles = getRandomSubset(videoFiles, 10);
        const videos = randomFiles.map(file => ({ id: path.parse(file).name }));
        res.json(videos);
      }
    });
  });

  app.post("/newvid",async (req,res) => {
    console.log(req.body)
  })
  
  function getRandomSubset(array, count) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  

app.listen(5000)