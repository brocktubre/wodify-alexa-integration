// imports from npm
const Rp = require('request-promise');
const Cheerio = require('cheerio');
const Speech = require('ssml-builder');
const Alexa = require('alexa-sdk');

// models created
var Wod = require('./Wod');
var WodIntent = require('./WodIntent');
var Announcement = require('./Announcement');
var AnnouncementsIntent = require('./AnnouncementsIntent');
var BestCoachIntent = require('./BestCoachIntent');

// stub data from response
json = require('./data.json');
// var json = require('./error.json');

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
    'GetBestCoachIntent' : function() {
        var bestCoachIntent = new BestCoachIntent();
        var response = bestCoachIntent.getSpeech();
        const cardTitle = bestCoachIntent.getCardTitle();
        const cardContent = bestCoachIntent.getCardContent(response.ssml(false));
        const imageObj = bestCoachIntent.getImageObj();
        const speechOutput = response.ssml(true);
        //this.emit(':tell', speechOutput);
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    'GetAnnouncementsIntent' : function() {
        var announcementsIntent = new AnnouncementsIntent();
        var announcement = new Announcement();
        var wod = new Wod();
        var announcementResponse = announcement.buildTodaysAnnouncements(wod, json); // returns a speech
        const cardTitle = announcementsIntent.getCardTitle();
        const cardContent = announcementsIntent.getCardContent(announcementResponse.ssml(false));
        const imageObj = announcementsIntent.getImageObj();
        const speechOutput = announcementResponse.ssml(true);
        //this.emit(':tell', speechOutput);
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    'GetNewWodIntent' : function() {
        var wod = new Wod();
        var wodResponse = wod.buildTodaysProgramming(wod, json); // returns a speech

        var wodIntent = new WodIntent();
        
        const cardTitle = wodIntent.getCardTitle();
        const cardContent = wodIntent.getCardContent(wodResponse.ssml(false));
        const imageObj = wodIntent.getImageObj();
        const speechOutput = wodResponse.ssml(true);
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj); 
    }
};

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};