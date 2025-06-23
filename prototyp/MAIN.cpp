#include "AkademikSystem.h"
#include <iostream>
#include <stdexcept>

int main() {
    // ---- POSITIVE TESTS: No output on success ----
    
        std::cout << "\n--- TESTY ---\n";

        Student s1("Jan", "Kowalski", 101, "Politechnika", 203);
        Pokoj p1(203, 1, 500, 2, 3); // capacity 2, status "wolny"

        // Wypełnij pokój
        bool ok1 = p1.dodajStudenta(s1.id_studenta);
        bool ok2 = p1.dodajStudenta(102);
        // wyposażenie
        s1.wybierzWyposazenie({ Student::klucz, Student::koldra });
        // zapłać za pokoj
        bool ok3 = s1.zaplac(s1.id_studenta, 200, "Czynsz");
        // zmień status do pokoju
        bool ok4 = p1.zmienStatus(4); // "zajety"

        Pracownik prac("Tomasz", "Testowy", 7);
        Raport* raport = prac.generujRaport(0); 
        if (raport) {
            raport->stworzRaport();
            delete raport;
        }
        // usuń studenta
        bool ok5 = p1.usunStudenta(s1.id_studenta);

       
    

        //================================================
    
        std::cout << "\n--- ERROR TESTY ---\n";

        Student s2("Anna", "Nowak", 201, "AGH", 204);
        Pokoj p2(204, 2, 400, 1, 3); // capacity 1

        //przepełnienie pokoju poza capacity
        p2.dodajStudenta(s2.id_studenta); // OK
        bool error1 = p2.dodajStudenta(202);
        if (!error1) std::cout << "Error: Pokoj 204 jest pelny\n";

        //zly status zpoza enuma
        bool error2 = p2.zmienStatus(10); 
        if (!error2) std::cout << "Error: Nieznany status do pokoju 204.\n";

        //bledna ilosc oplaty
        bool error3 = s2.zaplac(s2.id_studenta, -100, "Czynsz");
        if (!error3) std::cout << "Error: Niepoprawna kwota oplaty od studenta 201.\n";

        //raport zpoza przedziału
        Pracownik prac2("Ewa", "Kania", 8);
        Raport* rbad = prac2.generujRaport(99);
        if (!rbad) std::cout << "Error: Nieznany typ raportu do generacji.\n";
        delete rbad;

        //usuń studenta który nie jest w pokoju
        bool error4 = p2.usunStudenta(999);
        if (!error4) std::cout << "Error: Nie mozna usunac studenta 999 z pokoju 204, nie nalezy do niego.\n";

        //usterka zpoza przedzialu
        Usterka u2(1002, "Brak cieplej wody", 204);
        bool error5 = u2.zmienStatus(Usterka::zgloszona, (Usterka::StatusUsterki)42);
        if (!error5) std::cout << "Error: Nieznany typ usterki.\n";

      
    std::cout << "\nKoniec testow\n";
    return 0;
}
