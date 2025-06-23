#include "Konserwator.h"
#include <iostream>

Konserwator::Konserwator(std::string i, std::string n, int idp) : Uslugi(i, n, idp) {}

void Konserwator::przyjmijUsterke(Usterka* usterka) {
    std::cout << "Konserwator przyjal ustrke " << usterka->id_uslugi << "\n";
    usterka->status = Usterka::w_naprawie;
}

bool Konserwator::zmienStatusUsterki(Usterka* usterka, int nowyStatus) {
    std::cout << "Aktualizacja usterki " << usterka->id_uslugi << ", nowy status:" << nowyStatus << "\n";
    usterka->status = static_cast<Usterka::StatusUsterki>(nowyStatus);
    return true;
}

bool Konserwator::zdawaniePokojuKonserwacja(Pokoj pokoj) {
    std::cout << "Potwierdzenie konserwatora o dobrym stanie technicznym pokoju nr " << pokoj.nr_pokoju << ", zdawanie mozliwe\n";
    return true;
}
