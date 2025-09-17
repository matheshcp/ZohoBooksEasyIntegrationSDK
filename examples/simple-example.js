// Simple example of using the Zoho Books SDK
const { ZohoBooksSDK } = require('../dist/index.js');

// Initialize the SDK
const sdk = new ZohoBooksSDK({
  clientId: 'your_client_id_here',
  clientSecret: 'your_client_secret_here',
  redirectUri: 'http://localhost:3000/callback',
  scope: 'ZohoBooks.fullaccess.all',
  accessToken: 'your_access_token_here', // Optional
});

// Example: Get authentication URL
console.log('Authentication URL:', sdk.getAuthUrl());

// Example: List contacts (requires valid access token)
async function listContacts() {
  try {
    const contacts = await sdk.contacts.list({
      page: 1,
      per_page: 10,
    });
    console.log('Contacts:', contacts);
  } catch (error) {
    console.error('Error listing contacts:', error.message);
  }
}

// Example: Create a contact (requires valid access token)
async function createContact() {
  try {
    const contact = await sdk.contacts.create({
      contact_name: 'John Doe',
      email: 'john@example.com',
      contact_type: 'customer',
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
    console.error('Error creating contact:', error.message);
  }
}

// Export functions for use
module.exports = {
  listContacts,
  createContact,
  sdk,
};
