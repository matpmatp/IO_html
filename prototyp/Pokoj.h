#pragma once
#include <vector>
#include <string>

class Pokoj {
public:
    int nr_pokoju;
    int typ_pokoju;
    int placa;
    int capacity;
    enum Status { zdany, gotowy_do_zdania, z_usterka, wolny, zajety };
    Status status;

    std::vector<int> studenci;

    Pokoj(int nr, int typ, int pl, int cap, int statIndex);
    bool dodajStudenta(int id_studenta);
    bool usunStudenta(int id_studenta);
    bool zmienStatus(int statusIndex);
};
