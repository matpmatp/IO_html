#pragma once
#include "Pracownik.h"
#include "Pokoj.h"
#include "Student.h"

class Admin : public Pracownik {
public:
    Admin(std::string i, std::string n, int idp);

    bool przetworzWniosek();
    bool zarejestrujStudenta(User toBeStudent);
    void zdawaniePokoju(Pokoj pokoj, Student student);
};
