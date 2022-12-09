var express = require('express');
var fs  = require('fs');
const fileMiddleware = require('express-multipart-file-parser')


var app = express();
var cors = require('cors')

app.use(cors())
app.use(fileMiddleware)

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', function (req, res, next) {

    var docName = req.files[0].originalname
    var newPath = __dirname + "/uploads/" + docName;

    fs.createWriteStream(newPath).write(req.files[0].buffer)
    res.send({ url: "download/" + docName});
   
})

app.get("/download/:id", function (req, res) {
  
    // The res.download() talking file path to be downloaded
    res.download(__dirname + "/uploads/"+req.params.id, function (err) {
      if (err) {
        console.log(err);
      }
    });
});

app.listen(5000);