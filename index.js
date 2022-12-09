var express = require('express');
var fs  = require('fs');
const Multer = require('multer')
const FirebaseStorage = require('multer-firebase-storage')
const fileMiddleware = require('express-multipart-file-parser')
const {Storage} = require('@google-cloud/storage');
const stream = require('stream');
require('dotenv').config()
const config = require(process.env.CONFIG_PATH)

var app = express();
var cors = require('cors')
const bucketName = 'ellodms.appspot.com'

console.log("CONFIG : ", config)

const multer = Multer({
  storage: FirebaseStorage({
    bucketName,
    credentials: {
      clientEmail: config.client_email,
      privateKey: config.private_key.replace(/\\n/g, '\n'),
      projectId: config.project_id
    }
  })
})

const storage = new Storage({
  projectId: config.project_id,
  keyFilename: process.env.CONFIG_PATH
});

app.use(cors())
// app.use(fileMiddleware)

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', multer.single('files'), (req, res) => {
  res.status(201).json({ url: "download/" + req.file.originalname })
})

app.get("/download/:id", async(req, res) => {

  const fileName = req.params.id
  await storage.bucket(bucketName).file(fileName).download({}).then(buffer => {
    var readStream = new stream.PassThrough();
    readStream.end(buffer[0]);
    readStream.pipe(res);
  })
  .catch(err => {
    res.send("File not found")
  })

});

app.listen(5000);