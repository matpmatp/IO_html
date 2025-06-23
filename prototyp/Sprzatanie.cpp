#include "Sprzatanie.h"
#include <iostream>

Sprzatanie::Sprzatanie(std::string i, std::string n, int idp) : Uslugi(i, n, idp) {}

void Sprzatanie::sprzataj() {
    std::cout << "Sprzatanie...\n";
}

bool Sprzatanie::zdawaniePokojuSprzatanie(Pokoj pokoj) {
    std::cout << "Potwierdzenie Pani sprzatajacej o czystym stanie pokoju nr " << pokoj.nr_pokoju << ", zdawanie mozliwe\n";
    return true;
}
