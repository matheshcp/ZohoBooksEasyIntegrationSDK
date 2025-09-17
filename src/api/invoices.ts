import { ZohoBooksClient } from './client';
import {
  Invoice,
  CreateInvoiceRequest,
  ListFilters,
  PaginatedResponse,
  ApiResponse,
} from '../types';

export class InvoicesAPI {
  constructor(private client: ZohoBooksClient) {}

  /**
   * Get all invoices with optional filters
   */
  async list(filters?: ListFilters): Promise<PaginatedResponse<Invoice>> {
    const params = new URLSearchParams();
    
    if (filters) {
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.per_page) params.append('per_page', filters.per_page.toString());
      if (filters.sort_column) params.append('sort_column', filters.sort_column);
      if (filters.sort_order) params.append('sort_order', filters.sort_order);
      if (filters.search_text) params.append('search_text', filters.search_text);
      if (filters.filter_by) params.append('filter_by', filters.filter_by);
      if (filters.search_criteria) {
        filters.search_criteria.forEach((criteria, index) => {
          params.append(`search_criteria[${index}][search_text]`, criteria.search_text);
          params.append(`search_criteria[${index}][search_operator]`, criteria.search_operator);
        });
      }
    }

    const queryString = params.toString();
    const url = queryString ? `/invoices?${queryString}` : '/invoices';
    
