import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  userData = {
    ime: '',
    prezime: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  };

  errorMsg = '';
  successMsg = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.userData.password !== this.userData.confirmPassword) {
      this.errorMsg = 'Šifre se ne podudaraju!';
      return;
    }

    this.authService.register(this.userData).subscribe({
      next: (res) => {
        this.successMsg = 'Registracija uspješna! Prebacujem na login...';
        this.errorMsg = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.errorMsg = err.error.message || 'Greška pri registraciji';
        this.successMsg = '';
      }
    });
  }
}