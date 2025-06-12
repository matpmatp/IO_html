// ioSchemat.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <vector>
int main()
{
    std::vector<std::string> test;
    std::cout << "Hello World!\n";
}
class User {
public:
    std::string imie;
    std::string nazwisko;

    //metody
    bool zaloguj(std::string login, std::string has³o);
    bool wyloguj();
};



class Student:public User {
public:
    int id_studenta;
    std::string uczelnia;
    int nr_pokoju;
    enum wyposazenie{klucz, koldra, poduszka, poszwa, poszewka, przeœcierad³o, kabel_internetowy, pilot, koc};

    //metody
     void zglosUsterke(std::string opis, char* filepath);
     bool zaplac(int id_studenta, int kwota, std::string opis);
     void zlozWiosek(std::string imie, std::string nazwisko, std::string uczelnia, std::string date1, std::string data2);

};

class Pokoj {
public:
    int nr_pokoju;
    int typ_pokoju;
    enum status{zdany, gotowy_do_zdania, z_usterka, wolny, zajety};
    int placa;

    //metody
    bool dodajStudenta(int id_studenta);
    bool usunStudenta(int id_studenta);
    bool zmienStatus(enum status1, enum status2);
};


class Pracownik:public User { //po tym dziedziczy Admin, Zarz¹dca DB, Us³ugi i Recepcja
    int id_pracownika;

    bool generujRaport(int rodzaj);
};
class Recepcja:public Pracownik {

};
class dbAdmin:public Pracownik{};
class uslugi:public Pracownik{};
class konserwator:public uslugi{};
class sprzatanie:public uslugi{};






class Op³ata {

};
class Usterka {
    int id_uslugi;
    std::string opis;
    enum statusUsterki{zgloszona, w_naprawie, naprawiona};
    std::string dataZgloszenia;
    std::string dataRozpoczecia;
    std::string dataZakonczenia;
    int id_pokoju;

    //metody
    bool zmienStatus(enum status1, enum status2);
};



class Raport {
    int id_pracownika;
    int id_raportu;
    std::string dataWystawienia;
    enum okers{miesiac, semestr, pol_roku, rok};
    
    //metody
    bool stworzRaport(); //wywo³ywane przez pracownik::generujRaport() potem przez przekazany argument wywo³a metode dla wybranego typu raportu(jeden z tych poni¿ej)
};
class raportKonserwacyjny :public Raport {
public:
};
class raportFinansowy: public Raport{};
class raportSzkod: public Raport{};
class raportZamieszkania: public Raport{};
