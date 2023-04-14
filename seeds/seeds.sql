USE employee_db;

INSERT INTO department (name) VALUES
('badguys'),
('kiske-Fam');

INSERT INTO role (title, salary, department_id) VALUES
('kiskes', 90000, 2),
('baddie',6000,1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Ky', 'Kiske', 1, 2),
('Sol', 'Badguy', 2, 1),
('Sin', 'Kiske', 1, 1);