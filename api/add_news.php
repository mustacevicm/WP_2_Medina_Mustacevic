<?php
require 'db.php';
$data = json_decode(file_get_contents("php://input"));
if (isset($data->naslov) && isset($data->sadrzaj)) {
    $sql = "INSERT INTO news (naslov, sadrzaj, kategorija, slika_url, datum) VALUES (?, ?, ?, ?, NOW())";
    $stmt = $conn->prepare($sql);
    if ($stmt->execute([$data->naslov, $data->sadrzaj, $data->kategorija, $data->slika_url])) {
        echo json_encode(["message" => "Vijest dodana"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Greška"]);
    }
}
?>