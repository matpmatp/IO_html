<?php

require_once 'db_connect.php';
header('Content-Type: application/json');

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Brak ID wniosku.']);
    exit();
}

$id_wniosku = $_GET['id'];

$sql = "SELECT w.Id_wniosku, w.Typ, sw.Przyjety FROM Wniosek AS w LEFT JOIN StatusWniosku AS sw ON w.Id_wniosku = sw.Id_wniosku WHERE w.Id_wniosku = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_wniosku);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $wniosek = $result->fetch_assoc();
    echo json_encode($wniosek);
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Nie znaleziono wniosku o podanym ID.']);
}

$stmt->close();
$conn->close();
?>