import { OnInit, Directive } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appBaseForm]'
})
export abstract class BaseFormDirective implements OnInit {

  myForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  abstract submit(): void;

  onSubmit(): void {
    if (this.myForm.valid) {
      this.myForm.get('');
      this.submit();
    } else {
      this.VerifyFormValidate(this.myForm);
    }
  }

  resetForm(): void {
    this.myForm.reset();
  }

  VerifyFormValidate(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach(element => {
      const control = formGroup.get(element);
      control.markAsDirty();
      control.markAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.VerifyFormValidate(control);
      }
    });
  }

  VerifyRequiredTouched(control: string): boolean {
    return (
      !this.myForm.get(control).valid &&
      (this.myForm.get(control).touched || this.myForm.get(control).dirty)
    );
  }
  VerifyRequired(control: string): boolean {
    return (
      this.myForm.get(control).hasError('required') &&
      (this.myForm.get(control).touched || this.myForm.get(control).dirty)
    );
  }
  VerifyEmailValid(control: string): boolean {
    const emailField = this.myForm.get('email');
    if (emailField.errors) {
      const errorLabel = 'email';
      return emailField.errors[errorLabel] && emailField.touched;
    }
  }

  cssErrorsApply(control: string): any {
    return {
      'has-error': this.VerifyRequiredTouched(control),
      'has-feedback': this.VerifyRequiredTouched(control)
    };
  }
}
