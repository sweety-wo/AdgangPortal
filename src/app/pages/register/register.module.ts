import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { TranslateModule } from '@ngx-translate/core';

export const routes = [
  { path: '', component: RegisterComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  declarations: [RegisterComponent],
  exports: [TranslateModule]
})
export class RegisterModule { }