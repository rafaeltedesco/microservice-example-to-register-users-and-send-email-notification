const axios = require('axios');
const { createAddress } = require('../models/address.model');
const { cacheData } = require('./cache.service');

const getAddressFromCEP = async (cep) => {
    console.log('Fetching data from cep api microservice...');
    try {
      const { data: address } = await axios.post('http://cep_api:3000/get-address-info', { cep });
      const addressId = await createAddress(address);
      await cacheData(cep, 
        {
          id: addressId, address
        });
      console.log(cep, 'was persisted in redis and created on MySQL');
    } catch(err) {
      throw new Error('Invalid CEP', { cause: 400 });
    }
  }

module.exports = {
  getAddressFromCEP,
};