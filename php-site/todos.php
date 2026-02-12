<?php
$pageTitle = 'To-Do List - PHP Demo';
require_once 'includes/db.php';

// Handle form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    
    if ($action === 'add' && !empty($_POST['title'])) {
        $stmt = $pdo->prepare("INSERT INTO todos (title) VALUES (?)");
        $stmt->execute([trim($_POST['title'])]);
    } elseif ($action === 'toggle' && !empty($_POST['id'])) {
        $stmt = $pdo->prepare("UPDATE todos SET completed = NOT completed WHERE id = ?");
        $stmt->execute([$_POST['id']]);
    } elseif ($action === 'delete' && !empty($_POST['id'])) {
        $stmt = $pdo->prepare("DELETE FROM todos WHERE id = ?");
        $stmt->execute([$_POST['id']]);
    } elseif ($action === 'update' && !empty($_POST['id']) && !empty($_POST['title'])) {
        $stmt = $pdo->prepare("UPDATE todos SET title = ? WHERE id = ?");
        $stmt->execute([trim($_POST['title']), $_POST['id']]);
    }
    
    header('Location: todos.php');
    exit;
}

$todos = $pdo->query("SELECT * FROM todos ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
$editId = $_GET['edit'] ?? null;

require_once 'includes/header.php';
?>

<h1>To-Do List</h1>

<form method="post" class="mb-4">
    <input type="hidden" name="action" value="add">
    <div class="input-group">
        <input type="text" name="title" class="form-control" placeholder="Add new task..." required>
        <button type="submit" class="btn btn-primary">Add</button>
    </div>
</form>

<?php if (empty($todos)): ?>
    <p class="text-muted">No tasks yet. Add one above!</p>
<?php else: ?>
    <ul class="list-group">
        <?php foreach ($todos as $todo): ?>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <?php if ($editId == $todo['id']): ?>
                    <form method="post" class="flex-grow-1 me-2">
                        <input type="hidden" name="action" value="update">
                        <input type="hidden" name="id" value="<?= $todo['id'] ?>">
                        <div class="input-group">
                            <input type="text" name="title" class="form-control" value="<?= htmlspecialchars($todo['title']) ?>" required>
                            <button type="submit" class="btn btn-success btn-sm">Save</button>
                            <a href="todos.php" class="btn btn-secondary btn-sm">Cancel</a>
                        </div>
                    </form>
                <?php else: ?>
                    <div class="d-flex align-items-center flex-grow-1">
                        <form method="post" class="me-2">
                            <input type="hidden" name="action" value="toggle">
                            <input type="hidden" name="id" value="<?= $todo['id'] ?>">
                            <button type="submit" class="btn btn-sm <?= $todo['completed'] ? 'btn-success' : 'btn-outline-secondary' ?>">
                                <?= $todo['completed'] ? '✓' : '○' ?>
                            </button>
                        </form>
                        <span class="<?= $todo['completed'] ? 'completed' : '' ?>"><?= htmlspecialchars($todo['title']) ?></span>
                    </div>
                    <div>
                        <a href="?edit=<?= $todo['id'] ?>" class="btn btn-sm btn-outline-primary">Edit</a>
                        <form method="post" class="d-inline">
                            <input type="hidden" name="action" value="delete">
                            <input type="hidden" name="id" value="<?= $todo['id'] ?>">
                            <button type="submit" class="btn btn-sm btn-outline-danger" onclick="return confirm('Delete this task?')">Delete</button>
                        </form>
                    </div>
                <?php endif; ?>
            </li>
        <?php endforeach; ?>
    </ul>
<?php endif; ?>

<?php require_once 'includes/footer.php'; ?>
