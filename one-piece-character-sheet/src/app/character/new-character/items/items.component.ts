import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../../shared/header/header.component";
import {OpContainerComponent} from "../../../shared/op-container/op-container.component";
import {FooterComponent} from "../../../shared/footer/footer.component";
import {TitleComponent} from "../../../shared/title/title.component";
import {ButtonComponent} from "../../../shared/button/button.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Options, SelectComponent} from "../../../shared/select/select.component";

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    HeaderComponent,
    OpContainerComponent,
    FooterComponent,
    TitleComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    SelectComponent
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {
  itemsForm!: FormGroup;

  ngOnInit(): void {
    this.itemsForm = new FormGroup({
      weapon: new FormControl('', [Validators.required]),
      ship: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {

  }

  weaponOptions(): Options {
    return {
      selector: 'Arma',
      control: this.itemsForm.get('weapon')!,
      options: [
        {
          name: 'Espada',
          value: 'sword'
        },
        {
          name: 'Machado',
          value: 'axe'
        },
        {
          name: 'Adaga',
          value: 'dagger'
        },
        {
          name: 'Lança',
          value: 'spear'
        },
        {
          name: 'Pistola',
          value: 'pistol'
        },
        {
          name: 'Arco',
          value: 'bow'
        },
      ]
    };
  }

  shipOptions(): Options {
    return {
      selector: 'Embarcação',
      control: this.itemsForm.get('ship')!,
      options: [
        {
          name: 'Submarino Pequeno',
          value: 'small-submarine'
        },
        {
          name: 'Caravela Grande',
          value: 'big-caravel'
        }
      ]
    };
  }
}
