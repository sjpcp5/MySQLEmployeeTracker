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
  password: '64IamAwarrior!@',
  database: 'theCompany_db'
})
connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
  console.log('connected as id ' + connection.threadId)
})
// need to require console table, table alows the called data to be
// projected in the terminal

// function to call query table view
// function to render data with console
// inquirer interface questions:
/* view department, view employee, view role = Select * FROM
add departments, add roles, employees = INSERT Table
update employee roles UPDATE or ALTER TABLE */

// preparing queries
// var sql = 'SELECT * FROM ?? WHERE ?? = ?'
// var inserts = ['users', 'id', userid]
// sql = mysql.format(sql, inserts)

//innerjoin in db
// const storedProdcedure =  + connection.escape();

// variable to render table
// const companyTable = cTable.getTable(
//   ['ID', 'First Name', 'Last Name', 'Title', 'Salary', 'Department', 'Manager'],
//   results
// )
// call innerjoin of all tables and print result
connection.query('call theCompany_db.GetAllTables', function (
  error,
  results,
  fields
) {
  // cTable.getTable(fields, results)
  console.log(fields, results)
  if (error) throw error
})

//query connection
// connection.query('', function (error, results, fields) {
//   if (error) throw error
// })

//id of inserted row
// connection.query('INSERT INTO posts SET ?', { title: 'test' }, function (
//   error,
//   results,
//   fields
// ) {
//   if (error) throw error
//   console.log(results.insertId)
// })

//results of changed rows
// connection.query('UPDATE posts SET ...', function (error, results, fields) {
//   if (error) throw error
//   console.log('changed ' + results.changedRows + ' rows')
// })
