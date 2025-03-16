import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninCallbackComponent } from './home/signin-callback.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signin-callback', component: SigninCallbackComponent },
  { path: '**', redirectTo: 'home' }
];
