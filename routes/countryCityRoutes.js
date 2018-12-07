const jsonfile = require('jsonfile')
const express = require("express");
const bodyParser = require("body-parser");
const file_path = "./DB/teste.json";
const cors = require("cors")

module.exports = app => {
    app.use(cors());
    app.get("/country", (req, res) => {

        console.log("fetching all countrys");


        jsonfile.readFile(file_path, function(err, content) {
            let _id = req.body._id
            let countryId = content[content.length - 1]._id;
            console.log("find last element id " + countryId)
            console.log(content)
            res.send(content);
        });
    });
    app.post("/country", (req, res) => {

        let _id = req.body._id
        let country = req.body.country
        let capital = req.body.capital

        jsonfile.readFile(file_path, function(err, content) {

            let countryId = content[content.length - 1]._id;
            console.log("find last element id " + countryId)
            countryId += 1;

            content.push({ _id: countryId, country: country, capital: capital });

            jsonfile.writeFile(file_path, content, function(err) {});

            res.sendStatus(200);
        });

    });
    app.delete("/country", (req, res) => {

        let country = req.body.country;

        jsonfile.readFile(file_path, function(err, content) {

            for (var i = content.length - 1; i >= 0; i--) {

                if (content[i].country === country) {
                    console.log("removing " + content[i].country + "from DB");
                    content.pop(i);
                }

            }

            jsonfile.writeFile(file_path, content, function(err) {
                console.log(err);
            });

            res.sendStatus(200);
        });
    });
    app.put("/country", (req, res) => {
        let countrys;
        let capital = req.body.capital;
        let country = req.query.country;

        jsonfile.readFile(file_path, function(err, content) {
            for (var i = content.length - 1; i >= 0; i--) {
                if (content[i].country === req.query.country) {

                    console.log("update capital  " + req.query.country + " has now capital : " + capital);

                    countrys = content[i];
                    countrys.capital = capital;

                }
            }

            jsonfile.writeFile(file_path, content, function(err) {
                console.log(err);
                //res.sendStatus(200);
            });

        });
        res.send(countrys);
    });


};