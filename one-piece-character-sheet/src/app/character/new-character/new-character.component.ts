import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-new-character',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatExpansionModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './new-character.component.html',
  styleUrl: './new-character.component.scss'
})
export class NewCharacterComponent implements OnInit {
  newCharacterForm!: FormGroup;

  ngOnInit(): void {
    this.newCharacterForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      race: new FormControl('', [Validators.required]),
      organization: new FormControl('', [Validators.required]),
      class: new FormControl('', [Validators.required]),
      personality: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required]),
      originSea: new FormControl('', [Validators.required]),
      weapon: new FormControl('', [Validators.required]),
      fightingStyle: new FormControl('', [Validators.required]),
      abilities: new FormControl('', [Validators.required]),
      hakis: new FormControl('', [Validators.required]),
      vessel: new FormControl('', [Validators.required]),
      crew: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    })
  }
}
