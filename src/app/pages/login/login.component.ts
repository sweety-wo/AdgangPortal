import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'az-login',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public router: Router;
    public form: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;

    constructor(router: Router, fb: FormBuilder, public translate: TranslateService) {
        this.router = router;
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, emailValidator])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });

        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
        const lang = localStorage.getItem("language");
        translate.setDefaultLang(lang)
    }

    public onSubmit(values: Object): void {
        if (this.form.valid) {
            console.log(values);
            this.router.navigate(['pages/access']);
        }
    }
    changeLang(lang) {

        this.translate.setDefaultLang(lang);
        localStorage.setItem("language", lang);
    }

}

export function emailValidator(control: FormControl): { [key: string]: any } {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}

