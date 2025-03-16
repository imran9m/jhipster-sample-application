import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'jhi-home',
  imports: [CommonModule], // Import CommonModule for pipes like 'json'
  template: `
    <div style="width: 100%;text-align: center;margin-top: 70px;" *ngIf="authService.user(); else loginPrompt">
      <h2>Welcome {{ this.authService.user()?.profile?.preferred_username }}!</h2>
    </div>
    <ng-template #loginPrompt>
      <p>Please log in to view this content.</p>
    </ng-template>
  `,
})
export class HomeComponent {
  constructor(public authService: AuthService) {}
}
