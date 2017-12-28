// imports from npm
const Rp = require('request-promise');
const Cheerio = require('cheerio');
const Speech = require('ssml-builder');
const Alexa = require('alexa-sdk');

var Wod = require('./Wod');
var json = require('./data.json');
var speech = new Speech();

var wod = new Wod();
wod.map(json);

console.log(wod.getComponents());

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
//console.log(json);