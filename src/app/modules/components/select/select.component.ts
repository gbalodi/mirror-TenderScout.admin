import { Component, ElementRef, forwardRef, Input, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DropdownComponent } from '../dropdown-component';

import { Subject, Subscription } from 'rxjs';

interface ICustomInput {
  errors: { [key: string]: string };
  errorMessages: { [key: string]: string };
}

export const SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};
@Component({
  selector: 'app-select',
  templateUrl: 'select.component.html',
  styleUrls: [ 'select.component.scss'],
  providers: [SELECT_VALUE_ACCESSOR]
})
export class SelectComponent extends DropdownComponent implements ControlValueAccessor, ICustomInput {
  constructor(el: ElementRef) { super(el) }

  private select$: Subject<string> = new Subject();

  private selectSub: Subscription = this.select$.subscribe((key: string) => this.value = key);

  private propagateChange: any = (): any => { };

  @Input() public errors: { [key: string]: string };

  @HostBinding('class.show-validation')
  @Input() public errorMessages: { [key: string]: string };

  @Input() public placeholder: string = '------------';

  @Input() public disabled: boolean;
  public myTabIndex: number = 0;
  public inputKey: string;

  public value: string;

  public ngOnDestroy(): void {
    this.selectSub.unsubscribe();
  }

  public select(key: string): void {
    this.select$.next(key);
    this.propagateChange(key);
    this.show = false;
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public onTouched: any = () => {
  };

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggle() {
    this.show = !this.show;
  }

  public onKeydown(event) {
    if (event.keyCode === 38) {
      this.myTabIndex -= 1;
    } else if (event.keyCode === 40) {
      this.myTabIndex += 1;
      this.show = true;
    } else if (event.keyCode === 13) {
    } else if (event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode === 8) {
      this.show = true;
    } else {
      this.myTabIndex = -1;
      this.show = false;
    }
  }
}