    return this.client.get<PaginatedResponse<Invoice>>(url);
  }

  /**
   * Get a specific invoice by ID
   */
  async get(invoiceId: string): Promise<Invoice> {
    return this.client.get<Invoice>(`/invoices/${invoiceId}`);
  }

  /**
   * Create a new invoice
   */
  async create(invoiceData: CreateInvoiceRequest): Promise<ApiResponse<Invoice>> {
    return this.client.post<ApiResponse<Invoice>>('/invoices', invoiceData);
  }

  /**
   * Update an existing invoice
   */
  async update(invoiceId: string, invoiceData: Partial<CreateInvoiceRequest>): Promise<ApiResponse<Invoice>> {
    return this.client.put<ApiResponse<Invoice>>(`/invoices/${invoiceId}`, invoiceData);
  }

  /**
   * Delete an invoice
   */
  async delete(invoiceId: string): Promise<ApiResponse<{ invoice_id: string }>> {
    return this.client.delete<ApiResponse<{ invoice_id: string }>>(`/invoices/${invoiceId}`);
  }

  /**
   * Mark an invoice as sent
   */
  async markAsSent(invoiceId: string): Promise<ApiResponse<Invoice>> {
    return this.client.post<ApiResponse<Invoice>>(`/invoices/${invoiceId}/status/sent`);
  }

  /**
   * Mark an invoice as void
   */
  async markAsVoid(invoiceId: string): Promise<ApiResponse<Invoice>> {
    return this.client.post<ApiResponse<Invoice>>(`/invoices/${invoiceId}/status/void`);
  }

  /**
   * Mark an invoice as draft
   */
  async markAsDraft(invoiceId: string): Promise<ApiResponse<Invoice>> {
    return this.client.post<ApiResponse<Invoice>>(`/invoices/${invoiceId}/status/draft`);
  }

  /**
   * Email an invoice
   */
  async email(invoiceId: string, emailData: {
    to_mail_ids?: string[];
    cc_mail_ids?: string[];
    subject?: string;
    body?: string;
    send_from_org_email_id?: boolean;
    send_customer_statement?: boolean;
    send_attachment?: boolean;
  }): Promise<ApiResponse<{ message: string }>> {
    return this.client.post<ApiResponse<{ message: string }>>(`/invoices/${invoiceId}/email`, emailData);
  }

  /**
   * Get invoice email content
   */
  async getEmailContent(invoiceId: string): Promise<ApiResponse<{
    subject: string;
    body: string;
    email_template_id: string;
    email_template_name: string;
  }>> {
    return this.client.get<ApiResponse<{
      subject: string;
      body: string;
      email_template_id: string;
      email_template_name: string;
    }>>(`/invoices/${invoiceId}/email`);
  }

  /**
   * Send invoice reminder
   */
  async sendReminder(invoiceId: string, reminderData: {
    reminder_type: 'overdue' | 'reminder';
    subject?: string;
    body?: string;
    send_from_org_email_id?: boolean;
  }): Promise<ApiResponse<{ message: string }>> {
    return this.client.post<ApiResponse<{ message: string }>>(`/invoices/${invoiceId}/reminder`, reminderData);
  }

  /**
   * Get invoice comments
   */
  async getComments(invoiceId: string): Promise<ApiResponse<Array<{
    comment_id: string;
    description: string;
    commented_by: string;
    commented_by_id: string;
    comment_date: string;
    comment_date_formatted: string;
  }>>> {
    return this.client.get<ApiResponse<Array<{
      comment_id: string;
      description: string;
      commented_by: string;
      commented_by_id: string;
      comment_date: string;
      comment_date_formatted: string;
    }>>>(`/invoices/${invoiceId}/comments`);
  }

  /**
   * Add a comment to an invoice
   */
  async addComment(invoiceId: string, description: string): Promise<ApiResponse<{
    comment_id: string;
    description: string;
    commented_by: string;
    commented_by_id: string;
    comment_date: string;
    comment_date_formatted: string;
  }>> {
    return this.client.post<ApiResponse<{
      comment_id: string;
      description: string;
      commented_by: string;
      commented_by_id: string;
      comment_date: string;
      comment_date_formatted: string;
    }>>(`/invoices/${invoiceId}/comments`, { description });
  }

  /**
   * Update an invoice comment
   */
  async updateComment(invoiceId: string, commentId: string, description: string): Promise<ApiResponse<{
    comment_id: string;
    description: string;
    commented_by: string;
    commented_by_id: string;
    comment_date: string;
    comment_date_formatted: string;
  }>> {
    return this.client.put<ApiResponse<{
      comment_id: string;
      description: string;
      commented_by: string;
      commented_by_id: string;
      comment_date: string;
      comment_date_formatted: string;
    }>>(`/invoices/${invoiceId}/comments/${commentId}`, { description });
  }

  /**
   * Delete an invoice comment
   */
  async deleteComment(invoiceId: string, commentId: string): Promise<ApiResponse<{
    comment_id: string;
  }>> {
    return this.client.delete<ApiResponse<{
      comment_id: string;
    }>>(`/invoices/${invoiceId}/comments/${commentId}`);
  }

  /**
   * Get invoice payment details
   */
  async getPayments(invoiceId: string): Promise<ApiResponse<Array<{
    payment_id: string;
    payment_number: string;
    payment_mode: string;
    payment_date: string;
    payment_date_formatted: string;
    amount: number;
    amount_formatted: string;
    reference_number: string;
    description: string;
    account_id: string;
    account_name: string;
    customer_id: string;
    customer_name: string;
    created_time: string;
    last_modified_time: string;
  }>>> {
    return this.client.get<ApiResponse<Array<{
      payment_id: string;
      payment_number: string;
      payment_mode: string;
      payment_date: string;
      payment_date_formatted: string;
      amount: number;
      amount_formatted: string;
      reference_number: string;
      description: string;
      account_id: string;
      account_name: string;
      customer_id: string;
      customer_name: string;
      created_time: string;
      last_modified_time: string;
    }>>>(`/invoices/${invoiceId}/payments`);
  }

  /**
   * Apply credits to an invoice
   */
  async applyCredits(invoiceId: string, creditsData: {
    credits: Array<{
      creditnote_id: string;
      amount_applied: number;
    }>;
  }): Promise<ApiResponse<Invoice>> {
    return this.client.post<ApiResponse<Invoice>>(`/invoices/${invoiceId}/credits`, creditsData);
  }

  /**
   * Delete applied credits from an invoice
   */
  async deleteAppliedCredits(invoiceId: string, creditId: string): Promise<ApiResponse<Invoice>> {
    return this.client.delete<ApiResponse<Invoice>>(`/invoices/${invoiceId}/credits/${creditId}`);
  }

  /**
   * Get invoice templates
   */
  async getTemplates(): Promise<ApiResponse<Array<{
    template_id: string;
    template_name: string;
    template_type: string;
    created_time: string;
    last_modified_time: string;
  }>>> {
    return this.client.get<ApiResponse<Array<{
      template_id: string;
      template_name: string;
      template_type: string;
      created_time: string;
      last_modified_time: string;
    }>>>(`/invoices/templates`);
  }

  /**
   * Get invoice PDF
   */
  async getPDF(invoiceId: string): Promise<Blob> {
    const response = await this.client.get(`/invoices/${invoiceId}/pdf`, {
      responseType: 'blob',
    });
    return response as unknown as Blob;
  }

  /**
   * Get invoice print URL
   */
  async getPrintURL(invoiceId: string): Promise<ApiResponse<{ print_url: string }>> {
    return this.client.get<ApiResponse<{ print_url: string }>>(`/invoices/${invoiceId}/print`);
  }
}
