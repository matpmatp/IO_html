#pragma once
#include <string>

class Usterka {
public:
    int id_uslugi;
    std::string opis;
    enum StatusUsterki { zgloszona, w_naprawie, naprawiona } status;
    std::string dataZgloszenia, dataRozpoczecia, dataZakonczenia;
    int id_pokoju;

    Usterka(int id, std::string op, int pokoj);
    bool zmienStatus(StatusUsterki s1, StatusUsterki s2);
};
