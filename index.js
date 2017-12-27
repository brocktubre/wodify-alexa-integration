// imports from npm
const Rp = require('request-promise');
const Cheerio = require('cheerio');
const Speech = require('ssml-builder');
const Alexa = require('alexa-sdk');

// constants
const PAUSE_500ms = '500ms';

// skill specific declarations
var workoutUri = 'http://comptrain.co/individuals/workout/tuesday-%C2%B7-12-19-17/';
var cardImageLarge = 'https://static1.squarespace.com/static/56e7adf32eeb81dea46a2b24/t/576a929920099e6256e793b6/1505491657529/?format=1500w';
var cardImageSmall = 'https://pikdo.com/img/comptrain.co.jpg?aHR0cHM6Ly9zY29udGVudC5jZG5pbnN0YWdyYW0uY29tL3Q1MS4yODg1LTE5L3MzMjB4MzIwLzE2NTg1MDA3XzE4MTc2MTMwMzUxNTQ2MDNfNjk1MDA1MjE2MDY4MzkwMDkyOF9hLmpwZw==';
var speech = new Speech();

/**
 * Data containing scraped wod
 */
const options = {
    uri: workoutUri,
    gzip: true,
    transform: function (body) {
        return Cheerio.load(body);
    }
};

var WOD = Rp(options)
    .then(($) => {
        var data = buildRegionalsProgramming($);
        return data;
    })
    .catch((err) => {
        return err;
    });

function buildRegionalsProgramming($){
    var deloadWeek = false;
    var restDay = false;
    var numberOfParts = $('.wpb_column.vc_column_container.vc_col-sm-6').first().find('p').length;
    var firstPart = $('.wpb_column.vc_column_container.vc_col-sm-6 p').first().text();
    var secondPart = $('.wpb_column.vc_column_container.vc_col-sm-6 p').first().next().text();

    switch(numberOfParts){
        case 0:
            speech.say('Doesn\'t look like anything is programmed today.');
            speech.pause(PAUSE_500ms);
            return speech;
        case 1:
            if(firstPart === 'Rest'){
                restDay = true;
                numberOfParts--;
                speech.say('Today is a rest day. Enjoy your day off.');
                speech.pause(PAUSE_500ms);
                return speech;
            }
        case 2: 
            if(firstPart === 'Deload Week'){
                speech.say('This week is a deload week.');
                speech.pause(PAUSE_500ms);
                deloadWeek = true;
                numberOfParts--;
            }
            if(secondPart === 'Rest'){
                speech.say('Today is a rest day. Enjoy your day off.');
                speech.pause(PAUSE_500ms);
                restDay = true;
                numberOfParts--;
            }
            break;
        default:
            if(firstPart === 'Deload Week'){
                speech.say('This week is a deload week.');
                speech.pause(PAUSE_500ms);
                deloadWeek = true;
                numberOfParts--;
            }
            break;
    }

    if(numberOfParts === 0){
        return speech;
    }

    speech.say('Here is what\'s programmed today for regional athletes:');
    speech.pause(PAUSE_500ms);

    var regionalData = $('.wpb_column.vc_column_container.vc_col-sm-6').first().find('p').each(function(i, elm) {
        if($(this).text() !== 'Rest' && $(this).text() !== 'Deload Week'){
            var data = $(this).text();
            data = cleanUpData(data);
            speech.say(data);
            speech.pause(PAUSE_500ms);
        }
    });

    return speech;
}

function cleanUpData(data){
    data = data.replace(/@/g, 'at');
    data = data.replace(/′/g, ' foot');
    data = data.replace(/Minute x/g, 'Minute for');

    var regEx = /[\w\s]+[0-9]*[0-9]:[0-9][0-9]/;
    var match = regEx.exec(data);
    if(match !== null){
        match.forEach(function(val, i) {
            var result = val.substring(val.lastIndexOf(' ') + 1);
            data = data.replace(result, '**'+ result + '**');
        });
    }

    return data;
}

function cleanUpDataForCard(data){
    data = data.replace(/<break time='500ms'\/>/g, '\n');
    data = data.replace(/<speak>/g, '');
    data = data.replace(/<\/speak>/g, '');
    return data;
}

const handlers = {
    'GetNewWodIntent' : function() {
        WOD.then((wodResponse) => {
            const cardTitle = 'Today\'s Workout';
            const cardContent = cleanUpDataForCard(wodResponse.ssml(false));
            const imageObj = {
                smallImageUrl: cardImageSmall,
                largeImageUrl: cardImageLarge
            };
            const speechOutput = wodResponse.ssml(true);
            // this.emit(':tell', speechOutput);
            this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
        });
    }
};

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

WOD.then((wodResponse) => {
    // Create speech output
    // var speechOutput = cleanUpDataForCard(wodResponse.ssml(false));
    var speechOutput = wodResponse;
    console.log(speechOutput);
});