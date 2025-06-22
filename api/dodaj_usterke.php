<?php
// Plik: api/dodaj_usterke.php

require_once 'db_connect.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $nrPokoju = $data['nrPokoju'];
    $opis = $data['opis'];

    if (!empty($nrPokoju) && !empty($opis)) {
        // Rozpoczynamy transakcję, aby zapewnić spójność danych
        $conn->begin_transaction();

        try {
            // Krok 1: Wstaw usterkę do tabeli Usterka
            $sql1 = "INSERT INTO Usterka (Nr_pokoju, Opis, DataZgloszenia) VALUES (?, ?, NOW())";
            $stmt1 = $conn->prepare($sql1);
            $stmt1->bind_param("is", $nrPokoju, $opis);
            $stmt1->execute();

            // Pobierz ID właśnie dodanej usterki
            $idNowejUsterki = $conn->insert_id;

            // Krok 2: Wstaw domyślny status do tabeli StatusUsterki
            $sql2 = "INSERT INTO StatusUsterki (Id_usterki, Zgloszona) VALUES (?, 1)";
            $stmt2 = $conn->prepare($sql2);
            $stmt2->bind_param("i", $idNowejUsterki);
            $stmt2->execute();

            // Jeśli oba zapytania się powiodły, zatwierdź transakcję
            $conn->commit();
            http_response_code(201);
            echo json_encode(['message' => 'Usterka została pomyślnie zgłoszona.']);

        } catch (mysqli_sql_exception $exception) {
            // Jeśli którekolwiek zapytanie zawiodło, wycofaj zmiany
            $conn->rollback();
            http_response_code(500);
            echo json_encode(['message' => 'Błąd zapisu do bazy danych.', 'error' => $exception->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Numer pokoju i opis usterki są wymagane.']);
    }
}
?>