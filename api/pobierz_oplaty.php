<?php
// Plik: api/pobierz_oplaty.php

require_once 'db_connect.php';
header('Content-Type: application/json');

$oplaty = [];

// Pobieramy opłaty i dołączamy dane studenta (Imię, Nazwisko) za pomocą JOIN
$sql = "
    SELECT
        o.Id_oplaty,
        o.Wartosc,
        o.Opis,
        o.Data,
        s.Imie,
        s.Nazwisko
    FROM
        Opłata AS o
    JOIN
        Student AS s ON o.Id_studenta = s.Id_studenta
    ORDER BY
        o.Data DESC
";

$result = $conn->query($sql);

if ($result) {
    while($row = $result->fetch_assoc()) {
        $oplaty[] = $row;
    }
    echo json_encode($oplaty);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Błąd pobierania danych z bazy.', 'error' => $conn->error]);
}

$conn->close();
?>