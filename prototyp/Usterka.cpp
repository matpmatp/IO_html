#include "Usterka.h"
#include <iostream>

Usterka::Usterka(int id, std::string op, int pokoj)
    : id_uslugi(id), opis(op), status(zgloszona), id_pokoju(pokoj)
{
    dataZgloszenia = "2024-06-15";
}

bool Usterka::zmienStatus(StatusUsterki s1, StatusUsterki s2) {
    std::cout << "Usterka" << id_uslugi << ": status zmieniony z" << s1 << " do " << s2 << "\n";
    status = s2;
    return true;
}
