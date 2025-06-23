#include "Student.h"
#include <iostream>

Student::Student(std::string i, std::string n, int id, std::string u, int pok)
    : User(i, n), id_studenta(id), uczelnia(u), nr_pokoju(pok) {}

void Student::wybierzWyposazenie(std::vector<Wyposazenie> wybor) {
    mojeWyposazenie = wybor;
    /*std::cout << "Student " << imie << " wybral z wyposazenia: ";
    for (auto& w : mojeWyposazenie) std::cout << w << " ";
    std::cout << "\n";*/
}

void Student::zglosUsterke(std::string opis, std::string filepath) {
    std::cout << "Student " << imie << " zglosil problem: " << opis << " (" << filepath << ")\n";
}

bool Student::zaplac(int id_studenta, int kwota, std::string opis) {
    //std::cout << "Student " << id_studenta << " oplacil kwote " << kwota << " za: " << opis << "\n";
    if (kwota <= 0) return false;
    return true;
}

void Student::zlozWiosek(std::string imie, std::string nazwisko, std::string uczelnia, std::string data1, std::string data2) {
    std::cout << "Wniosek zlozony przez " << imie << " " << nazwisko << " (" << uczelnia << ") od " << data1 << " do " << data2 << "\n";
}
