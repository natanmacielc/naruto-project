import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Output() update: EventEmitter<string> = new EventEmitter<string>();
  @Input() options!: Options;
  value: any = 'selected';
  onChange = (value: any) => {};
  onTouched = () => {};

  updateValue(event: Event) {
    const selectElement: HTMLSelectElement = event.target as HTMLSelectElement;
    const value: string = selectElement.value;
    this.onChange(value);
    this.onTouched();
    this.options.control!.setValue(value, {onlySelf: true})
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  selectValue(value: string): boolean {
    return value === this.value;
  }
}

export interface Options {
  selector: string,
  control?: AbstractControl<any, any>,
  options: {
    name: string,
    value: string
  }[]
}
