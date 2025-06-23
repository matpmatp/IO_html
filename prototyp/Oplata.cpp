#include "Oplata.h"
#include <iostream>

Oplata::Oplata(int id, int wart, int student, std::string o)
    : id_oplaty(id), wartosc(wart), id_studenta(student), opis(o)
{
    dataWykonania = "2024-06-02";
}
bool Oplata::wykonajOplate() {
    std::cout << "Oplata " << id_oplaty << " wykonana przez studenta" << id_studenta << " o wartosci " << wartosc << "\n";
    return true;
}
