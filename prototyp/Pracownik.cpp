#include "Pracownik.h"
#include "Raport.h"
#include <iostream>

Pracownik::Pracownik(std::string i, std::string n, int idp) : User(i, n), id_pracownika(idp) {}

Raport* Pracownik::generujRaport(int typRaportu) {
    switch (typRaportu) {
    case 0:
        std::cout << "Wygenerowano raport konserwacyjny\n";
        return new RaportKonserwacyjny(id_pracownika, 1, Raport::miesiac, "Opis raportu.");
    case 1:
        std::cout << "Wygenerowano raport finansowy\n";
        return new RaportFinansowy(id_pracownika, 2, Raport::semestr, 1000, 500, 1500);
    case 2:
        std::cout << "Wygenerowano raport szkod\n";
        return new RaportSzkod(id_pracownika, 3, Raport::rok);
    case 3:
        std::cout << "Wygenerowano raport zamieszkania\n";
        return new RaportZamieszkania(id_pracownika, 4, Raport::pol_roku);
    default:
        std::cout << "Nieznany typ raportu\n";
        return nullptr;
    }
}
