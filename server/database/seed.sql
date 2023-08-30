CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  password VARCHAR(150) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_email (email)
);

CREATE TABLE organizations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_user_id INT,
  name VARCHAR(100) NOT NULL,
  website_url VARCHAR(150) NOT NULL,
  phone_number VARCHAR(150) NOT NULL,
  logo_url VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_name (name)
);
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  organization_id INT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  address_street VARCHAR(100) NOT NULL,
  address_city VARCHAR(100) NOT NULL,
  address_state VARCHAR(100) NOT NULL,
  address_zipcode VARCHAR(100) NOT NULL,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE users_events (
  event_id INT,  
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, event_id)
);
CREATE TABLE work_hours (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT,
  user_id INT,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE work_miles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT,
  user_id INT,
  mileage DECIMAL(10, 2),
  date_traveled DATE, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE permissions (
  user_id INT,
  organization_id INT,
  level INT DEFAULT 3,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, organization_id)
);
INSERT INTO users (email, first_name, last_name, password) VALUES
  ('user1@example.com', "Mickey", "Mouse", 'password123'),
  ('user2@example.com', "Donald", "Duck",'securepass'),
  ('user3@example.com', "Felix", "Cat",'qwerty');
INSERT INTO organizations (owner_user_id, name, website_url, phone_number, logo_url) VALUES
  (1, 'Org1', 'https://org1.com', '+123456789', 'https://org1.com/logo.png'),
  (1, 'Org2', 'https://org2.com', '+987654321', 'https://org2.com/logo.png'),
  (2, 'Org3', 'https://org3.com', '+555555555', 'https://org3.com/logo.png');
INSERT INTO events (organization_id, name, description, address_street, address_city, address_state, address_zipcode, start_time, end_time) VALUES
  (1, 'Event1', 'Description for Event 1', '123 Main St', 'City1', 'State1', '12345', '2023-08-28 10:00:00', '2023-08-28 15:00:00'),
  (1, 'Event2', 'Description for Event 2', '456 Elm St', 'City1', 'State1', '12345', '2023-09-05 13:00:00', '2023-09-05 18:00:00'),
  (2, 'Event3', 'Description for Event 3', '789 Oak St', 'City2', 'State2', '67890', '2023-08-30 09:30:00', '2023-08-30 12:30:00');
INSERT INTO work_hours (event_id, user_id, start_time, end_time) VALUES
  (1, 1, '2023-08-28 09:00:00', '2023-08-28 17:00:00'),
  (2, 2, '2023-09-05 10:00:00', '2023-09-05 16:00:00'),
  (3, 3, '2023-08-30 08:30:00', '2023-08-30 16:30:00');
  INSERT INTO work_miles (event_id, user_id, mileage, date_traveled) VALUES
  (1, 1, 50.25, '2023-08-30'),
  (2, 2, 32.75, '2023-08-30'),
  (3, 3, 75.50, '2023-08-30');
  INSERT INTO work_expenses (event_id, user_id, expense_name, expense_type, amount, description, receipt_url) VALUES
  (1, 1, 'Lunch Meeting', 'Meals', 30.50, 'Lunch with clients', 'https://receipts.com/lunch.jpg'),
  (2, 2, 'Taxi Fare', 'Transportation', 20.00, 'Taxi to the venue', 'https://receipts.com/taxi.jpg'),
  (3, 3, 'Office Supplies', 'Supplies', 50.75, 'Purchased office materials', 'https://receipts.com/supplies.jpg');
  INSERT INTO users_events (user_id, event_id) VALUES (1, 1), (1, 2), (1, 3), (2, 1), (2, 2), (3, 1);