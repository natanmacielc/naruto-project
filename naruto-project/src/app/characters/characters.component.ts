import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserHeaderComponent} from "../shared/user-header/user-header.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";
import {Character} from "./characters.model";
import {MatPaginator} from "@angular/material/paginator";
import {PasswordValidation} from "../signup/signup-form/signup-form.model";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    UserHeaderComponent,
    FooterComponent,
    MatTable,
    MatPaginator,
    MatHeaderRow,
    MatRow,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    NgClass,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['character', 'player', 'ranking'];
  characters: MatTableDataSource<Character>;

  constructor(private route: ActivatedRoute) {
    this.characters = new MatTableDataSource<Character>(route.snapshot.data['resolvedData'].characters);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.characters.paginator = this.paginator;
  }

  rankingClass(ranking: string): string {
    const rankingClasses: Map<string, string> = new Map<string, string>([
      ['C', 'c-rank'],
      ['B', 'b-rank'],
      ['A', 'a-rank'],
      ['S', 's-rank'],
      ['S+', 's-plus-rank']
    ]);
    return rankingClasses.has(ranking) ?
      rankingClasses.get(ranking) as string
      : 'c-rank';
  }

}
