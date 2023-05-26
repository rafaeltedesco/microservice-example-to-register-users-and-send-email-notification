const { customerExistsWithEmail, createCustomer } = require('../models/customer.model');

const registerMember = async ({ firstName, lastName, email, address }) => {
  const doesCustomerExists = await customerExistsWithEmail({ email });

  if (doesCustomerExists) {
    throw new Error('User email already assigned', { cause: 409 });
  }
  
  const id = await createCustomer(
    { firstName, lastName, email, addressId: address.id }
    );
  
  return {
    id,
    firstName,
    lastName,
    email,
    address,
  }
};

module.exports = {
  registerMember,
};