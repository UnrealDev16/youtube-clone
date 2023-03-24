const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/video/:id', async (req, res) => {
    const range = req.headers.range;
    const video = req.params.id
    console.log(video)
    if (!range) {
      res.status(400).json({ error: 'Range not requested' });
    }
    try{
        const videoPath = path.join(__dirname, 'videos', `${video}.mp4`);
        const videoSize = fs.statSync(videoPath).size;
    
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
    }
    catch (e) {
        
    }
  });

  app.get('/videos', (req, res) => {
    const videosPath = path.join(__dirname, 'videos');
    fs.readdir(videosPath, (err, files) => {
      if (err) {
        res.status(500).json({ error: 'Failed to read videos directory' });
      } else {
        const videos = files
          .filter(file => file.endsWith('.mp4'))
          .map(file => ({ id: path.parse(file).name }));
        res.json(videos);
      }
    });
  });

app.listen(5000)