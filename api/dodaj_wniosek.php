<?php
// api/dodaj_wniosek.php

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
    http_response_code(201);
    echo json_encode(['message' => 'Wniosek pomyślnie złożony!']);
  } else {
    http_response_code(500);
    echo json_encode(['message' => 'Błąd serwera przy zapisie do bazy.']);
  }

  $stmt->close();

} else {
  http_response_code(405);
  echo json_encode(['message' => 'Niedozwolona metoda.']);
}


$conn->close();
?>