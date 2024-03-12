DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) INT NOT NULL
);
CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) INT NOT NULL,
  salary DECIMAL,
  deparment_id INTERGER NOT NULL,
  FOREIGN KEY (deparment_id)
  REFERENCES department(id)
);
CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) INT NOT NULL,
  last_name VARCHAR(30) INT NOT NULL,

  role_id INTERGER NOT NULL,
  FOREIGN KEY (role_id)
  REFERENCES role(id)

  manager_id INTERGER NOT NULL,
  FOREIGN KEY (manager_id_id)
  REFERENCES employee(id)
);