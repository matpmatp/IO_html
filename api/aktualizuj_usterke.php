<?php
// Plik: api/aktualizuj_usterke.php

require_once 'db_connect.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $idUsterki = $data['idUsterki'];
    $opis = $data['opis'];
    $nowyStatus = $data['status'];

    if (empty($idUsterki) || empty($opis) || empty($nowyStatus)) {
        http_response_code(400);
        echo json_encode(['message' => 'Wszystkie pola są wymagane.']);
        exit();
    }

    $conn->begin_transaction();
    try {
        // Aktualizacja opisu w tabeli Usterka
        $stmt1 = $conn->prepare("UPDATE Usterka SET Opis = ? WHERE Id_usterki = ?");
        $stmt1->bind_param("si", $opis, $idUsterki);
        $stmt1->execute();

        // Aktualizacja statusu w tabeli StatusUsterki
        $zgloszona = ($nowyStatus === 'zgloszona') ? 1 : 0;
        $w_naprawie = ($nowyStatus === 'w_naprawie') ? 1 : 0;
        $naprawiona = ($nowyStatus === 'naprawiona') ? 1 : 0;

        $stmt2 = $conn->prepare("UPDATE StatusUsterki SET Zgloszona = ?, W_naprawie = ?, Naprawiona = ? WHERE Id_usterki = ?");
        $stmt2->bind_param("iiii", $zgloszona, $w_naprawie, $naprawiona, $idUsterki);
        $stmt2->execute();

        $conn->commit();
        echo json_encode(['message' => 'Usterka została pomyślnie zaktualizowana.']);

    } catch (mysqli_sql_exception $exception) {
        $conn->rollback();
        http_response_code(500);
        echo json_encode(['message' => 'Błąd aktualizacji bazy danych.', 'error' => $exception->getMessage()]);
    }
}
?>