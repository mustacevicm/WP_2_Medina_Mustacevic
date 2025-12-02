<?php
require 'db.php';

$sql = "SELECT * FROM news ORDER BY datum DESC";

$stmt = $conn->prepare($sql);
$stmt->execute();

// Izvuci rezultate
$news = $stmt->fetchAll();

// Vrati podatke kao JSON (to Angular razumije)
echo json_encode($news);
?>