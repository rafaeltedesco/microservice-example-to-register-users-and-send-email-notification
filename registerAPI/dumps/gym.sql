CREATE DATABASE IF NOT EXISTS gym;

CREATE TABLE customer_address (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  cep VARCHAR(9) NOT NULL UNIQUE,
  logradouro VARCHAR(100),
  complemento VARCHAR(100),
  bairro VARCHAR(100),
  localidade VARCHAR(100),
  uf VARCHAR(2)
);

CREATE TABLE customers(
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  address_id INT,
  FOREIGN KEY (address_id) REFERENCES customer_address(id)
);


