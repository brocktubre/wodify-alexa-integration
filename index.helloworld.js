const Alexa = require('alexa-sdk');
var Speech = require('ssml-builder');

var speech = new Speech();

const handlers = {
    'TestIntent' : function() {
        //emit response directly
        speech.say('Hello World!');
        var speechOutput = speech.ssml(true);
        this.emit(':tell', speechOutput);
    }
};

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};