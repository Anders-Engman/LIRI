var request = require('request');
var spotify = require('spotify');
var fs = require('fs');
var keys = require('./keys.js');
var dnv = require("dotenv").config();
var nodeArgv = process.argv;
var userInput = process.argv[2];

var x = "";

// userInput determination
if (userInput === "spotify-this-song") {
    spotify();
} else if (userInput === "concert-this") {
    concertThis();
} else if (userInput === "movie-this") {
    omdbData();
} else if (userInput === "do-what-it-says") {
    doWhatItSays();
} else {
    console.log("Command not Recognized");
}

function spotify(song){
  spotify.search({ type: 'track', query: song}, function(error, data){
    if(!error){
      for(var i = 0; i < data.tracks.items.length; i++){
        var songInfo = data.tracks.items[i];

        console.log("Artist: " + songInfo.artists[0].name);
        console.log("Song: " + songInfo.name);
        console.log("Album: " + songInfo.album.name);
        console.log("-----------------------");
        
        //adds text to log.txt
        fs.appendFile('log.txt', songInfo.artists[0].name);
        fs.appendFile('log.txt', songInfo.name);
        fs.appendFile('log.txt', songInfo.preview_url);
        fs.appendFile('log.txt', songInfo.album.name);
        fs.appendFile('log.txt', "-----------------------");
      }
    } else{
      console.log('Error occurred.');
    }
  });
}

function concertThis(){
// COMPLETE THIS FUNCTION !!!!!!!!!!!!!!!!!!!
}

function omdbData(movie){
  var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short';

  request(omdbURL, function (error, response, body){
    if(!error && response.statusCode === 200){
      var body = JSON.parse(body);

      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);

      fs.appendFile('log.txt', "Title: " + body.Title);
      fs.appendFile('log.txt', "Release Year: " + body.Year);
      fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
      fs.appendFile('log.txt', "Plot: " + body.Plot);
      fs.appendFile('log.txt', "Actors: " + body.Actors);

    } else{
      console.log('Error occurred.')
    }
  });

}

function doWhatItSays() {
	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			logOutput.error(err);
		} else {
			var randomArray = data.split(",");

			action = randomArray[0];

			argument = randomArray[1];

			doSomething(action, argument);
		}
	});
}