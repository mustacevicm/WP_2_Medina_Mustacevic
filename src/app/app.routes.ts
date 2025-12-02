import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { ChangePasswordComponent } from './change-password/change-password';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'change-password', component: ChangePasswordComponent },
    { path: '**', redirectTo: '' }
];