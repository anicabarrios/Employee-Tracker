# Employee-Tracker
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 
[![Node.js Badge](https://img.shields.io/badge/Node.js-393?logo=nodedotjs&logoColor=fff&style=flat)](https://nodejs.org/en) 
[![MySQL Badge](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff&style=flat)](https://www.npmjs.com/package/mysql2)
## Description

This application allows the user to easily access the employee database and browse through the information while having command-line functionality to add and update the employee database. Through the backend development of Node.js and MySQL, users can securely access all employee's data with some command-line functionality.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Demonstration](#demonstration)
- [License](#license)

## Installation
**NPM:** Run the command "npm install" to install Node Package Manager and the following dependencies from the package.json file:
* inquirer
* MySQL2
* console.table

**MySql:** In integrated terminal, use "mysql -u *username* -p"
* Enter your MySQL password to login
* Download database and tables to your remote workspace from the 'db' folder using commands:
    * 'source db/schema.sql'
    * 'source db/seeds.sql'
    * 'source db/queries.sql'
## Usage

After following installation instructions, navigate to your integrated terminal and begin the prompt using the command 'npm start' or 'node index.js.'

From the main menu, select your desired option:
* View all departments
* View all roles
* View all employees by manager
* View all employees by department
* View utilized budget by department
* Add a department
* Add a role
* Add an employee
* Update an employee role
* Delete a department
* Delete a role
* Delete an employee
* View total utilized budget of a department

Follow the prompts to add, update, or remove if chosen or simply select from the view list to access your tables.

Each selection, once completed, will bring you back to the main menu. To finish your session, simply close the terminal.

## Demonstration
Would you like to see the Employee Tracker in action?

Watch this [link](https://www.loom.com/share/feb0bf4fcb45455e8ea26e1be51e5932?sid=a5c0194f-a988-48c2-8940-766cc7d28e7b)



## License

MIT License
