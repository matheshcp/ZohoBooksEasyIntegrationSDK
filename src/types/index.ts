// Base API Response Types
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T = any> {
  page_context: {
    page: number;
    per_page: number;
    has_more_page: boolean;
    report_name?: string;
    sort_column?: string;
    sort_order?: string;
  };
  [key: string]: T[] | any;
}

// Authentication Types
export interface AuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

// Contact Types
export interface Contact {
  contact_id: string;
  contact_name: string;
  company_name?: string;
  customer_name?: string;
  vendor_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  website?: string;
  contact_type: 'customer' | 'vendor' | 'customer_vendor';
  customer_sub_type?: 'individual' | 'business';
  vendor_sub_type?: 'individual' | 'business';
  is_taxable: boolean;
  tax_id?: string;
  tax_name?: string;
  tax_percentage?: number;
  place_of_contact?: string;
  gst_no?: string;
  gst_treatment?: string;
  vat_treatment?: string;
  payment_terms?: number;
  payment_terms_label?: string;
  currency_id?: string;
  currency_code?: string;
  currency_symbol?: string;
  currency_format?: string;
  price_precision?: number;
  opening_balance_amount?: number;
  exchange_rate?: number;
  outstanding_receivable_amount?: number;
  outstanding_payable_amount?: number;
  unused_credits_receivable_amount?: number;
  unused_credits_payable_amount?: number;
  status: 'active' | 'inactive';
  payment_reminder_enabled: boolean;
  custom_fields?: Array<{
    customfield_id: string;
    value: string;
  }>;
  billing_address?: Address;
  shipping_address?: Address;
  notes?: string;
  created_time: string;
  last_modified_time: string;
}

export interface Address {
  address: string;
  street2?: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  phone?: string;
  fax?: string;
}

export interface CreateContactRequest {
  contact_name: string;
  company_name?: string;
  customer_name?: string;
  vendor_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  website?: string;
  contact_type: 'customer' | 'vendor' | 'customer_vendor';
  customer_sub_type?: 'individual' | 'business';
  vendor_sub_type?: 'individual' | 'business';
  is_taxable?: boolean;
  tax_id?: string;
  tax_name?: string;
  tax_percentage?: number;
  place_of_contact?: string;
  gst_no?: string;
  gst_treatment?: string;
  vat_treatment?: string;
  payment_terms?: number;
  currency_id?: string;
  opening_balance_amount?: number;
  exchange_rate?: number;
  status?: 'active' | 'inactive';
  payment_reminder_enabled?: boolean;
  custom_fields?: Array<{
    customfield_id: string;
    value: string;
  }>;
  billing_address?: Address;
  shipping_address?: Address;
  notes?: string;
}

// Invoice Types
export interface Invoice {
  invoice_id: string;
  invoice_number: string;
  date: string;
  due_date?: string;
  payment_terms?: number;
  payment_terms_label?: string;
  currency_id: string;
  currency_code: string;
  currency_symbol: string;
  currency_format: string;
  price_precision: number;
  exchange_rate: number;
  discount: number;
  is_discount_before_tax: boolean;
  discount_type: 'entity_level' | 'item_level';
  line_items: InvoiceLineItem[];
  shipping_charge: number;
  adjustment: number;
  adjustment_description?: string;
  sub_total: number;
  tax_total: number;
  total: number;
  payment_made: number;
  credits_applied: number;
  balance: number;
  write_off_amount: number;
  allow_partial_payments: boolean;
  price_precision: number;
  payment_options: {
    payment_gateways: Array<{
      gateway_name: string;
      additional_field1: string;
      additional_field2: string;
      additional_field3: string;
    }>;
  };
  is_autobill_enabled: boolean;
  is_draft: boolean;
  is_voided: boolean;
  is_voided_transaction: boolean;
  is_inclusive_tax: boolean;
  is_autobill_enabled: boolean;
  salesperson_id?: string;
  salesperson_name?: string;
  custom_fields?: Array<{
    customfield_id: string;
    value: string;
  }>;
  project_id?: string;
  project_name?: string;
  customer_id: string;
  customer_name: string;
  customer_email: string;
  billing_address: Address;
  shipping_address?: Address;
  place_of_supply: string;
  gst_no?: string;
  gst_treatment?: string;
  vat_treatment?: string;
  tax_treatment?: string;
  tax_exemption_id?: string;
  tax_exemption_code?: string;
  tax_exemption_description?: string;
  entity_type?: string;
  entity_id?: string;
  notes?: string;
  terms?: string;
  custom_body?: string;
  custom_subject?: string;
  template_id?: string;
  template_name?: string;
  attachment_name?: string;
  can_send_in_mail: boolean;
  salesperson_id?: string;
  salesperson_name?: string;
  shipping_charge: number;
  adjustment: number;
  adjustment_description?: string;
  sub_total: number;
  tax_total: number;
  total: number;
  payment_made: number;
  credits_applied: number;
  balance: number;
  write_off_amount: number;
  allow_partial_payments: boolean;
  price_precision: number;
  payment_options: {
    payment_gateways: Array<{
      gateway_name: string;
      additional_field1: string;
      additional_field2: string;
      additional_field3: string;
    }>;
  };
  is_autobill_enabled: boolean;
  is_draft: boolean;
  is_voided: boolean;
  is_voided_transaction: boolean;
  is_inclusive_tax: boolean;
  is_autobill_enabled: boolean;
  salesperson_id?: string;
  salesperson_name?: string;
  custom_fields?: Array<{
    customfield_id: string;
    value: string;
  }>;
  project_id?: string;
  project_name?: string;
  customer_id: string;
  customer_name: string;
  customer_email: string;
  billing_address: Address;
  shipping_address?: Address;
  place_of_supply: string;
  gst_no?: string;
  gst_treatment?: string;
  vat_treatment?: string;
  tax_treatment?: string;
  tax_exemption_id?: string;
  tax_exemption_code?: string;
  tax_exemption_description?: string;
  entity_type?: string;
  entity_id?: string;
  notes?: string;
  terms?: string;
  custom_body?: string;
  custom_subject?: string;
  template_id?: string;
  template_name?: string;
  attachment_name?: string;
  can_send_in_mail: boolean;
  created_time: string;
  last_modified_time: string;
}

