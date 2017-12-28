'use strict';

const Speech = require('ssml-builder');

var cardImageLarge = 'http://www.redrivercrossfit.com/wp-content/uploads/2015/04/newlogo3.jpg';
var cardImageSmall = 'https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/12814639_966607666721083_1936476695944539950_n.jpg?oh=7b82dd675d7aaaccc1f28130d95439b1&oe=5ABF9E75';
var cardTitle = 'Red River\'s Best Coach';
var COACHES = [
    "Johnnie",
    "Wells",
    "Davie",
    "Jess"
];
var RESPONSES = [];

function BestCoachIntent() {

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
    speech0.prosody({pitch: 'high', volume: 'loud'}, 'Oh ');
    speech0.say(' that\'s easy. It\'s ' + randomCoach + ' of course.');
    RESPONSES[0] = speech0;

    var speech1 = new Speech();
    speech1.emphasis('strong', 'Hmmm ');
    speech1.say('let me think. ');
    speech1.pause('500ms');
    speech1.say('I choose ' + randomCoach + '.');
    RESPONSES[1] = speech1;

    var speech2 = new Speech();
    speech2.say('Everyone knows it\'s coach ' + randomCoach);
    RESPONSES[2] = speech2;

    var responseIndex = Math.floor(Math.random() * RESPONSES.length);
    var randomResponse = RESPONSES[responseIndex];
    
    return randomResponse;
}

function cleanUpDataForCard(data){
    data = data.replace(/<break time='500ms'\/>/g, '\n');
    data = data.replace(/<speak>/g, '');
    data = data.replace(/<\/speak>/g, '');
    return data;
}

module.exports = BestCoachIntent;