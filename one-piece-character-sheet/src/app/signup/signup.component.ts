import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "../shared/header/header.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {NgOptimizedImage} from "@angular/common";
import {ShipComponent} from "./ship/ship.component";
import {SignupFormComponent} from "./signup-form/signup-form.component";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent, NgOptimizedImage, ShipComponent, SignupFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

}
