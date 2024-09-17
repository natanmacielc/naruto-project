import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CharacterService} from '../service/character.service';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatMomentDateModule, provideMomentDateAdapter} from "@angular/material-moment-adapter";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import 'moment/locale/pt-br'

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};
@Component({
  selector: 'app-character-form',
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'},
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    provideMomentDateAdapter(),
  ],
  standalone: true,
  imports: [
    MatMomentDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterFormComponent implements OnInit {
  characterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private characterService: CharacterService,
    private _adapter: DateAdapter<any>
  ) {}

  ngOnInit(): void {
    this.characterForm = this.fb.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      affiliation: ['', Validators.required],
      devilFruit: [''],
      abilities: [''],
      bounty: [''],
      bio: ['']
    });
    this._adapter.setLocale('fr');
  }

  submitForm(): void {
    if (this.characterForm.valid) {
      this.characterService.setCharacterData(this.characterForm.value);
    }
  }
}
