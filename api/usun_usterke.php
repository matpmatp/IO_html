<?php
// Plik: api/usun_usterke.php
require_once 'db_connect.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id_usterki = $data['id'];

    if (!empty($id_usterki)) {
        $conn->begin_transaction();
        try {
            // Krok 1: Usuń powiązane zlecenia naprawy (jeśli istnieją)
            $stmt1 = $conn->prepare("DELETE FROM ZlecenieNaprawy WHERE Id_usterki = ?");
            $stmt1->bind_param("i", $id_usterki);
            $stmt1->execute();

            // Krok 2: Usuń status usterki
            $stmt2 = $conn->prepare("DELETE FROM StatusUsterki WHERE Id_usterki = ?");
            $stmt2->bind_param("i", $id_usterki);
            $stmt2->execute();

            // Krok 3: Usuń główną usterkę
            $stmt3 = $conn->prepare("DELETE FROM Usterka WHERE Id_usterki = ?");
            $stmt3->bind_param("i", $id_usterki);
            $stmt3->execute();

            $conn->commit();
            if ($stmt3->affected_rows > 0) {
                echo json_encode(['message' => 'Usterka została pomyślnie usunięta.']);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'Nie znaleziono usterki o podanym ID.']);
            }
        } catch (mysqli_sql_exception $exception) {
            $conn->rollback();
            http_response_code(500);
            echo json_encode(['message' => 'Błąd usuwania z bazy danych.', 'error' => $exception->getMessage()]);
        }
    }
}
?>