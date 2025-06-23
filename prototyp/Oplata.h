#pragma once
#include <string>

class Oplata {
public:
    int id_oplaty;
    int wartosc;
    int id_studenta;
    std::string opis;
    std::string dataWykonania;

    Oplata(int id, int wart, int student, std::string o);
    bool wykonajOplate();
};
