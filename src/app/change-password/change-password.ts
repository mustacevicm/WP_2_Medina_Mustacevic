import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePasswordComponent {
  passwordData = {
    old_password: '',
    new_password: '',
    confirm_new_password: ''
  };

  message = '';
  isError = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.passwordData.new_password !== this.passwordData.confirm_new_password) {
      this.message = 'Nove šifre se ne podudaraju!';
      this.isError = true;
      return;
    }

    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    const apiData = {
      id: currentUser.id,
      old_password: this.passwordData.old_password,
      new_password: this.passwordData.new_password
    };

    this.authService.changePassword(apiData).subscribe({
      next: (res) => {
        this.message = 'Šifra uspješno promijenjena!';
        this.isError = false;
        this.passwordData = { old_password: '', new_password: '', confirm_new_password: '' };
      },
      error: (err) => {
        this.message = err.error.message || 'Greška pri promjeni šifre.';
        this.isError = true;
      }
    });
  }
}