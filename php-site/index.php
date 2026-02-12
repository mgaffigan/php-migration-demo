<?php
$pageTitle = 'Home - PHP Demo';
require_once 'includes/db.php';
require_once 'includes/header.php';

$todoCount = $pdo->query("SELECT COUNT(*) FROM todos")->fetchColumn();
$noteCount = $pdo->query("SELECT COUNT(*) FROM notes")->fetchColumn();
?>

<div class="row">
    <div class="col-md-8">
        <h1>Welcome to PHP Demo</h1>
        <p class="lead">A simple PHP application demonstrating basic CRUD operations with SQLite.</p>
        
        <div class="row mt-4">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">To-Do List</h5>
                        <p class="card-text">Manage your tasks with full CRUD operations.</p>
                        <p class="text-muted"><?= $todoCount ?> item(s)</p>
                        <a href="todos.php" class="btn btn-primary">View To-Dos</a>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Notes</h5>
                        <p class="card-text">Browse informational notes and messages.</p>
                        <p class="text-muted"><?= $noteCount ?> note(s)</p>
                        <a href="notes.php" class="btn btn-secondary">View Notes</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card bg-light">
            <div class="card-body">
                <h5 class="card-title">Tech Stack</h5>
                <ul class="list-unstyled mb-0">
                    <li>PHP 8.2</li>
                    <li>MySQL 8.0</li>
                    <li>Bootstrap 5</li>
                    <li>Docker</li>
                </ul>
            </div>
        </div>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>
