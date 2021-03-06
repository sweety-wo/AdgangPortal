import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ForgotPasswordFormStateAction } from 'src/app/states/form';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { NgxSpinnerService } from 'ngx-spinner';
import { WizardValidationService } from '../form-elements/wizard/wizard-validation.service';
import { LanguageService } from 'src/app/services/language/language.service';



@Component({
  selector: 'az-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [WizardValidationService]
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public email: AbstractControl;

  constructor(public fb: FormBuilder,
    public _store: Store,
    public router: Router,
    public translate: TranslateService,
    public loader: NgxSpinnerService,
    public languageService: LanguageService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, WizardValidationService.emailValidator])],
    });
    this.email = this.form.controls['email']
  }

  ngOnInit() {
    this.languageService.getLanguage();
  }

  ngOnDestroy() {
    this.languageService.unSubscribeLanguage();
  }

  public onEmailSubmit(value: Object) {
    if (this.form.valid) {
      this.loader.show()
      this._store.dispatch(new ForgotPasswordFormStateAction(this.form.value));
      this.form.reset();
    }
  }

  public backtoLogin() {
    this.fnResetLoginFormState();
    this.router.navigate(['login'])
  }

  private fnResetLoginFormState() {
    this._store.dispatch(
      new UpdateFormValue({ value: {}, path: 'form.login' })
    );
  }

}
export function emailValidator(control: FormControl): { [key: string]: any } {
  var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
}