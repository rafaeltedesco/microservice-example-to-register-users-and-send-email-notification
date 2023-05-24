const connection = require('../db/connection');
const axios = require('axios');
const { createAddress, findAddressIdIfExists } = require('../models/address.model');
const { customerExistsWithEmail, createCustomer } = require('../models/customer.model');

const registerMember = async ({ firstName, lastName, email, cep }) => {
  let addressId = await findAddressIdIfExists({ cep });
  let address;
  if (!addressId) {
    console.log('Address does not exist. Fetching data from cep api microservice...');
    const { data } = await axios.post('http://cep_api:3000/get-address-info', { cep });
    addressId = await createAddress(data);
    address = data;
  }
  
  const doesCustomerExists = await customerExistsWithEmail({ email });

  if (doesCustomerExists) {
    throw new Error('User email already assigned', { cause: 409 });
  }

  const id = await createCustomer({ firstName, lastName, email, addressId });
  
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