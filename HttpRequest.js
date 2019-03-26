'use strict';

// API KEY
// API_KEY
var KEY = 'API_KEY';

var url;
var apiKey;
var location;
var program;
var date;
var typ;
var encoding;
var requestType;
var requestTypeSuffix;

function HttpRequest() {
    this.url = 'http://app.wodify.com/API/';
    this.apiKey = 'apikey=' + KEY;
    this.location = '&location=CrossFit+Ex+Nihilo';
    this.program = '&program=Red+River';
    this.date = '&date=12%2f29%2f2017';
    this.type = '&type=json';
    this.encoding = '&encoding=utf-8';
    this.requestTypeSuffix = '.aspx?';
    this.requestType = 'WODs_v1';
}

HttpRequest.prototype.getUrl = function(date, requestType){
    
    var dateObj = date;
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    this.date = '&date=' + month + '%2f' + day + '%2f' + year;
    this.requestType = requestType + this.requestTypeSuffix;
    
    const returnUrl = this.url + this.requestType + this.apiKey + this.location + this.program + this.date + this.type + this.encoding;
    return returnUrl;
}



module.exports = HttpRequest;