'use strict';

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

Wod.prototype.getAnnoucements = function(){
    return this.annoucements;
}

Wod.prototype.setAnnoucements = function(annoucements){
    this.annoucements = annoucements;
}

Wod.prototype.map = function(json){

    var APIWod;
    var APIError;
    try{
        APIWod = json.RecordList.APIWod;
    }
    catch(error){
        APIError = json.APIError;
        return APIError.ErrorMessage;
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
          comp.setDescription(this.components[key].Description);
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
    this.setAnnoucements(allAnnouncements);

    return true;
}

module.exports = Wod;