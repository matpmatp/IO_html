#include "Raport.h"
#include "Usterka.h"
#include <iostream>

Raport::Raport(int idp, int idr, Okres ok) : id_pracownika(idp), id_raportu(idr), okres(ok) {
    dataWystawienia = "2024-06-02";
}
bool Raport::stworzRaport() {
    std::cout << "Report " << id_raportu << " wygenerowany przez " << id_pracownika << "\n";
    return true;
}

RaportKonserwacyjny::RaportKonserwacyjny(int idp, int idr, Okres ok, std::string op)
    : Raport(idp, idr, ok), opis(op) {}

RaportFinansowy::RaportFinansowy(int idp, int idr, Okres ok, int wyd, int nal, int wpl)
    : Raport(idp, idr, ok), wydatki(wyd), naleznosci(nal), wplaty(wpl) {}

RaportSzkod::RaportSzkod(int idp, int idr, Okres ok) : Raport(idp, idr, ok) {}

RaportZamieszkania::RaportZamieszkania(int idp, int idr, Okres ok) : Raport(idp, idr, ok) {}
