#include "Admin.h"
#include <iostream>

Admin::Admin(std::string i, std::string n, int idp) : Pracownik(i, n, idp) {}

bool Admin::przetworzWniosek() {
    std::cout << "Admin przetwarza wniosek\n";
    return true;
}
bool Admin::zarejestrujStudenta(User toBeStudent) {
    std::cout << "Admin zarejestrowal studenta: " << toBeStudent.imie << " " << toBeStudent.nazwisko << "\n";
    return true;
}
void Admin::zdawaniePokoju(Pokoj pokoj, Student student) {
    std::cout << "Student " << student.id_studenta << "oddal pokoj nr " << pokoj.nr_pokoju << "\n";
}
