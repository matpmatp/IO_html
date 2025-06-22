<?php
// Plik: api/dodaj_oplate.php

require_once 'db_connect.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $idStudenta = $data['idStudenta'];
    $kwota = $data['kwota'];
    $opis = $data['opis'];

    // Prosta walidacja, czy dane nie są puste
    if (!empty($idStudenta) && !empty($kwota)) {

        // Używamy NOW(), aby baza danych sama wstawiła aktualną datę i czas
        $sql = "INSERT INTO Opłata (Id_studenta, Wartosc, Opis, Data) VALUES (?, ?, ?, NOW())";

        $stmt = $conn->prepare($sql);
        // 'ids' -> integer (id studenta), double (kwota), string (opis)
        $stmt->bind_param("ids", $idStudenta, $kwota, $opis);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(['message' => 'Nowa opłata została pomyślnie dodana.']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Błąd zapisu do bazy danych.', 'error' => $stmt->error]);
        }
        $stmt->close();

    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Brak wymaganych danych: ID studenta i kwota są obowiązkowe.']);
    }

} else {
    http_response_code(405);
    echo json_encode(['message' => 'Niedozwolona metoda.']);
}

$conn->close();
?>