var Speech = require('ssml-builder');
var Alexa = require('alexa-sdk');
var wod_model_1 = require('./src/model/wod.model');
// constants
var PAUSE_500ms = '500ms';
var json = require('./data.json');
var speech = new Speech();
var wod = new wod_model_1.Wod();
console.log(this.wod.map(json));
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
function buildTodaysProgramming() {
}
function cleanUpData(data) {
}
function cleanUpDataForCard(data) {
}
var handlers = {
    'GetNewWodIntent': function () {
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
exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
// WOD.then((wodResponse) => {
//     // Create speech output
//     // var speechOutput = cleanUpDataForCard(wodResponse.ssml(false));
//     var speechOutput = wodResponse;
//     console.log(speechOutput);
// });
this.buildTodaysProgramming(json);
// console.log(json); 
