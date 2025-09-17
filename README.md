# Zoho Books SDK

A comprehensive TypeScript/JavaScript SDK for integrating Zoho Books API with React applications and Node.js projects.

## Features

- 🔐 **Complete Authentication** - OAuth 2.0 flow with automatic token refresh
- 📞 **Contact Management** - Create, read, update, delete contacts
- 🧾 **Invoice Management** - Full invoice lifecycle management
- 💰 **Payment Processing** - Customer payment tracking and management
- 🧾 **Sales Receipts** - Sales receipt creation and management
- ⚛️ **React Hooks** - Ready-to-use React hooks for easy integration
- �� **TypeScript Support** - Full type definitions included
- 🛡️ **Error Handling** - Comprehensive error handling and validation
- 📦 **Tree Shaking** - Optimized bundle size with tree shaking support

## Installation

```bash
npm install @zohobooks/sdk
```

## Quick Start

### 1. Basic Setup

```typescript
import { ZohoBooksSDK } from '@zohobooks/sdk';

const sdk = new ZohoBooksSDK({
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  redirectUri: 'http://localhost:3000/callback',
  scope: 'ZohoBooks.fullaccess.all',
  accessToken: 'your_access_token', // Optional
});
```

### 2. Authentication

```typescript
// Get authorization URL
const authUrl = sdk.getAuthUrl();
// Redirect user to this URL

// Exchange code for tokens
const tokens = await sdk.exchangeCodeForToken(authorizationCode);
```

### 3. Using the API

```typescript
// Create a contact
const contact = await sdk.contacts.create({
  contact_name: 'John Doe',
  email: 'john@example.com',
  contact_type: 'customer',
});

// Create an invoice
const invoice = await sdk.invoices.create({
  customer_id: contact.data.contact_id,
  date: '2024-01-15',
  line_items: [{
    item_name: 'Web Development',
    quantity: 1,
    rate: 5000,
  }],
});

// Create a payment
const payment = await sdk.customerPayments.create({
  customer_id: contact.data.contact_id,
  payment_mode: 'cash',
  amount: 5000,
  date: '2024-01-20',
});
```

## React Integration

### Using React Hooks

```tsx
import React from 'react';
import { useZohoAuth, useContacts, useInvoices } from '@zohobooks/sdk';

const authConfig = {
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  redirectUri: 'http://localhost:3000/callback',
  scope: 'ZohoBooks.fullaccess.all',
};

function App() {
  const { isAuthenticated, login, logout } = useZohoAuth(authConfig);
  const { listContacts, createContact } = useContacts(authConfig);
  const { listInvoices } = useInvoices(authConfig);

  const handleCreateContact = async () => {
    try {
      await createContact.execute({
        contact_name: 'Jane Doe',
        email: 'jane@example.com',
        contact_type: 'customer',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isAuthenticated) {
    return <div>Please authenticate first</div>;
  }

  return (
    <div>
      <button onClick={handleCreateContact}>
        Create Contact
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## API Reference

### ZohoBooksSDK

Main SDK class that provides access to all modules.

#### Constructor

```typescript
new ZohoBooksSDK(authConfig: AuthConfig)
```

#### Methods

- `getAuthUrl()` - Get OAuth authorization URL
- `exchangeCodeForToken(code: string)` - Exchange authorization code for tokens
- `refreshAccessToken()` - Refresh access token
- `setAccessToken(token: string)` - Set access token
- `setRefreshToken(token: string)` - Set refresh token

### Contacts API

```typescript
// List contacts
const contacts = await sdk.contacts.list({
  page: 1,
  per_page: 25,
  search_text: 'John',
});

// Get contact
const contact = await sdk.contacts.get(contactId);

// Create contact
const newContact = await sdk.contacts.create({
  contact_name: 'John Doe',
  email: 'john@example.com',
  contact_type: 'customer',
});

// Update contact
const updatedContact = await sdk.contacts.update(contactId, {
  email: 'newemail@example.com',
});

