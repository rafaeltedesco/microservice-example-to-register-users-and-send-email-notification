const connection = require('../db/connection');

const customerExistsWithEmail = async ({ email }) => {
  const [result] = await connection.execute(`SELECT * FROM customers WHERE email = ?`, [email]);
  return result.length > 0;
};

const createCustomer = async ({ firstName, lastName, email, addressId }) => {
  const [{ insertId }] = await connection.execute(`
  INSERT INTO customers(first_name, last_name, email, address_id)
  VALUES (?, ?, ?, ?)`, [
    firstName, lastName, email, addressId
  ]);
  return insertId;
}

module.exports = {
  customerExistsWithEmail,
  createCustomer,
};