export interface InvoiceLineItem {
  line_item_id: string;
  item_id?: string;
  item_name?: string;
  item_description?: string;
  item_type?: 'inventory' | 'non_inventory' | 'service';
  sku?: string;
  hsn_or_sac?: string;
  unit?: string;
  quantity: number;
  rate: number;
  discount: number;
  discount_type: 'entity_level' | 'item_level';
  tax_id?: string;
  tax_name?: string;
  tax_type?: string;
  tax_percentage?: number;
  item_total: number;
  item_custom_fields?: Array<{
    customfield_id: string;
    value: string;
  }>;
}

export interface CreateInvoiceRequest {
  customer_id: string;
  invoice_number?: string;
  date: string;
  due_date?: string;
  payment_terms?: number;
  currency_id?: string;
  exchange_rate?: number;
  discount?: number;
  is_discount_before_tax?: boolean;
  discount_type?: 'entity_level' | 'item_level';
  line_items: Array<{
    item_id?: string;
    item_name?: string;
    item_description?: string;
    item_type?: 'inventory' | 'non_inventory' | 'service';
    sku?: string;
    hsn_or_sac?: string;
    unit?: string;
    quantity: number;
    rate: number;
    discount?: number;
    discount_type?: 'entity_level' | 'item_level';
    tax_id?: string;
    item_custom_fields?: Array<{
      customfield_id: string;
      value: string;
    }>;
  }>;
  shipping_charge?: number;
  adjustment?: number;
  adjustment_description?: string;
  allow_partial_payments?: boolean;
  salesperson_id?: string;
  custom_fields?: Array<{
    customfield_id: string;
    value: string;
  }>;
  project_id?: string;
  billing_address?: Address;
  shipping_address?: Address;
  place_of_supply?: string;
  gst_no?: string;
  gst_treatment?: string;
  vat_treatment?: string;
  tax_treatment?: string;
  tax_exemption_id?: string;
  entity_type?: string;
  entity_id?: string;
  notes?: string;
  terms?: string;
  custom_body?: string;
  custom_subject?: string;
  template_id?: string;
  attachment_name?: string;
}

// Customer Payment Types
export interface CustomerPayment {
  payment_id: string;
  payment_number: string;
  date: string;
  customer_id: string;
  customer_name: string;
  customer_email: string;
  payment_mode: string;
  amount: number;
  currency_id: string;
  currency_code: string;
  currency_symbol: string;
  currency_format: string;
  exchange_rate: number;
  reference_number?: string;
  description?: string;
  account_id?: string;
  account_name?: string;
  invoices: Array<{
    invoice_id: string;
    invoice_number: string;
    invoice_date: string;
    invoice_amount: number;
    invoice_balance: number;
    amount_applied: number;
  }>;
  custom_fields?: Array<{
    customfield_id: string;
    value: string;
  }>;
  notes?: string;
  created_time: string;
  last_modified_time: string;
}

export interface CreateCustomerPaymentRequest {
  customer_id: string;
  payment_mode: string;
  amount: number;
  date: string;
  currency_id?: string;
  exchange_rate?: number;
  reference_number?: string;
  description?: string;
  account_id?: string;
  invoices?: Array<{
    invoice_id: string;
    amount_applied: number;
  }>;
  custom_fields?: Array<{
    customfield_id: string;
    value: string;
  }>;
  notes?: string;
}

