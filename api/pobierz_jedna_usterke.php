<?php
// Plik: api/pobierz_jedna_usterke.php

require_once 'db_connect.php';
header('Content-Type: application/json');

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Brak ID usterki.']);
    exit();
}

$id_usterki = $_GET['id'];

// Pobieramy dane usterki i jej aktualny status
$sql = "
    SELECT
        u.Id_usterki, u.Nr_pokoju, u.Opis,
        su.Zgloszona, su.W_naprawie, su.Naprawiona
    FROM
        Usterka AS u
    LEFT JOIN
        StatusUsterki AS su ON u.Id_usterki = su.Id_usterki
    WHERE
        u.Id_usterki = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_usterki);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $usterka = $result->fetch_assoc();
    echo json_encode($usterka);
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Nie znaleziono usterki o podanym ID.']);
}

$stmt->close();
$conn->close();
?>