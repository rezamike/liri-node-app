var fs = require("fs");
var request = require("request")
require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var moment = require("moment");
var inquirer = require("inquirer");
var round = 0;

var spotify = new Spotify(keys.spotify);

// var input = process.argv.splice(3).join(" ");

function liri() {
inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to look up?",
            choices: ["Concert Information", "Song Information", "Movie Information", "Random", "Creator"],
            name: "main"
        }
    ])
    .then(function (response) {
        var command = response.main;

        switch (command) {
            case "Concert Information":

                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Please type your Artist for the search: ",
                            name: "concert"
                        }
                    ])
                    .then(function (response) {
                        var concertInput = response.concert;

                        if (concertInput === "") {
                            request("https://rest.bandsintown.com/artists/the%20eagles/events?app_id=codingbootcamp", function (error, response, event) {

                                var condefInfo = JSON.parse(event);

                                if (!error && response.statusCode === 200) {
                                    console.log((condefInfo[0].lineup).toString().replace(",", ", "))
                                    console.log("Venue Name: " + condefInfo[0].venue.name);
                                    console.log("Venue Location: " + condefInfo[0].venue.city);
                                    console.log("Concert Date: " + moment(condefInfo[0].datetime).format("MM/DD/YYYY"));
                                };
                            });
                        }

                        else {
                            request("https://rest.bandsintown.com/artists/" + concertInput + "/events?app_id=codingbootcamp", function (error, response, event) {

                                var conInfo = JSON.parse(event);

                                if (!error && response.statusCode === 200) {
                                    console.log((conInfo[0].lineup).toString().replace(",", ", "))
                                    console.log("Venue Name: " + conInfo[0].venue.name);
                                    console.log("Venue Location: " + conInfo[0].venue.city);
                                    console.log("Concert Date: " + moment(conInfo[0].datetime).format("MM/DD/YYYY"));
                                };
                            });
                        }
                    })

                break;
            case "Song Information":

                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Please type your Song for the search: ",
                            name: "song"
                        }
                    ])
                    .then(function (response) {
                        var songInput = response.song;

                        if (songInput === "") {
                            spotify.search({ type: "track", query: "the sign ace of base", limit: 1 }, function (err, data) {
                                if (err) {
                                    return console.log('Error occurred: ' + err);
                                }

                                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                                console.log("Song: " + data.tracks.items[0].name);

                                if (data.tracks.items[0].preview_url === null) {
                                    console.log("Preview: (Preview not available)")
                                }
                                else {
                                    console.log("Preview: " + data.tracks.items[0].preview_url);
                                }
                                console.log("Album: " + data.tracks.items[0].album.name);
                            });
                        }
                        else {
                            spotify.search({ type: "track", query: songInput, limit: 1 }, function (err, data) {
                                if (err) {
                                    return console.log('Error occurred: ' + err);
                                }

                                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                                console.log("Song: " + data.tracks.items[0].name);

                                if (data.tracks.items[0].preview_url === null) {
                                    console.log("Preview: (Preview not available)")
                                }
                                else {
                                    console.log("Preview: " + data.tracks.items[0].preview_url);
                                }
                                console.log("Album: " + data.tracks.items[0].album.name);
                            });
                        }
                    })

                break;
            case "Movie Information":

                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Please type your Movie for the search: ",
                            name: "movie",
                        }
                    ])
                    .then(function (response) {
                        var movieInput = response.movie;

                        if (movieInput === "") {
                            request("http://www.omdbapi.com/?apikey=trilogy&t=mr%20nobody", function (error, response, event) {

                                var defaultInfo = JSON.parse(event);

                                if (!error && response.statusCode === 200) {
                                    console.log("Title: " + defaultInfo.Title);
                                    console.log("Year: " + defaultInfo.Year);
                                    console.log("IMBD Rating: " + defaultInfo.imdbRating);
                                    console.log("Rotten Tomatoes Rating: " + defaultInfo.Ratings[1].Value);
                                    console.log("Country: " + defaultInfo.Country);
                                    console.log("Language: " + defaultInfo.Language);
                                    console.log("Plot: " + defaultInfo.Plot);
                                    console.log("Actors: " + defaultInfo.Actors);
                                };

                            });
                        }

                        else {
                            request("http://www.omdbapi.com/?apikey=trilogy&t=" + movieInput, function (error, response, event) {

                                var movieInfo = JSON.parse(event);

                                if (!error && response.statusCode === 200) {
                                    console.log("Title: " + movieInfo.Title)
                                    console.log("Year: " + movieInfo.Year);
                                    console.log("IMBD Rating: " + movieInfo.imdbRating);
                                    console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
                                    console.log("Country: " + movieInfo.Country);
                                    console.log("Language: " + movieInfo.Language);
                                    console.log("Plot: " + movieInfo.Plot);
                                    console.log("Actors: " + movieInfo.Actors);
                                }
                            })
                        }
                    })

                break;
            case "Random":

                fs.readFile("random.txt", "utf8", function (error, data) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        var breakA = data.split(",");
                        for (let i = 1; i < breakA.length; i++) {
                            var searchTerm = breakA[i];

                            spotify.search({ type: "track", query: searchTerm, limit: 1 }, function (err, data) {
                                if (err) {
                                    return console.log('Error occurred: ' + err);
                                }

                                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                                console.log("Song: " + data.tracks.items[0].name);
                                console.log("Album: " + data.tracks.items[0].album.name);
                            });
                        }
                    }
                });

                break;
            case "Creator":

                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@((%@%&******************************///////////////////(((");
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@((@@%&*******************************/////////////////((((");
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@(#@@%&********************************///*//////////////((");
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@&&&&@@@@@@@@@@@@@@@@@@@@&&&&%%%&@@@@@(%@@%%**********************************/*//////////////((");
                console.log("@@@@@@@&@&@@@@@@@@@@@@@@&%&&@@@@@@@@@@@@@@@@%%%%%&&@&&&&&&&&&(@@@%%,********************************/*/*/////////////(/");
                console.log("@@@@&&&&&&&&&&&&&&@@@@@@&%%&@@@@@@@@@@@@@&%&&&&&@@@&@@&&&&&@&%&&%**,**********************************///////////////");
                console.log("@@@&%####%%%%&&&&&&&&&&&&%%&&@@@@@@@@@@@&&&&&&&&&&&&@@@@@@&@@@&&&%#,,,********************************/*///////////////");
                console.log("&&&%#(((((%%%%%%%%%%%%&&%%%%&@@@@@@@@@@&@@&@&&&&&@@&&&&@@@@@@@@&&@@#,,,**********************************//////////////");
                console.log("%%%%%(((((#########%%%&&%%%%&@@@@@@@@@&&@@&&&&&%&&&&&&%&&@@&@@&&@@@@*,,***********************************/////////////");
                console.log("#%%%%%############%%%%&&%%%&@@@@@@@@&&@&&&&@&&&&&&&&@@@@@&@@&&&&&@@@/,,,,***********************************///////////");
                console.log("####%%%%####%%%%%%%%%&&&%###%%&&&&&&%@@&@@@@@@@@&&&@@@@@@@@&@@@@@@@@@*,,,,*********************************//*/////////");
                console.log("%%%%%%%%%%%%%%%%%%&&&&&&%######%%%%%&@@@@@&@@&&%%%%%&&%%%%&&@@@@@@@@#,,,,,,*,***,****************************//////////");
                console.log("%%%%%%&&&&&&&&&&&&&&&&&####%%%%%%%@@@%((####((//////////(#&@@@@@@@(,,,,*****,*******************************/////////");
                console.log("&&&&&&&&&&&&&&&&&&&&&@&%#####%%%%%%%@@@(////**************/(#&@@@@@@(,***************************************//*///////");
                console.log("&&&&&&&&&&&&&&&&&&&&@@&%####%&&&&&(*@@%(//***,,,,,**********(%@@@@@@(*****************************************/*///////");
                console.log("&&&&&&&&&&&&&&&&&%#((#%%###%%&&&&(,,/@((///*,,,,,,,,,,,***///(&@@@@(*********************************************//////");
                console.log("%%#(//((#%%%%%&%/,...,/%&%%&&@@@@/   @/(%&@@**,,**(##%%%#((/(&@@##**********************************************/////");
                console.log("%*.     .*#&&&&&(***(#%#%%&&&&&*  *&//#&%%&%%(//#%%%#(((#((//&@@@***********************************************/*///");
                console.log("%/,,,,,,,*(%&&%%*,   .,(#####(((((//(%/**/(##(((**/###@@&(///&@@%*************************************************///");
                console.log("%*.       ,(####(/////*..,.       .. .//******//,**/*/////**//#@&@&**************************************************//");
                console.log("%(,....,,*/((####(,.           .      &/***,,//*,**/******///(@%#@************///***********************************//*");
                console.log(",,,..,*//((((/.               ..      %%/****/*,,**//****//(#&*#************//**************************************/");
                console.log("///*********   .    .         .    .  (@%****/#//(##****//(%@@*,,/***********/*//**************************************");
                console.log("***********                   ..      .@@#&@@@@@@@@&%##//#@@@...*..  .,*****////***************************************");
                console.log("**********              ..    ..   .   %%@%%(#####%%&@@&%@@#....(.  . ..**/*////***************************************");
                console.log("*********                .    .    .   .@&%(#(((####&@@%.,...(... ...   */////***************************************");
                console.log("********                 ..  ..    .    /&@&&@&&%&@@@(,...**,,...,..    .,////***************,,**********************");
                console.log("*******                  ..  ..          (%%%%@@@@@@@/,.%@@@,.....,..   ,   ...****************************************");
                console.log("******,        .       . ..  ....      *,,,*(/*/#(**,,.,&@@(.........  .        ...************************************");
                console.log("******                 . ..  ....     .*,,.../*,,*,,,...,,..............            . ..*******************************");
                console.log("**//*/                .....  .. .     ........(*,*,,.,,,.......,.........          .  ..  .....*,**********************");
                console.log("*////.              .......  .. .      .......,,,,,,,,... ....,...................... .. ....  .... ..........*********");
                console.log("//(/,                ......  .           . .,,...,.,...  ....,..... ...................... ........,........,....******");
                console.log("((/*                  .,...               ............   ...,........,.,,.,,,,,.......... .........................,***");
                console.log("(//                    ....  .           ..    ......   . .,..........,,.,,,,,....,,,...,.......,,....   .. ........,**");
                console.log("//.                     ,,. ...               .  ... .....,..........,*.,,,,,...,,,,,,.......,(####(((((,. . ........,*");
                console.log("/*                     .,,......       . ..  ...... .....,..........,,.*,,,,..,,,,,,,,*((#####((((((/((((((,...........");
                console.log("#                      .*,....       ..  .  ......    ..,.........,*,*,,,.,,,,**(######(/(((/((((((((((######/.......,,");
                console.log(",                    ..*,,..       .,.  .   ....     ..,,........****,,,.,,/#(//******//*///(((((((##((((((((###*,,,**/");
                console.log("                     ./,,*.      ..,..       ..    ..,,,,......,****,,,,*/////***,*((##(((((((((##((((((####%%%&&&%/*/#");
                console.log("                    ./*,*,,,,,*/*,,,...... ...   ...,,,,,,...,/***///**//*****//**/(##(((##%%%#%%%%#%%%%%%&@@@&&&&&&%&&");
                console.log("                   .(/,****///**,,,,....   ..  ,...****.....//*/*///*/////////**//(&&&&&&&&@@@@@@@@@@@@@@@@&&&&&&&%%%%%");
                console.log("                   ,(/*///////**,,,.......,..,*.. ...,.,,*///*****/**///*/(////#%%&&&&&&&&&&&&&&&@&&@@@@@&&&&&&&&&&%%%%");
                console.log("                    ##((((((/**,,,.........,**,......,*(//*///*,*//*,*//**////#&&&&&&&&&&&&&&&&@@@@&&&&&&&&&&&&&&&&&&&&");
                console.log("                   (&%#((((//**.........,*//,,.....*/((//(((/**(/#(/**((/**///%&&&&&&&&&&&&&&&&@&&&&&&&&&&&&&&&&&&&&&&&");
                console.log("                  ,##((%((//////*,,,,,**//,...,,,,//////(#*,*((##%#//*(%///&&&&@@@@&@@@@@@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
                console.log("                  ////((*////*,,,******/*,,...,,**///*/(#(**(((/(%(//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
                console.log("                 //*,/*,,,***,*///////*,,,,..,,,*///((/((##(////#&&%(/*(&&&&&&&&&&&&&&&&&&&%&&&&&&&&&&&&&&&&&&&&&&&&&&&");
                console.log("               .***/*,,,***//(*******,,..,,..,**//((/(((##&%##%%%%%%%(//(%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&");
                console.log("*             .,.*(****//////,,,.,..,,,,,*/((((#(((((/((#%%%%%%%#%%####((#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                console.log(".              .,(////***,,,......,,,,,**//(((////**(((######################################%%%%%%%%%%%%%%%%%%%%%%%%%%");
                console.log("                ,*,,,,,,,,.......,,,,*/((/////****((((#####((((((((((((#############################################%%%");
                console.log("...          . .,**,,,,,,,,,,,,,,,*/////******//(((((((((((((((((((((((((((((((((((####################################");
                console.log(",.............,,,,,,,,*********///*******/////(((((((((((((((((((((((((((((((((((((((((((((((##########################");
                console.log("/**/*,,,,.,,,,,,************//******////////((((((((((((((((((((//(/((((((((((((((((((((((((((((#((####################");
                console.log("//////****************////**///////////////((((((((((((((((((((/(////((((((((((((((((((((((((##########################");
                console.log("(//////**************//////////////////(((((((((((((((((((((((((((((((((((((((((((((((############################%%%%%");
                console.log("(((//////////////////////////////////((((((((((((((((((((((((((((((((((((((((######################%%#%%%%%%%%%%%%%%%%%");
                console.log("((((((//////////////////////(((((((((((((((((((((((((#(#######((#(((#########################%%%%%%%%%%%%%%%%%%%%%%%%%&");

                request("http://artii.herokuapp.com/make?text=Michael Sanaiha&font=trek", function (error, response, body) {

                    if (!error && response.statusCode === 200) {

                        console.log(body);
                    }
                });

                break;
        }
        round++;

        if (round < 5) {
            liri();
        }
    });
}