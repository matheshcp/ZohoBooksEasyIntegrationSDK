import React, { useState, useEffect } from 'react';
import {
  useZohoAuth,
  useContacts,
  useInvoices,
  useCustomerPayments,
  useSalesReceipts,
} from '@zohobooks/sdk';

// Configuration
const authConfig = {
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  redirectUri: 'http://localhost:3000/callback',
  scope: 'ZohoBooks.fullaccess.all',
};

// Main App Component
function App() {
  const { isAuthenticated, isLoading, login, logout, getAuthUrl } = useZohoAuth(authConfig);
  const [authCode, setAuthCode] = useState('');

  const handleLogin = async () => {
    try {
      await login(authCode);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Zoho Books Integration</h1>
        <p>Please authenticate with Zoho Books:</p>
        <a href={getAuthUrl()} target="_blank" rel="noopener noreferrer">
          Click here to authenticate
        </a>
        <div>
          <input
            type="text"
            placeholder="Enter authorization code"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Zoho Books Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <ContactsManager />
      <InvoicesManager />
      <PaymentsManager />
      <SalesReceiptsManager />
    </div>
  );
}

// Contacts Management Component
function ContactsManager() {
  const { listContacts, createContact, updateContact, deleteContact } = useContacts(authConfig);
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    contact_name: '',
    email: '',
    phone: '',
    contact_type: 'customer',
  });

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const result = await listContacts.execute();
      setContacts(result.contacts || []);
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  };

  const handleCreateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createContact.execute(newContact);
      setNewContact({ contact_name: '', email: '', phone: '', contact_type: 'customer' });
      loadContacts();
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  return (
    <div>
      <h2>Contacts</h2>
      <form onSubmit={handleCreateContact}>
        <input
          type="text"
          placeholder="Contact Name"
          value={newContact.contact_name}
          onChange={(e) => setNewContact({ ...newContact, contact_name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
        />
        <select
          value={newContact.contact_type}
          onChange={(e) => setNewContact({ ...newContact, contact_type: e.target.value })}
        >
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
          <option value="customer_vendor">Customer & Vendor</option>
        </select>
        <button type="submit" disabled={createContact.isLoading}>
          {createContact.isLoading ? 'Creating...' : 'Create Contact'}
        </button>
      </form>
      <div>
        {contacts.map((contact: any) => (
          <div key={contact.contact_id}>
            <h3>{contact.contact_name}</h3>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            <button onClick={() => deleteContact.execute(contact.contact_id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Invoices Management Component
function InvoicesManager() {
  const { listInvoices, createInvoice, getInvoicePDF } = useInvoices(authConfig);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const result = await listInvoices.execute();
      setInvoices(result.invoices || []);
    } catch (error) {
      console.error('Error loading invoices:', error);
    }
  };

  const handleDownloadPDF = async (invoiceId: string) => {
    try {
      const pdf = await getInvoicePDF.execute(invoiceId);
      // Handle PDF download
      const blob = new Blob([pdf], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoiceId}.pdf`;
      a.click();
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div>
      <h2>Invoices</h2>
      <button onClick={loadInvoices}>Refresh</button>
      <div>
        {invoices.map((invoice: any) => (
          <div key={invoice.invoice_id}>
            <h3>{invoice.invoice_number}</h3>
            <p>Customer: {invoice.customer_name}</p>
            <p>Total: ${invoice.total}</p>
            <p>Status: {invoice.status}</p>
            <button onClick={() => handleDownloadPDF(invoice.invoice_id)}>
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Payments Management Component
function PaymentsManager() {
  const { listPayments, createPayment } = useCustomerPayments(authConfig);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const result = await listPayments.execute();
      setPayments(result.customerpayments || []);
    } catch (error) {
      console.error('Error loading payments:', error);
    }
  };

  return (
    <div>
      <h2>Customer Payments</h2>
      <button onClick={loadPayments}>Refresh</button>
      <div>
        {payments.map((payment: any) => (
          <div key={payment.payment_id}>
            <h3>{payment.payment_number}</h3>
            <p>Customer: {payment.customer_name}</p>
            <p>Amount: ${payment.amount}</p>
            <p>Date: {payment.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Sales Receipts Management Component
function SalesReceiptsManager() {
  const { listSalesReceipts, createSalesReceipt } = useSalesReceipts(authConfig);
  const [salesReceipts, setSalesReceipts] = useState([]);

  useEffect(() => {
    loadSalesReceipts();
  }, []);

  const loadSalesReceipts = async () => {
    try {
      const result = await listSalesReceipts.execute();
      setSalesReceipts(result.salesreceipts || []);
    } catch (error) {
      console.error('Error loading sales receipts:', error);
    }
  };

  return (
    <div>
      <h2>Sales Receipts</h2>
      <button onClick={loadSalesReceipts}>Refresh</button>
      <div>
        {salesReceipts.map((receipt: any) => (
          <div key={receipt.salesreceipt_id}>
            <h3>{receipt.salesreceipt_number}</h3>
            <p>Customer: {receipt.customer_name}</p>
            <p>Total: ${receipt.total}</p>
            <p>Date: {receipt.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
