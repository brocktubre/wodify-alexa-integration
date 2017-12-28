'use strict';

function Component(){
    var id;
    var description;

    Component.prototype.setId = function(id){
        this.id = id;
    }

    Component.prototype.getId = function(){
        return this.id;
    }

    Component.prototype.setDescription = function(description){
        this.description = description;
    }

    Component.prototype.getDescription = function(){
        return this.description;
    }
}

module.exports = Component;