<?php
$pageTitle = 'Notes - PHP Demo';
require_once 'includes/db.php';
require_once 'includes/header.php';

$notes = $pdo->query("SELECT * FROM notes ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
?>

<h1>Notes</h1>
<p class="text-muted">Informational messages and notes.</p>

<?php if (empty($notes)): ?>
    <p class="text-muted">No notes available.</p>
<?php else: ?>
    <div class="row">
        <?php foreach ($notes as $note): ?>
            <div class="col-md-4 mb-3">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title"><?= htmlspecialchars($note['title']) ?></h5>
                        <p class="card-text"><?= htmlspecialchars($note['content']) ?></p>
                    </div>
                    <div class="card-footer text-muted small">
                        <?= date('M j, Y', strtotime($note['created_at'])) ?>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
<?php endif; ?>

<?php require_once 'includes/footer.php'; ?>
