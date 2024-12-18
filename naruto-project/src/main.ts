import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {Amplify} from "aws-amplify";
import AWS_CONFIGURATION from "./aws.config";

Amplify.configure(AWS_CONFIGURATION);
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
