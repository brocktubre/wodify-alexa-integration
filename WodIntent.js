'use strict';

var cardImageLarge; 
var cardImageSmall;
var cardTitle;

function WodIntent() {
    this.cardImageLarge = 'http://www.redrivercrossfit.com/wp-content/uploads/2015/04/newlogo3.jpg';
    this.cardImageSmall = this.cardImageLarge;
    this.cardTitle = 'Today\'s Workout';
}

WodIntent.prototype.getCardTitle = function(){
    return this.cardTitle;
}

WodIntent.prototype.getCardContent = function(data){
    return cleanUpDataForCard(data);
}

WodIntent.prototype.getImageObj = function(){
    const imageObj = {
        smallImageUrl: this.cardImageSmall,
        largeImageUrl: this.cardImageLarge
    };
    return imageObj;
}

function cleanUpDataForCard(data){
    data = data.replace(/<break time='500ms'\/>/g, '\n');
    data = data.replace(/<speak>/g, '');
    data = data.replace(/<\/speak>/g, '');
    data = data.replace(/<p>/g, '');
    data = data.replace(/<\/p>/g, '');
    data = data.replace(/,,/g, '/');
    data = data.replace(/ lbs./g, '#');
    return data;
}

module.exports = WodIntent;