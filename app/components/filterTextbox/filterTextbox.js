import { ComponentAnnotation as Component, ViewAnnotation as View, onChange } from 'angular2/angular2';
import { formDirectives } from 'angular2/forms';
import { EventEmitter } from 'angular2/src/facade/async';

@Component({
    selector: 'filter-textbox',
    events: ['changed'],
    properties: ['text'],
    lifecycle: [onChange]
})
@View({
    template: `
    <form>

  <div class="input-group" style="margin-left: -32px;">
                <input type="text" class="form-control"  [(ng-model)]="model.filter"
                 (keyup)="filterChanged($event)" placeholder="Search" name="srch-term" id="srch-term">

                <div class="input-group-btn">
                    <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>
                </div>
            </div>
    </form>
  `,
    directives: [formDirectives]
})
export class FilterTextbox {

    constructor() {
        this.model = {
            filter: null
        };
        this.changed = new EventEmitter();
    }

    filterChanged(event, prop) {
        event.preventDefault();
        this.changed.next(this.model.filter, prop); //Raise changed event
    }

    onChange(changes) {
        //alert(changes);
    }

}
