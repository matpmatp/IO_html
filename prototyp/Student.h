#pragma once
#include "User.h"
#include <string>
#include <vector>

class Student : public User {
public:
    int id_studenta;
    std::string uczelnia;
    int nr_pokoju;

    enum Wyposazenie { klucz, koldra, poduszka, poszwa, poszewka, przescieradlo, kabel_internetowy, pilot, koc };
    std::vector<Wyposazenie> mojeWyposazenie;

    Student(std::string i, std::string n, int id, std::string u, int pok);

    void wybierzWyposazenie(std::vector<Wyposazenie> wybor);
    void zglosUsterke(std::string opis, std::string filepath);
    bool zaplac(int id_studenta, int kwota, std::string opis);
    void zlozWiosek(std::string imie, std::string nazwisko, std::string uczelnia, std::string data1, std::string data2);
};
