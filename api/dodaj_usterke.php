<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);


require_once 'db_connect.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $nrPokoju = $data['nrPokoju'];
    $opis = $data['opis'];

    if (!empty($nrPokoju) && !empty($opis)) {
        $conn->begin_transaction();

        try {
            $sql1 = "INSERT INTO Usterka (Nr_pokoju, Opis, DataZgloszenia) VALUES (?, ?, NOW())";
            $stmt1 = $conn->prepare($sql1);
            $stmt1->bind_param("is", $nrPokoju, $opis);
            $stmt1->execute();

            $idNowejUsterki = $conn->insert_id;

            $sql2 = "INSERT INTO StatusUsterki (Id_usterki, Zgloszona) VALUES (?, 1)";
            $stmt2 = $conn->prepare($sql2);
            $stmt2->bind_param("i", $idNowejUsterki);
            $stmt2->execute();

            $conn->commit();
            http_response_code(201);
            echo json_encode(['message' => 'Usterka została pomyślnie zgłoszona.']);

        } catch (mysqli_sql_exception $exception) {
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