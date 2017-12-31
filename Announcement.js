'use strict';

const Speech = require('ssml-builder');

var id;
var message;
var fromDate;
var toDate;
var isActive;

function Announcement () {

}

Announcement.prototype.setId = function(id){
    this.id = id;
}

Announcement.prototype.getId = function(){
    return this.id;
}

Announcement.prototype.setMessage = function(message){
    this.message = message;
}

Announcement.prototype.getMessage = function(){
    return this.message;
}

Announcement.prototype.getFromDate = function(){
    return this.fromDate;
}

Announcement.prototype.setFromDate = function(date){
    this.fromDate = date;
}

Announcement.prototype.getToDate = function(){
    return this.toDate;
}

Announcement.prototype.setToDate = function(date){
    this.toDate = date;
}

Announcement.prototype.getIsActive= function(){
    return this.isActive;
}

Announcement.prototype.setIsActive = function(isActive){
    this.isActive = isActive;
}

Announcement.prototype.buildTodaysAnnouncements = function(wod, json){
    var speech = new Speech();
    const PAUSE_500ms = '500ms';

    try {
        let response = wod.map(json);

        if(response !== true){
            // some error occured
            // we got an error response from Wodify
            if(response.ResponseCode == 400){
                speech.say('There are no announcements today.');
                return speech;
            }else{
                throw response;
            }
        }

        var hasAnnouncements = wod.getAnnouncements().length > 0;

        if(hasAnnouncements){
            speech.say('Here are today\'s announcements: ');
            speech.pause(PAUSE_500ms);
            // builds the parts of todays programming
            wod.getAnnouncements().forEach(function(announcement, i){
                speech.paragraph(announcement.getMessage());
            });
        }
        else{
            speech.say('There are no announcements today.');
            speech.pause(PAUSE_500ms);
        }
    }catch(error){
        console.error(error);
        speech.say('Looks like there was an error retrieving today\'s announcements.');
    }
    
    return speech;
}

module.exports = Announcement;