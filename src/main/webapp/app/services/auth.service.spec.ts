import { AuthService } from './auth.service';
import { UserManager, User } from 'oidc-client-ts';

jest.mock('oidc-client-ts', () => ({
  UserManager: jest.fn().mockImplementation(() => ({
    getUser: jest.fn(),
    signinRedirect: jest.fn(),
    signoutRedirect: jest.fn(),
    signinCallback: jest.fn()
  })),
  WebStorageStateStore: jest.fn()
}));

describe('AuthService', () => {
  let service: AuthService;
  let mockUserManager: jest.Mocked<UserManager>;
  
  beforeEach(() => {
    mockUserManager = new UserManager({
      authority: '',
      client_id: '',
      redirect_uri: '',
      response_type: '',
      scope: '',
      post_logout_redirect_uri: ''
    }) as jest.Mocked<UserManager>;
    
    service = new AuthService();
    (service as any).userManager = mockUserManager;
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load user on initialization', async () => {
    const mockUser: User = { profile: { name: 'Test User' }, expired: false } as User;
    mockUserManager.getUser.mockResolvedValue(mockUser);
    await service.loadUser();
    expect(mockUserManager.getUser).toHaveBeenCalled();
    expect(service.user()).toEqual(mockUser);
  });

  it('should set user to null if no user is found', async () => {
    mockUserManager.getUser.mockResolvedValue(null);
    await service.loadUser();
    expect(service.user()).toBeNull();
  });

  it('should call signinRedirect on login', async () => {
    await service.login();
    expect(mockUserManager.signinRedirect).toHaveBeenCalled();
  });

  it('should call signoutRedirect on logout', async () => {
    await service.logout();
    expect(mockUserManager.signoutRedirect).toHaveBeenCalled();
  });

  it('should handle callback and set user', async () => {
    const mockUser: User = { profile: { name: 'Test User' }, expired: false } as User;
    mockUserManager.signinCallback.mockResolvedValue(mockUser);
    await service.handleCallback();
    expect(mockUserManager.signinCallback).toHaveBeenCalled();
    expect(service.user()).toEqual(mockUser);
  });

  it('should set user to null if callback returns undefined', async () => {
    mockUserManager.signinCallback.mockResolvedValue(undefined);
    await service.handleCallback();
    expect(service.user()).toBeNull();
  });
});
