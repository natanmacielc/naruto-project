import { Component } from '@angular/core';
import {DataTableComponent} from "../../shared/data-table/data-table.component";

@Component({
  selector: 'app-catch-history',
  standalone: true,
  imports: [
    DataTableComponent
  ],
  templateUrl: './catch-history.component.html',
  styleUrl: './catch-history.component.scss'
})
export class CatchHistoryComponent {

}
