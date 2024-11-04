import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule, } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { O } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatCard, MatCardContent, MatCardTitle],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      console.log("entrando login", this.loginForm)
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Credenciales inválidas';
        }
      });
    }
  }
}
