INSERT INTO department
    (name)
VALUES("Engineering" ),
    ("Finance"),
    ("Legal"),
    ("Sales");
SELECT *
FROM department;

INSERT INTO role
    (title,salary,department_id)
VALUES("Lead Engineer", 120000, 1),
    ("Software Engineer", 70000, 1),
    ("Accountant", 70000, 2),
    ("Legal Team Lead", 100000, 3),
    ("Lawyer", 80000, 3),
    ("Sales Lead", 90000, 4),
    ("Salesperson", 60000, 4);
SELECT *
FROM role;

INSERT INTO employee
    (firstName,lastName,role_id,manager_id)
VALUES("Geralt", "Rivia", 1, NULL),
    ("Ciri", "Rhiannon", 1, 1),
    ("Alex", "Phillips", 3, NULL),
    ("Paula", "Shoyer", 4, NULL),
    ("Mordecai", "Naor", 5, 4),
    ("Kathryn", "Janeway", 6, NULL),
    ("Jean Luc", "Picard", 7, 6);
SELECT *
FROM role;