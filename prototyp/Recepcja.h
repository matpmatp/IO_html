#pragma once
#include "Pracownik.h"
#include "Pokoj.h"
#include "Student.h"

class Recepcja : public Pracownik {
public:
    Recepcja(std::string i, std::string n, int idp);

    bool odwiedziny(Pokoj pokoj, Student student);
    void wydajWyposazenie(Student& student);
    void zdawaniePokoju(Pokoj pokoj, Student student);
};
