import { ComponentAnnotation as Component, ViewAnnotation as View, NgFor } from 'angular2/angular2';
import { ObservableWrapper } from 'angular2/src/facade/async';
import { DataService } from 'app/services/dataService';
import { Sorter } from 'app/utils/sorter';
import { SortBy } from 'app/components/sortBy/sortBy';

@Component({
    selector: 'projects',
    hostInjector: [DataService]
})
@View({
    templateUrl: 'app/components/projects/projects.html',
    directives: [NgFor, SortBy]
})

export class Projects {

    constructor(dataService:DataService) {
        this.title = 'Projects';
        this.filterText = 'Filter Projects:';

        this.projects = this.filteredProjects = [];

        this.featuredProjects = ["Project 1", "Project 2", "Project 3"];
        //
        ObservableWrapper.subscribe(dataService.getProjects(), res => {
            this.projects = this.filteredProjects = res.json();
        });

        this.sorter = new Sorter();
    }


    filterChanged(data) {
        if (data) {
            data = data.toUpperCase();
            let props = ['projectTitle'];
            let filtered = this.projects.filter(item => {
                let match = false;
                for (let prop of props) {
                    //console.log(item[prop] + ' ' + item[prop].toUpperCase().indexOf(data));
                    if (item[prop].toString().toUpperCase().indexOf(data) > -1) {
                        match = true;
                        break;
                    }
                }
                ;
                return match;
            });
            this.filteredProjects = filtered;
        }
        else {
            this.filteredProjects = this.projects;
        }
    }


    sort(prop) {
        this.sorter.sort(this.filteredProjects, prop);
    }
}