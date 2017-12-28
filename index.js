// imports from npm
const Rp = require('request-promise');
const Cheerio = require('cheerio');
const Speech = require('ssml-builder');
const Alexa = require('alexa-sdk');

const PAUSE_500ms = '500ms';

var cardImageLarge = 'http://www.redrivercrossfit.com/wp-content/uploads/2015/04/newlogo3.jpg';
var cardImageSmall = 'https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/12814639_966607666721083_1936476695944539950_n.jpg?oh=7b82dd675d7aaaccc1f28130d95439b1&oe=5ABF9E75';
var Wod = require('./Wod');
var json = require('./data.json');
//var json = require('./error.json');
var speech = new Speech();

var wod = new Wod();
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
    
    try {
        wod.map(json);
    }catch(error){
        speech.say('Looks like there was an error retrieving today\'s programming.');
        return;
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
    data = data.replace(/<break time='500ms'\/>/g, '\n');
    data = data.replace(/<speak>/g, '');
    data = data.replace(/<\/speak>/g, '');
    return data;
}

const handlers = {
    'GetNewWodIntent' : function() {
        // WOD.then((wodResponse) => {
            var wodResponse = speech;
            const cardTitle = 'Today\'s Workout';
            const cardContent = cleanUpDataForCard(wodResponse.ssml(false));
            const imageObj = {
                smallImageUrl: cardImageSmall,
                largeImageUrl: cardImageLarge
            };
            const speechOutput = wodResponse.ssml(true);
            this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
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