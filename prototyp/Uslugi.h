#pragma once
#include "Pracownik.h"
#include "Pokoj.h"

class Uslugi : public Pracownik {
public:
    Uslugi(std::string i, std::string n, int idp);

    void kontrolaPokoju(Pokoj pokoj);
};
