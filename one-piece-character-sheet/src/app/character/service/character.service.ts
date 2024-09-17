import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private characterDataSource = new BehaviorSubject<any>(null);
  characterData$ = this.characterDataSource.asObservable();

  setCharacterData(data: any): void {
    this.characterDataSource.next(data);
  }
}
