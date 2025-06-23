<?php
require_once 'db_connect.php';
header('Content-Type: application/json');

$sql = "
    SELECT
        u.Id_usterki, u.Nr_pokoju, u.Opis, u.DataZgloszenia,
        su.Zgloszona, su.W_naprawie, su.Naprawiona
    FROM
        Usterka AS u
    LEFT JOIN
        StatusUsterki AS su ON u.Id_usterki = su.Id_usterki
    ORDER BY
        u.DataZgloszenia DESC
";

$result = $conn->query($sql);
$usterki = [];
if ($result) {
    while($row = $result->fetch_assoc()) {
        $usterki[] = $row;
    }
}
echo json_encode($usterki);
$conn->close();
?>