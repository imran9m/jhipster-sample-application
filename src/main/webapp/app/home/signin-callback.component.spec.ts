import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SigninCallbackComponent } from './signin-callback.component';
import { AuthService } from '../services/auth.service';

jest.mock('../services/auth.service');

describe('SigninCallbackComponent', () => {
  let component: SigninCallbackComponent;
  let fixture: ComponentFixture<SigninCallbackComponent>;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(async () => {
    mockAuthService = { handleCallback: jest.fn().mockResolvedValue(undefined) } as unknown as jest.Mocked<AuthService>;
    mockRouter = { navigate: jest.fn() } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ],
      imports: [SigninCallbackComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SigninCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call handleCallback on initialization and navigate to /home', async () => {
    expect(mockAuthService.handleCallback).toHaveBeenCalled();
    await fixture.whenStable(); // Wait for promises to resolve
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
});
