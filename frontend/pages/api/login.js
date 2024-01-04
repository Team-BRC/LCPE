// api/create-customer.js (using Next.js API route for example)
import { Client, Environment} from 'square';
import bcrypt from 'bcrypt';

const { customersApi, customerCustomAttributesApi, paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox, // Change to production
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {email_address, password} = req.body;
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

      function doesEmailExist(emailToCheck, existingCustomers) {
        const foundCustomer = existingCustomers.find(item => item.emailAddress === emailToCheck);
        if (foundCustomer) {
          return foundCustomer.id
        } else {
          return "";
        }
      }

      function registeredMoreThan6months(paymentDate) {
        const givenDateTime = new Date(paymentDate);
        const currentDate = new Date();
        const timeDifference = currentDate - givenDateTime;
        const monthsDifference = timeDifference / (1000 * 60 * 60 * 24 * 30.44);
        return monthsDifference > 6;
        
      }

      const findLatestPaymentByCustomerId = (payments, targetCustomerId) => {
        const customerPayments = payments.filter(payment => payment.customerId === targetCustomerId);
        customerPayments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return customerPayments[0];
      };

      const searchResponse = await customersApi.searchCustomers(searchParams);
      const existingCustomers = searchResponse.result.customers;
      const id = doesEmailExist(email_address, existingCustomers);
      if (id) {
        const paymentsResponse = await paymentsApi.listPayments();
        const payments = paymentsResponse.result.payments
        const recentPayment = findLatestPaymentByCustomerId(payments, id);

        if(!recentPayment  || registeredMoreThan6months(recentPayment)){
          const response = await customerCustomAttributesApi.retrieveCustomerCustomAttribute(id,'password',false);
          const isPasswordValid = await bcrypt.compare(password,response.result.customAttribute.value)
          if (isPasswordValid) {
            res.status(400).json({ success: 'Customer exists and authorized, but Subscription expired.', id: id });
            return;
          } else {
            return res.status(203).send({ failed: 'Invalid password'});
          }

        } else{
            const response = await customerCustomAttributesApi.retrieveCustomerCustomAttribute(id,'password',false);
            const isPasswordValid = await bcrypt.compare(password,response.result.customAttribute.value)
            if (isPasswordValid) {
              res.status(200).json({ success: 'Customer exists and authorized', id: id });
              return;
            } else {
              return res.status(203).json({ failed: 'Invalid password'});
            }
        }
      } else {
        res.status(401).json({ success: 'Customer does not exist' });
        return
      }

    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error');
    }
  } else {
    res.status(500).send();
  }
}
