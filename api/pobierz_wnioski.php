<?php
// Plik: api/pobierz_wnioski.php -- WERSJA POPRAWIONA

require_once 'db_connect.php';
header('Content-Type: application/json');

$wnioski = [];

// ZAPYTANIE SQL POBIERA TERAZ WSZYSTKIE FLAGI STATUSU
$sql = "
    SELECT
        w.Id_wniosku,
        w.Typ,
        w.DataZlozenia,
        sw.Przyjety,
        sw.Odrzucony,
        sw.Wstrzymany,
        sw.Przetwarzany
    FROM
        Wniosek AS w
    LEFT JOIN
        StatusWniosku AS sw ON w.Id_wniosku = sw.Id_wniosku
    ORDER BY
        w.DataZlozenia DESC
";

$result = $conn->query($sql);

if ($result) {
    while($row = $result->fetch_assoc()) {
        $wnioski[] = $row;
    }
    echo json_encode($wnioski);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Błąd pobierania danych z bazy.', 'error' => $conn->error]);
}

$conn->close();
?>