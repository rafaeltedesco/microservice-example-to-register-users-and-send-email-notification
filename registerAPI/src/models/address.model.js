const connection = require('../db/connection');

const findAddressIdIfExists = async ({ cep }) => {
  const [result] = await connection.execute(
    `SELECT * FROM customer_address WHERE cep = ?`, [cep]
  );
  return result.length > 0 ? result.id : undefined;
}

const createAddress = async ({ cep, logradouro, complemento, bairro, localidade, uf }) => {
  const [{ insertId: addressId }] = await connection.execute(`
    INSERT INTO customer_address(cep, logradouro, complemento, bairro, localidade, uf)
     VALUES (?, ?, ?, ?, ?, ?)`, 
     [cep, logradouro, complemento, bairro, localidade, uf]);
  return addressId
};

module.exports = {
  createAddress,
  findAddressIdIfExists,
};