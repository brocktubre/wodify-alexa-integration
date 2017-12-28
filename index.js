// imports from npm
const Rp = require('request-promise');
const Cheerio = require('cheerio');
const Speech = require('ssml-builder');
const Alexa = require('alexa-sdk');

// models created
var Wod = require('./Wod');
var WodIntent = require('./WodIntent');
var BestCoachIntent = require('./BestCoachIntent');

// stub data from response
//var json = require('./data.json');
var json = require('./error.json');

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

const handlers = {
    'GetNewWodIntent' : function() {
        // WOD.then((wodResponse) => {
        // });
        var wod = new Wod();
        var wodResponse = wod.buildTodaysProgramming(wod, json); // returns a speech

        var wodIntent = new WodIntent();
        
        const cardTitle = wodIntent.getCardTitle();
        const cardContent = wodIntent.getCardContent(wodResponse.ssml(false));
        const imageObj = wodIntent.getImageObj();
        const speechOutput = wodResponse.ssml(true);
        console.log(speechOutput);
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
        
    },
    'GetBestCoachIntent' : function() {
        var bestCoachIntent = new BestCoachIntent();
        var response = bestCoachIntent.getSpeech();
        const cardTitle = bestCoachIntent.getCardTitle();
        const cardContent = bestCoachIntent.getCardContent(response.ssml(false));
        const imageObj = bestCoachIntent.getImageObj();
        const speechOutput = response.ssml(true);
        this.emit(':tell', speechOutput);
        //this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    }
};

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var bestCoachIntent = new BestCoachIntent();
var response = bestCoachIntent.getSpeech();
const cardTitle = bestCoachIntent.getCardTitle();
const cardContent = bestCoachIntent.getCardContent(response.ssml(false));
const imageObj = bestCoachIntent.getImageObj();
const speechOutput = response.ssml(true);
console.log(speechOutput);