USE employee_db;

INSERT INTO department (name) VALUES
('sales'),
('human resources');

INSERT INTO role (title, salary, department_id) VALUES
('developer', 90000, 1),
('samich',6000,2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('ben', 'kerby', 1, 2),
('man', 'guy', 2, 1);