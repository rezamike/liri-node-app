var fs = require("fs");
var request = require("request")
require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var moment = require("moment");

var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var input = process.argv[3];

switch (command) {
    case "concert-this" :

    request("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp", function (error, response, event) {

        var conInfo = JSON.parse(event);

        if (!error && response.statusCode === 200) {
            console.log((conInfo[0].lineup).toString().replace(",", ", "))
            console.log("Venue Name: " + conInfo[0].venue.name);
            console.log("Venue Location: " + conInfo[0].venue.city);
            console.log("Concert Date: " + moment(conInfo[0].datetime).format("MM/DD/YYYY"));
        };

    });


    break;
    case "spotify-this-song" :

    fs.appendFile("random.txt", input, function(err) {

        // If an error was experienced we will log it.
        if (err) {
          console.log(err);
        }
      
        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
          console.log("Content Added!");
        }
      
      });

    // request(Spotify, function (error, response, event) {

    //     var conInfo = JSON.parse(event);

    //     if (!error && response.statusCode === 200) {
    //         console.log((conInfo[0].lineup).toString().replace(",", ", "))
    //         console.log("Venue Name: " + conInfo[0].venue.name);
    //         console.log("Venue Location: " + conInfo[0].venue.city);
    //         console.log("Concert Date: " + moment(conInfo[0].datetime).format("MM/DD/YYYY"));
    //     };

    // });
    
    break;
    case "movie-this" :
    
    break;
    case "do-what-it-says" :
    
    break;
}