import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Characters} from "./characters.model";

export const charactersResolver: ResolveFn<Characters> = (route, state) => {
  const http: HttpClient = inject<HttpClient>(HttpClient);
  return http.get('assets/data/personagens.json') as unknown as Characters;
};
