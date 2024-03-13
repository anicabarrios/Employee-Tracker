const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'employee_db'
});

// Connect to the database
connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the employee_db database.');
  startApp();
});

// Function to start the application
function startApp() {
  inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Update employee manager',
      'View employees by manager',
      'View employees by department',
      'Delete a department',
      'Delete a role',
      'Delete an employee',
      'View total utilized budget of a department',
      'Exit'
    ]
  }).then(answer => {
    switch (answer.action) {
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Update employee manager':
        updateEmployeeManager();
        break;
      case 'View employees by manager':
        viewEmployeesByManager();
        break;
      case 'View employees by department':
        viewEmployeesByDepartment();
        break;
      case 'Delete a department':
        deleteDepartment();
        break;
      case 'Delete a role':
        deleteRole();
        break;
      case 'Delete an employee':
        deleteEmployee();
        break;
      case 'View total utilized budget of a department':
        viewTotalUtilizedBudget();
        break;
      case 'Exit':
        connection.end();
        break;
      default:
        console.log('Invalid option');
    }
  });
}

// Function to view all departments
function viewAllDepartments() {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

// Function to view all roles
function viewAllRoles() {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

// Function to view all employees
function viewAllEmployees() {
  console.log('Showing all employees..'); 
  const sql = `SELECT employee.id, 
                      employee.first_name, 
                      employee.last_name, 
                      role.title, 
                      department.name AS department,
                      role.salary, 
                      CONCAT (manager.first_name, " ", manager.last_name) AS manager
               FROM employee
                      LEFT JOIN role ON employee.role_id = role.id
                      LEFT JOIN department ON role.department_id = department.id
                      LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

// Function to add a department
function addDepartment() {
  inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter the name of the department:'
  }).then(answer => {
    const departmentName = answer.name.trim(); 
    if (!departmentName) {
      console.log('Please enter a department name.');
      startApp(); 
      return; 
    }

    connection.query('INSERT INTO department (name) VALUES (?)', [departmentName], err => {
      if (err) {
        console.error('Error adding department:', err);
        startApp();
        return; 
      }
      console.log('Department added successfully.');
      startApp(); 
    });
  });
}

// Function to add a role
function addRole() {
  const roleQuestions = [
    {
      type: 'input',
      name: 'role',
      message: "Enter the title of the role:",
      validate: function (input) {
        return input.trim() !== '';
      }
    },
    {
      type: 'input',
      name: 'salary',
      message: "Enter the salary for this role:",
      validate: function (input) {
        return !isNaN(input); 
      }
    }
  ];

  inquirer.prompt(roleQuestions)
    .then(roleAnswers => {
      const { role, salary } = roleAnswers;

      const deptQuery = 'SELECT id, name FROM department';

      connection.promise().query(deptQuery)
        .then(([rows]) => {
          const departments = rows.map(row => ({
            name: row.name,
            value: row.id
          }));

          inquirer.prompt({
            type: 'list',
            name: 'departmentId',
            message: 'Select the department for this role:',
            choices: departments
          })
            .then(deptAnswer => {
              const departmentId = deptAnswer.departmentId;

              const insertQuery = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
              connection.query(insertQuery, [role, salary, departmentId], (err, result) => {
                if (err) {
                  console.error('Error adding role:', err);
                  startApp(); 
                  return; 
                }
                console.log(`Role "${role}" added successfully.`);
                startApp(); 
              });
            });
        })
        .catch(err => {
          console.error('Error fetching departments:', err);
          startApp(); 
        });
    })
    .catch(err => {
      console.error('Error adding role:', err);
      startApp(); 
    });
}
// Function to add an employee
function addEmployee() {
  inquirer.prompt([
    {
      name: 'firstName',
      type: 'input',
      message: 'Enter the first name of the employee:'
    },
    {
      name: 'lastName',
      type: 'input',
      message: 'Enter the last name of the employee:'
    },
    {
      name: 'roleId',
      type: 'input',
      message: 'Enter the role ID of the employee:'
    },
    {
      name: 'managerId',
      type: 'input',
      message: 'Enter the manager ID of the employee (leave blank if none):',
      default: null
    }
  ]).then(answers => {
    const { firstName, lastName, roleId, managerId } = answers;

    const insertQuery = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    connection.query(insertQuery, [firstName, lastName, roleId, managerId], (err, result) => {
      if (err) {
        console.error('Error adding employee:', err);
        startApp();
        return;
      }
      console.log(`Employee ${firstName} ${lastName} added successfully.`);
      startApp();
    });
  }).catch(err => {
    console.error('Error adding employee:', err);
    startApp();
  });
}

// Function to update an employee role
function updateEmployeeRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'Enter the ID of the employee whose role you want to update:'
    },
    {
      type: 'input',
      name: 'newRoleId',
      message: 'Enter the ID of the new role for the employee:'
    }
  ]).then(answers => {
    const { employeeId, newRoleId } = answers;

    const updateQuery = 'UPDATE employee SET role_id = ? WHERE id = ?';
    connection.query(updateQuery, [newRoleId, employeeId], (err, result) => {
      if (err) {
        console.error('Error updating employee role:', err);
        startApp(); 
        return; 
      }
      console.log(`Employee's role updated successfully.`);
      startApp(); 
    });
  }).catch(err => {
    console.error('Error updating employee role:', err);
    startApp(); 
  });
}

// Function to update an employee manager
function updateEmployeeManager() {
  // Code for updating an employee manager
}

// Function to view employees by manager
function viewEmployeesByManager() {
  // Code for viewing employees by manager
}

// Function to view employees by department
function viewEmployeesByDepartment() {
  // Code for viewing employees by department
}

// Function to delete a department
function deleteDepartment() {
  // Code for deleting a department
}

// Function to delete a role
function deleteRole() {
  // Code for deleting a role
}

// Function to delete an employee
function deleteEmployee() {
  // Code for deleting an employee
}

// Function to view total utilized budget of a department
function viewTotalUtilizedBudget() {
  // Code for viewing total utilized budget of a department
}
