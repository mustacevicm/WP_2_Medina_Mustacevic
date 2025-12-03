<?php
require 'db.php';
$data = json_decode(file_get_contents("php://input"));
if (isset($data->id) && isset($data->naslov)) {
    $sql = "UPDATE news SET naslov=?, sadrzaj=?, kategorija=?, slika_url=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    if ($stmt->execute([$data->naslov, $data->sadrzaj, $data->kategorija, $data->slika_url, $data->id])) {
        echo json_encode(["message" => "Vijest ažurirana"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Greška"]);
    }
}
?>