import { ZohoBooksClient } from '../src/api/client';
import { AuthConfig } from '../src/types';

describe('ZohoBooksClient', () => {
  let client: ZohoBooksClient;
  const authConfig: AuthConfig = {
    clientId: 'test_client_id',
    clientSecret: 'test_client_secret',
    redirectUri: 'http://localhost:3000/callback',
    scope: 'ZohoBooks.fullaccess.all',
  };

  beforeEach(() => {
    client = new ZohoBooksClient(authConfig);
  });

  describe('constructor', () => {
    it('should initialize with auth config', () => {
      expect(client).toBeDefined();
      expect(client.getAccessToken()).toBeUndefined();
    });
  });

  describe('setAccessToken', () => {
    it('should set access token', () => {
      const token = 'test_access_token';
      client.setAccessToken(token);
      expect(client.getAccessToken()).toBe(token);
    });
  });

  describe('setRefreshToken', () => {
    it('should set refresh token', () => {
      const token = 'test_refresh_token';
      client.setRefreshToken(token);
      expect(client.getRefreshToken()).toBe(token);
    });
  });

  describe('getAuthUrl', () => {
    it('should generate correct auth URL', () => {
      const authUrl = client.getAuthUrl();
      expect(authUrl).toContain('accounts.zoho.com/oauth/v2/auth');
      expect(authUrl).toContain('client_id=test_client_id');
      expect(authUrl).toContain('scope=ZohoBooks.fullaccess.all');
      expect(authUrl).toContain('redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback');
    });
  });
});
