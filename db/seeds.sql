USE employee_db;

INSERT INTO department(name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO role(title, department_id, salary)
VALUES ('Sales Lead', 1, 100000),
       ('Salesperson', 1, 80000),
       ('Lead Engineer', 2, 150000),
       ('Software Engineer', 2, 120000),
       ('Account Manager', 3, 160000),
       ('Accountant', 3, 125000),
       ('Legal Team Lead', 4, 250000),
       ('Sales Lead', 4, 190000); 

INSERT INTO employee(first_name, last_name, role_id)
VALUES ('John', 'Doe', 1),
       ('Mike', 'Chan', 1),
       ('Ashley', 'Rodriguez', 2),
       ('Kevin', 'Tupik', 2),
       ('Kunal', 'Singh', 3),
       ('Malia', 'Brown', 3),
       ('Sarah', 'Lourd', 4),
       ('Tom', 'Allen', 4),
       ('Sam', 'Kash', 1); 

UPDATE employee SET manager_id = 1 WHERE id = 2;
UPDATE employee SET manager_id = 3 WHERE id = 4; 
UPDATE employee SET manager_id = 5 WHERE id = 6; 
UPDATE employee SET manager_id = 7 WHERE id = 8; 
