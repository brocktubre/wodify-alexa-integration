// imports from npm
const Rp = require('request-promise');
const Cheerio = require('cheerio');
const Speech = require('ssml-builder');
const Alexa = require('alexa-sdk');


// constants
const PAUSE_500ms = '500ms';

// skill specific declarations
// var workoutUri = 'http://comptrain.co/individuals/workout/tuesday-%C2%B7-12-19-17/';
// var cardImageLarge = 'https://static1.squarespace.com/static/56e7adf32eeb81dea46a2b24/t/576a929920099e6256e793b6/1505491657529/?format=1500w';
// var cardImageSmall = 'https://pikdo.com/img/comptrain.co.jpg?aHR0cHM6Ly9zY29udGVudC5jZG5pbnN0YWdyYW0uY29tL3Q1MS4yODg1LTE5L3MzMjB4MzIwLzE2NTg1MDA3XzE4MTc2MTMwMzUxNTQ2MDNfNjk1MDA1MjE2MDY4MzkwMDkyOF9hLmpwZw==';
var json = JSON.parse(require('./data.json'));
var speech = new Speech();

/**
 * Data containing scraped wod
 */
// const options = {
//     uri: workoutUri,
//     transform: function (body) {
//         console.log(body);
//         return Cheerio.load(body);
//     }
// };

// var WOD = Rp(options)
//     .then(($) => {
//         var data = buildTodaysProgramming($);
//         return data;
//     })
//     .catch((err) => {
//         return err;
//     });

function buildTodaysProgramming(){

}

function cleanUpData(data){

}

function cleanUpDataForCard(data){

}

const handlers = {
    'GetNewWodIntent' : function() {
        // WOD.then((wodResponse) => {
        //     const cardTitle = 'Today\'s Workout';
        //     const cardContent = cleanUpDataForCard(wodResponse.ssml(false));
        //     const imageObj = {
        //         smallImageUrl: cardImageSmall,
        //         largeImageUrl: cardImageLarge
        //     };
        //     const speechOutput = wodResponse.ssml(true);
        //     // this.emit(':tell', speechOutput);
        //     this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
        // });
    }
};

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

// WOD.then((wodResponse) => {
//     // Create speech output
//     // var speechOutput = cleanUpDataForCard(wodResponse.ssml(false));
//     var speechOutput = wodResponse;
//     console.log(speechOutput);
// });

buildTodaysProgramming(json);
console.log(json);