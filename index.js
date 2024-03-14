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
    connection.query('SELECT * FROM employee', (err, res) => {
      if (err) {
        console.error('Error fetching employees:', err);
        startApp();
        return;
      }
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

/// Function to update an employee manager
function updateEmployeeManager() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'Enter the ID of the employee whose manager you want to update:'
    },
    {
      type: 'input',
      name: 'newManagerId',
      message: 'Enter the ID of the new manager for the employee:'
    }
  ]).then(answers => {
    const { employeeId, newManagerId } = answers;

    const updateQuery = 'UPDATE employee SET manager_id = ? WHERE id = ?';
    connection.query(updateQuery, [newManagerId, employeeId], (err, result) => {
      if (err) {
        console.error('Error updating employee manager:', err);
        startApp();
        return;
      }
      console.log(`Employee's manager updated successfully.`);
      startApp();
    });
  }).catch(err => {
    console.error('Error updating employee manager:', err);
    startApp();
  });
}


// Function to view employees by manager
function viewEmployeesByManager() {
  inquirer.prompt({
    name: 'managerId',
    type: 'input',
    message: 'Enter the ID of the manager to view employees:'
  }).then(answer => {
    const managerId = answer.managerId;

    const query = `SELECT * FROM employee WHERE manager_id = ?`;
    connection.query(query, [managerId], (err, res) => {
      if (err) {
        console.error('Error fetching employees by manager:', err);
        startApp();
        return;
      }
      console.table(res);
      startApp();
    });
  }).catch(err => {
    console.error('Error fetching employees by manager:', err);
    startApp();
  });
}

// Function to view employees by department
function viewEmployeesByDepartment() {
  inquirer.prompt({
    name: 'departmentId',
    type: 'input',
    message: 'Enter the ID of the department to view employees:'
  }).then(answer => {
    const departmentId = answer.departmentId;

    const query = `SELECT * FROM employee WHERE role_id IN (SELECT id FROM role WHERE department_id = ?)`;
    connection.query(query, [departmentId], (err, res) => {
      if (err) {
        console.error('Error fetching employees by department:', err);
        startApp();
        return;
      }
      console.table(res);
      startApp();
    });
  }).catch(err => {
    console.error('Error fetching employees by department:', err);
    startApp();
  });
}


// Function to delete a department
function deleteDepartment() {
  inquirer.prompt({
    name: 'departmentId',
    type: 'input',
    message: 'Enter the ID of the department to delete:'
  }).then(answer => {
    const departmentId = answer.departmentId;

    const query = `DELETE FROM department WHERE id = ?`;
    connection.query(query, [departmentId], (err, res) => {
      if (err) {
        console.error('Error deleting department:', err);
        startApp();
        return;
      }
      console.log('Department deleted successfully.');
      startApp();
    });
  }).catch(err => {
    console.error('Error deleting department:', err);
    startApp();
  });
}


// Function to delete a role
function deleteRole() {
  inquirer.prompt({
    name: 'roleId',
    type: 'input',
    message: 'Enter the ID of the role to delete:'
  }).then(answer => {
    const roleId = answer.roleId;

    const query = `DELETE FROM role WHERE id = ?`;
    connection.query(query, [roleId], (err, res) => {
      if (err) {
        console.error('Error deleting role:', err);
        startApp();
        return;
      }
      console.log('Role deleted successfully.');
      startApp();
    });
  }).catch(err => {
    console.error('Error deleting role:', err);
    startApp();
  });
}

// Function to delete an employee
function deleteEmployee() {
  inquirer.prompt({
    name: 'employeeId',
    type: 'input',
    message: 'Enter the ID of the employee to delete:'
  }).then(answer => {
    const employeeId = answer.employeeId;

    const query = `DELETE FROM employee WHERE id = ?`;
    connection.query(query, [employeeId], (err, res) => {
      if (err) {
        console.error('Error deleting employee:', err);
        startApp();
        return;
      }
      console.log('Employee deleted successfully.');
      startApp();
    });
  }).catch(err => {
    console.error('Error deleting employee:', err);
    startApp();
  });
}


// Function to view total utilized budget of a department
function viewTotalUtilizedBudget() {
  inquirer.prompt({
    name: 'departmentId',
    type: 'input',
    message: 'Enter the ID of the department to view total utilized budget:'
  }).then(answer => {
    const departmentId = answer.departmentId;

    const query = `SELECT SUM(role.salary) AS total_utilized_budget
                   FROM employee
                   LEFT JOIN role ON employee.role_id = role.id
                   WHERE role.department_id = ?`;
    connection.query(query, [departmentId], (err, res) => {
      if (err) {
        console.error('Error fetching total utilized budget:', err);
        startApp();
        return;
      }
      console.log(`Total Utilized Budget of Department ${departmentId}: $${res[0].total_utilized_budget}`);
      startApp();
    });
  }).catch(err => {
    console.error('Error fetching total utilized budget:', err);
    startApp();
  });
}
