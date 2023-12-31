DROP DATABASE test;
CREATE DATABASE test;
USE test;
DROP TABLE IF EXISTS permissions;
DROP TABLE IF EXISTS work_expenses;
DROP TABLE IF EXISTS work_miles;
DROP TABLE IF EXISTS work_hours;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users_events;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS organizations;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS users_teams;
DROP TABLE IF EXISTS users_orgs;


CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  password VARCHAR(150) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_email (email)
);

CREATE TABLE organizations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_user_id INT,
  name VARCHAR(100) NOT NULL,
  website_url VARCHAR(150) NOT NULL,
  phone_number VARCHAR(150) NOT NULL,
  logo_url VARCHAR(100) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_name (name)
);
CREATE TABLE teams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  organization_id INT,
  created_by_user_id INT,
  name VARCHAR(100) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  team_id INT,
  created_by_user_id INT,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  address_street VARCHAR(100) NOT NULL,
  address_city VARCHAR(100) NOT NULL,
  address_state VARCHAR(100) NOT NULL,
  address_zipcode VARCHAR(100) NOT NULL,
  start_time DATETIME,
  end_time DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE users_orgs (
  user_id INT,
  organization_id INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, organization_id)
);
CREATE TABLE users_events (
  event_id INT,  
  user_id INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, event_id)
);
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  completed BOOLEAN NOT NULL DEFAULT 0,
  completed_by_user_id INT,
  completed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE work_hours (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT,
  user_id INT,
  start_time DATETIME,
  end_time DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE work_miles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT,
  user_id INT,
  mileage DECIMAL(10, 2),
  date_traveled DATE, 
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE work_expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT,
  user_id INT,
  expense_name VARCHAR(150) NOT NULL,
  expense_type VARCHAR(150) NOT NULL,
  amount DECIMAL(10, 2),
  description TEXT NOT NULL,
  receipt_url VARCHAR(150) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE permissions (
  user_id INT,
  organization_id INT,
  level INT DEFAULT 3,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, organization_id)
);
INSERT INTO users (email, first_name, last_name, password) VALUES
  ('test@test.com', 'test', 'test', '$2b$10$3HHLfnRLhhjJKJOWk2HnPOb90giJc6pRhpRdznFeoUFbu2i5oBn4y');

INSERT INTO organizations (owner_user_id, name, website_url, phone_number, logo_url) VALUES
  (1, 'test_org', 'https://testorg.com', '+123456789', 'https://testorg.com/logo.png');

INSERT INTO permissions (user_id, organization_id, level) VALUES (1, 1, 0);
INSERT INTO teams (organization_id, created_by_user_id, name) VALUES (1, 1, "Organization-wide Team");
INSERT INTO events (team_id, created_by_user_id, name, description, address_street, address_city, address_state, address_zipcode, start_time, end_time) VALUES
  (1, 1, 'test_event', 'Description for test_event', '1234 Test Street', 'test_city', 'test_state', '12345', '2023-08-28 10:00:00', '2023-08-28 15:00:00');
INSERT INTO users_orgs (user_id, organization_id) VALUES (1, 1);
INSERT INTO work_hours (event_id, user_id, start_time, end_time) VALUES
  (1, 1, '2023-08-28 09:00:00', '2023-08-28 17:00:00');

INSERT INTO work_miles (event_id, user_id, mileage, date_traveled) VALUES
  (1, 1, 50.25, '2023-08-30');

INSERT INTO work_expenses (event_id, user_id, expense_name, expense_type, amount, description, receipt_url) VALUES
  (1, 1, 'Lunch Meeting', 'Meals', 30.50, 'Lunch with clients', 'https://receipts.com/lunch.jpg');

INSERT INTO users_events (user_id, event_id) VALUES (1, 1);
INSERT INTO tasks (event_id, name, description) VALUES
  (1, "Outdoor cleanup - South East Door", "Clean up outdoor entrance after event ends.");
