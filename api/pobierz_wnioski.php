<?php
// api/pobierz_wnioski.php

require_once 'db_connect.php'; // Używamy tego samego, gotowego połączenia z bazą

header('Content-Type: application/json'); // Mówimy przeglądarce, że odpowiedź będzie w JSON

$wnioski = []; // Przygotowujemy pustą tablicę na wyniki

// Zapytanie SQL, aby pobrać wszystkie wnioski, posortowane od najnowszego
$sql = "SELECT Id_wniosku, Typ, DataZlozenia, Status FROM Wniosek ORDER BY DataZlozenia DESC";

$result = $conn->query($sql);

if ($result) {
    // Jeśli zapytanie się powiodło, przejdź przez wszystkie wiersze wyników
    while($row = $result->fetch_assoc()) {
        // Dodaj każdy wiersz (wniosek) do naszej tablicy
        $wnioski[] = $row;
    }
    // Zwróć tablicę z wnioskami w formacie JSON
    echo json_encode($wnioski);
} else {
    // Jeśli zapytanie SQL zawiodło
    http_response_code(500);
    echo json_encode(['message' => 'Błąd pobierania danych z bazy.', 'error' => $conn->error]);
}

$conn->close();
?>