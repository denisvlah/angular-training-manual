import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppAuthService } from '../../data/services/auth.service';
import { Router } from '@angular/router';
import { routes } from '../../app.routes';
import { environment } from '../../../environments/environment';

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
    let isPord = environment.production;
    if (!isPord) {
      this.form.setValue({ username: 'denis_vlah', password: 'CdgMjunXMX' })
    }
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
    } else {
      console.log('invalid form');
    }

  }

}
