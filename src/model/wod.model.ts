import { Component } from './component.model';
import { Announcement } from './announcement.model';

export class Wod{
    components: Array<Component>;
    createdDate: any;
    announcements: Array<Announcement>;

    constructor(){
        console.log('Creating new Wod');
    }

    public map(json){
        console.log('Trying to map the JSON object.');
    }


}