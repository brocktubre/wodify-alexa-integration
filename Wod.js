'use strict';
const Speech = require('ssml-builder');

var Component = require('./Component');
var Announcement = require('./Announcement');

var components;
var createdDate;
var annoucements;

function Wod() {

}

Wod.prototype.getComponents = function(){
    return this.components;
}

Wod.prototype.setComponents = function(components){
    this.components = components;
}

Wod.prototype.getCreatedDate = function(){
    return this.createdDate;
}

Wod.prototype.setCreatedDate = function(date){
    this.createdDate = date;
}

Wod.prototype.getAnnouncements = function(){
    return this.annoucements;
}

Wod.prototype.setAnnouncements = function(annoucements){
    this.annoucements = annoucements;
}

Wod.prototype.map = function(data){
    
    var json = JSON.parse(data);
    var APIWod;
    var APIError;

    try{
        APIWod = json.RecordList.APIWod;
    }
    catch(error){
        APIError = json.APIError;
        return APIError;
    }

    this.components = APIWod.Components.Component;
    this.createdDate = APIWod.CreatedDate;
    this.annoucements = APIWod.Announcements;
    
    var allComponents = new Array();
    var allAnnouncements = new Array();

    for (var key in this.components) {
        if (this.components.hasOwnProperty(key)) {
          var comp = new Component();
          comp.setId(this.components[key].Id);
          var desc = replaceCharacters(this.components[key].Description)
          comp.setDescription(desc);
          allComponents.push(comp);
        }
    }

    for (var key in this.annoucements) {
        if (this.annoucements.hasOwnProperty(key)) {
          var annoucement = new Announcement();
          annoucement.setId(this.annoucements[key].Id);
          annoucement.setFromDate(this.annoucements[key].FromDate);
          annoucement.setToDate(this.annoucements[key].ToDate);
          annoucement.setIsActive(this.annoucements[key].IsActive);
          annoucement.setMessage(this.annoucements[key].Message);
          allAnnouncements.push(annoucement);
        }
    } 

    this.setComponents(allComponents);
    this.setAnnouncements(allAnnouncements);

    return true;
}

Wod.prototype.buildTodaysProgramming = function(wod, json){
    
    var speech = new Speech();
    const PAUSE_500ms = '500ms';

    try {
        let response = this.map(json);

        if(response !== true){
            // some error occured
            // we got an error response from Wodify
            if(response.ResponseCode == 400){
                speech.say('Nothing has been posted today.');
                return speech;
            }else{
                throw response;
            }
        }

        var hasComponenets = wod.getComponents().length > 0;
        var hasAnnouncements = wod.getAnnouncements().length > 0;

        if(!hasComponenets){
            speech.say('There is nothing programmed today. ');
            speech.pause(PAUSE_500ms);
        } else{
            speech.say('Here is what is programmed today: ');
            speech.pause(PAUSE_500ms);
        }
        
        // builds the parts of todays programming
        wod.getComponents().forEach(function(comp, i){
            speech.say(comp.getDescription());
            speech.pause(PAUSE_500ms);
        });

        if(hasAnnouncements){
            speech.say('Here are today\'s announcements: ');
            speech.pause(PAUSE_500ms);
            // builds the parts of todays announcements
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
        speech.say('Looks like there was an error retrieving today\'s programming.');
    }
    
    return speech;

}

function replaceCharacters(data){
    data = data.replace(/#/g, ' lbs.');
    data = data.replace(/\//g, ',,');
    return data;
}

module.exports = Wod;