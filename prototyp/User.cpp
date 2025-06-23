#include "User.h"
#include <iostream>

User::User(std::string i, std::string n) : imie(i), nazwisko(n), loggedIn(false) {}

bool User::zaloguj(std::string login, std::string haslo) {
    loggedIn = true;
    std::cout << imie << " " << nazwisko << " logged in.\n";
    return true;
}
bool User::wyloguj() {
    loggedIn = false;
    std::cout << imie << " " << nazwisko << " logged out.\n";
    return true;
}