// Sales Receipt Types
export interface SalesReceipt {
  salesreceipt_id: string;
  salesreceipt_number: string;
  date: string;
  customer_id: string;
  customer_name: string;
  customer_email: string;
  currency_id: string;
  currency_code: string;
  currency_symbol: string;
  currency_format: string;
  price_precision: number;
  exchange_rate: number;
  discount: number;
  is_discount_before_tax: boolean;
  discount_type: 'entity_level' | 'item_level';
  line_items: Array<{
    line_item_id: string;
    item_id?: string;
    item_name?: string;
    item_description?: string;
    item_type?: 'inventory' | 'non_inventory' | 'service';
    sku?: string;
    hsn_or_sac?: string;
    unit?: string;
    quantity: number;
    rate: number;
    discount: number;
    discount_type: 'entity_level' | 'item_level';
    tax_id?: string;
    tax_name?: string;
    tax_type?: string;
    tax_percentage?: number;
    item_total: number;
    item_custom_fields?: Array<{
      customfield_id: string;
      value: string;
    }>;
  }>;
  shipping_charge: number;
  adjustment: number;
  adjustment_description?: string;
  sub_total: number;
  tax_total: number;
  total: number;
  payment_made: number;
  credits_applied: number;
  balance: number;
  write_off_amount: number;
  allow_partial_payments: boolean;
  price_precision: number;
  payment_options: {
    payment_gateways: Array<{
      gateway_name: string;
      additional_field1: string;
      additional_field2: string;
      additional_field3: string;
    }>;
  };
  is_draft: boolean;
  is_voided: boolean;
  is_voided_transaction: boolean;
  is_inclusive_tax: boolean;
  custom_fields?: Array<{
    customfield_id: string;
    value: string;
  }>;
  project_id?: string;
  project_name?: string;
  billing_address: Address;
  shipping_address?: Address;
  place_of_supply: string;
  gst_no?: string;
  gst_treatment?: string;
  vat_treatment?: string;
  tax_treatment?: string;
  tax_exemption_id?: string;
  tax_exemption_code?: string;
  tax_exemption_description?: string;
  entity_type?: string;
  entity_id?: string;
  notes?: string;
  terms?: string;
  custom_body?: string;
  custom_subject?: string;
  template_id?: string;
  template_name?: string;
  attachment_name?: string;
  can_send_in_mail: boolean;
  created_time: string;
  last_modified_time: string;
}

export interface CreateSalesReceiptRequest {
  customer_id: string;
  salesreceipt_number?: string;
  date: string;
  currency_id?: string;
  exchange_rate?: number;
  discount?: number;
  is_discount_before_tax?: boolean;
  discount_type?: 'entity_level' | 'item_level';
  line_items: Array<{
    item_id?: string;
    item_name?: string;
    item_description?: string;
    item_type?: 'inventory' | 'non_inventory' | 'service';
    sku?: string;
    hsn_or_sac?: string;
    unit?: string;
    quantity: number;
    rate: number;
    discount?: number;
    discount_type?: 'entity_level' | 'item_level';
    tax_id?: string;
    item_custom_fields?: Array<{
      customfield_id: string;
      value: string;
    }>;
  }>;
  shipping_charge?: number;
  adjustment?: number;
  adjustment_description?: string;
  allow_partial_payments?: boolean;
  custom_fields?: Array<{
    customfield_id: string;
    value: string;
  }>;
  project_id?: string;
  billing_address?: Address;
  shipping_address?: Address;
  place_of_supply?: string;
  gst_no?: string;
  gst_treatment?: string;
  vat_treatment?: string;
  tax_treatment?: string;
  tax_exemption_id?: string;
  entity_type?: string;
  entity_id?: string;
  notes?: string;
  terms?: string;
  custom_body?: string;
  custom_subject?: string;
  template_id?: string;
  attachment_name?: string;
}

// Common Filter Types
export interface ListFilters {
  page?: number;
  per_page?: number;
  sort_column?: string;
  sort_order?: 'ascending' | 'descending';
  search_text?: string;
  filter_by?: string;
  search_criteria?: Array<{
    search_text: string;
    search_operator: 'is' | 'contains' | 'starts_with' | 'ends_with' | 'is_empty' | 'is_not_empty';
  }>;
}

// Error Types
export interface ZohoBooksError {
  code: number;
  message: string;
  details?: any;
}

export class ZohoBooksSDKError extends Error {
  public code: number;
  public details?: any;

  constructor(message: string, code: number = 0, details?: any) {
    super(message);
    this.name = 'ZohoBooksSDKError';
    this.code = code;
    this.details = details;
  }
}
