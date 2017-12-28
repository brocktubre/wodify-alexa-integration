// imports from npm
const Rp = require('request-promise');
const Cheerio = require('cheerio');
const Speech = require('ssml-builder');
const Alexa = require('alexa-sdk');

const PAUSE_500ms = '500ms';

var Wod = require('./Wod');
var json = require('./data.json');
//var json = require('./error.json');
var speech = new Speech();

var wod = new Wod();
wod.map(json);

buildTodaysProgramming();
console.log(speech);

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
    var hasComponenets = wod.getComponents().length > 0;
    var hasAnnoncements = wod.getAnnoucements().length > 0;

    if(!hasComponenets){
        speech.say('There is nothing programmed today.');
        speech.pause(PAUSE_500ms);
    } else{
        speech.say('Here is what is programmed today. ');
        speech.pause(PAUSE_500ms);
    }
    
    // builds the parts of todays programming
    wod.getComponents().forEach(function(comp, i){
        speech.say(comp.getDescription());
        speech.pause(PAUSE_500ms);
    });

    if(hasAnnoncements){
        speech.say('Here are today\'s annoncements: ');
        speech.pause(PAUSE_500ms);
         // builds the parts of todays programming
        wod.getAnnoucements().forEach(function(annoncement, i){
            speech.say(annoncement.getMessage());
            speech.pause(PAUSE_500ms);
        });
    }
    else{
        speech.say('There are no annoncements today.');
        speech.pause(PAUSE_500ms);
    }
    






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