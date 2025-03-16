import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule, MatSlideToggleModule, MatMenuModule, MatToolbarModule, MatIconModule, MatButtonModule],
  styleUrl: './navbar.component.css',
})
export class NavBarComponent implements OnInit {
  private storageKey = 'dark-mode';
  isDarkMode = signal(this.getStoredTheme());
  appName = signal('');

  constructor(public authService: AuthService) {
    this.applyTheme();
  }

  ngOnInit(): void {
    this.appName.set('jhipsterSampleApplication');
  }

  isAuthenticated(): boolean {
    return this.authService.user() ? !this.authService.user()?.expired: false;
  }

  toggleLogin() {
    this.authService.user() ? this.authService.logout() : this.authService.login();
  }

  toggleTheme() {
    this.isDarkMode.update((mode) => !mode);
    localStorage.setItem(this.storageKey, JSON.stringify(this.isDarkMode()));
    this.applyTheme();
  }

  private applyTheme() {
    document.body.classList.toggle('dark-mode', this.isDarkMode());
  }

  private getStoredTheme(): boolean {
    return JSON.parse(localStorage.getItem(this.storageKey) || 'false');
  }
}
