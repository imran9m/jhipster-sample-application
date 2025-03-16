import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'jhi-signin-callback',
  template: `<p>Signing in...</p>`,
})
export class SigninCallbackComponent {
  constructor(private authService: AuthService, private router: Router) {
    this.authService.handleCallback().then(() => {
      this.router.navigate(['/home']);
    });
  }
}
