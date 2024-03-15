USE employee_db;

-- Insert departments
INSERT INTO department(name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

-- Insert roles
INSERT INTO role(title, department_id, salary)
VALUES ('Sales Lead', 1, 100000),
       ('Salesperson', 1, 80000),
       ('Lead Engineer', 2, 150000),
       ('Software Engineer', 2, 120000),
       ('Account Manager', 3, 160000),
       ('Accountant', 3, 125000),
       ('Legal Team Lead', 4, 250000),
       ('Sales Lead', 4, 190000); 

-- Insert employees
INSERT INTO employee(first_name, last_name, role_id)
VALUES ('John', 'Doe', 1),
       ('Mike', 'Chan', 2),
       ('Ashley', 'Rodriguez', 3),
       ('Kevin', 'Tupik', 4),
       ('Kunal', 'Singh', 5),
       ('Malia', 'Brown', 6),
       ('Sarah', 'Lourd', 7),
       ('Tom', 'Allen', 8);

-- Update managers
UPDATE employee SET manager_id = 1 WHERE id = 2;
UPDATE employee SET manager_id = 3 WHERE id = 4; 
UPDATE employee SET manager_id = 5 WHERE id = 6; 
UPDATE employee SET manager_id = 7 WHERE id = 8; 
