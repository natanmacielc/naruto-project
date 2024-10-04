import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {OpFormField} from "./op-form.component";

@Injectable()
export class OpFormService {
  private readonly fieldSource: BehaviorSubject<FieldSource> = new BehaviorSubject<any>({});

  public addField(field: FieldSource): void {
    this.fieldSource.next(field);
  }

  public addFields(formFields: OpFormField[]): void {
    this.toFieldSource(formFields)
      .forEach((fieldSource: FieldSource) => this.addField(fieldSource))
  }

  get field(): Observable<FieldSource> {
    return this.fieldSource.asObservable();
  }

  private toFieldSource(formFields: OpFormField[]): FieldSource[] {
    return formFields.map((formField: OpFormField, index: number) => {
      return {field: formField, index: index} as FieldSource
    });
  }
}

export interface FieldSource {
  field: OpFormField,
  index: number
}
