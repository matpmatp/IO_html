<?php
// api/aktualizuj_wniosek.php

require_once 'db_connect.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $idWniosku = $data['idWniosku'];
    $typ = $data['typ'];
    $nowyStatus = $data['status']; // np. 'przyjety'

    // Aktualizujemy tabelę StatusWniosku
    // Ustawiamy odpowiednią flagę na 1 (true), a resztę na 0 (false)
    $sql = "UPDATE StatusWniosku SET Przyjety = ?, Odrzucony = ?, Wstrzymany = ?, Przetwarzany = ? WHERE Id_wniosku = ?";
    $stmt = $conn->prepare($sql);

    // Przygotowanie flag na podstawie nowego statusu
    $przyjety = ($nowyStatus === 'przyjety') ? 1 : 0;
    $odrzucony = ($nowyStatus === 'odrzucony') ? 1 : 0;
    $wstrzymany = ($nowyStatus === 'wstrzymany') ? 1 : 0;
    $przetwarzany = ($nowyStatus === 'przetwarzany') ? 1 : 0;

    $stmt->bind_param("iiiii", $przyjety, $odrzucony, $wstrzymany, $przetwarzany, $idWniosku);
    $stmt->execute();

    // Opcjonalnie: aktualizujemy też tabelę Wniosek, jeśli np. zmienił się typ
    $sqlTyp = "UPDATE Wniosek SET Typ = ? WHERE Id_wniosku = ?";
    $stmtTyp = $conn->prepare($sqlTyp);
    $stmtTyp->bind_param("si", $typ, $idWniosku);
    $stmtTyp->execute();

    if ($stmt->affected_rows > 0 || $stmtTyp->affected_rows > 0) {
        echo json_encode(['message' => 'Wniosek został pomyślnie zaktualizowany.']);
    } else {
        echo json_encode(['message' => 'Nie wprowadzono żadnych zmian lub wystąpił błąd.']);
    }

    $stmt->close();
    $stmtTyp->close();
}
$conn->close();
?>