#include "Pokoj.h"
#include <iostream>

Pokoj::Pokoj(int nr, int typ, int pl, int cap, int statIndex)
    : nr_pokoju(nr), typ_pokoju(typ), placa(pl), capacity(cap) {
    status = static_cast<Status>(statIndex);
}

bool Pokoj::dodajStudenta(int id_studenta) {
    if (studenci.size() >= capacity) {
        //std::cout << "Nie mozna dodac studenta" << id_studenta << " do pokoju nr " << nr_pokoju << ": pelen pokoj.\n";
        return false;
    }
    studenci.push_back(id_studenta);
    //std::cout << "Dodano studenta " << id_studenta << " do pokoju " << nr_pokoju << "\n";
    return true;
}

bool Pokoj::usunStudenta(int id_studenta) {
    for (auto it = studenci.begin(); it != studenci.end(); ++it) {
        if (*it == id_studenta) {
            studenci.erase(it);
            std::cout << "Usunieto studenta " << id_studenta << " z pokoju " << nr_pokoju << "\n";
            return true;
        }
    }
    return false;
}

bool Pokoj::zmienStatus(int statusIndex) {
    if (statusIndex >= 0 && statusIndex <= 4) {
       // Status oldStatus = status;
        status = static_cast<Status>(statusIndex);
        //std::cout << "Pokoj " << nr_pokoju << " zmienil status z " << oldStatus << " do " << status << "\n";
        return true;
    }
    //std::cout << "Blad - niepoprawny status\n";
    return false;
}
