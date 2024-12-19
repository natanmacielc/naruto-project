import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent<T extends {[key: string]: string}> {
  @Input() columns: string[] = [];
  @Input() data: T[] = [];
}
