<?php
// Plik: api/aktualizuj_wniosek.php -- WERSJA DIAGNOSTYCZNA

// Włączamy wyświetlanie błędów
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once 'db_connect.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // --- KROK DIAGNOSTYCZNY A: Sprawdź, co otrzymał serwer ---
    if ($data === null) {
        http_response_code(400);
        echo json_encode(['message' => 'Błąd: Nie otrzymano danych lub błąd w formacie JSON.']);
        exit();
    }

    $idWniosku = $data['idWniosku'];
    $typ = $data['typ'];
    $nowyStatus = $data['status'];

    // --- KROK DIAGNOSTYCZNY B: Zaktualizujmy tabelę StatusWniosku ---
    $sqlStatus = "UPDATE StatusWniosku SET Przyjety = ?, Odrzucony = ?, Wstrzymany = ?, Przetwarzany = ? WHERE Id_wniosku = ?";
    $stmtStatus = $conn->prepare($sqlStatus);

    $przyjety = ($nowyStatus === 'przyjety') ? 1 : 0;
    $odrzucony = ($nowyStatus === 'odrzucony') ? 1 : 0;
    $wstrzymany = ($nowyStatus === 'wstrzymany') ? 1 : 0;
    $przetwarzany = ($nowyStatus === 'przetwarzany') ? 1 : 0;

    $stmtStatus->bind_param("iiiii", $przyjety, $odrzucony, $wstrzymany, $przetwarzany, $idWniosku);

    $statusSuccess = $stmtStatus->execute();
    $statusAffectedRows = $stmtStatus->affected_rows;
    $statusError = $stmtStatus->error;
    $stmtStatus->close();

    // --- KROK DIAGNOSTYCZNY C: Zaktualizujmy tabelę Wniosek ---
    $sqlTyp = "UPDATE Wniosek SET Typ = ? WHERE Id_wniosku = ?";
    $stmtTyp = $conn->prepare($sqlTyp);
    $stmtTyp->bind_param("si", $typ, $idWniosku);

    $typSuccess = $stmtTyp->execute();
    $typAffectedRows = $stmtTyp->affected_rows;
    $typError = $stmtTyp->error;
    $stmtTyp->close();

    // --- KROK DIAGNOSTYCZNY D: Zwróć szczegółową odpowiedź ---
    if ($statusSuccess && $typSuccess) {
        if ($statusAffectedRows > 0 || $typAffectedRows > 0) {
            echo json_encode(['message' => 'Wniosek został pomyślnie zaktualizowany.']);
        } else {
            echo json_encode(['message' => 'Zapytanie wykonane, ale nie wprowadzono żadnych zmian (możliwe, że dane były takie same).']);
        }
    } else {
        // Jeśli którekolwiek zapytanie zawiodło, zwróć szczegółowe błędy
        http_response_code(500);
        echo json_encode([
            'message' => 'Wystąpił błąd podczas aktualizacji bazy danych.',
            'status_update_error' => $statusError,
            'typ_update_error' => $typError
        ]);
    }

} else {
    http_response_code(405);
    echo json_encode(['message' => 'Niedozwolona metoda.']);
}

$conn->close();
?>