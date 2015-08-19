import { ComponentAnnotation as Component } from 'angular2/angular2';
import { Http } from 'angular2/http';

export class GithubApi {

    constructor(http:Http) {
        this.http = http;
    }

    getProjects() {
        return this.http.get('https://api.github.com/orgs/trendyol/repos');
    }
}