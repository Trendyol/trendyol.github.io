import { ComponentAnnotation as Component, ViewAnnotation as View, bootstrap, bind, BrowserLocation } from 'angular2/angular2';
import { RouteConfig, RouterOutlet, Router } from 'angular2/router';
import { routerInjectables, LocationStrategy, Location, HashLocationStrategy } from 'angular2/router';
import { httpInjectables } from 'angular2/http';

import { Projects } from 'app/components/projects/projects';

@Component({
    selector: 'app'
})
@View({
    template: `<router-outlet></router-outlet>`,
    directives: [RouterOutlet]
})
@RouteConfig([
    {path: '/', as: 'projects', component: Projects}
])
export class App {
    constructor(router:Router, location:Location) {
        this.router = router;
        this.location = location;
    }
}

//Bootstrap App
bootstrap(App, [
    httpInjectables,
    routerInjectables,
    bind(LocationStrategy).toClass(HashLocationStrategy)
]);
