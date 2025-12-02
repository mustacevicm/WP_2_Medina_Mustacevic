<?php
require 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->username) && isset($data->password)) {
    $sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$data->username, $data->password]);

    $user = $stmt->fetch();

    if ($user) {
        echo json_encode($user);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Pogrešno korisničko ime ili lozinka"]);
    }
} else {
    echo json_encode(["message" => "Nisu poslani podaci"]);
}
?>