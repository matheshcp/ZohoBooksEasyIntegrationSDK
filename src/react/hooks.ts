import { useState, useEffect, useCallback, useMemo } from 'react';
import { ZohoBooksSDK } from '../api';
import { AuthConfig, Contact, Invoice, CustomerPayment, SalesReceipt, ListFilters } from '../types';

// Hook for managing Zoho Books SDK instance
export function useZohoBooks(authConfig: AuthConfig) {
  const sdk = useMemo(() => new ZohoBooksSDK(authConfig), [
    authConfig.clientId,
    authConfig.clientSecret,
    authConfig.redirectUri,
    authConfig.scope,
  ]);

  return sdk;
}

// Hook for managing authentication state
export function useZohoAuth(authConfig: AuthConfig) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sdk = useZohoBooks(authConfig);

  const login = useCallback(async (code: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const tokens = await sdk.exchangeCodeForToken(code);
      setIsAuthenticated(true);
      return tokens;
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  const logout = useCallback(() => {
    sdk.setAccessToken('');
    sdk.setRefreshToken('');
    setIsAuthenticated(false);
    setError(null);
  }, [sdk]);

  const refreshToken = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const tokens = await sdk.refreshAccessToken();
      setIsAuthenticated(true);
      return tokens;
    } catch (err: any) {
      setError(err.message || 'Token refresh failed');
      setIsAuthenticated(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [sdk]);

  const getAuthUrl = useCallback(() => {
    return sdk.getAuthUrl();
  }, [sdk]);

  useEffect(() => {
    if (sdk.getAccessToken()) {
      setIsAuthenticated(true);
    }
  }, [sdk]);

  return {
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    refreshToken,
    getAuthUrl,
  };
}

// Generic hook for API operations
function useApiOperation<T, P = any>(
  operation: (...args: any[]) => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (...args: any[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await operation(...args);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message || 'Operation failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, dependencies);

  return { data, isLoading, error, execute };
}

// Hook for contacts
export function useContacts(authConfig: AuthConfig) {
  const sdk = useZohoBooks(authConfig);

  const listContacts = useApiOperation(
    (filters?: ListFilters) => sdk.contacts.list(filters),
    [sdk]
  );

  const getContact = useApiOperation(
    (contactId: string) => sdk.contacts.get(contactId),
    [sdk]
  );

  const createContact = useApiOperation(
    (contactData: any) => sdk.contacts.create(contactData),
    [sdk]
  );

  const updateContact = useApiOperation(
    (contactId: string, contactData: any) => sdk.contacts.update(contactId, contactData),
    [sdk]
  );

  const deleteContact = useApiOperation(
    (contactId: string) => sdk.contacts.delete(contactId),
    [sdk]
  );

  return {
    listContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
  };
}

// Hook for invoices
export function useInvoices(authConfig: AuthConfig) {
  const sdk = useZohoBooks(authConfig);

  const listInvoices = useApiOperation(
    (filters?: ListFilters) => sdk.invoices.list(filters),
    [sdk]
  );

  const getInvoice = useApiOperation(
    (invoiceId: string) => sdk.invoices.get(invoiceId),
    [sdk]
  );

  const createInvoice = useApiOperation(
    (invoiceData: any) => sdk.invoices.create(invoiceData),
    [sdk]
  );

  const updateInvoice = useApiOperation(
    (invoiceId: string, invoiceData: any) => sdk.invoices.update(invoiceId, invoiceData),
    [sdk]
  );

  const deleteInvoice = useApiOperation(
    (invoiceId: string) => sdk.invoices.delete(invoiceId),
    [sdk]
  );

  const emailInvoice = useApiOperation(
    (invoiceId: string, emailData: any) => sdk.invoices.email(invoiceId, emailData),
    [sdk]
  );

  const getInvoicePDF = useApiOperation(
    (invoiceId: string) => sdk.invoices.getPDF(invoiceId),
    [sdk]
  );

  return {
    listInvoices,
    getInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    emailInvoice,
    getInvoicePDF,
  };
}

// Hook for customer payments
export function useCustomerPayments(authConfig: AuthConfig) {
  const sdk = useZohoBooks(authConfig);

  const listPayments = useApiOperation(
    (filters?: ListFilters) => sdk.customerPayments.list(filters),
    [sdk]
  );

  const getPayment = useApiOperation(
    (paymentId: string) => sdk.customerPayments.get(paymentId),
    [sdk]
  );

  const createPayment = useApiOperation(
    (paymentData: any) => sdk.customerPayments.create(paymentData),
    [sdk]
  );

  const updatePayment = useApiOperation(
    (paymentId: string, paymentData: any) => sdk.customerPayments.update(paymentId, paymentData),
    [sdk]
  );

  const deletePayment = useApiOperation(
    (paymentId: string) => sdk.customerPayments.delete(paymentId),
    [sdk]
  );

  const getPaymentPDF = useApiOperation(
    (paymentId: string) => sdk.customerPayments.getPDF(paymentId),
    [sdk]
  );

  return {
    listPayments,
    getPayment,
    createPayment,
    updatePayment,
    deletePayment,
    getPaymentPDF,
  };
}

// Hook for sales receipts
export function useSalesReceipts(authConfig: AuthConfig) {
  const sdk = useZohoBooks(authConfig);

  const listSalesReceipts = useApiOperation(
    (filters?: ListFilters) => sdk.salesReceipts.list(filters),
    [sdk]
  );

  const getSalesReceipt = useApiOperation(
    (salesReceiptId: string) => sdk.salesReceipts.get(salesReceiptId),
    [sdk]
  );

  const createSalesReceipt = useApiOperation(
    (salesReceiptData: any) => sdk.salesReceipts.create(salesReceiptData),
    [sdk]
  );

  const updateSalesReceipt = useApiOperation(
    (salesReceiptId: string, salesReceiptData: any) => sdk.salesReceipts.update(salesReceiptId, salesReceiptData),
    [sdk]
  );

  const deleteSalesReceipt = useApiOperation(
    (salesReceiptId: string) => sdk.salesReceipts.delete(salesReceiptId),
    [sdk]
  );

  const emailSalesReceipt = useApiOperation(
    (salesReceiptId: string, emailData: any) => sdk.salesReceipts.email(salesReceiptId, emailData),
    [sdk]
  );

  const getSalesReceiptPDF = useApiOperation(
    (salesReceiptId: string) => sdk.salesReceipts.getPDF(salesReceiptId),
    [sdk]
  );

  return {
    listSalesReceipts,
    getSalesReceipt,
    createSalesReceipt,
    updateSalesReceipt,
    deleteSalesReceipt,
    emailSalesReceipt,
    getSalesReceiptPDF,
  };
}

// Hook for managing multiple operations with loading states
export function useZohoBooksOperations(authConfig: AuthConfig) {
  const [operations, setOperations] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const executeOperation = useCallback(async (
    operationId: string,
    operation: () => Promise<any>
  ) => {
    setOperations(prev => ({ ...prev, [operationId]: true }));
    setErrors(prev => ({ ...prev, [operationId]: null }));

    try {
      const result = await operation();
      setOperations(prev => ({ ...prev, [operationId]: false }));
      return result;
    } catch (error: any) {
      setOperations(prev => ({ ...prev, [operationId]: false }));
      setErrors(prev => ({ ...prev, [operationId]: error.message || 'Operation failed' }));
      throw error;
    }
  }, []);

  const isOperationLoading = useCallback((operationId: string) => {
    return operations[operationId] || false;
  }, [operations]);

  const getOperationError = useCallback((operationId: string) => {
    return errors[operationId] || null;
  }, [errors]);

  return {
    executeOperation,
    isOperationLoading,
    getOperationError,
  };
}
