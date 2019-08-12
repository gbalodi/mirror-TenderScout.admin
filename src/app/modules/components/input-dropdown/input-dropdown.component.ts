import { Component, Input, forwardRef, Output, EventEmitter, ElementRef, HostBinding, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { DropdownComponent } from '../dropdown-component';
import { Subject, BehaviorSubject, combineLatest, Observable, Subscription, merge } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

interface ICustomInput {
  errors: { [key: string]: string };
  errorMessages: { [key: string]: string };
}

export const INPUT_DROPDOWN_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputDropdownComponent),
  multi: true
};

@Component({
  selector: 'app-input-dropdown',
  templateUrl: 'input-dropdown.component.html',
  styleUrls: ['input-dropdown.component.scss'],
  providers: [INPUT_DROPDOWN_VALUE_ACCESSOR]
}) export class InputDropdownComponent extends DropdownComponent implements ControlValueAccessor, ICustomInput {
  constructor(el: ElementRef) { super(el) }

  private propagateChange: any = (): any => { };

  @Input() public id: string;

  @Input() public items: any = {};

  @Input() private filterOnInput: boolean = false;
  public myTabIndex: number = -1;

  @Input() public errors: { [key: string]: string };

  @Input() public placeholder: string;

  @HostBinding('class.show-validation')
  // @HostListener("input", ["$event"])
  // public onInputArrow(event: any): void {
  //     console.log("input:"+ event);
  //     alert(event);
  // }
  @Input() public errorMessages: { [key: string]: string };

  @Output() public onInputEvent: EventEmitter<string> = new EventEmitter();

  private input$: BehaviorSubject<string> = new BehaviorSubject('');

  private items$: BehaviorSubject<{ [key: string]: string }> = new BehaviorSubject({});

  private select$: Subject<string> = new Subject();

  private onBlur$: Subject<string> = new Subject();

  @Input() public disabled: boolean;

  public filteredItems$: Observable<{ [key: string]: string }> = combineLatest(
    this.items$,
    this.input$
  )
    .pipe(
      map(
        (
          val: [{ [key: string]: string }, string]
        ) => {
          if (this.filterOnInput) {
            let allItems = val[0], filtered: { [key: string]: string } = {};
            for (let key in allItems) {
              if (allItems[key].toLowerCase().indexOf(val[1].trim().toLowerCase()) > -1) filtered[key] = allItems[key]
            }
            return filtered;
          }
          return val[0]
        }
      )
    )

  private onBlurKey$: Observable<string> = this.onBlur$
    .pipe(
      withLatestFrom(this.filteredItems$)
    ).pipe(
      map(
        (val: [string, { [key: string]: string }]) => {
          let items: { [key: string]: string } = val[1],
            value = val[0];
          if (!value || value.trim().length === 0) return null;
          for (let key in items) {
            if (items[key].toLowerCase() === value.trim().toLowerCase()) return key
          }
          return this.value;
        }
      )
    )

  private setAsTouchedSub: Subscription = this.onBlur$.subscribe(() => this.onTouched())

  public inputValue: string = '';
  public inputKey: string = '';

  private valueUpdate$: Observable<string> = merge(
    this.select$,
    this.onBlurKey$
  )

  private valueSub: Subscription = this.valueUpdate$
    .subscribe((key: string) => {
      this.inputValue = this.items[key] ? this.items[key] : '';
      this.inputKey = key ? key : '';
      this.input$.next(this.inputValue);
      this.value = key;
      this.propagateChange(key);
    })

  private inputSub: Subscription = this.input$.subscribe((val: string) => this.onInputEvent.emit(val))

  public ngOnChanges(): void {
    this.items$.next(this.items);
  }

  public ngOnDestroy(): void {
    this.inputSub.unsubscribe();
    this.valueSub.unsubscribe();
    this.setAsTouchedSub.unsubscribe();
  }

  public onInput(value: string): void {
    this.input$.next(value);
  }

  public select(key: string): void {
    this.select$.next(key);
    this.show = false;
  }

  public onBlur(relatedTarget: HTMLElement, value: string): void {
    if (!relatedTarget || !this.el.nativeElement.contains(relatedTarget)) {
      this.onBlur$.next(value);
    }
  }

  public value: string = '';

  public writeValue(value: string): void {
    this.value = value;
    this.onChange(value);
    this.inputValue = this.items[this.value];
    this.inputKey = this.items[this.value];
  }

  public onKeydown(event) {
    if (event.keyCode === 38) {
      this.myTabIndex -= 1;
    } else if (event.keyCode === 40) {
      this.myTabIndex += 1;
      this.show = true;
    } else if (event.keyCode === 13) {
      // let key = this.myTabIndex + 1;
      // this.select(key.toString());
    } else if (event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode === 8) {
      this.show = true;
    } else {
      this.myTabIndex = -1;
      this.show = false;
    }
  }

  public registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public onChange: any = () => { };

  public onTouched: any = () => { };

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}