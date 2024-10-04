import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-validity-span',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './validity-span.component.html',
  styleUrl: './validity-span.component.scss'
})
export class ValiditySpanComponent {
  @Input() valid!: boolean;
}
