import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppAuthService } from '../../data/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface LoginData {
  username: string,
  password: string
}

export type LoginDataForm = {
  [field in keyof Partial<LoginData>]: FormControl<LoginData[field] | null>;
};

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  snackbar = inject(MatSnackBar);
  toglePasswordVisibility() {
    this.isPasswordVisible.set(!this.isPasswordVisible())
  }
  form = new FormGroup<LoginDataForm>({
    username: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(1)])
  });

  authService = inject(AppAuthService)
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  constructor() {    
  }

  isFormValid(){
    return this.form.valid;
  }

  isUserNameValid(){
    return this.form.get('username')?.valid;
  }


  onSubmit() {
    if (this.form.valid) {
      this.authService.login(
        {
          username: this.form.value.username!,
          password: this.form.value.password!
        }
      )
        .subscribe(r => this.router.navigate(['']));
    } 

  }

}
