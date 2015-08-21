import { ComponentAnnotation as Component, ViewAnnotation as View, NgFor ,NgIf} from 'angular2/angular2';
import { ObservableWrapper } from 'angular2/src/facade/async';
import { GithubApi } from 'app/services/githubApi';
import { Constants } from 'app/services/constants';
import { Sorter } from 'app/utils/sorter';
import { SortBy } from 'app/components/sortBy/sortBy';
import { FilterTextbox } from 'app/components/filterTextbox/filterTextbox';

@Component({
    selector: 'projects',
    hostInjector: [GithubApi, Constants]
})
@View({
    templateUrl: 'app/components/projects/projects.html',
    directives: [NgFor, SortBy, NgIf, FilterTextbox]
})

export class Projects {

    constructor(githubApi:GithubApi, constants:Constants) {
        this.title = 'Projects';
        this.filterText = 'Filter Projects:';

        this.defaultProjectImage = constants.DefaultProjectImage;

        this.projects = this.filteredProjects = this.languages = this.featuredProjects = [];

        //
        ObservableWrapper.subscribe(githubApi.getProjects(), res => {

            this.projects = this.filteredProjects = _.chain(res.json()).filter(item=> {
                return item.name !== constants.ProjectToExclude;
            }).value();

            this.languages = _.chain(this.projects).pluck('language').uniq().map(item=> {
                return {
                    value: item,
                    filtered: false
                }
            }).value();
            this.featuredProjects = _.chain(this.projects).sortBy('stargazers_count').take(constants.FeaturedProjectsLength).value();
        });

        this.sorter = new Sorter();
    }


    filterChanged(data) {
        if (data) {
            data = data.toUpperCase();
            let props = ['name', 'language'];
            let filtered = this.projects.filter(item => {
                let match = false;
                for (let prop of props) {
                    if (item[prop].toString().toUpperCase().indexOf(data) > -1) {
                        match = true;
                        break;
                    }
                }

                return match;
            });

            this.filteredProjects = filtered;
        }
        else {
            this.filteredProjects = this.projects;
        }
    }

    checkBoxFilterChanged($event, prop) {
        var isChecked = $event.target.checked; //TODO: prop.filtered doesn't fill with correct value
        if (prop && isChecked === true) {
            this.filterChanged(prop.value);
        } else {
            this.filterChanged();
        }
    }

    sort(prop) {
        this.sorter.sort(this.filteredProjects, prop);
    }
}