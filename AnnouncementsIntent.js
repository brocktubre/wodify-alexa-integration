'use strict';

var cardImageLarge;
var cardImageSmall;
var cardTitle;

function AnnouncementsIntent() {
    this.cardImageLarge = 'http://www.redrivercrossfit.com/wp-content/uploads/2015/04/newlogo3.jpg';
    this.cardImageSmall = this.cardImageLarge;
    this.cardTitle = 'Today\'s Announcements';
}

AnnouncementsIntent.prototype.getCardTitle = function(){
    return this.cardTitle;
}

AnnouncementsIntent.prototype.getCardContent = function(data){
    return cleanUpDataForCard(data);
}

AnnouncementsIntent.prototype.getImageObj = function(){
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
    return data;
}

module.exports = AnnouncementsIntent;