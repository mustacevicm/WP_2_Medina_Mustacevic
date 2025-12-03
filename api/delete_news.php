<?php
require 'db.php';
$id = $_GET['id'];
if (isset($id)) {
    $sql = "DELETE FROM news WHERE id=?";
    $stmt = $conn->prepare($sql);
    if ($stmt->execute([$id])) {
        echo json_encode(["message" => "Obrisano"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Greška"]);
    }
}
?>