import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn
} from "@angular/forms";
import {InputComponent} from "../input/input.component";
import {PictureContainerComponent} from "../picture-container/picture-container.component";
import {Options, SelectComponent} from "../select/select.component";
import {NgForOf, NgIf, NgSwitch} from "@angular/common";
import {distinctUntilChanged} from "rxjs";
import {TextareaComponent} from "../textarea/textarea.component";
import {ValiditySpanComponent} from "../validity-span/validity-span.component";
import {FieldSource, OpFormService} from "./op-form.service";

@Component({
  selector: 'app-op-form',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    InputComponent,
    PictureContainerComponent,
    ReactiveFormsModule,
    SelectComponent,
    NgSwitch,
    NgForOf,
    NgIf,
    TextareaComponent,
    ValiditySpanComponent
  ],
  templateUrl: './op-form.component.html',
  styleUrl: './op-form.component.scss'
})
export class OpFormComponent implements OnInit {
  @Input() formFields: OpFormField[] = []
  @Output() validForm: EventEmitter<string[]> = new EventEmitter<string[]>();
  readonly opForm: FormGroup = new FormGroup({fields: new FormArray([])});
  readonly opFormService: OpFormService = inject(OpFormService);
  currentStep: number = 0;

  get formArray(): FormArray {
    return this.opForm.get('fields') as FormArray;
  }

  ngOnInit(): void {
    this.listenFieldSource();
    this.opFormService.addFields(this.formFields);
  }

  listenFieldSource(): void {
    this.opFormService.field
      .pipe(distinctUntilChanged())
      .subscribe((fieldSource: FieldSource) => {
        if (fieldSource.field) {
          const control: AbstractControl = this.formArray.controls[fieldSource.index]
          this.formFields[fieldSource.index] = fieldSource.field;
          if (control) {
            control.setValidators(fieldSource.field.validator!);
            this.validateChanges(control)
          } else {
            const formControl: FormControl = new FormControl('', fieldSource.field.validator || []);
            this.formArray.controls[fieldSource.index] = formControl;
            this.subscribeToChanges(formControl);
          }
        }
      })
  }

  onSelectChange(event: Event, change?: (event: Event) => FieldSource[]): void {
    if (change) {
      const fieldsSource: FieldSource[] = change(event);
      fieldsSource.forEach((fieldSource: FieldSource) => this.opFormService.addField(fieldSource))
    }
  }

  getOptions(index: number): Options {
    return {
      ...this.formFields[index].options!,
      control: this.formArray.controls[index]
    }
  }

  subscribeToChanges(control: FormControl) {
    control.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(() => this.validateChanges(control));
  }

  validateChanges(control: AbstractControl): void {
    control.updateValueAndValidity({onlySelf: true, emitEvent: false});
    this.formArray.updateValueAndValidity();
    const index: number = this.formArray.controls.indexOf(control);
    if (control.valid) {
      if (this.currentStep == index && !this.isLastField()) {
        this.currentStep++
        this.validateNext();
      } else {
        this.validForm.emit(this.formArray.value);
      }
    } else {
      this.currentStep = index;
    }
  }

  isLastField(): boolean {
    return this.currentStep === this.formArray.controls.length - 1;
  }

  validateNext(): void {
    const control: AbstractControl = this.formArray.controls[this.currentStep];
    this.validateChanges(control);
  }

  shouldShowField(index: number): boolean {
    return index <= this.currentStep;
  }
}

export interface OpFormField {
  type: 'input' | 'select' | 'textarea';
  name: string;
  warningMessage?: string;
  options?: Options;
  validator?: ValidatorFn[];
  keydown?: (event: KeyboardEvent) => void;
  change?: (event: Event) => FieldSource[];
}
