const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require('path');
const { MongoClient } = require("mongodb");
const crypto = require('crypto');
const multer  = require('multer');
const ffprobe = require("ffprobe")
const ffprobeStatic = require("ffprobe-static")

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, res , cb) {
    cb(null,"uploads");
  },
  filename: function (req, file, cb) {
    if(file.mimetype === "video/mp4" || file.mimetype === "image/png"){
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
    else{
      cb(Error);
    }
  },
})

const upload = multer({ storage })

const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(function (err) {
  if(err){
    console.log("Error connecting to Database");
  }
  else{
    console.log("Connected to Database");
  }
});

const db = client.db("mydb");
const videos = db.collection("videos");
const users = db.collection("users")

async function insertVideo(fileLoc,title,description,author,authorLink,duration,thumbnail){
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
    link: link,
    views: 0,
    likes: 0,
    comments: [[]],
    duration: duration,
    date: year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds,
    thumbnail: thumbnail
  });
}

async function insertUser(name,email,link,password,pfp){
  const hashedEmail = hash(email)
  const hashedPassword = hash(password)
  users.insertOne({
    "name": name,
    "email": email,
    "hashedEmail": hashedEmail.hash,
    "emailSalt": hashedEmail.salt,
    "link": link,
    "password": hashedPassword.hash,
    "passwordSalt": hashedPassword.salt,
    "canPostVid": false,
    "subscribers": 0,
    "pfp": pfp ? pfp : "https://yt3.googleusercontent.com/ytc/AL5GRJWyltGcU7XxpYONvekC39Fey_MkP-Dqnz-i8_F_Yg=s900-c-k-c0x00ffffff-no-rj"
  })
}

app.get('/video/:id', async (req, res) => {
  try {
    const range = req.headers.range;
    const video = req.params.id;
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
        "link": doc.link,
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

function hash(input) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.createHash('sha512');
  hash.update(input + salt);
  return { salt, hash: hash.digest('hex') };
}

function verifyUser(input,salt,hash){
  const verifyHash = crypto.createHash("sha512")
  verifyHash.update(input + salt);
  const verifyHashValue = verifyHash.digest("hex")
  return hash === verifyHashValue;
}


app.post("/videoinfo",async (req,res) => {
  try{
    const { email , videoName} = req.body;

    const foundUser = users.findOne({
      "email": email
    })

    const foundVideo = await videos.findOne({
      "video": videoName
    })

    const authorUser = await users.findOne({
      "name": foundVideo.author
    })

    if(verifyUser( email , foundUser.salt , foundUser.hash)){
      return res.json({
        "title": foundVideo.title,
        "description": foundVideo.desc,
        "likes": foundVideo.likes,
        "link": authorUser.link,
        "views": foundVideo.views,
        "author": foundVideo.author,
        "comments": foundVideo.comments,
        "date": foundVideo.date,
        "subscribers": authorUser.subscribers,
        "pfp": authorUser.pfp,
        "isAuthor": true
      })
    }
    else{
      return res.json({
        "title": foundVideo.title,
        "description": foundVideo.desc,
        "likes": foundVideo.likes,
        "link": authorUser.link,
        "views": foundVideo.views,
        "author": foundVideo.author,
        "comments": foundVideo.comments,
        "date": foundVideo.date,
        "subscribers": authorUser.subscribers,
        "pfp": authorUser.pfp,
        "isAuthor": false
      })
    }
  }
  catch(e){
    console.log(e)
    return res.status(400).json({"error": "No user found"})
  }
})
app.post("/newvid", upload.any("file") ,async (req, res) => {
  const { title , description , author } = req.body;
  console.log(req.files)
  const thumbnail = req.files[1].path;
  const filePath = req.files[0].path;

  ffprobe(filePath, { path: ffprobeStatic.path }, (err, info) => {
    if (err) {
      res.status(500).send("Error");
    } else {
      const totalSeconds = info.streams[0].duration
      const minutes = Math.floor(totalSeconds / 60)
      const seconds = Math.round(totalSeconds % 60)
      res.sendStatus(200);
    }
  });
});

app.post("/register", async (req,res) => {
    const { username , email , password , link } = req.body
    try{
      if(username && email && password && link){
        const foundUser = await users.findOne({
          "email": email
        })
        const linkUser = await users.findOne({
          "link": link
        })
        if(!foundUser){
          if(!linkUser){
            insertUser(username,email,link,password)
            const insertedUser = await users.findOne({
              "email": email
            })
            res.json({"status": "Registered","email": insertedUser.hashedEmail})
          }
          else{
            res.json({"status": "Link already exist. Try another link"})
          }
        }
        else{
          res.json({"status": "User already exist"})
        }
      }
      else{
        res.json({"status": "Fill all input fields"})
      }
    }
    catch(e){
        console.log("Hello")
    }
})

app.post("/user", async (req,res) => {
  const { email,user } = req.body;
  const foundChannel = await users.findOne({
    link: user
  })
  const foundVideos = await videos.find({
    link: user
  }).toArray()
  console.log(foundVideos)
  if(foundChannel && foundVideos && foundChannel.email !== email){
    res.json({
      "name": foundChannel.name,
      "subscribers": foundChannel.subscribers,
      "pfp": foundChannel.pfp,
      "videos": foundVideos
    })
  }
})

app.post("/login",async (req,res) => {
  const { email , password } = req.body
  if(email && password){
    const foundUser = await users.findOne({
      email: email
    })

    if(foundUser){
      if(verifyUser(password,foundUser.passwordSalt,foundUser.password)){
        console.log("Password Matched")
      }
    }
    else{
      console.log("User not found")
    }
  }
})

function getRandomSubset(array, count) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

app.listen(5001);