'use strict';

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

module.exports = Announcement;