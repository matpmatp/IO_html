<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once 'db_connect.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  $data = json_decode(file_get_contents('php://input'), true);

  $idStudenta = $data['idStudenta'];
  $typ = $data['typ'];
  $dataZlozenia = $data['dataZlozenia'];

  $sql = "INSERT INTO Wniosek (Id_studenta, Typ, DataZlozenia) VALUES (?, ?, ?)";

  $stmt = $conn->prepare($sql);

  $stmt->bind_param("iss", $idStudenta, $typ, $dataZlozenia);


if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        http_response_code(201);
        echo json_encode([
            'message' => 'Sukces! Wniosek został FAKTYCZNIE dodany do bazy.',
            'nowe_id_wniosku' => $stmt->insert_id
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Błąd: Zapytanie wykonane poprawnie, ale nie dodano żadnego wiersza.']);
    }
} else {
    http_response_code(500);
    echo json_encode([
        'message' => 'Krytyczny błąd wykonania zapytania SQL.',
        'error_details_z_bazy' => $stmt->error
    ]);
}

  $stmt->close();

} else {
  http_response_code(405);
  echo json_encode(['message' => 'Niedozwolona metoda.']);
}


$conn->close();
?>