import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Output() onclick: EventEmitter<void> = new EventEmitter<void>();
  @Input() buttonText: string = ''
  @Input() disabled: boolean = false;

  buttonControl(): ButtonControl {
    return {
      disabled: this.disabled,
      enabled: !this.disabled
    }
  }

  handleClick() {
    this.onclick.emit();
  }
}

interface ButtonControl {
  enabled: boolean,
  disabled: boolean
}
