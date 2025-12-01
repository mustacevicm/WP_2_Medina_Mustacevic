<?php
require 'db.php';

$sql = "SELECT * FROM news ORDER BY datum DESC";

$stmt = $conn->prepare($sql);
$stmt->execute();

$news = $stmt->fetchAll();

echo json_encode($news);
?>