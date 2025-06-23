#pragma once
#include "Uslugi.h"
#include "Usterka.h"
#include "Pokoj.h"

class Konserwator : public Uslugi {
public:
    Konserwator(std::string i, std::string n, int idp);

    void przyjmijUsterke(Usterka* usterka);
    bool zmienStatusUsterki(Usterka* usterka, int nowyStatus);
    bool zdawaniePokojuKonserwacja(Pokoj pokoj);
};
