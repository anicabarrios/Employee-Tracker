USE employee_db;
INSERT INTO department(name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO role(title, department_id,salary)
VALUES ('Sales Lead',1,100000),
       ('Salesperson',1,80000),
       ('Lead Engineer',2,150000),
       ('Software Engineer',2,120000),
       ('Account Manager',3,160000),
       ('Acountant',3,125000),
       ('Legal Team Lead',4,250000),
       ('Sales Lead',4,190000),

INSERT INTO employee(first_name,last_name,role_id)
VALUES('John','Doe',1),
      ('Mike','Chan',1),
      ('Ashley','Rodriguez',1),
      ('Kevin','Tupik',1),
      ('Kunal','Singh',1),
      ('Malia','Brown',1),
      ('Sarah','Lourd',1),
      ('Tom','Allen',1)
    




