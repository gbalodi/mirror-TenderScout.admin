import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-input-errors',
  styleUrls: ['input-errors.component.scss'],
  templateUrl: 'input-errors.component.html'
}) export class InputErrorsComponent {
  @Input() public errors: { [key: string]: string };

  @HostBinding('class.show-validation')
  @Input() public errorMessages: { [key: string]: string };
}