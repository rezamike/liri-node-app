var fs = require("fs");
var request = require("request")
require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var moment = require("moment");

var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var input = process.argv.splice(3).join(" ");

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

    spotify.search({ type: "track", query: input, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song: " + data.tracks.items[0].name);
      console.log("Preview: " + data.tracks.items[0].preview_url);
      console.log("Album: " + data.tracks.items[0].album.name);
        
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

    request("http://www.omdbapi.com/?apikey=trilogy&s=" + input, function (error, response, event) {

        var conInfo = JSON.parse(event);

        if (!error && response.statusCode === 200) {
            console.log((conInfo[0].lineup).toString().replace(",", ", "))
            console.log("Venue Name: " + conInfo[0].venue.name);
            console.log("Venue Location: " + conInfo[0].venue.city);
            console.log("Concert Date: " + moment(conInfo[0].datetime).format("MM/DD/YYYY"));
        };

    });
    
    break;
    case "do-what-it-says" :
    
    break;
}