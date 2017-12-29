'use strict';

var cardImageLarge; 
var cardImageSmall;
var cardTitle;

function WodIntent() {
    this.cardImageLarge = 'http://www.redrivercrossfit.com/wp-content/uploads/2015/04/newlogo3.jpg';
    this.cardImageSmall = 'https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/12814639_966607666721083_1936476695944539950_n.jpg?oh=7b82dd675d7aaaccc1f28130d95439b1&oe=5ABF9E75';
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
    return data;
}

module.exports = WodIntent;