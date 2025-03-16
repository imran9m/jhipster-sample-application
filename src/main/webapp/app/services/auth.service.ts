import { Injectable, signal } from '@angular/core';
import { UserManager, User, WebStorageStateStore } from 'oidc-client-ts';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userManager: UserManager;
  user = signal<User | null>(null);

  constructor() {
    this.userManager = new UserManager({
      authority: 'http://localhost:8181/realms/master/', // Replace with your IdP
      client_id: 'Angular',
      redirect_uri: window.location.origin + '/signin-callback',
      response_type: 'code',
      scope: 'openid profile email',
      post_logout_redirect_uri: window.location.origin,
      userStore: new WebStorageStateStore({ store: window.localStorage })
    });

    this.loadUser();
  }

  async loadUser() {
    const user = await this.userManager.getUser();
    this.user.set(user);
  }

  async login() {
    await this.userManager.signinRedirect();
  }

  async logout() {
    await this.userManager.signoutRedirect();
  }

  async handleCallback() {
    const user = await this.userManager.signinCallback();
    this.user.set(user ?? null);
  }
}
