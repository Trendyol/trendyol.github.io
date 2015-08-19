import { ComponentAnnotation as Component } from 'angular2/angular2';
import { Http } from 'angular2/http';

export class DataService {

    constructor(http:Http) {
        this.http = http;
    }

    getProjects() {
        return this.http.get('projects.json');
    }
}