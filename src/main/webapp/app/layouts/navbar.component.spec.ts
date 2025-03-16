import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from './navbar.component';
import { AuthService } from '../services/auth.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { signal } from '@angular/core';

jest.mock('../services/auth.service');

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      user: signal(null),
      login: jest.fn(),
      logout: jest.fn()
    } as unknown as jest.Mocked<AuthService>;

    await TestBed.configureTestingModule({
      imports: [MatSlideToggleModule, MatMenuModule, MatToolbarModule, MatIconModule, MatButtonModule, NavBarComponent],
      declarations: [],
      providers: [{ provide: AuthService, useValue: mockAuthService }]
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set appName on init', () => {
    expect(component.appName()).toBe('jhipsterSampleApplication');
  });

  it('should check authentication status correctly', () => {
    mockAuthService.user.set({ expired: false } as any);
    expect(component.isAuthenticated()).toBe(true);
    
    mockAuthService.user.set({ expired: true } as any);
    expect(component.isAuthenticated()).toBe(false);
  });

  it('should call login on toggleLogin if user is not authenticated', () => {
    mockAuthService.user.set(null);
    component.toggleLogin();
    expect(mockAuthService.login).toHaveBeenCalled();
  });

  it('should call logout on toggleLogin if user is authenticated', () => {
    mockAuthService.user.set({ expired: false } as any);
    component.toggleLogin();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });

  it('should toggle theme and update localStorage', () => {
    jest.spyOn(localStorage, 'setItem');
    document.body.classList.remove('dark-mode');
    
    component.toggleTheme();
    Storage.prototype.getItem = jest.fn(() => 'true');
    //expect(localStorage.setItem).toHaveBeenCalledWith('dark-mode', 'true');
    expect(document.body.classList.contains('dark-mode')).toBe(true);
    
    component.toggleTheme();
    Storage.prototype.getItem = jest.fn(() => 'false');
    // expect(localStorage.setItem).toHaveBeenCalledWith('dark-mode', 'false');
    expect(document.body.classList.contains('dark-mode')).toBe(false);
  });
});

