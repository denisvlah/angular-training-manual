import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppAuthService } from '../../data/services/auth.service';
import { Router } from '@angular/router';
import { routes } from '../../app.routes';

export interface LoginData{
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
  form = new FormGroup<LoginDataForm>({
    username: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(1)])
  });

  authService = inject(AppAuthService)
  router = inject(Router);


  onSubmit() {         
    if (this.form.invalid){
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
