import {Component, OnInit} from '@angular/core';
import {CharacterService} from "../service/character.service";

@Component({
  selector: 'app-character-preview',
  standalone: true,
  imports: [],
  templateUrl: './character-preview.component.html',
  styleUrl: './character-preview.component.scss'
})
export class CharacterPreviewComponent implements OnInit {
  characterData: any;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.characterService.characterData$.subscribe(data => {
      this.characterData = data;
    });
  }
}
