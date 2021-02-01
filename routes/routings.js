var mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
var csvtojson = require('csvtojson');
const csvfilepath = "./loadedfile/simple.csv";
var csvModel = require('../model/csvv');
var app = express();
 
router.get('/api', async (req, res) => {
    try {
        const posts = await csvv.find();
        res.json(posts);
    } catch (error) {
        res.json({ "message": error })
    }
})

router.get('/readcsvapi', async (req, res) => {
    csvtojson().fromFile(csvfilepath).then((json) => {
        console.log("hello2")
        json.forEach(element => {
            const post = new csvModel({
                name: element.name,
                age: element.age,
                subject: element.subject
            });
            try {

                post.save(function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("harshit",element)
                    }
                });
                // const savedPost = post.save();
                // json(savedPost);
            } catch (err) {
                return json({ "message": err });
            }
        });

    })
})




module.exports=router;
