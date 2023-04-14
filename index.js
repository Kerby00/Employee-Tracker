const inquirer = require('inquirer');
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employee_db'
})
function start() {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'what would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'

        ],
    }).then((answer) => {
        switch (answer.action) {
            case 'View all departments':
                viewDepartments()
                break;
            case 'View all roles':
                viewRoles()
                break;
            case 'View all employees':
                viewEmployees()
                break;
            case 'Add a department':
                addDepartment()
                break;
            case 'Add a role':
                addRole()
                break;
            case 'Add an employee':
                addEmployee()
                break;
            case 'Update an employee role':
                updateEmployeeRole()
                break;
            case 'Exit':
                connection.end()
                break;
            default:
                break;

        }
    })
}

const viewDepartments = () => {
    let query = 'SELECT * FROM department';

    connection.query(query, function (err, res) {
        if (err) throw (err);
        console.table(res)
        start()
    })
}

const viewRoles = () => {
    let query = 'SELECT role.title, role.salary, role.id, department.name FROM role RIGHT JOIN department ON role.department_id = department.id';

    connection.query(query, function (err, res) {
        if (err) throw (err);
        console.table(res)
        start()
    })
}

const viewEmployees = () => {
    let query = 'SELECT t1.first_name, t1.last_name, t2.first_name AS Manager FROM employee t1 INNER JOIN employee t2 ON t1.manager_id = t2.id';

    connection.query(query, function (err, res) {
        if (err) throw (err);
        console.table(res)
        start()
    })
}

const addDepartment = () => {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw (err);
        inquirer.prompt([{
            name: 'department',
            type: 'input',
            message: 'New Department Name?'
        }]).then(function (response) {
            connection.query('INSERT INTO department SET ?', {
                name: response.department
            }),
                start()
        })
    })
}

const addRole = () => {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw (err);
        inquirer.prompt([{
            name: 'role',
            type: 'input',
            message: 'New Role Name?'
        }, {
            name: 'salary',
            type: 'input',
            message: 'Salary?'
        }, {
            name: 'department',
            type: 'list',
            choices: function () {
                return res.map((department) => ({ name: department.name, value: department.id }))
            },
            message: 'Department?'
        }]).then(function (response) {
            connection.query('INSERT INTO role SET ?', {
                title: response.role,
                salary: response.salary,
                department_id: response.department
            })
            start()
        })
    })
}
const addEmployee = () => {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw (err);
        inquirer.prompt([{
            name: 'firstName',
            type: 'input',
            message: 'first name?'
        }, {
            name: 'lastName',
            type: 'input',
            message: 'Last name?'
        }, {
            name: 'managerId',
            type: 'input',
            message: 'Manager id?'
        }, {
            name: 'addRole',
            type: 'list',
            choices: function () {
                return res.map((role) => ({ name: role.title, value: role.id }))
            },
            message: 'Role?'
        }]).then(function (response) {
            connection.query('INSERT INTO employee SET ?',
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    manager_id: response.managerId,
                    role_id: response.addRole,
                }),
                start()
        })
    })
}


const updateEmployeeRole = () => {
    connection.query("SELECT * FROM role", function (err, res) {
        inquirer.prompt([
            {
                name: 'employeeId',
                type: 'input',
                message: 'employee id?'
            },
            {
                name: 'addRole',
                type: 'list',
                choices: function () {
                    return res.map((role) => ({ name: role.title, value: role.id }))
                },
                message: 'Role?'
            }
        ]).then(function (response) {
            connection.query('UPDATE employee SET ? WHERE ?',
                [{ role_id: response.addRole },
                { id: response.employeeId }]);
            start()
        })
    })

}
start()