CREATE DATABASE heritage_express;
USE heritage_express;

-- USERS
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('ADMIN', 'AGENT', 'GUEST'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PACKAGES
CREATE TABLE packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    running_day ENUM('MON','TUE','WED','THU','FRI','SAT','SUN'),
    duration INT,
    active BOOLEAN DEFAULT TRUE
);

-- TRAINS
CREATE TABLE trains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    package_id INT,
    direction ENUM('UP','DOWN'),
    FOREIGN KEY (package_id) REFERENCES packages(id)
);

-- ROUTES
CREATE TABLE routes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    train_id INT,
    station VARCHAR(100),
    arrival TIME,
    departure TIME,
    day_no INT,
    FOREIGN KEY (train_id) REFERENCES trains(id)
);

-- FARES
CREATE TABLE fares (
    id INT AUTO_INCREMENT PRIMARY KEY,
    package_id INT,
    class ENUM('EXECUTIVE','PREMIER','CLUB'),
    price INT,
    FOREIGN KEY (package_id) REFERENCES packages(id)
);

-- ADDONS
CREATE TABLE addons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    price INT,
    allowed_classes SET('PREMIER','CLUB')
);

-- BOOKINGS
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pnr VARCHAR(20) UNIQUE,
    package_id INT,
    train_id INT,
    class ENUM('EXECUTIVE','PREMIER','CLUB'),
    journey_date DATE,
    total_amount INT,
    status ENUM('BOOKED','CANCELLED'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