// Delete contact
await sdk.contacts.delete(contactId);
```

### Invoices API

```typescript
// List invoices
const invoices = await sdk.invoices.list({
  page: 1,
  per_page: 25,
  filter_by: 'Status.All',
});

// Create invoice
const invoice = await sdk.invoices.create({
  customer_id: 'customer_id',
  date: '2024-01-15',
  line_items: [{
    item_name: 'Service',
    quantity: 1,
    rate: 100,
  }],
});

// Email invoice
await sdk.invoices.email(invoiceId, {
  to_mail_ids: ['customer@example.com'],
  subject: 'Your Invoice',
});

// Get PDF
const pdf = await sdk.invoices.getPDF(invoiceId);
```

### Customer Payments API

```typescript
// List payments
const payments = await sdk.customerPayments.list();

// Create payment
const payment = await sdk.customerPayments.create({
  customer_id: 'customer_id',
  payment_mode: 'cash',
  amount: 100,
  date: '2024-01-15',
  invoices: [{
    invoice_id: 'invoice_id',
    amount_applied: 100,
  }],
});
```

### Sales Receipts API

```typescript
// List sales receipts
const receipts = await sdk.salesReceipts.list();

// Create sales receipt
const receipt = await sdk.salesReceipts.create({
  customer_id: 'customer_id',
  date: '2024-01-15',
  line_items: [{
    item_name: 'Product',
    quantity: 1,
    rate: 50,
  }],
});
```

## React Hooks

### useZohoAuth

Manages authentication state and provides login/logout functionality.

```typescript
const { isAuthenticated, isLoading, login, logout, getAuthUrl } = useZohoAuth(authConfig);
```

### useContacts

Provides contact management operations with loading states.

```typescript
const { listContacts, createContact, updateContact, deleteContact } = useContacts(authConfig);
```

### useInvoices

Provides invoice management operations with loading states.

```typescript
const { listInvoices, createInvoice, updateInvoice, deleteInvoice, emailInvoice } = useInvoices(authConfig);
```

### useCustomerPayments

Provides payment management operations with loading states.

```typescript
const { listPayments, createPayment, updatePayment, deletePayment } = useCustomerPayments(authConfig);
```

### useSalesReceipts

Provides sales receipt management operations with loading states.

```typescript
const { listSalesReceipts, createSalesReceipt, updateSalesReceipt, deleteSalesReceipt } = useSalesReceipts(authConfig);
```

## Error Handling

The SDK provides comprehensive error handling with custom error types:

```typescript
import { ZohoBooksSDKError } from '@zohobooks/sdk';

try {
  await sdk.contacts.create(contactData);
} catch (error) {
  if (error instanceof ZohoBooksSDKError) {
    console.error('API Error:', error.message);
    console.error('Error Code:', error.code);
    console.error('Details:', error.details);
  }
}
```

## TypeScript Support

The SDK is written in TypeScript and provides full type definitions:

```typescript
import { Contact, Invoice, CustomerPayment, SalesReceipt } from '@zohobooks/sdk';

const contact: Contact = {
  contact_id: '123',
  contact_name: 'John Doe',
  // ... other properties with full type safety
};
```

## Configuration

### AuthConfig

```typescript
interface AuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string;
  accessToken?: string;
  refreshToken?: string;
}
```

### ListFilters

```typescript
interface ListFilters {
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
```

## Examples

Check the `examples/` directory for complete usage examples:

- `basic-usage.ts` - Basic SDK usage examples
- `react-usage.tsx` - React integration examples

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


[![npm version](https://badge.fury.io/js/%40zohobooks%2Fsdk.svg)](https://badge.fury.io/js/%40zohobooks%2Fsdk)
[![npm downloads](https://img.shields.io/npm/dm/@zohobooks/sdk.svg)](https://www.npmjs.com/package/@zohobooks/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)

## Support

For support, please open an issue on GitHub or contact us at support@example.com.
