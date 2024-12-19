import {Component} from '@angular/core';
import {UserHeaderComponent} from "../shared/user-header/user-header.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {ActivatedRoute} from "@angular/router";
import {Character, Characters, SortingOperator} from "./characters.model";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {InputComponent} from "../shared/input/input.component";
import {ValiditySpanComponent} from "../shared/validity-span/validity-span.component";
import {TitleComponent} from "../shared/title/title.component";
import {Options, SelectComponent} from "../shared/select/select.component";
import {ButtonComponent} from "../shared/button/button.component";

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    UserHeaderComponent,
    FooterComponent,
    NgClass,
    NgOptimizedImage,
    NgIf,
    NgForOf,
    InputComponent,
    ValiditySpanComponent,
    TitleComponent,
    SelectComponent,
    ButtonComponent
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent {
  private readonly sortingOperators: SortingOperator[] = ['none', 'ascending', 'descending'];
  private readonly characters: Characters;
  private readonly pageItems: number = 5;
  readonly villageOptions: Options = {
    selector: 'Todas',
    options: [{name: 'Todas', value: ''}, {name: 'Folha', value: 'Konoha'}, {
      name: 'Areia',
      value: 'Suna'
    }, {name: 'Pedra', value: 'Iwa'}, {name: 'Nuvem', value: 'Kumo'}, {name: 'Névoa', value: 'Kiri'}, {
      name: 'Som',
      value: 'Oto'
    }, {name: 'Chuva', value: 'Ame'}]
  };
  readonly statusOptions: Options = {
    selector: 'Todos',
    options: [{name: 'Todos', value: ''}, {name: 'Ativo', value: 'S'}, {name: 'Inativo', value: 'N'}, {
      name: 'Vivo',
      value: 'alive'
    }, {name: 'Morto', value: 'deceased'}]
  };
  private selectedVillage: string = '';
  private selectedStatus: string = '';
  private searchText: string = '';
  actualPage: number = 0;
  charactersTable: Characters;
  haveMoreCharacters: boolean = true;
  characterSortingOperator: SortingOperator = 'none';
  playerSortingOperator: SortingOperator = 'none';

  constructor(private route: ActivatedRoute) {
    this.characters = route.snapshot.data['resolvedData'];
    this.charactersTable = {characters: this.characters.characters.slice(0, 5)};
    this.applySorting();
  }

  applyAllFilters(): Characters {
    const startPageIndex: number = this.actualPage * this.pageItems;
    const finalPageIndex: number = startPageIndex + this.pageItems;
    const filteredCharacters: Character[] = this.characters.characters
      .filter((character: Character): boolean => character.character.toLowerCase().includes(this.searchText) || character.player.toLowerCase().includes(this.searchText))
      .filter((character: Character): boolean => this.selectedStatus ? character.status === this.selectedStatus || character.active === this.selectedStatus : true)
      .filter((character: Character): boolean => this.selectedVillage ? character.village === this.selectedVillage : true);
    this.haveMoreCharacters = filteredCharacters.length > finalPageIndex;
    this.applySorting();
    return {
      characters: filteredCharacters
        .slice(startPageIndex, finalPageIndex)
    };
  }

  search(event: Event): void {
    this.searchText = (event.target as HTMLInputElement).value.toLowerCase();
    this.actualPage = 0;
    this.charactersTable = this.applyAllFilters();
  }

  filterByVillage(event: Event): void {
    const selectElement: HTMLSelectElement = event.target as HTMLSelectElement;
    this.selectedVillage = selectElement.value;
    this.actualPage = 0;
    this.charactersTable = this.applyAllFilters();
  }

  filterByStatus(event: Event): void {
    const selectElement: HTMLSelectElement = event.target as HTMLSelectElement;
    this.selectedStatus = selectElement.value;
    this.actualPage = 0;
    this.charactersTable = this.applyAllFilters();
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

  previousPage(): void {
    this.actualPage--;
    this.charactersTable = this.applyAllFilters();
    this.applySorting();
  }

  nextPage(): void {
    this.actualPage++;
    this.charactersTable = this.applyAllFilters();
    this.applySorting();
  }

  applySorting(): void {
    const isPlayerOperator: boolean = this.playerSortingOperator !== 'none';
    const operatorApplied: 'character' | 'player' = isPlayerOperator ? 'player' : 'character';
    const sortingOperator: SortingOperator = isPlayerOperator ? this.playerSortingOperator : this.characterSortingOperator;
    const rankingOrder = {
      'C': 1,
      'B': 2,
      'A': 3,
      'S': 4,
      'S+': 5,
    };
    this.charactersTable.characters.sort((a: Character, b: Character): number => {
      if (rankingOrder[a.ranking] !== rankingOrder[b.ranking]) {
        return rankingOrder[b.ranking] - rankingOrder[a.ranking];
      }
      return sortingOperator === 'none' ?
        a[operatorApplied].localeCompare(b[operatorApplied]) :
        sortingOperator === 'ascending' ?
          a[operatorApplied].localeCompare(b[operatorApplied]) :
          b[operatorApplied].localeCompare(a[operatorApplied]);
    })
  }

  changeCharacterOperator(): void {
    const indexOf: number = this.sortingOperators.indexOf(this.characterSortingOperator);
    this.playerSortingOperator = 'none';
    this.characterSortingOperator = (this.sortingOperators.length - 1) === indexOf ? this.sortingOperators[0] : this.sortingOperators[indexOf + 1];
    this.applySorting();
  }

  changePlayerOperator(): void {
    const indexOf: number = this.sortingOperators.indexOf(this.playerSortingOperator);
    this.characterSortingOperator = 'none';
    this.playerSortingOperator = (this.sortingOperators.length - 1) === indexOf ? this.sortingOperators[0] : this.sortingOperators[indexOf + 1];
    this.applySorting();
  }
}
