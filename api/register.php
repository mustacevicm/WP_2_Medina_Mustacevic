<?php
require 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->username) && isset($data->password) && isset($data->email)) {

    $check = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $check->execute([$data->username]);

    if ($check->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(["message" => "Korisničko ime već postoji!"]);
        exit;
    }

    $sql = "INSERT INTO users (ime, prezime, username, password, email, role) VALUES (?, ?, ?, ?, ?, 'user')";
    $stmt = $conn->prepare($sql);

    if ($stmt->execute([$data->ime, $data->prezime, $data->username, $data->password, $data->email])) {
        echo json_encode(["message" => "Uspješna registracija"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Greška prilikom registracije"]);
    }
}
?>