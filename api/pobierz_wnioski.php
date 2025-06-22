<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
// api/pobierz_wnioski.php -- WERSJA POPRAWIONA

// Po rozwiązaniu problemu, usuń te dwie linie, aby nie pokazywać błędów na produkcji!

require_once 'db_connect.php';

header('Content-Type: application/json');

$wnioski = [];

// NOWE, POPRAWIONE ZAPYTANIE SQL Z UŻYCIEM LEFT JOIN
// Łączymy tabelę Wniosek (alias 'w') z tabelą StatusWniosku (alias 'sw')
// warunkiem połączenia jest zgodność Id_wniosku w obu tabelach.
$sql = "
    SELECT
        w.Id_wniosku,
        w.Typ,
        w.DataZlozenia,
        sw.Przetwarzany,
        sw.Przyjety,
        sw.Odrzucony,
        sw.Wstrzymany
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