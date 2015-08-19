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
         Filter:
         <input type="text" 
                [(ng-model)]="model.filter" 
                (keyup)="filterChanged($event)"  />
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

    filterChanged(event) {
        event.preventDefault();
        this.changed.next(this.model.filter); //Raise changed event
    }

    onChange(changes) {
      //alert(changes);
    }

}
