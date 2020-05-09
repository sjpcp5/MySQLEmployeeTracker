const mysql = require('mysql')
const inquirer = require('inquirer')
const cTable = require('console.table')

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'yourPassword',
  database: 'theCompany_db'
})
connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
  console.log('connected as id ' + connection.threadId)
  runTracker()
})
// need to require console table, table alows the called data to be
// projected in the terminal

// function to call query table view
// function to render data with console
// inquirer interface questions:
/* view department, view employee, view role = Select * FROM
add departments, add roles, employees = INSERT Table
update employee roles UPDATE or ALTER TABLE */

// call innerjoin of all tables and print result

function runTracker () {
  inquirer
    .prompt({
      name: 'menu',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View the Company',
        'View all Departments',
        'View all Roles',
        'View all Employees',
        'Add a New Department',
        'Add a New Role',
        'Add Employee',
        'Update Employee Role'
      ]
    })
    .then(function (answer) {
      switch (answer.menu) {
        case 'View the Company':
          renderTable()
          break

        case 'View all Departments':
          viewDeparts()
          break

        case 'View all Roles':
          viewRoles()
          break

        case 'View all Employees':
          viewEmploy()
          break

        case 'Add a New Department':
          addDepart()
          break

        case 'Add a New Role':
          addRole()
          break

        case 'Add Employee':
          addEmployee()
          break

        case 'Update Employee Role':
          updateRole()
          break
      }
    })
}
function renderTable () {
  let query =
    'SELECT employee.id,employee.firstName,employee.lasteName,role.title,role.salary,department.name,employee.manager_id FROM((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department ON role.department_id = department.id)'

  connection.query(query, function (error, res) {
    if (error) throw error
    const table = cTable.getTable(
      ` 
      =============================================  
      The Company --- Manager ID equals Employee ID   
      =============================================
      `,
      res
    )
    console.log(table)
    runTracker()
  })
}

function viewDeparts () {
  var query = 'SELECT name FROM department'
  connection.query(query, function (err, res) {
    if (err) throw err
    let table = cTable.getTable(
      `
      ============
      Departments
      ============
      `,
      res
    )
    console.log(table)
    runTracker()
  })
}

function viewRoles () {
  var query = 'SELECT title, salary FROM role'
  connection.query(query, function (err, res) {
    if (err) throw err
    let table = cTable.getTable(
      `
    =========
    Roles
    =========
    `,
      res
    )
    console.log(table)
    runTracker()
  })
}

function viewEmploy () {
  var query = 'SELECT * FROM employee'
  connection.query(query, function (err, res) {
    if (err) throw err
    let table = cTable.getTable(
      `
    ===========
    Employees
    ===========
    `,
      res
    )
    console.log(table)
    runTracker()
  })
}
function addDepart () {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'addDepart',
        message: 'Type the name of the department'
      }
    ])
    .then(answers => {
      connection.query('INSERT INTO department SET ?', {
        name: answers.addDepart
      })
      runTracker()
    })
}
function addRole () {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'addRole',
        message: 'Enter title of the role:'
      },
      {
        type: 'number',
        name: 'addSalary',
        message: 'Enter the Annual Salary for this role:'
      }
    ])
    .then(answersRole => {
      connection.query('SELECT*FROM department', function (err, res) {
        if (err) throw err
        inquirer
          .prompt([
            {
              type: 'number',
              name: 'department_id',
              message:
                'Enter the number of the department the title belongs to:',
              choices: function () {
                let table = cTable.getTable(' Titles ', res)
                return console.log(table)
              }
            }
          ])
          .then(answers => {
            connection.query('INSERT INTO role SET ?', {
              title: answersRole.addRole,
              salary: answersRole.addSalary,
              department_id: answers.department_id
            })
            runTracker()
          })
      })
    })

    .catch(err => {
      console.log('did not add roll', err)
    })
}

function addEmployee () {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?"
      },
      {
        type: 'input',
        name: 'lasteName',
        message: "What is the employee's last name?"
      }
    ])
    .then(answersEmp => {
      connection.query('SELECT id , title FROM role', function (err, res) {
        if (err) throw err
        inquirer
          .prompt([
            {
              name: 'role',
              type: 'Number',
              message: "Enter the id of the employee's title:",
              choices: function () {
                let table = cTable.getTable(' Titles ', res)
                return console.log(table)
              }
            }
          ])
          .then(answersRole => {
            let query =
              'SELECT employee.id,employee.firstName,employee.lasteName,role.title,role.salary,department.name,employee.manager_id FROM((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department ON role.department_id = department.id)'
            connection.query(query, function (err, res) {
              if (err) throw err
              inquirer
                .prompt([
                  {
                    name: 'manager_id',
                    type: 'number',
                    message: "Enter the id of Employee's manager:",
                    choices: function () {
                      let table = cTable.getTable(' Managers ', res)
                      return console.log(table)
                    }
                  }
                ])
                .then(function (answersMan) {
                  connection.query('INSERT INTO employee SET ?', {
                    firstName: answersEmp.firstName,
                    lasteName: answersEmp.lasteName,
                    role_id: answersRole.role,
                    manager_id: answersMan.manager_id
                  })
                  runTracker()
                })
            })
          })
      })
    })
}
