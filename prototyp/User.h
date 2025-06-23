#pragma once
#include <string>

class User {
public:
    std::string imie;
    std::string nazwisko;
    bool loggedIn;

    User(std::string i, std::string n);
    bool zaloguj(std::string login, std::string haslo);
    bool wyloguj();
};