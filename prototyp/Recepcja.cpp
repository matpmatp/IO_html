#include "Recepcja.h"
#include <iostream>

Recepcja::Recepcja(std::string i, std::string n, int idp) : Pracownik(i, n, idp) {}

bool Recepcja::odwiedziny(Pokoj pokoj, Student student) {
    std::cout << "Student " << student.id_studenta << " odwiedzil pokoj " << pokoj.nr_pokoju << "\n";
    return true;
}
void Recepcja::wydajWyposazenie(Student& student) {
    std::cout << "Wyposazenie do pokoju wydane studentowi " << student.id_studenta << "\n";
}
void Recepcja::zdawaniePokoju(Pokoj pokoj, Student student) {
    std::cout << "Student " << student.id_studenta << "oddal pokoj nr " << pokoj.nr_pokoju << "\n";
}
