<?php
require 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id) && isset($data->old_password) && isset($data->new_password)) {
    $check = $conn->prepare("SELECT id FROM users WHERE id = ? AND password = ?");
    $check->execute([$data->id, $data->old_password]);

    if ($check->rowCount() > 0) {
        $update = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");

        if ($update->execute([$data->new_password, $data->id])) {
            echo json_encode(["message" => "Šifra uspješno promijenjena!"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Greška pri ažuriranju."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Stara šifra nije tačna!"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Nedostaju podaci."]);
}
?>