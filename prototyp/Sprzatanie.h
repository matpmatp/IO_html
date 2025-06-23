#pragma once
#include "Uslugi.h"
#include "Pokoj.h"

class Sprzatanie : public Uslugi {
public:
    Sprzatanie(std::string i, std::string n, int idp);

    void sprzataj();
    bool zdawaniePokojuSprzatanie(Pokoj pokoj);
};
