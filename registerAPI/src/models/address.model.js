const connection = require('../db/connection');

const createAddress = async ({ cep, logradouro, complemento, bairro, localidade, uf }) => {
  const [{ insertId: addressId }] = await connection.execute(`
    INSERT INTO customer_address(cep, logradouro, complemento, bairro, localidade, uf)
     VALUES (?, ?, ?, ?, ?, ?)`, 
     [cep, logradouro, complemento, bairro, localidade, uf]);
  return addressId
};

module.exports = {
  createAddress,
};