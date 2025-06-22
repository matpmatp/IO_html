#include <iostream>
#include <vector>
#include <string>
#include "AkademikSystem.h"

// ========================== TEST MAIN ==========================


int main() {
    Student s1("Jan", "Kowalski", 101, "Politechnika", 203);

    s1.wybierzWyposazenie({ Student::klucz, Student::koldra, Student::pilot });

    Pokoj p1(203, 1, 500, 2, 3); // pojemnosc pokoju 2, status 3 ("wolny")
    p1.dodajStudenta(s1.id_studenta);

    Recepcja rec("Anna", "Nowak", 1);
    rec.odwiedziny(p1, s1);

    // Try to overfill the room
    p1.dodajStudenta(202);
    p1.dodajStudenta(203);

    s1.zaloguj("jkowalski", "tajne");
    s1.wyloguj();

    // Simulate report generation
    Pracownik prac("Maciej", "Testowy", 7);
    Raport* r1 = prac.generujRaport(1);
    r1->stworzRaport();
    delete r1;

    return 0;
}
