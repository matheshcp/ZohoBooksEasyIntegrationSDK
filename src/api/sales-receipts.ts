import { ZohoBooksClient } from './client';
import {
  SalesReceipt,
  CreateSalesReceiptRequest,
  ListFilters,
  PaginatedResponse,
  ApiResponse,
} from '../types';

export class SalesReceiptsAPI {
  constructor(private client: ZohoBooksClient) {}

  /**
   * Get all sales receipts with optional filters
   */
  async list(filters?: ListFilters): Promise<PaginatedResponse<SalesReceipt>> {
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
    const url = queryString ? `/salesreceipts?${queryString}` : '/salesreceipts';
    
    return this.client.get<PaginatedResponse<SalesReceipt>>(url);
  }

  /**
   * Get a specific sales receipt by ID
   */
  async get(salesReceiptId: string): Promise<SalesReceipt> {
    return this.client.get<SalesReceipt>(`/salesreceipts/${salesReceiptId}`);
  }

  /**
   * Create a new sales receipt
   */
  async create(salesReceiptData: CreateSalesReceiptRequest): Promise<ApiResponse<SalesReceipt>> {
    return this.client.post<ApiResponse<SalesReceipt>>('/salesreceipts', salesReceiptData);
  }

  /**
   * Update an existing sales receipt
   */
  async update(salesReceiptId: string, salesReceiptData: Partial<CreateSalesReceiptRequest>): Promise<ApiResponse<SalesReceipt>> {
    return this.client.put<ApiResponse<SalesReceipt>>(`/salesreceipts/${salesReceiptId}`, salesReceiptData);
  }

  /**
   * Delete a sales receipt
   */
  async delete(salesReceiptId: string): Promise<ApiResponse<{ salesreceipt_id: string }>> {
    return this.client.delete<ApiResponse<{ salesreceipt_id: string }>>(`/salesreceipts/${salesReceiptId}`);
  }

  /**
   * Mark a sales receipt as sent
   */
  async markAsSent(salesReceiptId: string): Promise<ApiResponse<SalesReceipt>> {
    return this.client.post<ApiResponse<SalesReceipt>>(`/salesreceipts/${salesReceiptId}/status/sent`);
  }

  /**
   * Mark a sales receipt as void
   */
  async markAsVoid(salesReceiptId: string): Promise<ApiResponse<SalesReceipt>> {
    return this.client.post<ApiResponse<SalesReceipt>>(`/salesreceipts/${salesReceiptId}/status/void`);
  }

  /**
   * Mark a sales receipt as draft
   */
  async markAsDraft(salesReceiptId: string): Promise<ApiResponse<SalesReceipt>> {
    return this.client.post<ApiResponse<SalesReceipt>>(`/salesreceipts/${salesReceiptId}/status/draft`);
  }

  /**
   * Email a sales receipt
   */
  async email(salesReceiptId: string, emailData: {
    to_mail_ids?: string[];
    cc_mail_ids?: string[];
    subject?: string;
    body?: string;
    send_from_org_email_id?: boolean;
    send_customer_statement?: boolean;
    send_attachment?: boolean;
  }): Promise<ApiResponse<{ message: string }>> {
    return this.client.post<ApiResponse<{ message: string }>>(`/salesreceipts/${salesReceiptId}/email`, emailData);
  }

  /**
   * Get sales receipt email content
   */
  async getEmailContent(salesReceiptId: string): Promise<ApiResponse<{
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
    }>>(`/salesreceipts/${salesReceiptId}/email`);
  }

  /**
   * Get sales receipt comments
   */
  async getComments(salesReceiptId: string): Promise<ApiResponse<Array<{
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
    }>>>(`/salesreceipts/${salesReceiptId}/comments`);
  }

  /**
   * Add a comment to a sales receipt
   */
  async addComment(salesReceiptId: string, description: string): Promise<ApiResponse<{
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
    }>>(`/salesreceipts/${salesReceiptId}/comments`, { description });
  }

  /**
   * Update a sales receipt comment
   */
  async updateComment(salesReceiptId: string, commentId: string, description: string): Promise<ApiResponse<{
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
    }>>(`/salesreceipts/${salesReceiptId}/comments/${commentId}`, { description });
  }

  /**
   * Delete a sales receipt comment
   */
  async deleteComment(salesReceiptId: string, commentId: string): Promise<ApiResponse<{
    comment_id: string;
  }>> {
    return this.client.delete<ApiResponse<{
      comment_id: string;
    }>>(`/salesreceipts/${salesReceiptId}/comments/${commentId}`);
  }

  /**
   * Get sales receipt templates
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
    }>>>(`/salesreceipts/templates`);
  }

  /**
   * Get sales receipt PDF
   */
  async getPDF(salesReceiptId: string): Promise<Blob> {
    const response = await this.client.get(`/salesreceipts/${salesReceiptId}/pdf`, {
      responseType: 'blob',
    });
    return response as unknown as Blob;
  }

  /**
   * Get sales receipt print URL
   */
  async getPrintURL(salesReceiptId: string): Promise<ApiResponse<{ print_url: string }>> {
    return this.client.get<ApiResponse<{ print_url: string }>>(`/salesreceipts/${salesReceiptId}/print`);
  }

  /**
   * Convert sales receipt to invoice
   */
  async convertToInvoice(salesReceiptId: string, invoiceData?: {
    invoice_number?: string;
    date?: string;
    due_date?: string;
    payment_terms?: number;
    notes?: string;
    terms?: string;
  }): Promise<ApiResponse<{
    invoice_id: string;
    invoice_number: string;
    date: string;
    due_date: string;
    customer_id: string;
    customer_name: string;
    total: number;
    balance: number;
    status: string;
  }>> {
    return this.client.post<ApiResponse<{
      invoice_id: string;
      invoice_number: string;
      date: string;
      due_date: string;
      customer_id: string;
      customer_name: string;
      total: number;
      balance: number;
      status: string;
    }>>(`/salesreceipts/${salesReceiptId}/converttoinvoice`, invoiceData);
  }

  /**
   * Convert sales receipt to credit note
   */
  async convertToCreditNote(salesReceiptId: string, creditNoteData?: {
    creditnote_number?: string;
    date?: string;
    notes?: string;
    terms?: string;
  }): Promise<ApiResponse<{
    creditnote_id: string;
    creditnote_number: string;
    date: string;
    customer_id: string;
    customer_name: string;
    total: number;
    balance: number;
    status: string;
  }>> {
    return this.client.post<ApiResponse<{
      creditnote_id: string;
      creditnote_number: string;
      date: string;
      customer_id: string;
      customer_name: string;
      total: number;
      balance: number;
      status: string;
    }>>(`/salesreceipts/${salesReceiptId}/converttocreditnote`, creditNoteData);
  }
}
