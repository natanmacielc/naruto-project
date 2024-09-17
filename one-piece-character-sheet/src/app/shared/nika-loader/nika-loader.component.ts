import {Component, inject} from '@angular/core';
import {Subject} from "rxjs";
import {NikaLoaderService} from "./nika-loader.service";
import {CommonModule} from "@angular/common";
import {NgxSpinnerModule} from "ngx-spinner";
import {SunWarriorComponent} from "../sun-warrior/sun-warrior.component";

@Component({
  selector: 'app-nika-loader',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule, SunWarriorComponent],
  templateUrl: './nika-loader.component.html',
  styleUrl: './nika-loader.component.scss'
})
export class NikaLoaderComponent {
}
