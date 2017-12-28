// imports from npm
const Rp = require('request-promise');
const Cheerio = require('cheerio');
const Speech = require('ssml-builder');
const Alexa = require('alexa-sdk');

const PAUSE_500ms = '500ms';

var Wod = require('./Wod');
var WodIntent = require('./WodIntent');

var json = require('./data.json');
//var json = require('./error.json');
var speech = new Speech();
var wod = new Wod();

buildTodaysProgramming();

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
    
    try {
        let response = wod.map(json);

        if(response !== true){
            // some error occured
            // we got an error response from Wodify
            throw response;
        }

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
                speech.paragraph(annoncement.getMessage());
            });
        }
        else{
            speech.say('There are no annoncements today.');
            speech.pause(PAUSE_500ms);
        }
    }catch(error){
        speech.say('Looks like there was an error retrieving today\'s programming.');
    }
    
}

function cleanUpData(data){

}

const handlers = {
    'GetNewWodIntent' : function() {
        // WOD.then((wodResponse) => {
            var wodIntent = new WodIntent()
            var wodResponse = speech;
            const cardTitle = wodIntent.getCardTitle();
            const cardContent = wodIntent.getCardContent();
            const imageObj = wodIntent.getImageObj();
            const speechOutput = wodResponse.ssml(true);
            console.log(speechOutput);
            this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
        // });
    },
    'GetBestCoachIntent' : function() {
            var newSpeech = new Speech();

            // var COACHES = [
            //     "Johnnie",
            //     "Wells",
            //     "Davie",
            //     "Jess"
            // ];

            // var coachIndex = Math.floor(Math.random() * COACHES.length);
            // var randomCoach = COACHES[coachIndex];

            // var RESPONSES = [];

            // RESPONSES[0] = speech.prosody({pitch: 'high', volume: 'loud'}, 'Oh ');
            // RESPONSES[0] += speech.say(' that\'s easy. It\'s ' + randomCoach + ' of course.');
    
            // RESPONSES[1] = speech.emphasis('strong', 'Hmmm ');
            // RESPONSES[1] += speech.say('let me think. ');
            // RESPONSES[1] += speech.pause('500ms');
            // RESPONSES[1] += speech.say('I choose ' + randomCoach + '.');

            // var responseIndex = Math.floor(Math.random() * RESPONSES.length);
            // var randomResponse = RESPONSES[responseIndex];
            newSpeech.say('Brock Brock');
            var response = newSpeech;
            // const cardTitle = 'Red River\'s Best Coach';
            // const cardContent = cleanUpDataForCard(response.ssml(false));
            // const imageObj = {
            //     smallImageUrl: cardImageSmall,
            //     largeImageUrl: cardImageLarge
            // };
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