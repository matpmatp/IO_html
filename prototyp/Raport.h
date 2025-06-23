#pragma once
#include <string>
#include <vector>
#include "Pokoj.h"

class Usterka; // Forward

class Raport {
public:
    int id_pracownika;
    int id_raportu;
    std::string dataWystawienia;
    enum Okres { miesiac, semestr, pol_roku, rok } okres;

    Raport(int idp, int idr, Okres ok);
    virtual bool stworzRaport();
    virtual ~Raport() = default;
};

class RaportKonserwacyjny : public Raport {
public:
    std::string opis;
    RaportKonserwacyjny(int idp, int idr, Okres ok, std::string op);
};

class RaportFinansowy : public Raport {
public:
    int wydatki;
    int naleznosci;
    int wplaty;
    RaportFinansowy(int idp, int idr, Okres ok, int wyd, int nal, int wpl);
};

class RaportSzkod : public Raport {
public:
    std::vector<Usterka> usterki;
    RaportSzkod(int idp, int idr, Okres ok);
};

class RaportZamieszkania : public Raport {
public:
    std::vector<Pokoj> statusZamieszkania;
    RaportZamieszkania(int idp, int idr, Okres ok);
};
