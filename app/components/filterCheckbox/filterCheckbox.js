import { ComponentAnnotation as Component, ViewAnnotation as View, onChange } from 'angular2/angular2';
import { formDirectives } from 'angular2/forms';
import { EventEmitter } from 'angular2/src/facade/async';

@Component({
    selector: 'filter-checkbox',
    events: ['changed'],
    properties: ['text'],
    lifecycle: [onChange]
})
@View({
    template: `
    <form>
     <input class="fancy-checkbox" type="checkbox" (click)="filterChanged($event)"/>
    </form>
  `,
    directives: [formDirectives]
})
export class FilterCheckbox {

    constructor() {
        this.model = {
            filter: null
        };
        this.changed = new EventEmitter();
    }

    filterChanged(event) {
        event.preventDefault();
        this.changed.next(this.model.filter); //Raise changed event
    }

    onChange(changes) {
    }

}
