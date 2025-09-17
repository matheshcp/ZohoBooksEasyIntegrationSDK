import { ZohoBooksClient } from './client';
import {
  Contact,
  CreateContactRequest,
  ListFilters,
  PaginatedResponse,
  ApiResponse,
} from '../types';

export class ContactsAPI {
  constructor(private client: ZohoBooksClient) {}

  /**
   * Get all contacts with optional filters
   */
  async list(filters?: ListFilters): Promise<PaginatedResponse<Contact>> {
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
    const url = queryString ? `/contacts?${queryString}` : '/contacts';
    
    return this.client.get<PaginatedResponse<Contact>>(url);
  }

  /**
   * Get a specific contact by ID
   */
  async get(contactId: string): Promise<Contact> {
    return this.client.get<Contact>(`/contacts/${contactId}`);
  }

  /**
   * Create a new contact
   */
  async create(contactData: CreateContactRequest): Promise<ApiResponse<Contact>> {
    return this.client.post<ApiResponse<Contact>>('/contacts', contactData);
  }

  /**
   * Update an existing contact
   */
  async update(contactId: string, contactData: Partial<CreateContactRequest>): Promise<ApiResponse<Contact>> {
    return this.client.put<ApiResponse<Contact>>(`/contacts/${contactId}`, contactData);
  }

  /**
   * Delete a contact
   */
  async delete(contactId: string): Promise<ApiResponse<{ contact_id: string }>> {
    return this.client.delete<ApiResponse<{ contact_id: string }>>(`/contacts/${contactId}`);
  }

  /**
   * Mark a contact as active
   */
  async markAsActive(contactId: string): Promise<ApiResponse<Contact>> {
    return this.client.post<ApiResponse<Contact>>(`/contacts/${contactId}/active`);
  }

  /**
   * Mark a contact as inactive
   */
  async markAsInactive(contactId: string): Promise<ApiResponse<Contact>> {
    return this.client.post<ApiResponse<Contact>>(`/contacts/${contactId}/inactive`);
  }

  /**
   * Enable payment reminders for a contact
   */
  async enablePaymentReminder(contactId: string): Promise<ApiResponse<Contact>> {
    return this.client.post<ApiResponse<Contact>>(`/contacts/${contactId}/paymentreminder/enable`);
  }

  /**
   * Disable payment reminders for a contact
   */
  async disablePaymentReminder(contactId: string): Promise<ApiResponse<Contact>> {
    return this.client.post<ApiResponse<Contact>>(`/contacts/${contactId}/paymentreminder/disable`);
  }

  /**
   * Get contact comments
   */
  async getComments(contactId: string): Promise<ApiResponse<Array<{
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
    }>>>(`/contacts/${contactId}/comments`);
  }

  /**
   * Add a comment to a contact
   */
  async addComment(contactId: string, description: string): Promise<ApiResponse<{
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
    }>>(`/contacts/${contactId}/comments`, { description });
  }

  /**
   * Update a contact comment
   */
  async updateComment(contactId: string, commentId: string, description: string): Promise<ApiResponse<{
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
    }>>(`/contacts/${contactId}/comments/${commentId}`, { description });
  }

  /**
   * Delete a contact comment
   */
  async deleteComment(contactId: string, commentId: string): Promise<ApiResponse<{
    comment_id: string;
  }>> {
    return this.client.delete<ApiResponse<{
      comment_id: string;
    }>>(`/contacts/${contactId}/comments/${commentId}`);
  }

  /**
   * Get contact statement
   */
  async getStatement(contactId: string, startDate: string, endDate: string): Promise<ApiResponse<{
    statement_date: string;
    statement_date_formatted: string;
    contact_id: string;
    contact_name: string;
    currency_id: string;
    currency_code: string;
    currency_symbol: string;
    currency_format: string;
    opening_balance: number;
    closing_balance: number;
    transactions: Array<{
      transaction_id: string;
      transaction_type: string;
      transaction_date: string;
      transaction_date_formatted: string;
      reference_number: string;
      description: string;
      debit_amount: number;
      credit_amount: number;
      balance: number;
    }>;
  }>> {
    const params = new URLSearchParams({
      start_date: startDate,
      end_date: endDate,
    });

    return this.client.get<ApiResponse<{
      statement_date: string;
      statement_date_formatted: string;
      contact_id: string;
      contact_name: string;
      currency_id: string;
      currency_code: string;
      currency_symbol: string;
      currency_format: string;
      opening_balance: number;
      closing_balance: number;
      transactions: Array<{
        transaction_id: string;
        transaction_type: string;
        transaction_date: string;
        transaction_date_formatted: string;
        reference_number: string;
        description: string;
        debit_amount: number;
        credit_amount: number;
        balance: number;
      }>;
    }>>(`/contacts/${contactId}/statements?${params.toString()}`);
  }
}
