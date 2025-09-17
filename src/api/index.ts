import { ZohoBooksClient } from './client';
import { ContactsAPI } from './contacts';
import { InvoicesAPI } from './invoices';
import { CustomerPaymentsAPI } from './customer-payments';
import { SalesReceiptsAPI } from './sales-receipts';
import { AuthConfig } from '../types';

export class ZohoBooksSDK {
  public readonly contacts: ContactsAPI;
  public readonly invoices: InvoicesAPI;
  public readonly customerPayments: CustomerPaymentsAPI;
  public readonly salesReceipts: SalesReceiptsAPI;
  private client: ZohoBooksClient;

  constructor(authConfig: AuthConfig) {
    this.client = new ZohoBooksClient(authConfig);
    this.contacts = new ContactsAPI(this.client);
    this.invoices = new InvoicesAPI(this.client);
    this.customerPayments = new CustomerPaymentsAPI(this.client);
    this.salesReceipts = new SalesReceiptsAPI(this.client);
  }

  /**
   * Get the underlying client instance
   */
  public getClient(): ZohoBooksClient {
    return this.client;
  }

  /**
   * Set access token
   */
  public setAccessToken(token: string): void {
    this.client.setAccessToken(token);
  }

  /**
   * Set refresh token
   */
  public setRefreshToken(token: string): void {
    this.client.setRefreshToken(token);
  }

  /**
   * Get access token
   */
  public getAccessToken(): string | undefined {
    return this.client.getAccessToken();
  }

  /**
   * Get refresh token
   */
  public getRefreshToken(): string | undefined {
    return this.client.getRefreshToken();
  }

  /**
   * Refresh access token
   */
  public async refreshAccessToken(): Promise<any> {
    return this.client.refreshAccessToken();
  }

  /**
   * Get authorization URL
   */
  public getAuthUrl(): string {
    return this.client.getAuthUrl();
  }

  /**
   * Exchange authorization code for tokens
   */
  public async exchangeCodeForToken(code: string): Promise<any> {
    return this.client.exchangeCodeForToken(code);
  }
}

export { ZohoBooksClient } from './client';
export { ContactsAPI } from './contacts';
export { InvoicesAPI } from './invoices';
export { CustomerPaymentsAPI } from './customer-payments';
export { SalesReceiptsAPI } from './sales-receipts';
