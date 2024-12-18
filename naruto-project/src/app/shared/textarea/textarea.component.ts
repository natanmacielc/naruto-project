import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() name: string = '';
  @Input() index: string = '';
  value: string = '';

  onChange = (value: any) => {};
  onTouched = () => {};
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event) {
    const input: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  capitalizeName(): string {
    return this.name.charAt(0).toUpperCase().concat(this.name.slice(1))
  }
}
