import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AuthConfig, TokenResponse, ZohoBooksSDKError } from '../types';

export class ZohoBooksClient {
  private client: AxiosInstance;
  private authConfig: AuthConfig;
  private baseURL = 'https://books.zoho.com/api/v3';

  constructor(authConfig: AuthConfig) {
    this.authConfig = authConfig;
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        if (this.authConfig.accessToken) {
          config.headers.Authorization = `Zoho-oauthtoken ${this.authConfig.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        if (error.response) {
          const { status, data } = error.response;
          const message = data?.message || error.message || 'An error occurred';
          throw new ZohoBooksSDKError(message, status, data);
        } else if (error.request) {
          throw new ZohoBooksSDKError('Network error: No response received', 0);
        } else {
          throw new ZohoBooksSDKError(error.message, 0);
        }
      }
    );
  }

  public async refreshAccessToken(): Promise<TokenResponse> {
    if (!this.authConfig.refreshToken) {
      throw new ZohoBooksSDKError('Refresh token is required for token refresh');
    }

    try {
      const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', {
        refresh_token: this.authConfig.refreshToken,
        client_id: this.authConfig.clientId,
        client_secret: this.authConfig.clientSecret,
        grant_type: 'refresh_token',
      });

      const tokenData: TokenResponse = response.data;
      this.authConfig.accessToken = tokenData.access_token;
      this.authConfig.refreshToken = tokenData.refresh_token;

      return tokenData;
    } catch (error: any) {
      throw new ZohoBooksSDKError(
        'Failed to refresh access token',
        error.response?.status || 0,
        error.response?.data
      );
    }
  }

  public setAccessToken(token: string): void {
    this.authConfig.accessToken = token;
  }

  public setRefreshToken(token: string): void {
    this.authConfig.refreshToken = token;
  }

  public getAccessToken(): string | undefined {
    return this.authConfig.accessToken;
  }

  public getRefreshToken(): string | undefined {
    return this.authConfig.refreshToken;
  }

  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.get<T>(url, config);
      return response.data;
    } catch (error) {
      if (error instanceof ZohoBooksSDKError) {
        throw error;
      }
      throw new ZohoBooksSDKError('GET request failed', 0, error);
    }
  }

  public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      if (error instanceof ZohoBooksSDKError) {
        throw error;
      }
      throw new ZohoBooksSDKError('POST request failed', 0, error);
    }
  }

  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      if (error instanceof ZohoBooksSDKError) {
        throw error;
      }
      throw new ZohoBooksSDKError('PUT request failed', 0, error);
    }
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.delete<T>(url, config);
      return response.data;
    } catch (error) {
      if (error instanceof ZohoBooksSDKError) {
        throw error;
      }
      throw new ZohoBooksSDKError('DELETE request failed', 0, error);
    }
  }

  public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      if (error instanceof ZohoBooksSDKError) {
        throw error;
      }
      throw new ZohoBooksSDKError('PATCH request failed', 0, error);
    }
  }

  public getAuthUrl(): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.authConfig.clientId,
      scope: this.authConfig.scope,
      redirect_uri: this.authConfig.redirectUri,
      access_type: 'offline',
    });

    return `https://accounts.zoho.com/oauth/v2/auth?${params.toString()}`;
  }

  public async exchangeCodeForToken(code: string): Promise<TokenResponse> {
    try {
      const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', {
        code,
        client_id: this.authConfig.clientId,
        client_secret: this.authConfig.clientSecret,
        redirect_uri: this.authConfig.redirectUri,
        grant_type: 'authorization_code',
      });

      const tokenData: TokenResponse = response.data;
      this.authConfig.accessToken = tokenData.access_token;
      this.authConfig.refreshToken = tokenData.refresh_token;

      return tokenData;
    } catch (error: any) {
      throw new ZohoBooksSDKError(
        'Failed to exchange code for token',
        error.response?.status || 0,
        error.response?.data
      );
    }
  }
}
