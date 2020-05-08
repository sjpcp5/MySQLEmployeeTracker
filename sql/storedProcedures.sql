DELIMITER
//

CREATE PROCEDURE GetAllEmployees()
BEGIN
    SELECT *
    FROM employee;
END
//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE GetAllTables()
BEGIN
    SELECT employee.id, employee.firstName, employee.lasteName, role.title, role.salary, department.name, employee.manager_id
    FROM ((employee
        INNER JOIN role ON employee.role_id = role.id)
        INNER JOIN department ON role.department_id = department.id);
END
//

DELIMITER ;