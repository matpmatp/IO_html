#pragma once
#include "User.h"

class Raport;

class Pracownik : public User {
public:
    int id_pracownika;
    Pracownik(std::string i, std::string n, int idp);
    Raport* generujRaport(int typRaportu);
};
