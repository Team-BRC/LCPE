// api/create-customer.js (using Next.js API route for example)
import { Client, Environment} from 'square';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';

const { customersApi, customerCustomAttributesApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox, // Change to production
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email_address, given_name, password, phone_number } = req.body;
      // Check if a customer with the same email already exists
      const searchParams = {
        query: {
          filter: {
            email: {
              exact: email_address,
            },
          },
        },
      };

      function doesEmailExist(emailToCheck) {
        return existingCustomers.some(item => item.emailAddress === emailToCheck);
      }

      const searchResponse = await customersApi.searchCustomers(searchParams);
      const existingCustomers = searchResponse.result.customers;

      if (doesEmailExist(email_address, existingCustomers)) {
        // Customer already exists, handle accordingly (perhaps return an error)
        res.status(400).json({ error: 'Customer with this email already exists.' });
        return;
      }

      const { result } = await customersApi.createCustomer({
        idempotencyKey: randomUUID(),
        givenName:given_name,
        emailAddress:email_address,
        phoneNumber:phone_number,
      });

      try {
        const response = await customerCustomAttributesApi.retrieveCustomerCustomAttributeDefinition('password');
      } catch(error) {
        try {
          const response = await customerCustomAttributesApi.createCustomerCustomAttributeDefinition({
            customAttributeDefinition: {
              key: 'password',
              schema: {
                "$ref": "https://developer-production-s.squarecdn.com/schemas/v1/common.json#squareup.common.String"
              },
              name: 'password',
              description: 'Customer temporary password'
            },
            idempotencyKey: 'e48b5765-1277-4348-8fee-40525ee464d2'
          });
        } catch(error) {
          console.log(error);
        }
      }

      const response = await customerCustomAttributesApi.upsertCustomerCustomAttribute(result.customer.id,'password',
        {
          customAttribute: {
            key: 'password',
            value: await bcrypt.hash(password, 10)
          },
          idempotencyKey: randomUUID()
        }
      );

      BigInt.prototype.toJSON = function() { return this.toString(); }
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Error creating customer:', error);
      res.status(500).send('Error creating customer');
    }
  } else {
    res.status(500).send();
  }
}
