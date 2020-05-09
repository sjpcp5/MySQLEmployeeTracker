CREATE DATABASE theCompany_db;
USE theCompany_db;
CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  /* department name */
  PRIMARY KEY(id)
);
CREATE TABLE role(
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR (30),
  salary DECIMAL,
  department_id INT NOT NULL,
  INDEX dep_ind (department_id),
  FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY(id)
);
CREATE TABLE employee(
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstName VARCHAR(30),
  lasteName VARCHAR(30),
  role_id INT NOT NULL,
  INDEX rol_ind (role_id),
  FOREIGN KEY role_id
) REFERENCES role(id) ON DELETE CASCADE ON UPDATE CASCADE,
manager_id INT,
INDEX man_ind(manager_id),
FOREIGN KEY (manager_id) REFERENCES role(id) ON DELETE CASCADE ON UPDATE CASCADE,
PRIMARY KEY(id),
);