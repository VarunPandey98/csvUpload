var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
require('dotenv/config');
var path = require('path');
const { extname } = require('path');
var cors = require('cors');
var upload = require('express-fileupload');
const csvfilepath = "./loadedfile/simple.csv";
var csvModel = require('./model/csvv');
var filesModel = require('./model/files');
var csvtojson = require('csvtojson');
//var multer = require('multer')


var app = express();
const router = express.Router();

//middleware
app.use(upload());
app.use(bodyParser.json());

// const csvFilter = (req, file, cb) => {
//   if (file.mimetype.includes("csv")) {
//     cb(null, true);
//   } else {
//     cb("Please upload only csv file.", false);
//   }
// };



app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

const postsRoute = require('./routes/routings');

//app.use('/', postsRoute);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/uploadfile', (req, res) => {
    if (req.files) {
        console.log('req.file')
        var file = req.files.file
        var filename = file.name
        var extension = extname(filename);

        if ((extension == '.CSV') || (extension == '.csv')) {
            var filePath = './loadedfile/' + filename;
            file.mv(filePath, (err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send("file uploaded");

                    csvtojson().fromFile(filePath).then((json) => {
                        const fileName = new filesModel({
                            name:filename,
                        });
                        try {
                            fileName.save(function (err) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("File Name Saved", fileName);
                                    json.forEach(element => {
                                        const post = new csvModel({
                                            name: element.name,
                                            age: element.age,
                                            subject: element.subject
                                        });
                                        try {
                                            post.save(function (err) {
                                            });
                                        } catch (err) {
                                            return json({ "message": err });
                                        }
                                    });
                                }
                            });
                        } catch (err) {
                            return json({ "message": err });
                        }
                    })
                }
            })
        } else {
            console.log("Please Upload CSV File Only");
        }


    }
})

app.get('/filelist', async (req, res) => {
    try {
        const posts = await filesModel.find();
        console.log(posts);
        res.json(posts);
    } catch (error) {
        res.json({ "message": error })
    }
})

mongoose.connect(process.env.DB_CONNECTION2, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw console.log(err);
    console.log("Yes Database connected");
});

const port = 7000;

app.listen(port, () => {
    console.log(`server run on ${port}`);
})
