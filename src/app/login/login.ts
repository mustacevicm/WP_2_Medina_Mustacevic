import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (user) => {
          console.log("Uspješan login:", user);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error("Greška:", err);
          this.errorMsg = err.error.message || 'Greška pri prijavi';
        }
      });
  }
}