import { ZohoBooksSDK } from '@zohobooks/sdk';

// Initialize the SDK
const sdk = new ZohoBooksSDK({
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  redirectUri: 'http://localhost:3000/callback',
  scope: 'ZohoBooks.fullaccess.all',
  accessToken: 'your_access_token', // Optional if you have it
});

// Example: Create a contact
async function createContact() {
  try {
    const contact = await sdk.contacts.create({
      contact_name: 'John Doe',
      company_name: 'Acme Corp',
      email: 'john@acme.com',
      phone: '+1234567890',
      contact_type: 'customer',
      customer_sub_type: 'business',
      is_taxable: true,
      billing_address: {
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zip: '10001',
      },
    });
    console.log('Contact created:', contact);
  } catch (error) {
    console.error('Error creating contact:', error);
  }
}

// Example: Create an invoice
async function createInvoice() {
  try {
    const invoice = await sdk.invoices.create({
      customer_id: 'customer_id_here',
      date: '2024-01-15',
      due_date: '2024-02-15',
      line_items: [
        {
          item_name: 'Web Development',
          description: 'Custom website development',
          quantity: 1,
          rate: 5000,
          tax_id: 'tax_id_here',
        },
      ],
      notes: 'Thank you for your business!',
    });
    console.log('Invoice created:', invoice);
  } catch (error) {
    console.error('Error creating invoice:', error);
  }
}

// Example: Create a customer payment
async function createCustomerPayment() {
  try {
    const payment = await sdk.customerPayments.create({
      customer_id: 'customer_id_here',
      payment_mode: 'cash',
      amount: 5000,
      date: '2024-01-20',
      reference_number: 'PAY-001',
      description: 'Payment for invoice #INV-001',
      invoices: [
        {
          invoice_id: 'invoice_id_here',
          amount_applied: 5000,
        },
      ],
    });
    console.log('Payment created:', payment);
  } catch (error) {
    console.error('Error creating payment:', error);
  }
}

// Example: Create a sales receipt
async function createSalesReceipt() {
  try {
    const salesReceipt = await sdk.salesReceipts.create({
      customer_id: 'customer_id_here',
      date: '2024-01-15',
      line_items: [
        {
          item_name: 'Consulting Services',
          description: 'Business consulting',
          quantity: 2,
          rate: 150,
        },
      ],
      notes: 'Thank you for your purchase!',
    });
    console.log('Sales receipt created:', salesReceipt);
  } catch (error) {
    console.error('Error creating sales receipt:', error);
  }
}

// Example: List all contacts with filters
async function listContacts() {
  try {
    const contacts = await sdk.contacts.list({
      page: 1,
      per_page: 25,
      sort_column: 'contact_name',
      sort_order: 'ascending',
      search_text: 'John',
    });
    console.log('Contacts:', contacts);
  } catch (error) {
    console.error('Error listing contacts:', error);
  }
}

// Example: Get authentication URL
function getAuthUrl() {
  const authUrl = sdk.getAuthUrl();
  console.log('Authorization URL:', authUrl);
  // Redirect user to this URL for authentication
}

// Example: Exchange code for tokens
async function authenticate(code: string) {
  try {
    const tokens = await sdk.exchangeCodeForToken(code);
    console.log('Tokens received:', tokens);
    // Store tokens securely
  } catch (error) {
    console.error('Error authenticating:', error);
  }
}

export {
  createContact,
  createInvoice,
  createCustomerPayment,
  createSalesReceipt,
  listContacts,
  getAuthUrl,
  authenticate,
};
