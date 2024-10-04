import {Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from "../../../shared/header/header.component";
import {OpContainerComponent} from "../../../shared/op-container/op-container.component";
import {FooterComponent} from "../../../shared/footer/footer.component";
import {TitleComponent} from "../../../shared/title/title.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputComponent} from "../../../shared/input/input.component";
import {ButtonComponent} from "../../../shared/button/button.component";
import {Options, SelectComponent} from "../../../shared/select/select.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    HeaderComponent,
    OpContainerComponent,
    FooterComponent,
    TitleComponent,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    SelectComponent
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {
  private readonly _router: Router = inject(Router);
  skillsForm!: FormGroup;

  ngOnInit() {
    this.skillsForm = new FormGroup({
      class: new FormControl('', [Validators.required]),
      fightingStyle: new FormControl('', [Validators.required]),
      devilFruit: new FormControl('', [Validators.required])
    })
  }

  devilFruitOptions(): Options {
    return {
      selector: 'Fruta do Diabo',
      control: this.skillsForm.get('devilFruit')!,
      options: [
        {
          name: 'Gomu Gomu no Mi',
          value: 'gomu-gomu-mi'
        },
        {
          name: 'Mera Mera no Mi',
          value: 'mera-mera-mi'
        }
      ]
    }
  }

  fightingStyleOptions(): Options {
    return {
      selector: 'Estilo de Luta',
      control: this.skillsForm.get('fightingStyle')!,
      options: [
        {
          name: 'Boxeador',
          value: 'punches'
        },
        {
          name: 'Perna Negra',
          value: 'kicks'
        },
        {
          name: 'Espadachim',
          value: 'swords'
        },
        {
          name: 'Bukijutsu',
          value: 'bladed-weapons'
        },
        {
          name: 'Armeiro',
          value: 'gunner'
        },
        {
          name: 'Karatê Tritão',
          value: 'gyojin-karate'
        },
        {
          name: 'Electro',
          value: 'electro'
        },
        {
          name: 'Okama Kenpo',
          value: 'okama-kenpo'
        }
      ]
    }
  }

  classOptions(): Options {
    return {
      selector: 'Classe',
      control: this.skillsForm.get('class')!,
      options: [
        {
          name: 'Samurai',
          value: 'samurai'
        },
        {
          name: 'Lutador',
          value: 'fighter'
        },
        {
          name: 'Atirador',
          value: 'shooter'
        },
        {
          name: 'Gladiador',
          value: 'gladiator'
        },
        {
          name: 'Assassino',
          value: 'assassin'
        }
      ]
    }
  }

  onSubmit() {
    this._router.navigate(['new-character', 'items']);
  }
}
