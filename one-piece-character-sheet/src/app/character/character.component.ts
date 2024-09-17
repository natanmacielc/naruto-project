import { Component } from '@angular/core';
import {CharacterSheetComponent} from "./character-sheet/character-sheet.component";
import {HeaderComponent} from "../shared/header/header.component";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-character',
  standalone: true,
    imports: [
        CharacterSheetComponent,
        HeaderComponent,
        RouterModule
    ],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent {

}
