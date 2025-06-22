<?php
// Plik: api/usun_oplate.php

require_once 'db_connect.php';
header('Content-Type: application/json');

// Upewniamy się, że żądanie jest typu POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $id_oplaty = $data['id'];

    // Sprawdzamy, czy otrzymaliśmy ID
    if (!empty($id_oplaty)) {

        // Używamy prepared statements dla bezpieczeństwa
        $sql = "DELETE FROM Opłata WHERE Id_oplaty = ?";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id_oplaty);

        if ($stmt->execute()) {
            // Sprawdzamy, czy faktycznie usunięto jakiś wiersz
            if ($stmt->affected_rows > 0) {
                http_response_code(200);
                echo json_encode(['message' => 'Opłata została pomyślnie usunięta.']);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'Nie znaleziono opłaty o podanym ID.']);
            }
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Błąd wykonania zapytania.', 'error' => $stmt->error]);
        }
        $stmt->close();

    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Nie podano ID opłaty do usunięcia.']);
    }

} else {
    http_response_code(405);
    echo json_encode(['message' => 'Niedozwolona metoda.']);
}

$conn->close();
?>