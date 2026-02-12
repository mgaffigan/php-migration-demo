<?php
$host = getenv('DB_HOST') ?: 'db';
$dbname = getenv('DB_NAME') ?: 'app';
$user = getenv('DB_USER') ?: 'app';
$pass = getenv('DB_PASS') ?: 'secret';

$pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Initialize tables if they don't exist
$pdo->exec("
    CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed TINYINT DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
");

$pdo->exec("
    CREATE TABLE IF NOT EXISTS notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
");

// Seed notes if empty
$count = $pdo->query("SELECT COUNT(*) FROM notes")->fetchColumn();
if ($count == 0) {
    $pdo->exec("
        INSERT INTO notes (title, content) VALUES 
        ('Welcome', 'This is a simple PHP demo application.'),
        ('About MySQL', 'MySQL is a popular relational database used in production applications.'),
        ('Docker Setup', 'This app runs in Docker with PHP 8.2, Apache, and MySQL 8.0.')
    ");
}
