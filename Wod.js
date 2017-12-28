'use strict';

var components;
var createdDate;
var annoucements;

function Wod() {

}

function Wod(components, createdDate, annoucements) {
    this.components = components;
    this.createdDate = createdDate;
    this.annoucements = annoucements;
}

Wod.prototype.map = function(json){

    var APIWod = json.RecordList.APIWod;

    this.components = APIWod.Components;
    this.createdDate = APIWod.CreatedDate;
    this.annoucements = APIWod.Announcements;
    console.log(this.components);
    
    var allComponents = new Array();

    for (var key in this.components) {
        if (this.components.hasOwnProperty(key)) {
           console.log(this.components[key].Id);
           console.log(this.components[key].Description);
        }
     }

    // console.log(this.components);
    // console.log(this.createdDate);
    // console.log(this.annoucements);
    // console.log(json);
}

module.exports = Wod;