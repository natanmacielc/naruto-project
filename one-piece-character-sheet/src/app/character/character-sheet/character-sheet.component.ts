import { Component } from '@angular/core';
import {CharacterFormComponent} from "../character-form/character-form.component";
import {CharacterPreviewComponent} from "../character-preview/character-preview.component";

@Component({
  selector: 'app-character-sheet',
  standalone: true,
  imports: [
    CharacterFormComponent,
    CharacterPreviewComponent
  ],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.scss'
})
export class CharacterSheetComponent {

}
