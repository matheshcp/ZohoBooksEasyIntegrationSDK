import { ZohoBooksClient } from './client';
import {
  CustomerPayment,
  CreateCustomerPaymentRequest,
  ListFilters,
  PaginatedResponse,
  ApiResponse,
} from '../types';

export class CustomerPaymentsAPI {
  constructor(private client: ZohoBooksClient) {}

  /**
   * Get all customer payments with optional filters
   */
  async list(filters?: ListFilters): Promise<PaginatedResponse<CustomerPayment>> {
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
    const url = queryString ? `/customerpayments?${queryString}` : '/customerpayments';
    
    return this.client.get<PaginatedResponse<CustomerPayment>>(url);
  }

  /**
   * Get a specific customer payment by ID
   */
  async get(paymentId: string): Promise<CustomerPayment> {
    return this.client.get<CustomerPayment>(`/customerpayments/${paymentId}`);
  }

  /**
   * Create a new customer payment
   */
  async create(paymentData: CreateCustomerPaymentRequest): Promise<ApiResponse<CustomerPayment>> {
    return this.client.post<ApiResponse<CustomerPayment>>('/customerpayments', paymentData);
  }

  /**
   * Update an existing customer payment
   */
  async update(paymentId: string, paymentData: Partial<CreateCustomerPaymentRequest>): Promise<ApiResponse<CustomerPayment>> {
    return this.client.put<ApiResponse<CustomerPayment>>(`/customerpayments/${paymentId}`, paymentData);
  }

  /**
   * Delete a customer payment
   */
  async delete(paymentId: string): Promise<ApiResponse<{ payment_id: string }>> {
    return this.client.delete<ApiResponse<{ payment_id: string }>>(`/customerpayments/${paymentId}`);
  }

  /**
   * Get payment comments
   */
  async getComments(paymentId: string): Promise<ApiResponse<Array<{
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
    }>>>(`/customerpayments/${paymentId}/comments`);
  }

  /**
   * Add a comment to a payment
   */
  async addComment(paymentId: string, description: string): Promise<ApiResponse<{
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
    }>>(`/customerpayments/${paymentId}/comments`, { description });
  }

  /**
   * Update a payment comment
   */
  async updateComment(paymentId: string, commentId: string, description: string): Promise<ApiResponse<{
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
    }>>(`/customerpayments/${paymentId}/comments/${commentId}`, { description });
  }

  /**
   * Delete a payment comment
   */
  async deleteComment(paymentId: string, commentId: string): Promise<ApiResponse<{
    comment_id: string;
  }>> {
    return this.client.delete<ApiResponse<{
      comment_id: string;
    }>>(`/customerpayments/${paymentId}/comments/${commentId}`);
  }

  /**
   * Get payment refunds
   */
  async getRefunds(paymentId: string): Promise<ApiResponse<Array<{
    refund_id: string;
    refund_number: string;
    refund_mode: string;
    refund_date: string;
    refund_date_formatted: string;
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
      refund_id: string;
      refund_number: string;
      refund_mode: string;
      refund_date: string;
      refund_date_formatted: string;
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
    }>>>(`/customerpayments/${paymentId}/refunds`);
  }

  /**
   * Create a payment refund
   */
  async createRefund(paymentId: string, refundData: {
    refund_mode: string;
    amount: number;
    date: string;
    reference_number?: string;
    description?: string;
    account_id?: string;
  }): Promise<ApiResponse<{
    refund_id: string;
    refund_number: string;
    refund_mode: string;
    refund_date: string;
    refund_date_formatted: string;
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
  }>> {
    return this.client.post<ApiResponse<{
      refund_id: string;
      refund_number: string;
      refund_mode: string;
      refund_date: string;
      refund_date_formatted: string;
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
    }>>(`/customerpayments/${paymentId}/refunds`, refundData);
  }

  /**
   * Get payment PDF
   */
  async getPDF(paymentId: string): Promise<Blob> {
    const response = await this.client.get(`/customerpayments/${paymentId}/pdf`, {
      responseType: 'blob',
    });
    return response as unknown as Blob;
  }

  /**
   * Get payment print URL
   */
  async getPrintURL(paymentId: string): Promise<ApiResponse<{ print_url: string }>> {
    return this.client.get<ApiResponse<{ print_url: string }>>(`/customerpayments/${paymentId}/print`);
  }

  /**
   * Get payment modes
   */
  async getPaymentModes(): Promise<ApiResponse<Array<{
    payment_mode_id: string;
    payment_mode_name: string;
    payment_mode_type: string;
    is_default: boolean;
    is_offline: boolean;
    is_online: boolean;
    created_time: string;
    last_modified_time: string;
  }>>> {
    return this.client.get<ApiResponse<Array<{
      payment_mode_id: string;
      payment_mode_name: string;
      payment_mode_type: string;
      is_default: boolean;
      is_offline: boolean;
      is_online: boolean;
      created_time: string;
      last_modified_time: string;
    }>>>(`/settings/paymentmodes`);
  }
}
