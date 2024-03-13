USE employee_db;

-- Displaying all departments
SELECT * FROM department;

-- Displaying roles with corresponding departments
SELECT role.role_id as id, role.title as name, department.name as department, role.salary 
FROM role
LEFT JOIN department ON role.department_id = department.id;

-- Displaying employees with their roles, departments, salaries, and managers
SELECT 
    employee.id as id,
    employee.first_name,
    employee.last_name,
    role.title,
    department.name as department,
    role.salary,
    CONCAT(managerTable.first_name, ' ', managerTable.last_name) as manager
FROM 
    employee 
LEFT JOIN 
    role ON employee.role_id = role.role_id
LEFT JOIN 
    department ON role.department_id = department.id
LEFT JOIN 
    employee AS managerTable ON employee.manager_id = managerTable.id;

-- Displaying all employees
SELECT * FROM employee;
