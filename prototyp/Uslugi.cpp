#include "Uslugi.h"
#include <iostream>

Uslugi::Uslugi(std::string i, std::string n, int idp) : Pracownik(i, n, idp) {}

void Uslugi::kontrolaPokoju(Pokoj pokoj) {
    std::cout << "Kontrola pokoju nr " << pokoj.nr_pokoju << "\n";
}
