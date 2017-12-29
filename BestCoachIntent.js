'use strict';

const Speech = require('ssml-builder');

var cardImageLarge;
var cardImageSmall;
var cardTitle;

var COACHES = [
    "Johnnie",
    "Wells",
    "Davie",
    "Jess"
];
var RESPONSES = [];

function BestCoachIntent() {
    this.cardImageLarge = 'http://www.redrivercrossfit.com/wp-content/uploads/2015/04/newlogo3.jpg';
    this.cardImageSmall = this.cardImageLarge;
    this.cardTitle = 'Red River\'s Best Coach';
}

BestCoachIntent.prototype.getCardTitle = function(){
    return this.cardTitle;
}

BestCoachIntent.prototype.getCardContent = function(data){
    return cleanUpDataForCard(data);
}

BestCoachIntent.prototype.getImageObj = function(){
    const imageObj = {
        smallImageUrl: this.cardImageSmall,
        largeImageUrl: this.cardImageLarge
    };
    return imageObj;
}

BestCoachIntent.prototype.getSpeech = function(){
    
    var coachIndex = Math.floor(Math.random() * COACHES.length);
    var randomCoach = COACHES[coachIndex];

    var speech0 = new Speech();
    speech0.prosody({pitch: 'high', volume: 'loud'}, 'Oh');
    speech0.say('that\'s easy. It\'s ' + randomCoach + ' of course.');
    RESPONSES[0] = speech0;

    var speech1 = new Speech();
    speech1.emphasis('strong', 'Hmmm');
    speech1.say('let me think.');
    speech1.pause('500ms');
    speech1.say('I choose ' + randomCoach + '.');
    RESPONSES[1] = speech1;

    var speech2 = new Speech();
    speech2.say('Everyone knows it\'s coach ' + randomCoach + '.');
    RESPONSES[2] = speech2;

    var responseIndex = Math.floor(Math.random() * RESPONSES.length);
    var randomResponse = RESPONSES[responseIndex];
    
    return randomResponse;
}

function cleanUpDataForCard(data){
    data = data.replace(/<break time='500ms'\/>/g, '\n');
    data = data.replace(/<speak>/g, '');
    data = data.replace(/<\/speak>/g, '');
    data = data.replace(/<prosody pitch='high' volume='loud'>/g, '');
    data = data.replace(/<\/prosody>/g, '');
    data = data.replace(/<emphasis level='strong'>/g, '');
    data = data.replace(/<\/emphasis>/g, '');
    return data;
}

module.exports = BestCoachIntent;