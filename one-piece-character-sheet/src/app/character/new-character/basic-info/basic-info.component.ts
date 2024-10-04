import {Component, inject} from '@angular/core';
import {ReactiveFormsModule, Validators} from "@angular/forms";
import {HeaderComponent} from "../../../shared/header/header.component";
import {FooterComponent} from "../../../shared/footer/footer.component";
import {OpContainerComponent} from "../../../shared/op-container/op-container.component";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {PictureContainerComponent} from "../../../shared/picture-container/picture-container.component";
import {Router} from "@angular/router";
import {TitleComponent} from "../../../shared/title/title.component";
import {InputComponent} from "../../../shared/input/input.component";
import {SelectComponent} from "../../../shared/select/select.component";
import {ButtonComponent} from "../../../shared/button/button.component";
import {OpFormComponent, OpFormField} from "../../../shared/op-form/op-form.component";
import {ageValidator, minMaxValidator, validateNumberInput, validatePhysicalInput} from "./basic-info.validators";
import {FieldSource, OpFormService} from "../../../shared/op-form/op-form.service";

@Component({
  selector: 'app-basic-info',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    OpContainerComponent,
    NgIf,
    NgOptimizedImage,
    PictureContainerComponent,
    NgClass,
    TitleComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    OpFormComponent
  ],
  providers: [OpFormService],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.scss'
})
export class BasicInfoComponent {
  private readonly _router: Router = inject(Router);
  readonly basicInfoFields: OpFormField[] = [
    {
      type: 'input',
      name: 'Nome',
      warningMessage: 'O nome não pode ser em branco',
      validator: [Validators.required, Validators.pattern(/^(?!\s*$).+/), Validators.maxLength(20)]
    },
    {
      type: 'input',
      name: 'Título',
      warningMessage: 'O título não pode ser em branco',
      validator: [Validators.required, Validators.pattern(/^(?!\s*$).+/), Validators.maxLength(20)]
    },
    {
      type: 'input',
      name: 'Idade',
      keydown: validateNumberInput,
      warningMessage: 'A idade deve ser entre 8 e 140 anos',
      validator: [Validators.required, ageValidator()]
    },
    {
      type: 'select',
      name: 'Raça',
      validator: [Validators.required],
      change: this.addPhysicalInfo,
      options: {
        selector: 'Raça',
        options: [
          {
            name: 'Humano',
            value: 'human'
          },
          {
            name: 'Homem-Peixe',
            value: 'fishman'
          },
          {
            name: 'Sereiano',
            value: 'merman'
          },
          {
            name: 'Lunaria',
            value: 'lunarian'
          },
          {
            name: 'Gigante',
            value: 'giant'
          },
          {
            name: 'Anão',
            value: 'dwarf'
          },
          {
            name: 'Mink',
            value: 'mink'
          },
          {
            name: 'Oni',
            value: 'oni'
          }
        ]
      }
    },
    {
      type: 'select',
      name: 'Afiliação',
      validator: [Validators.required],
      options: {
        selector: 'Afiliação',
        options: [
          {
            name: 'Pirata',
            value: 'pirate'
          },
          {
            name: 'Marinha',
            value: 'marine'
          },
          {
            name: 'Exército Revolucionário',
            value: 'revolutionary-army'
          }
        ]
      }
    },
    {
      type: 'select',
      name: 'Mar de Origem',
      validator: [Validators.required],
      options: {
        selector: 'Mar de Origem',
        options: [
          {
            name: 'Mar do Norte',
            value: 'north-blue'
          },
          {
            name: 'Mar do Oeste',
            value: 'west-blue'
          },
          {
            name: 'Mar do Leste',
            value: 'east-blue'
          },
          {
            name: 'Mar do Sul',
            value: 'south-blue'
          },
          {
            name: 'Grande Rota',
            value: 'grand-line'
          },
          {
            name: 'Novo Mundo',
            value: 'new-world'
          }
        ]
      }
    },
    {
      type: 'textarea',
      name: 'Biografia',
      warningMessage: 'A biografia não pode ser em branco',
      validator: [Validators.required, Validators.pattern(/^(?!\s*$).+/), Validators.maxLength(1000)]
    },
    {
      type: 'textarea',
      name: 'Personalidade',
      warningMessage: 'A personalidade não pode ser em branco',
      validator: [Validators.required, Validators.pattern(/^(?!\s*$).+/), Validators.maxLength(500)]
    }
  ];
  private static readonly racePhysicalDelimiters: Map<string, Physical> = new Map([
    ['human', {height: {min: 1.50, max: 2.50}, weight: {min: 50, max: 150}}],
    ['fishman', {height: {min: 2.00, max: 4.00}, weight: {min: 300, max: 600}}],
    ['merman', {height: {min: 2.00, max: 4.00}, weight: {min: 300, max: 500}}],
    ['lunarian', {height: {min: 5, max: 7}, weight: {min: 800, max: 1500}}],
    ['giant', {height: {min: 10, max: 22.00}, weight: {min: 3000, max: 10000}}],
    ['dwarf', {height: {min: 0.10, max: 0.50}, weight: {min: 1, max: 5}}],
    ['mink', {height: {min: 1.60, max: 3.00}, weight: {min: 60, max: 300}}],
    ['oni', {height: {min: 5.00, max: 17.00}, weight: {min: 1200, max: 8000}}]
  ]);

  addPhysicalInfo(event: Event): FieldSource[] {
    const select: HTMLSelectElement = event.target as HTMLSelectElement;
    const race: string = select.value;
    const physicalDelimiter: Physical = BasicInfoComponent.racePhysicalDelimiters.get(race)!;
    const physicalInfo: OpFormField[] = [
      {
        type: 'input',
        name: 'Altura',
        keydown: validatePhysicalInput,
        warningMessage: `A altura deve ser entre ${physicalDelimiter.height.min}m e ${physicalDelimiter.height.max}m`,
        validator: [Validators.required, minMaxValidator({
          min: physicalDelimiter.height.min,
          max: physicalDelimiter.height.max
        })]
      },
      {
        type: 'input',
        name: 'Peso',
        keydown: validatePhysicalInput,
        warningMessage: `O peso deve ser entre ${physicalDelimiter.weight.min}kg e ${physicalDelimiter.weight.max}kg`,
        validator: [Validators.required, minMaxValidator({
          min: physicalDelimiter.weight.min,
          max: physicalDelimiter.weight.max
        })]
      }
    ]
    return [
      {
        field: physicalInfo[0],
        index: 8
      },
      {
        field: physicalInfo[1],
        index: 9
      },
    ];
  }

  onSubmit() {
    this._router.navigate(['new-character', 'skills'])
  }
}

export interface MinMax {
  min: number,
  max: number
}

interface Physical {
  height: MinMax;
  weight: MinMax;
}
